import { Dispatch } from "react";

export type MantleClaimState = {
  alertMsg: string;
  alertSeverity: string;
  walletAddress?: string;
  connected: boolean;
};

export type StateProps = {
  setState: Dispatch<Partial<MantleClaimState>>;
  state: MantleClaimState;
};

export type Bounty = {
  createdAt: string;
  updatedAt: string;
  status?: string;
  _id: string;
  startUrl?: string;
  quests: Array<{
    chainId: string;
    condition: string;
    createdAt: string;
    updatedAt: string;
    expectedResponse: string;
    type: string;
    _id: string;
  }>;
  rewards: Array<{
    amount: string;
    chainId: string;
    denom: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
  }>;
};

export type Program = {
  _id: string;
  name: string;
  bounties: Bounty[];
  createdAt: Date;
  updatedAt: Date;
};
