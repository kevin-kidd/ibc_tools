import {Fragment, FunctionComponent} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {SelectorIcon} from "@heroicons/react/solid";
import { StateProps } from '../../types/botTypes'
import networks from '../../data/networks.json'
import { classNames } from "../../func/bot/helper"

const SelectNetwork: FunctionComponent<StateProps> = (props) => {
    return(
        <div className="w-full lg:grid lg:grid-cols-4
                lg:px-0 md:px-12 sm:px-6 px-4 lg:-mt-10 mb-20">
            <Listbox value={props.state.network} onChange={(e) => props.setState({ network: e })}>
                {({ open }) => (
                    <div className="col-span-2 col-start-2">
                        <Listbox.Label className="block text-sm font-medium text-gray-700">Select a network...</Listbox.Label>
                        <div className="mt-1 relative">
                            <Listbox.Button className="bg-white relative shadow-lg w-full border border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none hover:ring-1 hover:ring-[#85ff89] hover:border-1 hover:border-[#85ff89] sm:text-sm">
                                <span className="block truncate">{props.state.network.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="
                                    transition duration-200 ease-in-out delay-100
                                    bg-[#fff] shadow-lg max-h-40 py-1 scrollbar scrollbar-thumb-yellow-200 scrollbar-track-gray-100
                                    mt-1 w-full absolute text-base overflow-auto focus:outline-none sm:text-sm border border-[#000]"
                                >
                                    {networks.map((network) => (
                                        <Listbox.Option
                                            key={network.id}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'text-[#85ff89]' : 'text-gray-900',
                                                    'cursor-pointer select-none relative py-2 pl-3 pr-9 group'
                                                )
                                            }
                                            value={network}
                                            disabled={network.disabled}
                                        >
                                            <span className={classNames(network.disabled ? 'text-[#64748b]' : 'text-black group-hover:text-[#85ff89]')}>
                                              {network.name}
                                            </span>
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </div>
                )}
            </Listbox>
        </div>
    )
}

export default SelectNetwork