import { Address } from "viem";

export type MenuItem = {
  title: string;
  link: string;
}

export type MenuItems = MenuItem[];

export type WalletType = {
  [k: string]: string;
}

export interface SignData {
  message: string;
  signature: string;
  eoaAddress: Address;
}

export type CreateUser = {
  walletAddress: Address,
  twitterAccountId: string,
  referralCode: string
}

export interface User {
  id: string,
  walletAddress: string,
  twitterAccountId: string,
  points: string,
  referralCode: string
}
