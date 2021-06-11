/**
 * Root saga, import all app sagas
 */
import { takeLatest, takeEvery, select, all } from 'redux-saga/effects';


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
    //console.log('%c state negotiation', 'color: #f44336', state.negotiation);
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

    ]);
}

export default rootSaga;
