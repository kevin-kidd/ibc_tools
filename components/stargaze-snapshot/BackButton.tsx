import {FunctionComponent} from "react";
import {StateProps} from "../../types/snapshotTypes";
import { ArrowLeftIcon } from "@heroicons/react/solid";


const BackButton: FunctionComponent<StateProps> = (props) => {

    const handleClick = () => {
        props.setState({owners: []})
    }

    return(
        <button type="button"
                onClick={handleClick}
                className="mt-6 align-middle text-black w-1/2 sm:w-1/4 font-extrabold inline-flex
                         border-[#1d1d1d] border yellow-button transition duration-200
                         text-md bg-[#fff985] px-4 py-1 mr-2 focus:outline-none"
        >
            <ArrowLeftIcon className="w-5 h-5 mr-2 pt-1" />
            Go Back
        </button>
    )
}

export default BackButton