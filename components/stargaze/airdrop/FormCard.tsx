import {FunctionComponent} from "react";
import {StateProps} from "../../../types/airdropTypes";
import Form from "./Form"

const FormCard: FunctionComponent<StateProps> = ({state, setState}) => {
    return (
        <div className="mx-auto main-card w-full pt-16">
            <div className="flex flex-row justify-center pb-6 ml-2">
                <p>
                    Enter the
                    <a target="_blank" rel="noreferrer" className="hover:text-[#85ff89] text-black transition duration-150 font-bold"
                       href="https://docs.stargaze.zone/guides/readme/5.-instantiate-minter-contract-on-testnet"
                    > contract address </a>
                    of the collection you want to airdrop.
                </p>
            </div>
            <Form state={state} setState={setState} />
            <div className="flex justify-between items-end mt-8 px-2 pb-2">
                <div className="flex justify-center">
                    <label htmlFor="checked-toggle" className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" value="" onChange={(e) => setState({mainnet: e.target.checked})}
                               id="checked-toggle" className="sr-only peer" checked={state.mainnet} disabled={state.currentStep > 2}
                        />
                        <div
                            className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-checked:after:translate-x-full after:w-5
                            peer-checked:after:border-white after:absolute after:top-0.5 after:left-[2px] after:bg-white after:h-5
                            after:border-gray-300 after:border after:transition-all dark:border-gray-600 peer-checked:bg-[#85f0ff]"
                        >
                        </div>
                        <span
                            className="ml-3 text-sm md:text-base font-bold text-[#686765]">{state.mainnet ? "Mainnet" : "Testnet"}</span>
                    </label>
                </div>
                <p className="text-[#686765] text-lg">Step 2</p>
            </div>
        </div>
    )

}

export default FormCard