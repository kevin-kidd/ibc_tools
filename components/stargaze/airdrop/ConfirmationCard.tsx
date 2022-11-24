import type { FunctionComponent } from "react";
import type { StateProps } from "../../../types/airdrop";

const ConfirmationCard: FunctionComponent<StateProps> = ({
  state,
  setState,
}) => {
  return (
    <div className="mx-auto main-card w-full pt-10 px-4">
      <div className="flex justify-center flex-col px-4">
        <p className="text-xl truncate">Collection Details</p>
        <p className="mt-2 text-md truncate">Name: {state.name}</p>
        <p className="mt-2 text-md truncate">
          Total NFTs (minted): {state.numTokens}
        </p>
        <p className="mt-2 text-sm truncate">{state.minterAddress}</p>
      </div>
      <div className="m-4 border-[#d4d1ce] border" />
      <div className="flex justify-center mt-2">
        <p>{`You are about to airdrop
                    ${state.airdropList.length}
                    tokens to
                    ${
                      state.uniqueAmount === undefined
                        ? "?"
                        : state.uniqueAmount.toString()
                    }
                    unique addresses.`}</p>
      </div>
      <p className="flex justify-center font-bold mt-2 text-red-400">
        Warning: This process can not be reverted. Continue at your own risk.
      </p>
      <div className="m-4 border-[#d4d1ce] border" />
      <p className="flex justify-center mt-4">
        Are you sure you want to continue?
      </p>
      <div className="flex justify-center w-full gap-x-6 mt-4">
        <button
          disabled={state.currentStep >= 4}
          onClick={() => setState({ currentStep: 4 })}
          className="py-2 px-4 bg-lightgreen text-[#1D1D1D] border-[#1d1d1d] border transition duration-200 focus:outline-none button-dropshadow"
        >
          Yes
        </button>
        <button
          className="py-2 px-5 bg-red-400 text-[#1D1D1D] border-[#1d1d1d] border transition duration-200 focus:outline-none button-dropshadow"
          onClick={() => setState({ currentStep: 1 })}
        >
          No
        </button>
      </div>
      <div className="flex justify-end items-end mt-8">
        <p className="text-[#686765] text-lg mb-2 mr-2">Step 3</p>
      </div>
    </div>
  );
};

export default ConfirmationCard;
