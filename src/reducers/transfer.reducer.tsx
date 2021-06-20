import * as actionTypes from '../constants/actionTypes';
import { transferInterface, transferType } from '../interfaces'

const initialState: transferInterface = {
    requesting: false,
    succeded: false,
    failed: false
};


export const transfer = (state = initialState, action: transferType): transferInterface => {
    switch (action.type) {
        case actionTypes.ETH_TOKEN_TRANSFER_REQUESTED:
            return {
                ...initialState,
                requesting: true,
            };

        case actionTypes.ETH_TOKEN_TRANSFER_SUCCEDED:
            return {
                ...initialState,
                succeded: true,
            };

        case actionTypes.ETH_TOKEN_TRANSFER_FAILED:
            return {
                ...initialState,
                failed: true,
            };

        case actionTypes.ETH_TOKEN_TRANSFER_CLEAR:
            return {
                ...initialState
            };

        default:
            return state;
    }
};
