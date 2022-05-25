import { Contract, WalletConnection } from "near-api-js";

// contract interface
interface MyContract extends Contract {
  getVote(value: { accountId: string }): string | null;
  getIsUserParticipated(value: { accountId: string }): boolean;
  getVotes():  Map<string, string> | null ;
  vote(value: { option: string }): void;
}

declare global {
  interface Window {
    walletConnection: WalletConnection;
    accountId: string;
    contract: MyContract;
    nearInitPromise: Promise<void>;
  }
}
