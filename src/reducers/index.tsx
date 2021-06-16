import { combineReducers } from 'redux';
import { walletConnection } from './walletConnection.reducer'
import { wallet } from './wallet.reducer'
/**
 * Combine all reducers to make available to the Store
 * @type {Reducer<CombinedState<unknown>>}
 */
export const rootReducer = combineReducers({
    walletConnection,
    wallet
});

/**
 * Export type RootState for use it in the connectWallet component 
 */
export type RootState = ReturnType<typeof rootReducer>