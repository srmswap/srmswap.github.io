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
        
        <Menu mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link
              to={{
                pathname: "/",
              }}
            >
              兑换
            </Link>
          </Menu.Item>
          <Menu.Item key="/add">
            <Link
              to={{
                pathname: "/add",
              }}
            >
              做市
            </Link>
          </Menu.Item>
          <Menu.Item key="/info">
            <Link
              to={{
                pathname: "/info",
              }}
            >
              统计
            </Link>
          </Menu.Item>
        </Menu>
        {props.left}
      </div>
      <div><p></p></div>
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
