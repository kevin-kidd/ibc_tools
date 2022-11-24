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
