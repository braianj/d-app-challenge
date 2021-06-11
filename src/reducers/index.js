import { combineReducers } from 'redux';
import {app} from '../reducers/app'
/**
 * Combine all reducers to make available to the Store
 * @type {Reducer<CombinedState<unknown>>}
 */
export const rootReducer = combineReducers({
    app
});