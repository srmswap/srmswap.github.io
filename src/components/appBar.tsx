import React from "react";
import { Button, Menu, Popover } from "antd";
import { useWallet } from "../utils/wallet";
import { AccountInfo } from "./accountInfo";
import { Link, useHistory, useLocation } from "react-router-dom";

export const AppBar = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { connected, wallet } = useWallet();
  const location = useLocation();
  const history = useHistory();

  const TopBar = (
    <div className="App-Bar">
      <div className="App-Bar-left">
        <div className="App-logo" />
        <Menu mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link
              to={{
                pathname: "/",
              }}
            >
              SRMSwap
            </Link>
          </Menu.Item>
          <Menu.Item key="/info">
            <Link
              to={{
                pathname: "/info",
              }}
            >
              图表
            </Link>
          </Menu.Item>
          <Menu.Item key="trade">
            <a
              href={"https://dex.projectserum.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              交易
              <sup>↗</sup>
            </a>
          </Menu.Item>
          <Menu.Item key="help">
            <a
              href={"https://serum-academy.com/en/serum-swap/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              帮助
              <sup>↗</sup>
            </a>
          </Menu.Item>
        </Menu>
        {props.left}
      </div>
      <div className="App-Bar-right">
        <AccountInfo />
        {connected && (
          <Button
            type="text"
            size="large"
            onClick={() => history.push({ pathname: "/pool" })}
          >
            我的做市
          </Button>
        )}
        <div>
          {!connected && (
            <Button
              type="text"
              size="large"
              onClick={connected ? wallet.disconnect : wallet.connect}
              style={{ color: "#2abdd2" }}
            >
              连接钱包
            </Button>
          )}
          {connected && (
            <Popover
              placement="bottomRight"
              title="Wallet public key"
              trigger="click"
            ></Popover>
          )}
        </div>
        {props.right}
      </div>
    </div>
  );

  return TopBar;
};
