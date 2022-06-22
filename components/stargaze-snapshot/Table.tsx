import {FunctionComponent} from "react";
import {StateProps} from "../../types/snapshotTypes";
import ExportButton from "./ExportButton"

const Table: FunctionComponent<StateProps> = (props) => {

    return(
        <div className="px-4 sm:px-6 lg:px-8 pb-2 w-full h-full">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Holders</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        The owner of each NFT in <strong className="font-semibold text-gray-900 text-clip">{props.state.name}</strong> is listed below.
                        Export to XLSX or CSV for your convenience.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <ExportButton setState={props.setState} state={props.state} />
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    className="inline-flex items-center justify-center border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"*/}
                    {/*>*/}
                    {/*    Export*/}
                    {/*</button>*/}
                </div>
            </div>
            <div className="mt-6 ring-1 ring-gray-300 md:mx-0 overflow-hidden w-full h-80 scrollbar scrollbar-thumb-yellow-200 scrollbar-track-gray-100">
                <table className="min-w-full">
                    <thead className="border-b border-gray-300 bg-white">
                    <tr>
                        <th scope="col" className="border-b border-gray-300 border-r py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Token ID
                        </th>
                        <th
                            scope="col"
                            className="border-b border-gray-300 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                            Owner
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.state.currentOwners.map((owner) => (
                        <tr key={owner.token_id}>
                            <td
                                className='relative py-4 pl-4 sm:pl-6 pr-3 text-sm border-b border-gray-300 border-r'
                            >
                                <div className="font-medium text-gray-900">
                                    {owner.token_id}
                                </div>
                            </td>
                            <td
                                className='relative py-4 pl-4 pr-3 text-sm border-b border-gray-300 border-r'
                            >
                                <div className="font-medium text-gray-900 text-ellipsis overflow-hidden">
                                    <p className="truncate overflow-hidden">
                                        {owner.address}
                                    </p>

                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table