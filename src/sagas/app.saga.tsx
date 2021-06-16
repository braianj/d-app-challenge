import { call, put, select } from "@redux-saga/core/effects";
import * as actionTypes from "../constants/actionTypes"
import * as actions from "../actions"
import { connectWalletRespInterface, connectTokenRespInterface } from "../interfaces"
import { HexBase64BinaryEncoding } from "crypto";

/**
 * Saga to connect to metamask wallet
 * @param action 
 */
export function* doConnectWallet(): Generator<any> {
    try {

        // get address from reducer if exist
        const currentAccount = (yield select(state => state.wallet.address)) as HexBase64BinaryEncoding | null;

        // call action to connect to metamask
        const connectionResult = (yield call(actions.connectMetaMaskWallet, { currentAccount })) as connectWalletRespInterface;

        // if connection succeded set as connected and call saga for request token information
        if (connectionResult.account) {
            yield put({
                type: actionTypes.ETH_CONNECT_METAMASK_SUCCEDED
            });

            yield put({
                type: actionTypes.ETH_TOKEN_INFORMATION_METAMASK_REQUESTED,
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

    } catch (e) {
        //Dispatch this action to perform tasks when the request fail
        //enable the button
        // TODO: handle error
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

/**
 *  This saga will call the action to get information about token
 * @param action 
 */
export function* doGetTokenInformation(action): Generator<any> {
    try {
        const address = action.payload.address;
        const tokenResult = (yield call(actions.getTokenInformation, { currentAccount: address })) as connectTokenRespInterface;

        if (!tokenResult.error) {
            yield put({
                type: actionTypes.ETH_TOKEN_INFORMATION_METAMASK_SUCCEDED,
                payload: { ...tokenResult, address}
            });
        } else {
            yield put({
                type: actionTypes.ETH_TOKEN_INFORMATION_METAMASK_FAILED,
                payload: { error: "some error" }
            });
        }

    } catch (e) {
        //Dispatch this action to perform tasks when the request fail
        //enable the button
        console.log("error en app.saga ");
        console.log(e);
        // TODO: handle error
        yield put({
            type: actionTypes.ETH_CONNECT_METAMASK_FAILED,
            payload: {
                message: e.message
            }
        });
    }
}