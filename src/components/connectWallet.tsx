import React from 'react';

import '../App.css';
import { SignIn } from 'decentraland-ui';
import * as actionTypes from '../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers'

declare const window: any;
declare const ethereum: any;

/**
 * This component is used to connect to the 
 * @returns ConnectWallet component
 */
const ConnectWallet = () => {

    // load dispacher
    const dispatch = useDispatch();

    React.useEffect(() => {

        // this allow as to indentify when the account is changed
        ethereum.on('accountsChanged', function (accounts: any) {
            if (!accounts.length) {
                dispatch({ type: actionTypes.ETH_CONNECT_METAMASK_CLEAR })
            } else {
                console.log(accounts);
            }
        });

        ethereum.on('chainChanged', (chainId: any) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            window.location.reload();
        });

    }, []);


    const walletConnection = useSelector((state: RootState) => state.walletConnection);

    const tryConnectWallet = (): boolean => {

        // check MetaMask installed
        if (!(typeof window.ethereum !== 'undefined' && ethereum.isMetaMask)) {
            console.log('MetaMask is not installed!');
            return false;
        }
        
        // dispatch connection to the MetaMask wallet
        dispatch({ type: actionTypes.ETH_CONNECT_METAMASK_REQUESTED})
        return true;
    }
    
    return (
        <SignIn {...walletConnection} onConnect={tryConnectWallet} />
        );
        
}


export default ConnectWallet;
