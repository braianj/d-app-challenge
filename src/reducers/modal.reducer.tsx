import * as actionTypes from '../constants/actionTypes';
import { modalInterface, modalActionInterface } from '../interfaces'

const initialState: modalInterface = {
    show: false,
    message: "",
    title: ""
};


export const modal = (state = initialState, action: modalActionInterface): modalInterface => {
    switch (action.type) {
        case actionTypes.MODAL_SHOW:
            return {
                show: true,
                message: action.payload.message,
                title: action.payload.title
            };
        case actionTypes.MODAL_HIDE:
            return {
                ...initialState
            };

        default:
            return state;
    }
};
