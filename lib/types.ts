import { StaticImageData } from "next/image";
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
  nextRewardDistributionTime: string;
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
  image: string | StaticImageData;
  background: string;
  beforeBackground: string;
  quests: Quests;
}

export type EcosystemApps = EcosystemApp[];

export type Quest = {
  id: string;
  title: string;
  image?: string | StaticImageData;
  heading?: string;
  point?: string;
  description?: string;
  isActive?: boolean;
  completed?: boolean;
  button?: string;
  link?: string;
  isFunction?: boolean;
  isLoading?: boolean;
  buttonTwo?: string;
  linkTwo?: string;
  isFunctionTwo?: boolean;
  isLoadingTwo?: boolean;
  padding?: string;
  imageHeight?: string;
  accumulatedPoints?: number;
}

export type Quests = Quest[];
