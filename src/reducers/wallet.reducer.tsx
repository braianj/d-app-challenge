import * as actionTypes from '../constants/actionTypes';
import { walletType, reducerWalletActionType} from '../interfaces'

const initialState: walletType = {
    name: "",
    symbol: "",
    balance: "",
    address: null
};


export const wallet = (state = initialState, action: reducerWalletActionType): walletType => {
    switch (action.type) {
        case actionTypes.ETH_TOKEN_INFORMATION_METAMASK_REQUESTED:
        case actionTypes.ETH_CONNECT_METAMASK_REQUESTED:
            return {
                ...initialState
            };
        case actionTypes.ETH_TOKEN_INFORMATION_METAMASK_SUCCEDED:
        case actionTypes.ETH_TOKEN_INFORMATION_METAMASK_FAILED:
            return {
                ...action.payload
            };

        default:
            return state;
    }
};
