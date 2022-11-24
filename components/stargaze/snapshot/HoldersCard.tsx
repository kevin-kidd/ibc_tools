import type { FunctionComponent } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import type { StateProps } from "../../../types/snapshot";
import Filters from "./Filters";
import ExportButton from "./ExportButton";

const HoldersCard: FunctionComponent<StateProps> = ({ state, setState }) => {
  return (
    <div
      className="
            max-w-7xl mx-auto main-card
            lg:w-[50%] md:w-[60%] sm:w-3/4 w-5/6
            md:mb-14 mt-14 h-full
        "
    >
      <div className="flex justify-center flex-col relative pt-5 pb-2">
        <div className="px-4 sm:px-6 lg:px-8 pb-2 w-full h-full">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Holders</h1>
              <p className="mt-2 text-sm text-gray-700">
                The owner of each NFT in{" "}
                <strong className="font-semibold text-gray-900 text-clip">
                  {state.name}
                </strong>{" "}
                is listed below. Export to XLSX or CSV for your convenience.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <ExportButton setState={setState} state={state} />
            </div>
          </div>
          <Filters setState={setState} state={state} />
          <Table setState={setState} state={state} />
          <Pagination setState={setState} state={state} />
        </div>
      </div>
    </div>
  );
};

export default HoldersCard;
