import { WalletType } from "./types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const eclipseAddress = (address: string): string => {
  return (
    address.substring(0, 6) +
    "..." +
    address.substring(address.length - 4, address.length)
  );
};

export const hex = "0x";

export const IS_SERVER = typeof window === "undefined";

export const walletType: WalletType = {
  "injected": "MetaMask",
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

export const isIos = !IS_SERVER && /iPad|iPhone|iPod/.test(navigator.userAgent);

export const path = {
  HOME: "/",
  ABOUT: "/about",
  LEADERBOARD: "/leaderboard",
  BRIDGE: "https://console.fuse.io/bridge"
}

export const evmDecimals = 18;

export const signUpSteps = {
  WALLET: 1,
  TWITTER: 2,
  DISCORD: 3,
  TOTAL: 3,
  MANDATORY: 1
}

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
