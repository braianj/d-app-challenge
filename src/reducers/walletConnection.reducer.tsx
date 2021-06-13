import * as actionTypes from '../constants/actionTypes';

interface reducerWalletConnectionInterface {
    hasError: boolean,
    isConnecting: boolean,
    isConnected: boolean
};

const initialState: reducerWalletConnectionInterface = {
    hasError: false,
    isConnecting: false,
    isConnected: false,
};

export const walletConnection = (state = initialState, action: any): reducerWalletConnectionInterface => {
    switch (action.type) {
        case actionTypes.ETH_CONNECT_METAMASK_REQUESTED:
            return {
                ...state,
                isConnecting: true,
                isConnected: false,
                hasError: false,
            };
        case actionTypes.ETH_CONNECT_METAMASK_FAILED:
            return {
                ...state,
                isConnecting: false,
                isConnected: false,
                hasError: true,
            };

        case actionTypes.ETH_CONNECT_METAMASK_SUCCEDED:
            return {
                ...state,
                hasError: false,
                isConnecting: false,
                isConnected: true,
            };

        case actionTypes.ETH_CONNECT_METAMASK_CLEAR:
            return {
                ...state,
                hasError: false,
                isConnecting: false,
                isConnected: false,
            };

        default:
            return state;
    }
};
