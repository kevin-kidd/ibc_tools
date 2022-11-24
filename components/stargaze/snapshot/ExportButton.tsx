import type { FunctionComponent } from "react";
import { Fragment, useRef } from "react";
import type { StateProps } from "../../../types/snapshot";
import { utils, writeFile } from "xlsx";
import { Menu, Transition } from "@headlessui/react";
import { CSVLink } from "react-csv";
import { ChevronDownIcon } from "@heroicons/react/solid";

const ExportButton: FunctionComponent<StateProps> = (props) => {
  const csvLink = useRef<any>();

  const exportXLSX = () => {
    const sheet = utils.json_to_sheet(props.state.ownersToExport);
    const wb = utils.book_new();
    utils.book_append_sheet(
      wb,
      sheet,
      `Snapshot - ${new Date().toDateString()}`
    );
    writeFile(wb, "snapshot.xlsx");
  };

  const exportCSV = () => {
    if (csvLink.current) csvLink.current.link.click;
  };

  const exportJSON = () => {
    const exportData =
      props.state.ownersToExport.length === 0
        ? props.state.ownersToExport
        : props.state.ownersToExport;
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(exportData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "snapshot.json";
    link.click();
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-20">
      <CSVLink
        ref={csvLink}
        data={props.state.ownersToExport}
        filename="snapshot.csv"
        className="hidden"
        target="_blank"
      />
      <div>
        <Menu.Button
          className="justify-center w-full font-extrabold inline-flex border-[#1d1d1d] border button-dropshadow 
            transition duration-200 text-md bg-lightyellow px-4 py-1 mr-2 focus:outline-none"
        >
          <ChevronDownIcon
            className="-ml-1 mr-2 mt-0.5 h-5 w-5"
            aria-hidden="true"
          />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-1 w-full shadow-lg bg-white ring-1 border border-black ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <a
                onClick={exportXLSX}
                className="group flex items-center px-4 py-2 text-sm hover:text-lightgreen hover:cursor-pointer"
              >
                XLSX
              </a>
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              <a
                onClick={exportCSV}
                className="group flex items-center px-4 py-2 text-sm  hover:text-lightgreen hover:cursor-pointer"
              >
                CSV
              </a>
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              <a
                onClick={exportJSON}
                className="group flex items-center px-4 py-2 text-sm  hover:text-lightgreen hover:cursor-pointer"
              >
                JSON
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ExportButton;
