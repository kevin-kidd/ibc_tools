import type { FunctionComponent } from "react";
import { CosmWasmClient } from "cosmwasm";
import { classNames } from "../../../utils/bot/helper";
import type { StateProps } from "../../../types/airdrop";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { getCollectionInfo } from "../../../utils/stargaze/helper";

const ContractTextbox: FunctionComponent<StateProps> = ({
  state,
  setState,
}) => {
  return (
    <div className="lg:col-span-3 lg:col-start-2 sm:row-span-1">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contract address
        </label>
        <div className="mt-1 relative shadow-lg">
          <input
            type="text"
            spellCheck={false}
            value={state.minterAddress}
            onChange={(e) => setState({ minterAddress: e.target.value })}
            className="focus:ring-lightgreen focus:border-lightgreen block w-full pr-10 sm:text-sm border-gray-300"
            placeholder="stars..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 pt-2 flex flex-col items-center group">
            <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
            <div className="absolute w-52 flex-col items-center hidden top-10 group-hover:flex">
              <div className="w-3 h-3 rotate-45 bg-black -mb-2" />
              <span className="relative z-10 p-3 w-full text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                Please enter the sg-721 or minter contract address
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Form: FunctionComponent<StateProps> = ({ state, setState }) => {
  const getMinter = async () => {
    try {
      const client = await CosmWasmClient.connect(
        `${
          state.mainnet
            ? "https://rpc.stargaze-apis.com/"
            : "https://rpc.elgafar-1.stargaze-apis.com/"
        }`
      );
      const minterResponse = await client.queryContractSmart(
        state.minterAddress,
        {
          minter: {},
        }
      );
      if (minterResponse.hasOwnProperty("minter")) return minterResponse.minter;
      console.error(minterResponse);
    } catch (e: any) {
      console.error(e.message);
    }
    setState({
      alertSeverity: "error",
      alertMsg:
        "Unable to grab the minter contract address. Please enter the minter address instead of the SG-721.",
    });
    return;
  };

  const getSg721 = async () => {
    const client = await CosmWasmClient.connect(
      `${
        state.mainnet
          ? "https://rpc.stargaze-apis.com/"
          : "https://rpc.elgafar-1.stargaze-apis.com/"
      }`
    );
    const configResponse = await client.queryContractSmart(
      state.minterAddress,
      {
        config: {},
      }
    );
    if (configResponse.hasOwnProperty("sg721_address"))
      return configResponse.sg721_address;
    console.error(configResponse);
    setState({
      alertSeverity: "error",
      alertMsg:
        "Unable to grab the SG-721 contract address. Please enter the SG-721 address instead of the Minter.",
    });
    return;
  };

  const queryContract = async () => {
    setState({ loading: true });
    try {
      const sg721Address = await getSg721();
      if (sg721Address) {
        setState({ sg721Address: sg721Address });
        await handleContract(sg721Address);
      }
    } catch (e: any) {
      if (e.message.includes("Error parsing into type")) {
        try {
          const minterAddress = await getMinter();
          if (minterAddress) {
            await handleContract(state.minterAddress);
            setState({ sg721Address: state.minterAddress });
            setState({ minterAddress: minterAddress });
          }
        } catch (e: any) {
          console.log(e.message);
          setState({
            loading: false,
            alertSeverity: "error",
            alertMsg:
              "Please check that you have entered the correct contract address.",
          });
        }
      } else {
        console.error(e.message);
        let errorMsg: string;
        if (e.message.includes("bech32"))
          errorMsg =
            "Incorrect contract address. Check to make sure you did not make any typos.";
        else errorMsg = e.message;
        setState({
          loading: false,
          alertSeverity: "error",
          alertMsg: errorMsg,
        });
      }
    }
    setState({ loading: false });
  };

  const handleContract = async (sg721: string) => {
    const collectionInfo = await getCollectionInfo(sg721, state.mainnet);
    if (!collectionInfo.success) {
      setState({
        loading: false,
        alertSeverity: "error",
        alertMsg: collectionInfo.message,
      });
      return;
    }
    setState({
      name: collectionInfo.name,
      numTokens: collectionInfo.numTokens,
      currentStep: 3,
    });
  };

  return (
    <div>
      <div className="w-full lg:px-0 md:px-12 sm:px-6 px-4 lg:grid lg:grid-cols-6 lg:gap-8 flex items-end">
        <ContractTextbox state={state} setState={setState} />
        <div className="lg:col-span-2 lg:col-start-5 sm:row-span-1">
          <button
            type="submit"
            onClick={queryContract}
            className="text-black font-extrabold inline-flex
                            border-[#1d1d1d] border button-dropshadow transition duration-200
                            text-lg bg-lightyellow px-7 py-1 mr-2 focus:outline-none"
          >
            <svg
              className={classNames(
                state.loading
                  ? "animate-spin h-5 w-5 mr-3 align-center -ml-2 mt-1"
                  : "hidden"
              )}
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
