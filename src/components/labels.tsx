import { CurrencyContextState } from "../utils/currencyPair";
import { getTokenName, KnownTokenMap, getPoolName } from "../utils/utils";
import { PoolInfo } from "../models";

export const CREATE_POOL_LABEL = "创建流动性池";
export const INSUFFICIENT_FUNDS_LABEL = (tokenName: string) =>
  `您的 ${tokenName} 余额不足`;
export const POOL_NOT_AVAILABLE = (tokenA: string, tokenB: string) =>
  `当前 ${tokenA}/${tokenB} 暂无人做市`;
export const ADD_LIQUIDITY_LABEL = "做市";
export const SWAP_LABEL = "兑换";
export const CONNECT_LABEL = "连接钱包";
export const SELECT_TOKEN_LABEL = "选择代币";
export const ENTER_AMOUNT_LABEL = "在上面输入数量";
export const REMOVE_LIQUIDITY_LABEL = "取回";

export const generateActionLabel = (
  action: string,
  connected: boolean,
  tokenMap: KnownTokenMap,
  A: CurrencyContextState,
  B: CurrencyContextState,
  ignoreToBalance: boolean = false
) => {
  return !connected
    ? CONNECT_LABEL
    : !A.mintAddress
    ? SELECT_TOKEN_LABEL
    : !A.amount
    ? ENTER_AMOUNT_LABEL
    : !B.mintAddress
    ? SELECT_TOKEN_LABEL
    : !B.amount
    ? ENTER_AMOUNT_LABEL
    : !A.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, A.mintAddress))
    : ignoreToBalance || B.sufficientBalance()
    ? action
    : INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, B.mintAddress));
};

export const generateRemoveLabel = (
  connected: boolean,
  amount: number,
  pool: PoolInfo,
  tokenMap: KnownTokenMap,
  hasSufficientBalance: boolean,
  ignoreToBalance: boolean = false
) => {
  return !connected
    ? CONNECT_LABEL
    : !amount
    ? ENTER_AMOUNT_LABEL
    : !hasSufficientBalance
    ? INSUFFICIENT_FUNDS_LABEL(getPoolName(tokenMap, pool))
    : REMOVE_LIQUIDITY_LABEL;
};
