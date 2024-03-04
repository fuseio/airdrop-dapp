import { Address } from "viem";

export type MenuItem = {
  title: string;
  link: string;
}

export type MenuItems = MenuItem[];

export type WalletType = {
  [k: string]: string;
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
  points: number,
  referralCode: string,
  leaderboardPosition: number
}

export interface LeaderboardUser {
  id: string;
  walletAddress: string;
  twitterAccountId: string;
  points: number;
  referralCode: string;
}

export type LeaderboardUsers = LeaderboardUser[];

export interface Leaderboard {
  users: LeaderboardUser[];
}

export type SignupStepCompleted = {
  [key: number]: boolean;
}

export type EcosystemApp = {
  name: string;
  description: string;
  image: string;
  background: string;
}

export type EcosystemApps = EcosystemApp[];
