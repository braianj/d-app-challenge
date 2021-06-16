import React from 'react';
import { useSelector } from 'react-redux';
import { Segment, Header } from 'decentraland-ui';
import { RootState } from '../reducers'
import {
    Link
} from "react-router-dom";

/**
 * 
 * @returns 
 */
const WalletCard = () => {

    const wallet = useSelector((state: RootState) => state.wallet);

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
