import { User, WalletType } from "./types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NEXT_PUBLIC_SEASON_2_CLAIM_LAUNCH_TIME, NEXT_PUBLIC_SEASON_2_LAUNCH_TIME, NEXT_PUBLIC_SEASON_2_TWITTER_LAUNCH_TIME } from "./config";
import { Address } from "viem";

export const eclipseAddress = (address: string): string => {
  return (
    address.substring(0, 6) +
    "..." +
    address.substring(address.length - 4, address.length)
  );
};

export const hex = "0x";

export const IS_SERVER = typeof window === "undefined";
export const IS_ETHEREUM_OBJECT_DETECTED = typeof window !== "undefined" && typeof window.ethereum !== "undefined";

export const walletType: WalletType = {
  "injected": "MetaMask",
  "metaMaskSDK": "MetaMaskSDK",
  "walletConnect": "WalletConnect",
  "coinbaseWallet": "Coinbase",
  "google": "Google",
  "facebook": "Facebook",
  "twitter": "Twitter",
  "discord": "Discord",
  "twitch": "Twitch",
  "github": "GitHub",
  "email_passwordless": "Email"
}

export const detectDevice = () => {
  if (IS_SERVER) {
    return { isIos: null, isAndroid: null, isMobile: null };
  }

  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMobile = isIos || isAndroid;

  return { isIos, isAndroid, isMobile };
}

export const path = {
  HOME: "/",
  ABOUT: "/about",
  LEADERBOARD: "/leaderboard",
  CLAIM: "/claim",
  BRIDGE: "https://console.fuse.io/bridge"
}

export const evmDecimals = 18;

export const screenWidth = {
  MEDIUM: 768,
  EXTRA_LARGE: 1200,
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTimestampToUTC(timestamp: string) {
  const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const monthName = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hour = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${day} ${monthName}, ${year} ${hour}:${minutes} UTC`;
}

export const daysInYear = 365;

export const defaultReferralCode = "FUSER";

export function isFloat(value: unknown) {
  return !Number.isInteger(value) && Number.isFinite(value);
}

export const currentDate = new Date();

export const season2LaunchDate = new Date(parseInt(NEXT_PUBLIC_SEASON_2_LAUNCH_TIME));
export const season2TwitterLaunchDate = new Date(parseInt(NEXT_PUBLIC_SEASON_2_TWITTER_LAUNCH_TIME));
export const season2ClaimLaunchDate = new Date(parseInt(NEXT_PUBLIC_SEASON_2_CLAIM_LAUNCH_TIME));

export const signUpSteps = {
  WALLET: 1,
  TWITTER: 2,
  TOTAL: 2,
  MANDATORY: currentDate >= season2TwitterLaunchDate ? 2 : 1
}

export const isVoltagePoolBannedUser = (walletAddress: Address) => {
  const bannedUsers = [
    "0x5788e790adb0913fd8e837a7c509cb05ea8141e4",
    "0xe3fe2a011bb0a9da4d50d94d49123a4872c27fd1",
    "0xd95d47e2f7723d463d585c774a3f020836b6dcf2",
    "0x3a210bb06469278aaa6ebd42b075b55295c754bb",
    "0xa73fc34a2260411e40306b8ad39394fe4e90944b"
  ]

  return bannedUsers.includes(walletAddress.toLowerCase());
}

export const isSignedUpOnSeason2LaunchDate = (userCreatedAt: Date) => {
  const launchDate = new Date(parseInt(NEXT_PUBLIC_SEASON_2_LAUNCH_TIME));

  userCreatedAt.setUTCHours(0, 0, 0, 0);
  launchDate.setUTCHours(0, 0, 0, 0);

  return userCreatedAt.getTime() === launchDate.getTime();
}

export const season1Tier = (points: number) => {
  if (points >= 1_000_000 && points <= 25_000_000) {
    return 1
  } else if (points >= 500_000 && points <= 999_999) {
    return 2
  } else if (points >= 100_000 && points <= 499_999) {
    return 3
  } else if (points >= 10_000 && points <= 99_999) {
    return 4
  } else if (points >= 1_000 && points <= 9_999) {
    return 5
  } else if (points >= 100 && points <= 999) {
    return 6
  } else if (points >= 51 && points <= 100) {
    return 7
  } else {
    return -1
  }
}

export const isEligibleToClaimSeason1Reward = (user: User): boolean => {
  if (isVoltagePoolBannedUser(user.walletAddress)) {
    return false;
  }

  if (isSignedUpOnSeason2LaunchDate(new Date(user.createdAt))) {
    return false;
  }

  if (season1Tier(user.seasonOnePoints) === -1) {
    return false
  }

  return true;
};
