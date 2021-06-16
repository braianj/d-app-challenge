import { HexBase64BinaryEncoding } from "crypto";

export interface reducerWalletConnectionInterface {
    hasError: boolean,
    isConnecting: boolean,
    isConnected: boolean
};

export interface reducerWalletConnectionActionInterface {
    type: string
};

export interface connectWalletRespInterface {
    account: HexBase64BinaryEncoding | null,
    error?: any
}

export interface connectTokenRespInterface {
    name: string,
    symbol: string,
    balance: string,
    error?: string
}

export type walletType = connectTokenRespInterface & {
    address: string | null,
}

export interface connectWalletPropsInterface {
    currentAccount: HexBase64BinaryEncoding | null
}

export type reducerWalletActionType = reducerWalletConnectionActionInterface & {
    payload: walletType
}