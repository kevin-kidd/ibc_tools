import {FunctionComponent, useRef} from "react";
import {StateProps} from "../../types/snapshotTypes";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { CSVLink } from 'react-csv'
import { utils, writeFile } from "xlsx"


const ExportButton: FunctionComponent<StateProps> = (props) => {

    const csvLink = useRef()

    const exportXLSX = () => {
        let sheet = utils.json_to_sheet(props.state.owners)
        let wb = utils.book_new()
        utils.book_append_sheet(wb, sheet, 'Airdrop List')
        writeFile(wb, 'export.xlsx');
    }

    const exportCSV = () => {
        // @ts-ignore
        csvLink.current.link.click()
    }

    const exportJSON = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(props.state.owners)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "export.json";
        link.click();
    }

    return(
        <Menu as="div" className="relative inline-block text-left z-20">
            <CSVLink
                data={props.state.owners}
                filename='airdrop.csv'
                className='hidden'
                // @ts-ignore
                ref={csvLink}
                target='_blank'
            />
            <div>
                <Menu.Button className="inline-flex justify-center w-full border border-gray-300 shadow-sm px-4 py-2 bg-[#feef89] text-sm font-medium text-gray-700 focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-[#85ff89]">
                    <ChevronDownIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Export
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-1 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            <a
                                onClick={exportXLSX}
                                className='group flex items-center px-4 py-2 text-sm hover:text-[#85ff89] hover:cursor-pointer'
                            >
                                XLSX
                            </a>
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            <a
                                onClick={exportCSV}
                                className='group flex items-center px-4 py-2 text-sm  hover:text-[#85ff89] hover:cursor-pointer'
                            >
                                CSV
                            </a>
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            <a
                                onClick={exportJSON}
                                className='group flex items-center px-4 py-2 text-sm  hover:text-[#85ff89] hover:cursor-pointer'
                            >
                                JSON
                            </a>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ExportButton