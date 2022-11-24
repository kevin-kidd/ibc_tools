import type { FunctionComponent } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import type { StateProps } from "../../types/bot";
import { classNames } from "../../func/bot/helper";

const SelectCollection: FunctionComponent<StateProps> = (props) => {
  return (
    <div className="lg:col-span-3 lg:col-start-2 sm:row-span-1 z-0">
      <Listbox
        value={props.state.currentCollection}
        onChange={(e) => props.setState({ currentCollection: e })}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              Select a collection...
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="bg-white relative shadow-lg w-full border border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none hover:ring-1 hover:ring-lightgreen hover:border-1 hover:border-lightgreen sm:text-sm">
                <span className="block truncate">
                  {props.state.currentCollection.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="
                                    transition duration-200 ease-in-out delay-100 absolute z-10
                                    bg-[#fff] shadow-lg max-h-40 py-1 scrollbar scrollbar-thumb-yellow-200 scrollbar-track-gray-100
                                    mt-1 w-full text-base overflow-auto focus:outline-none sm:text-sm border border-[#000]"
                >
                  {props.state.collections.map((collection) => (
                    <Listbox.Option
                      key={collection.name}
                      className={({ active }) =>
                        classNames(
                          active ? "text-lightgreen" : "text-gray-900",
                          "cursor-pointer select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={collection}
                      disabled={collection.disabled}
                    >
                      <span
                        className={classNames(
                          collection.disabled ? "!text-[#64748b]" : ""
                        )}
                      >
                        <span
                          className={classNames(
                            props.state.currentCollection.name ===
                              collection.name
                              ? "text-lightgreen"
                              : "font-normal"
                          )}
                        >
                          {collection.name}
                        </span>
                      </span>
                      {props.state.currentCollection.name ===
                      collection.name ? (
                        <span className="text-lightgreen absolute inset-y-0 right-2 flex items-center pr-4">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default SelectCollection;
