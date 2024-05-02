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

export interface CompletedQuest {
  type: string;
  stakingType?: string;
}

export type CompletedQuests = CompletedQuest[];

export interface User {
  id: string,
  walletAddress: string,
  twitterAccountId: string,
  points: number,
  referralCode: string,
  leaderboardPosition: number
  pointsLastUpdatedAt: string;
  completedQuests: CompletedQuests;
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
  id: string;
  title: string;
  heading?: string;
  point: string;
  description: string;
  image: string;
  isActive: boolean;
  completed: boolean;
  button: string;
  link?: string;
  isFunction?: boolean;
  isLoading?: boolean;
  padding?: string;
}

export type Quests = Quest[];
