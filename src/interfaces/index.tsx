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
    network: string,
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

export interface modalInterface {
    show: boolean,
    message: string,
    title: string
}

export type modalActionInterface = reducerWalletConnectionActionInterface & {
    payload: modalInterface
}

export interface transferPropsInterface {
    address: HexBase64BinaryEncoding,
    amount: string
}

export interface errorCatched {
    code: number,
    message: string
    stack?: string
}

export interface transferRespInterface {
    success: boolean,
    transferData?: any,
    error?: any
}

export interface transferInterface {
    requesting: boolean,
    succeded: boolean,
    failed: boolean
}

export type transferType = reducerWalletConnectionActionInterface