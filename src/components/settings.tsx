import React from "react";
import { Select } from "antd";
import { ENDPOINTS, useConnectionConfig } from "../utils/connection";
import { useWallet, WALLET_PROVIDERS } from "../utils/wallet";
import { Slippage } from "./slippage";

export const Settings = () => {
  const { providerUrl, setProvider } = useWallet();
  const { endpoint, setEndpoint } = useConnectionConfig();

  return (
    <>
      <div>
        交易设置:
        <div>
          滑点:
          <Slippage />
        </div>
      </div>
      <div style={{ display: "grid" }}>
        网络:{" "}
        <Select
          onSelect={setEndpoint}
          value={endpoint}
          style={{ marginRight: 8 }}
        >
          {ENDPOINTS.map(({ name, endpoint }) => (
            <Select.Option value={endpoint} key={endpoint}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ display: "grid" }}>
        钱包:{" "}
        <Select onSelect={setProvider} value={providerUrl}>
          {WALLET_PROVIDERS.map(({ name, url }) => (
            <Select.Option value={url} key={url}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </>
  );
};
