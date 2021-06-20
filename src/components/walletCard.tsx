import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Header } from 'decentraland-ui';
import { RootState } from '../reducers'
import {
    Link
} from "react-router-dom";
import * as actionTypes from "../constants/actionTypes";
import { HexBase64BinaryEncoding } from 'crypto';

declare const ethereum: any;
/**
 * 
 * @returns 
 */
const WalletCard = () => {

    const wallet = useSelector((state: RootState) => state.wallet);

    // load dispacher
    const dispatch = useDispatch();


    // If there is a selected address, then try connect metamask to fill redures with information
    React.useEffect(
        () => {

            // this allow as to indentify when the account is changed
            ethereum.on('accountsChanged', function (accounts: Array<HexBase64BinaryEncoding>) {
                // If no account selected, then show connect wallet component
                if (!accounts.length) {
                    dispatch({ type: actionTypes.ETH_CONNECT_METAMASK_CLEAR });
                    dispatch({
                        type: actionTypes.MODAL_SHOW,
                        payload: {
                            title: "Accounts disconnected",
                            message: "MetaMask accounts has been disconnected"
                        }
                    });
                } else {
                    // Update wallet reducer to show information inside component
                    dispatch({ 
                        type: actionTypes.ETH_TOKEN_INFORMATION_METAMASK_REQUESTED,
                        payload: {
                            address: accounts[0]
                        }
                     });
                }
            });

            ethereum.on('chainChanged', (chainId: any) => {
                // Handle the new chain.
                window.location.reload();
            });
        },
        [dispatch],
    );

    return (
        <Segment style={{ width: 400 }}>
            <Header>Wallet</Header>
            <p>
                Address: {wallet.address }
            </p>
            <p>
                Balance: {wallet.balance} {wallet.symbol} <Link to="/transfer">Transfer</Link>
            </p>
        </Segment>
    );
}

export default WalletCard;
