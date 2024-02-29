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
  referralCode: string,
  leaderboardPosition: string
}

export interface LeaderboardUser {
  id: string;
  walletAddress: string;
  twitterAccountId: string;
  points: string;
  referralCode: string;
}

export type LeaderboardUsers = LeaderboardUser[];

export interface Leaderboard {
  users: LeaderboardUser[];
}

export type SignupStepCompleted = {
  [key: number]: boolean;
}
