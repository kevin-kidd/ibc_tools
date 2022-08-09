import {Dispatch} from "react";

export type Recipient = {
    token_id?: Number,
    address: string
}

export type AirdropState = {
    airdropList: Recipient[]
    alertMsg: string
    dropFromInv: boolean
    loading: boolean
    alertSeverity: string
    minterAddress: string
    sg721Address: string
    airdropType?: string
    name?: string
    mainnet: boolean
    numTokens?: string
    indexOfAddress: Number
    currentStep: Number
    uniqueAmount?: Number
}

export type StateProps = {
    setState: Dispatch<Partial<AirdropState>>
    state: AirdropState
}