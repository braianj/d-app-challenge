import { call, put, select } from "@redux-saga/core/effects";
import * as actionTypes from "../constants/actionTypes"
import * as actions from "../actions"
import { connectWalletRespInterface, connectTokenRespInterface, transferRespInterface, walletType } from "../interfaces"
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
            yield put({
                type: actionTypes.MODAL_SHOW,
                payload: {
                    title: "Metamask Connection error",
                    message: connectionResult.error.message
                }
            });
        }

    } catch (e) {
        //Dispatch this action to perform tasks when the request fail
        //enable the button
        yield put({
            type: actionTypes.ETH_CONNECT_METAMASK_FAILED,
            payload: {
                message: e.message
            }
        });
        yield put({
            type: actionTypes.MODAL_SHOW,
            payload: {
                title: "Metamask Connection error",
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
            yield put({
                type: actionTypes.MODAL_SHOW,
                payload: {
                    title: "Token Information",
                    message: "There is an error retrieving token information"
                }
            });
            yield put({
                type: actionTypes.ETH_CONNECT_METAMASK_CLEAR
            });
        }

    } catch (e) {
        //Dispatch this action to perform tasks when the request fail
        //enable the button
        yield put({
            type: actionTypes.ETH_CONNECT_METAMASK_FAILED,
            payload: {
                message: e.message
            }
        });
        yield put({
            type: actionTypes.MODAL_SHOW,
            payload: {
                title: "Metamask Connection error",
                message: e.message
            }
        });
    }
}

/**
 *  This saga will call the action to get information about token
 * @param action 
 */
export function* doRequestTransfer(action): Generator<any> {
    try {
        const transferResult = (yield call(actions.requestTransfer, { ...action.payload })) as transferRespInterface;
        
        // if transaction successfull then show message
        if (transferResult.success) {
            yield put({
                type: actionTypes.ETH_TOKEN_TRANSFER_SUCCEDED
            });

            // get wallet reducer
            const wallet = (yield select(state => state.wallet)) as walletType;

            // update wallet reducer with new balance
            yield put({
                type: actionTypes.ETH_TOKEN_INFORMATION_METAMASK_SUCCEDED,
                payload: { ...wallet, balance: Number(wallet.balance) - action.payload.amount }
            });

            // show confirmation message
            yield put({
                type: actionTypes.MODAL_SHOW,
                payload: {
                    title: "Transfer succeeded",
                    message: "Congratulations, this is the transaction hash: " + transferResult.transferData.hash
                }
            });
        } else {
            // if transaction failed then show message
            yield put({
                type: actionTypes.ETH_TOKEN_TRANSFER_FAILED,
                payload: { error: transferResult.error }
            });

            yield put({
                type: actionTypes.MODAL_SHOW,
                payload: {
                    title: "Transfer failed",
                    message: transferResult.error.reason || transferResult.error.message
                }
            });
        } 

    } catch (e) {

        //Dispatch this action to perform tasks when the request fail
        yield put({
            type: actionTypes.ETH_TOKEN_TRANSFER_FAILED
        });
        yield put({
            type: actionTypes.MODAL_SHOW,
            payload: {
                title: "Transfer fail",
                message: e.message
            }
        }); 
    }
} 