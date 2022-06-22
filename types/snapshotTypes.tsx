import {Dispatch} from "react";

export interface Owners {
    token_id: string
    address: any
}

export interface SnapshotState {
    loading: boolean
    alertMsg: string
    alertSeverity: string
    address: string
    name: string
    numTokens: string
    uniqueHolders: string
    owners: Owners[]
    currentPage: number
    currentOwners: Owners[]
}

export interface StateProps {
    setState: Dispatch<Partial<SnapshotState>>
    state: SnapshotState
}
