import {FunctionComponent} from "react";
import SelectCollection from "./SelectCollection";
import DiscordTextbox from "./DiscordTextbox";
import { StateProps } from '../../types/botTypes'
import {classNames, postData} from "../../func/bot/helper";
import {getClient, getPermit, setWhitelist} from "../../func/bot/keplr";

const Form: FunctionComponent<StateProps> = (props) => {

    const [state, setState] = [props.state, props.setState]

    const verifyDiscord = () => {
        if(state.discord.length === 0) return
        const re = new RegExp(/^((.+?)#\d{4})/)
        if(!re.test(state.discord)){
            displayError("Incorrect Discord username! Correct format: Username#1234")
            return false
        }
        return true
    }

    const displayError = (message: string) => {
        setState({loading: false, alertMsg: message, alertSeverity: 'error'})
    }

    const displaySuccess = () => {
        setState({loading: false, alertMsg: 'Your Discord has been successfully linked!', alertSeverity: 'success'})
    }

    const linkDiscord = async () => {
        try {
            if (!verifyDiscord()) {
                return
            }
            setState({ loading: true })


            let client = await getClient()
            if(client === undefined) {
                displayError("Unable to connect Keplr! Please make sure you have installed and logged in to your Keplr wallet.")
                return
            }

            let permit = await getPermit()

            let execResponse = await setWhitelist(client, state.collection.contract)
            if(execResponse === undefined){
                // Display error - set whitelist approval transaction failed!
                displayError("Unable to set whitelisted approval. Please try again.")
                return
            }
            // Post signature, address & token list to the API
            let postResponse = await postData(permit, state.discord, client.address, state.collection.contract.address)
            if(postResponse.status === 200){
                displaySuccess()
            } else {
                displayError("Unexpected error occurred. Please contact support for help.")
            }
        } catch (e: any) {
            if(e.message === "Request rejected") {
                displayError("Please accept the Keplr popup window.")
            }
            displayError(e.message)
        }
    }

    return(
        <div>
            <div className="w-full
                lg:px-0 md:px-12 sm:px-6 px-4 lg:-mt-10
                lg:grid lg:grid-cols-10 lg:gap-8 mb-10">
                <SelectCollection state={props.state} setState={props.setState} />
                <DiscordTextbox state={props.state} setState={props.setState} />
                <div className="
                lg:col-span-2 lg:col-start-8
                sm:row-span-1"
                >
                    <button type="submit"
                            onClick={linkDiscord}
                            className="mt-6 align-middle text-black font-extrabold inline-flex
                         border-[#1d1d1d] border yellow-button transition duration-200
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
            <div className="justify-center content-center flex mb-10">
                <p>
                    <a href="https://patrik768772.typeform.com/IBCBOT" target="_blank" rel="noreferrer" className="hover:text-[#85ff89] font-bold">Add IBC Bot</a> to your Discord server!
                </p>
            </div>
        </div>
    )
}

export default Form