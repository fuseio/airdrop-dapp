import { WalletType } from "./types";

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

export const signDataMessage = 'Verify your wallet ownership to create an account';

export const path = {
  HOME: "/",
  ABOUT: "/about",
  BRIDGE: "https://console.fuse.io/bridge"
}

export const evmDecimals = 18;

export const exampleTwitterAccountId = "exampleTwitterAccountId";

export const TOTAL_STEPS = 4;

export const MANDATORY_STEP_POSITION = 2;

