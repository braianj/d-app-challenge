import React from 'react';

import '../App.css';
import { SignIn } from 'decentraland-ui';
import * as actionTypes from '../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers'

declare const window: any;
declare const ethereum: any;

/**
 * This component is used to connect to the wallet
 * @returns ConnectWallet component
 */
const ConnectWallet = () => {

    // load dispacher
    const dispatch = useDispatch();

    // Get connection wallet reducer to fill SignIn component with props 
    const walletConnection = useSelector((state: RootState) => state.walletConnection);

    // Fire action to connect to wallet
    const tryConnectWallet = (): boolean => {

        // check MetaMask installed
        if (!(typeof window.ethereum !== 'undefined' && ethereum.isMetaMask)) {
            dispatch({
                type: actionTypes.MODAL_SHOW,
                payload: {
                    title: "Metamask Connection error",
                    message: "MetaMask is not installed!"
                }
            })
            return false;
        }
        
        // dispatch connection to the MetaMask wallet
        dispatch({ type: actionTypes.ETH_CONNECT_METAMASK_REQUESTED})
        return true;
    }
    
    return <SignIn {...walletConnection} onConnect={tryConnectWallet} />;
        
}


export default ConnectWallet;
