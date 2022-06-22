import { StateProps } from "../../types/snapshotTypes";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {FunctionComponent} from "react";


const Pagination: FunctionComponent<StateProps> = (props) => {

    const handlePage = (forward: boolean) => {
        let current: number
        if(props.state.currentPage === 2 && !forward || props.state.currentPage === 1 && forward){
            current = 10
        } else if(props.state.currentPage === Math.ceil(props.state.owners.length / 10) && !forward) {
            current = Math.floor(props.state.owners.length / 10) * 10
        } else {
            current = props.state.currentPage * 10
        }

        if(forward) {
            props.setState({currentOwners: props.state.owners.slice(current, current + 10), currentPage: props.state.currentPage + 1})
        } else {
            props.setState({currentOwners: props.state.owners.slice(current - 10, current), currentPage: props.state.currentPage - 1})
        }
    }

    return(
        <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => handlePage(false)}
                    disabled={props.state.currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    disabled={props.state.currentPage === Math.ceil(Number(props.state.owners.length) / 10)}
                    onClick={() => handlePage(true)}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium"> {(props.state.currentPage * 10) - 9} </span>
                        to
                        <span className="font-medium"> {(props.state.currentPage * 10 <= props.state.owners.length ? props.state.currentPage * 10 : props.state.owners.length)} </span>
                        of
                        <span className="font-medium"> {props.state.owners.length} </span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex shadow-lg -space-x-px" aria-label="Pagination">
                        <button
                            disabled={props.state.currentPage === 1}
                            onClick={() => handlePage(false)}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            aria-current="page"
                            className="z-10 bg-slate-50 border-[#85ff89] text-[#85effe] relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                            {props.state.currentPage}
                        </button>
                        <button
                            disabled={props.state.currentPage === Math.ceil(Number(props.state.owners.length) / 10)}
                            onClick={() => handlePage(true)}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination