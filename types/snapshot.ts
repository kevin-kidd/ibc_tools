import {Dispatch} from "react";

export type Owner = {
    token_id: string
    address: any
}

export type Config = {
    uniqueOnly: boolean
    tokenAmount: {
        min: Number
        max: Number
    }
}

export type SnapshotState = {
    loading: boolean
    alertMsg?: string
    alertSeverity?: string
    address: string
    name?: string
    numTokens?: string
    uniqueHolders: Owner[]
    owners: Owner[]
    config: Config
    ownersToExport: Owner[]
    currentPage: number
    pageOfOwners: Owner[]
}

export type StateProps = {
    setState: Dispatch<Partial<SnapshotState>>
    state: SnapshotState
}