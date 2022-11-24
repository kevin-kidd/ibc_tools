import type { FunctionComponent } from "react";
import { CosmWasmClient } from "cosmwasm";
import { classNames } from "../../../func/bot/helper";
import type { StateProps } from "../../../types/snapshot";
import { grabSnapshot } from "../../../func/stargaze/helper";
import {
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";

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
            value={state.address}
            onChange={(e) => setState({ address: e.target.value })}
            className={classNames(
              state.alertMsg !==
                "Incorrect contract address! Contact support for help."
                ? "focus:ring-lightgreen focus:border-lightgreen block w-full pr-10 sm:text-sm border-gray-300"
                : "ring-red-500 border-red-500 focus:border-red-500 focus:ring-red-500 block w-full pr-10 sm:text-sm"
            )}
            placeholder="stars..."
          />
          {state.alertMsg !==
          "Incorrect contract address! Contact support for help." ? (
            <>
              <div className="absolute inset-y-0 right-0 pr-3 pt-2 flex flex-col items-center group">
                <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                <div className="absolute w-52 flex-col items-center hidden top-10 group-hover:flex">
                  <div className="w-3 h-3 rotate-45 bg-black -mb-2" />
                  <span className="relative z-10 p-3 w-full text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                    Please enter the sg-721 or minter contract address
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Form: FunctionComponent<StateProps> = (props) => {
  const [state, setState] = [props.state, props.setState];

  const grabData = async (sg721: string) => {
    const snapshot = await grabSnapshot(sg721);
    if (snapshot.success) {
      setState(snapshot); // @ts-ignore
      setState({ pageOfOwners: snapshot.ownersToExport.slice(0, 10) });
    } else {
      setState({ alertSeverity: "error", alertMsg: snapshot.message });
    }
    setState({ loading: false });
    return;
  };

  const queryContract = async () => {
    setState({ loading: true, owners: [] });
    try {
      const client = await CosmWasmClient.connect(
        "https://rpc.stargaze-apis.com/"
      );
      const configResponse = await client.queryContractSmart(state.address, {
        config: {},
      });
      await grabData(configResponse.sg721_address);
    } catch (e: any) {
      if (e.message.includes("Error parsing into type")) {
        try {
          await grabData(state.address);
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
        console.log(e.message);
        setState({
          loading: false,
          alertSeverity: "error",
          alertMsg: "Failed to fetch, please try again or contact support.",
        });
      }
    }
    setState({ loading: false });
  };

  return (
    <div className="w-full lg:px-0 md:px-12 sm:px-6 px-4 lg:grid lg:grid-cols-6 lg:gap-8 my-10">
      <ContractTextbox setState={props.setState} state={props.state} />
      <div className="lg:col-span-2 lg:col-start-5 sm:row-span-1">
        <button
          onClick={queryContract}
          type="submit"
          className="mt-6 align-middle text-black font-extrabold inline-flex
                        border-[#1d1d1d] border button-dropshadow transition duration-200
                        text-lg bg-lightyellow px-7 py-1 mr-2 focus:outline-none"
        >
          <svg
            className={classNames(
              props.state.loading
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
  );
};

export default Form;
