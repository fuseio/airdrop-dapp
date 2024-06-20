"use client";

import { useEffect, useState } from "react";
import store from "@/store/store";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";
import * as amplitude from '@amplitude/analytics-browser';
import { YMInitializer } from "react-yandex-metrika";
import {
  NEXT_PUBLIC_AMPLITUDE_API_KEY,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_YANDEX_METRICA_ID
} from "@/lib/config";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/web3Auth";
import WalletModal from "./WalletModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QuestModal from "./home/QuestModal";
import SwitchChainModal from "./SwitchChainModal";
import EcosystemAppModal from "./home/EcosystemAppModal";
import Init from "./Init";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    setIsClient(true);
  }, [])

  useEffect(() => {
    if(isClient) {
      ReactGA.initialize(NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string);
      amplitude.init(NEXT_PUBLIC_AMPLITUDE_API_KEY as string);
    }
  }, [isClient])

  if (!isClient) {
    return null;
  }

  return (
    <Provider store={store}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <YMInitializer
            accounts={[parseInt(NEXT_PUBLIC_YANDEX_METRICA_ID)]}
            options={{
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            }}
          />
          <Init />
          <WalletModal />
          <SwitchChainModal />
          <QuestModal />
          <EcosystemAppModal />
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  )
}
