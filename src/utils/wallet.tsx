import React, { useContext, useEffect, useMemo, useState } from "react";
import Wallet from "@project-serum/sol-wallet-adapter";
import { notify } from "./notifications";
import { useConnectionConfig } from "./connection";
import { useLocalStorageState } from "./utils";
import {SolongAdapter} from "./solong_adapter";

export const WALLET_PROVIDERS = [
  { name: "sollet.io", url: "https://www.sollet.io" },
  { name: "solongwallet.com", url: "http://solongwallet.com" },
  { name: "solflare.com", url: "https://solflare.com/access-wallet" },
];

const WalletContext = React.createContext<any>(null);

export function WalletProvider({ children = null as any }) {
  const { endpoint } = useConnectionConfig();
  const [providerUrl, setProviderUrl] = useLocalStorageState(
    "walletProvider",
    "https://www.sollet.io"
  );
  
  const wallet = useMemo(() => {
    console.log("use new provider:", providerUrl, " endpoint:", endpoint)
    if (providerUrl==="http://solongwallet.com")  {
      return new SolongAdapter(providerUrl, endpoint);
    } else {
      return new Wallet(providerUrl, endpoint)
    }}, [
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
        message: "钱包状态",
        description: "已连接到钱包： " + keyToDisplay,
      });
    });
    wallet.on("disconnect", () => {
      setConnected(false);
      notify({
        message: "钱包状态",
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
