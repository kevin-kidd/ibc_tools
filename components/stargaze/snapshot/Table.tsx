import type { FunctionComponent } from "react";
import type { StateProps } from "../../../types/snapshot";

const Table: FunctionComponent<StateProps> = (props) => {
  return (
    <div className="w-full h-fit">
      <div className="ring-1 ring-gray-300 md:mx-0 overflow-hidden w-full h-80 scrollbar scrollbar-thumb-yellow-200 scrollbar-track-gray-100">
        <table className="min-w-full">
          <thead className="border-b border-gray-300 bg-white">
            <tr>
              <th
                scope="col"
                className="border-b border-gray-300 border-r py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
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
            {props.state.pageOfOwners.map((owner) => (
              <tr key={owner.token_id}>
                <td className="relative py-4 pl-4 sm:pl-6 pr-3 text-sm border-b border-gray-300 border-r">
                  <div className="font-medium text-gray-900">
                    {owner.token_id}
                  </div>
                </td>
                <td className="relative py-4 pl-4 pr-3 text-sm border-b border-gray-300 border-r">
                  <div className="font-medium text-gray-900 text-ellipsis overflow-hidden">
                    <p className="truncate overflow-hidden">{owner.address}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
