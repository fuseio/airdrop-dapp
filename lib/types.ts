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
  referralCode: string
}

export interface User {
  id: string,
  walletAddress: string,
  twitterAccountId: string,
  points: number,
  referralCode: string,
  leaderboardPosition: number
  pointsLastUpdatedAt: string;
  walletAgeInDays?: number;
}

export interface LeaderboardUser {
  id: string;
  walletAddress: string;
  twitterAccountId: string;
  points: number;
  referralCode: string;
  walletAgeInDays?: number;
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

export type Quest = {
  id: number;
  title: string;
  point: string;
  description: string;
  image: string;
  isActive: boolean;
  button: string;
  onClick: () => void;
  isLoading: boolean;
  completed: boolean;
}

export type Quests = Quest[];
