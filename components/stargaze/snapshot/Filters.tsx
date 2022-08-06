import {ChangeEvent, FunctionComponent, useState} from "react";
import {Config, Owner, StateProps} from "../../../types/snapshotTypes";
import {defaultConfig} from "../../../pages/stargaze/snapshot";

const Filters: FunctionComponent<StateProps> = ({ state, setState }) => {

    const [min, setMin] = useState('')
    const [max, setMax] = useState('')

    const applyFilters = (uniqueOnly: boolean, minTokens: Number, maxTokens: Number) => {
        setState({ loading: true })
        let filteredOwners: Owner[] = []
        let config: Config = {
            uniqueOnly: uniqueOnly,
            tokenAmount: {
                min: Number.isNaN(minTokens) ? -1 : minTokens,
                max: Number.isNaN(maxTokens) ? -1 : maxTokens
            }
        }
        if(JSON.stringify(config) === JSON.stringify(defaultConfig)) {
            filteredOwners = state.owners
        } else {
            if(uniqueOnly) filteredOwners = state.uniqueHolders;
            if(config.tokenAmount.min !== -1 || config.tokenAmount.max !== -1) {
                let localMin: Number, localMax: Number;
                if(config.tokenAmount.min <= 0) localMin = 1
                else localMin = config.tokenAmount.min;
                if(config.tokenAmount.max <= 0) localMax = localMin
                else localMax = config.tokenAmount.max;
                if(filteredOwners.length === 0) {
                    filteredOwners = state.owners;
                }
                console.log(localMin + " - " + localMax)
                let newOwners: Owner[] = [];
                filteredOwners.forEach((owner: Owner) => {
                    let count = state.owners.reduce((acc, cur) => cur.address === owner.address ? ++acc : acc, 0)
                    if(count >= localMin && count <= localMax) newOwners.push(owner);
                })
                if(newOwners.length !== filteredOwners.length) filteredOwners = newOwners;
            }
        }
        setState({ ownersToExport: filteredOwners, currentPage: 1, pageOfOwners: filteredOwners.slice(0, 10), loading: false })
    }

    const handleUniqueFilter = (e: ChangeEvent<HTMLInputElement>) => {
        applyFilters(e.target.checked, parseInt(min), parseInt(max))
    }

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMin(e.target.value);
        if(max === '' || parseInt(e.target.value) > parseInt(max)) {
            setMax(e.target.value);
            applyFilters(state.config.uniqueOnly, parseInt(e.target.value), parseInt(e.target.value))
        } else {
            if(e.target.value === '') applyFilters(state.config.uniqueOnly, -1, parseInt(max))
            else applyFilters(state.config.uniqueOnly, parseInt(e.target.value), parseInt(max))
        }
    }

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMax(e.target.value);
        if(parseInt(e.target.value) < parseInt(min)) {
            setMin(e.target.value);
            applyFilters(state.config.uniqueOnly, parseInt(e.target.value), parseInt(e.target.value));
        } else {
            if(e.target.value === '') {
                applyFilters(state.config.uniqueOnly, -1, 1);
            }
            applyFilters(state.config.uniqueOnly, parseInt(min), parseInt(e.target.value));
        }
    }

    return (
        <div className="grid grid-cols-4 gap-4 mt-4 mb-2">
            <div className="flex -space-x-px col-span-2">
                <div className="w-1/2 flex-1 min-w-0">
                    <label htmlFor="min-tokens" className="sr-only">Min</label>
                    <input type="number" name="min-tokens" id="min-tokens" placeholder="Min" value={min} min={0}
                           onChange={(e) => handleMinChange(e)}
                           className="focus:ring-[#85f0ff] focus:border-[#85f0ff] relative block w-full bg-transparent focus:z-10 sm:text-sm border-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                    <label htmlFor="max-tokens" className="sr-only">Max</label>
                    <input type="number" name="max-tokens" id="max-tokens" value={max}
                           onChange={(e) => handleMaxChange(e)}
                           className="focus:ring-[#85f0ff] focus:border-[#85f0ff] relative block w-full bg-transparent focus:z-10 sm:text-sm border-gray-300"
                           placeholder="Max" />
                </div>
            </div>
            <div className="flex items-center col-span-2 ml-2">
                <input
                   className="focus:ring-0 text-[#85f0ff]" type="checkbox" id="group-by-owner"
                   onChange={(e) => handleUniqueFilter(e)}
                />
                <label htmlFor="group-by-owner" className="ml-2">
                    Unique only
                </label>
            </div>
        </div>
    )
}

export default Filters;