import { FunctionComponent } from "react";
import { CosmWasmClient } from "cosmwasm";
import { classNames } from "../../../func/bot/helper"
import { StateProps } from "../../../types/airdropTypes";
import {QuestionMarkCircleIcon} from "@heroicons/react/solid";
import {getCollectionInfo} from "../../../func/stargaze/helper";

const ContractTextbox: FunctionComponent<StateProps> = ({state, setState}) => {
    return(
        <div className="lg:col-span-3 lg:col-start-2 sm:row-span-1">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Contract address
                </label>
                <div className="mt-1 relative shadow-lg">
                    <input
                        type="text"
                        spellCheck={false}
                        value={state.contractAddress}
                        onChange={(e) => setState({ contractAddress: e.target.value })}
                        className="focus:ring-[#85ff89] focus:border-[#85ff89] block w-full pr-10 sm:text-sm border-gray-300"
                        placeholder="stars..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 pt-2 flex flex-col items-center group">
                        <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                        <div className="absolute w-52 flex flex-col items-center hidden top-10 group-hover:flex">
                            <div className="w-3 h-3 rotate-45 bg-black -mb-2" />
                            <span className="relative z-10 p-3 w-full text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                                Please enter the sg-721 or minter contract address
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Form: FunctionComponent<StateProps> = ({ state, setState }) => {
    const queryContract = async () => {
        setState({loading: true})
        try {
            const client = await CosmWasmClient.connect(
                `${ state.mainnet ? "https://rpc.stargaze-apis.com/" : "https://rpc.elgafar-1.stargaze-apis.com/"}`
            );
            const configResponse = await client.queryContractSmart(state.contractAddress, {
                config: {},
            })
            await handleContract(configResponse.sg721_address)
        } catch (e: any) {
            if(e.message.includes("Error parsing into type")){
                try {
                    await handleContract(state.contractAddress)
                } catch (e: any) {
                    console.log(e.message)
                    setState({loading: false, alertSeverity: "error", alertMsg: "Please check that you have entered the correct contract address."})
                }
            } else {
                console.log(e.message)
                setState({loading: false, alertSeverity: "error", alertMsg: "Failed to fetch, please try again or contact support."})
            }
        }
        setState({loading: false})
    }

    const handleContract = async (sg721: string) => {
        const collectionInfo = await getCollectionInfo(sg721, state.mainnet);
        if(collectionInfo.success) {
            setState({ name: collectionInfo.name, numTokens: collectionInfo.numTokens, currentStep: 3});
        } else {
            setState({loading: false, alertSeverity: "error", alertMsg: collectionInfo.message});
        }
    }

    return(
        <div>
            <div className="w-full lg:px-0 md:px-12 sm:px-6 px-4 lg:grid lg:grid-cols-6 lg:gap-8 flex items-end">
                <ContractTextbox state={state} setState={setState} />
                <div className="lg:col-span-2 lg:col-start-5 sm:row-span-1">
                    <button
                        type="submit" onClick={queryContract}
                        className="text-black font-extrabold inline-flex
                            border-[#1d1d1d] border button-dropshadow transition duration-200
                            text-lg bg-[#fff985] px-7 py-1 mr-2 focus:outline-none"
                    >
                        <svg className={classNames(state.loading ? "animate-spin h-5 w-5 mr-3 align-center -ml-2 mt-1" : "hidden")} viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Form