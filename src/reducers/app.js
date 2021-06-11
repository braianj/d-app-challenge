import * as actionTypes from '../constants/actionTypes';

const initialState = {
    isRequesting: false,
    requestFail: false,
};

export const app = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.API_REQUEST_ISREQUESTING:
            const { isRequesting } = action.payload;
            return {
                ...state,
                isRequesting,
                requestFail: false,
            };
        case actionTypes.API_REQUEST_FAIL:
            return {
                ...state,
                isRequesting: false,
                requestFail: true,
            };
        default:
            return state;
    }
};
