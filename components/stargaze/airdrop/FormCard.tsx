import type { FunctionComponent } from "react";
import type { StateProps } from "../../../types/airdrop";
import Form from "./Form";

const InventoryToggle: FunctionComponent<StateProps> = ({
  state,
  setState,
}) => {
  if (state.airdropType === "mint_for") {
    return (
      <div className="flex justify-center items-center ml-4">
        <label
          htmlFor="inventory-toggle"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            value=""
            onChange={(e) => setState({ dropFromInv: e.target.checked })}
            id="inventory-toggle"
            className="sr-only peer"
            checked={state.dropFromInv}
            disabled={state.currentStep > 2}
          />
          <div
            className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-checked:after:translate-x-full after:w-5
            peer-checked:after:border-white after:absolute after:top-0.5 after:left-[2px] after:bg-white after:h-5
            after:border-gray-300 after:border after:transition-all dark:border-gray-600 peer-checked:bg-lightblue"
          ></div>
          <span className="ml-3 text-sm md:text-base font-bold text-[#686765]">
            Drop from {state.dropFromInv ? "inventory" : "contract"}
          </span>
        </label>
      </div>
    );
  }
  return <></>;
};

const NetworkToggle: FunctionComponent<StateProps> = ({ state, setState }) => {
  return (
    <div className="flex justify-center items-center">
      <label
        htmlFor="network-toggle"
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          value=""
          onChange={(e) => setState({ mainnet: e.target.checked })}
          id="network-toggle"
          className="sr-only peer"
          checked={state.mainnet}
          disabled={state.currentStep > 2}
        />
        <div
          className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-checked:after:translate-x-full after:w-5
            peer-checked:after:border-white after:absolute after:top-0.5 after:left-[2px] after:bg-white after:h-5
            after:border-gray-300 after:border after:transition-all dark:border-gray-600 peer-checked:bg-lightblue"
        ></div>
        <span className="ml-3 text-sm md:text-base font-bold text-[#686765]">
          {state.mainnet ? "Mainnet" : "Testnet"}
        </span>
      </label>
    </div>
  );
};

const FormCard: FunctionComponent<StateProps> = ({ state, setState }) => {
  return (
    <div className="mx-auto main-card w-full pt-16">
      <div className="flex flex-row justify-center pb-6 ml-2">
        <p>
          Enter the
          <a
            target="_blank"
            rel="noreferrer"
            className="hover:text-lightgreen text-black transition duration-150 font-bold"
            href="https://docs.stargaze.zone/guides/readme/5.-instantiate-minter-contract-on-testnet"
          >
            {" "}
            contract address{" "}
          </a>
          of the collection you want to airdrop.
        </p>
      </div>
      <Form state={state} setState={setState} />
      <div className="flex justify-between items-end mt-8 px-2 pb-2">
        <div className="inline-flex">
          <NetworkToggle setState={setState} state={state} />
          <InventoryToggle setState={setState} state={state} />
        </div>
        <p className="text-[#686765] text-lg">Step 2</p>
      </div>
    </div>
  );
};

export default FormCard;
