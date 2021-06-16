/**
 * Root saga, import all app sagas
 */
import { takeLatest, takeEvery, select, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes'
import * as sagaApp from './app.saga'


/**
 * Logger function
 * @param action
 * @return {Generator<*, void, ?>}
 */
function* logger(action) {
    const state = yield select();
    console.log('%c' + action.type, 'color: #ffeb3b');
    console.log('%c action', 'color: #03a9f4', action);
    console.log('%c state', 'color: #8bc34a', state);
    yield;
}


/**
 * This function is responsible of listen dispatched actions and trigger the
 * corresponding function
 * @returns {IterableIterator<*>}
 */
function* rootSaga() {


    yield all([

        /**
         * Logger
         */
        //catch all dispatched action
        takeEvery('*', logger),

        takeLatest(actionTypes.ETH_CONNECT_METAMASK_REQUESTED, sagaApp.doConnectWallet),
        takeLatest(actionTypes.ETH_TOKEN_INFORMATION_METAMASK_REQUESTED, sagaApp.doGetTokenInformation),

    ]);
}

export default rootSaga;
