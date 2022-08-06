import {FunctionComponent} from "react";
import {StateProps} from "../../../types/snapshotTypes";
import BackButton from "./BackButton"

const CollectionCard: FunctionComponent<StateProps> = ({ state, setState }) => {
        return (
            <>
                <div className="max-w-7xl mx-auto main-card
                    lg:w-[50%] md:w-[60%] sm:w-3/4 w-5/6
                    md:mt-20 lg:mt-10 sm:mt-8 mt-20 h-full">
                    <div className="flex justify-center flex-col relative py-8 px-8">
                        <p className="text-xl truncate">{state.name}</p>
                        <p className="mt-2 text-lg truncate">Total NFTs: {state.numTokens}</p>
                        <p className="mt-2 text-lg truncate">Unique Holders: {state.uniqueHolders.length}</p>
                        <p className="mt-2 text-sm truncate">{state.address}</p>
                        <BackButton state={state} setState={setState} />
                    </div>
                </div>
            </>
        )
}

export default CollectionCard