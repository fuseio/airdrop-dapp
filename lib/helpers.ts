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
  "github": "GitHub"
}

export const isIos = !IS_SERVER && /iPad|iPhone|iPod/.test(navigator.userAgent);

export const path = {
  HOME: "/",
  ABOUT: "/about",
  BRIDGE: "https://console.fuse.io/bridge"
}

export const evmDecimals = 18;

export const exampleTwitterAccountId = "exampleTwitterAccountId";

export const signUpSteps = {
  WALLET: 1,
  TWITTER: 2,
  DISCORD: 3,
  TOTAL: 3,
  MANDATORY: 1
}

export const screenMediumWidth = 768;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
