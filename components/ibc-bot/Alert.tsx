import {FunctionComponent} from "react";
import {StateProps} from "../../types/botTypes";
import {CheckCircleIcon, ExclamationCircleIcon, XIcon} from '@heroicons/react/solid'
import { classNames } from "../../func/bot/helper"

const Alert: FunctionComponent<StateProps> = (props) => {

    const closeAlert = () => {
        props.setState({alertMsg: '', alertSeverity: ''})
    }

    return(
        <div className={classNames(props.state.alertSeverity === "success" ? "rounded-md bg-green-50 p-4" : "rounded-md bg-red-50 p-4" )}>
            <div className="flex">
                <div className="flex-shrink-0">
                    { props.state.alertSeverity === 'success' ?
                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        :
                        <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    }
                </div>
                <div className="ml-3">
                        <p className={classNames(props.state.alertSeverity === "success" ? "text-sm font-medium text-green-800" : "text-sm font-medium text-red-800")}>
                            {props.state.alertMsg}
                        </p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            onClick={closeAlert}
                            className={classNames(props.state.alertSeverity === "success" ?
                                "inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                                :
                                "inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                            )}>
                            <span className="sr-only">Dismiss</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert