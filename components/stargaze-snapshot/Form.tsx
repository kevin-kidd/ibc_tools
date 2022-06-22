import { FunctionComponent } from "react";
import {CosmWasmClient} from "cosmwasm";

import { classNames } from "../../func/bot/helper"
import ContractTextbox from "./ContractTextbox";
import {StateProps} from "../../types/snapshotTypes";
import { grabSnapshot } from "../../func/snapshot/helper"

const Form: FunctionComponent<StateProps> = (props) => {

    const [state, setState] = [props.state, props.setState]

    const grabData = async (sg721: string) => {
        const snapshot = await grabSnapshot(sg721)
        if(snapshot.status === 200){
            setState(snapshot.data)
            setState({currentOwners: snapshot.data.owners.slice(0, 10)})
        } else {
            setState({alertSeverity: "error", alertMsg: snapshot.data.message})
        }
        setState({loading: false})
        return
    }

    const queryContract = async () => {
        setState({loading: true, owners: []})
        try {
            const client = await CosmWasmClient.connect("https://rpc.stargaze-apis.com/");
            const configResponse = await client.queryContractSmart(state.address, {
                config: {},
            })
            await grabData(configResponse.sg721_address)
        } catch (e: any) {
            if(e.message.includes("Error parsing into type")){
                try {
                    await grabData(state.address)
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

    return(
        <div>
            <div className="w-full
                lg:px-0 md:px-12 sm:px-6 px-4 lg:-mt-10
                lg:grid lg:grid-cols-6 lg:gap-8 mb-8
            ">
                <ContractTextbox setState={props.setState} state={props.state} />
                <div className="
                lg:col-span-2 lg:col-start-5
                sm:row-span-1"
                >
                    <button type="submit"
                            onClick={queryContract}
                            className="mt-6 align-middle text-black font-extrabold inline-flex
                         border-[#1d1d1d] border yellow-button transition duration-200
                         text-lg bg-[#fff985] px-7 py-1 mr-2 focus:outline-none"
                    >
                        <svg className={classNames(props.state.loading ? "animate-spin h-5 w-5 mr-3 align-center -ml-2 mt-1" : "hidden")} viewBox="0 0 24 24">
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