import {Dispatch} from "react";

export interface Contract {
    address: string,
    hash: string
}

export interface Network {
    id: number,
    name: string,
    disabled: boolean
}

export interface PageProps {
    collections: Collection[]
    networks: Network[]
}

export interface Collection {
    id: number,
    name: string,
    disabled: boolean
    contract: Contract
}

export interface BotState {
    loading: boolean
    alertMsg: string
    alertSeverity: string
    discord: string
    collections: Collection[]
    networks: Network[]
    currentNetwork: Network
    currentCollection: Collection
}

export interface StateProps {
    setState: Dispatch<Partial<BotState>>
    state: BotState
}
