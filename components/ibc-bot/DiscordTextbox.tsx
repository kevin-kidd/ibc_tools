import {FunctionComponent} from "react";
import { QuestionMarkCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import {StateProps} from "../../types/botTypes"
import { classNames } from "../../func/bot/helper"

const DiscordTextbox: FunctionComponent<StateProps> = (props) => {

    const [state, setState] = [props.state, props.setState]

    return(
        <div className="lg:col-span-3 lg:col-start-5 sm:row-span-1 z-1">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Discord username
                </label>
                <div className="mt-1 relative shadow-lg">
                    <input
                        type="text"
                        spellCheck={false}
                        value={state.discord}
                        onChange={(e) => setState({ discord: e.target.value })}
                        className=
                            {classNames(state.alertMsg !== 'Incorrect Discord username! Correct format: Username#1234' ?
                                'focus:ring-[#85ff89] focus:border-[#85ff89] block w-full pr-10 sm:text-sm border-gray-300'
                                :
                                'ring-red-500 border-red-500 focus:border-red-500 focus:ring-red-500 block w-full pr-10 sm:text-sm'
                            )}

                        placeholder="Example#1234"
                    />
                    {
                        state.alertMsg !== 'Incorrect Discord username! Correct format: Username#1234' ?
                            <>
                                <div className="absolute inset-y-0 right-0 pr-3 pt-2 flex flex-col items-center group">
                                    <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                                    <div className="absolute w-52 flex flex-col items-center hidden top-10 group-hover:flex">
                                        <div className="w-3 h-3 rotate-45 bg-black -mb-2" />
                                        <span className="relative z-10 p-3 w-full text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                                            Please include your full Discord tag (Example#1234)
                                        </span>
                                    </div>
                                </div>
                            </>
                            :
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default DiscordTextbox