import { call, put, select } from "@redux-saga/core/effects";
import * as actionTypes from "../constants/actionTypes"
import * as actions from "../actions"

interface connectWalletResp {
    account: string | null,
    error?: any
}
/**
 * 
 * @param action 
 */
export function* doConnectWallet(action: any): Generator<any> {
    try {
        

        const currentAccount = (yield select(state => state.app.address)) as string | null;

        const connectionResult = (yield call(actions.connectMetaMaskWallet, { currentAccount })) as connectWalletResp;

        if (connectionResult.account) {
            yield put({
                type: actionTypes.ETH_CONNECT_METAMASK_SUCCEDED,
                payload: {
                    address: connectionResult.account
                }
            });
        } else if (connectionResult.error?.code === 4001) {
            yield put({
                type: actionTypes.ETH_CONNECT_METAMASK_FAILED,
                payload: {
                    message: connectionResult.error.message
                }
            });
        }

        console.log(" app.saga ");
        console.log(connectionResult);

        /* yield put({
            type: actionTypes.,
            payload: {
                order: activeOrder
            }
        }); */


    } catch (e) {
        //Dispatch this action to perform tasks when the request fail
        //enable the button
        console.log("error en app.saga ");
        console.log(e);
        yield put({
            type: actionTypes.ETH_CONNECT_METAMASK_FAILED,
            payload: {
                message: e.message
            }
        });
    }
}