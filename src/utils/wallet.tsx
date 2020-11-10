import React, { useContext, useEffect, useMemo, useState } from "react";
import Wallet from "@project-serum/sol-wallet-adapter";
import { notify } from "./notifications";
import { useConnectionConfig } from "./connection";
import { useLocalStorageState } from "./utils";

export const WALLET_PROVIDERS = [
  { name: "sollet.io", url: "https://www.sollet.io" },
  { name: "solflare.com", url: "https://solflare.com/access-wallet" },
];

const WalletContext = React.createContext<any>(null);

export function WalletProvider({ children = null as any }) {
  const { endpoint } = useConnectionConfig();
  const [providerUrl, setProviderUrl] = useLocalStorageState(
    "walletProvider",
    "https://www.sollet.io"
  );
  const wallet = useMemo(() => new Wallet(providerUrl, endpoint), [
    providerUrl,
    endpoint,
  ]);

  const [connected, setConnected] = useState(false);
  useEffect(() => {
    console.log("正在连接您的钱包...");
    wallet.on("connect", () => {
      console.log("已连接");
      setConnected(true);
      let walletPublicKey = wallet.publicKey.toBase58();
      let keyToDisplay =
        walletPublicKey.length > 20
          ? `${walletPublicKey.substring(0, 7)}.....${walletPublicKey.substring(
              walletPublicKey.length - 7,
              walletPublicKey.length
            )}`
          : walletPublicKey;

      notify({
        message: "钱包更新",
        description: "已连接到钱包： " + keyToDisplay,
      });
    });
    wallet.on("disconnect", () => {
      setConnected(false);
      notify({
        message: "钱包更新",
        description: "已断开钱包连接",
      });
    });
    return () => {
      wallet.disconnect();
      setConnected(false);
    };
  }, [wallet]);
  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        providerUrl,
        setProviderUrl,
        providerName:
          WALLET_PROVIDERS.find(({ url }) => url === providerUrl)?.name ??
          providerUrl,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  return {
    connected: context.connected,
    wallet: context.wallet,
    providerUrl: context.providerUrl,
    setProvider: context.setProviderUrl,
    providerName: context.providerName,
  };
}
