import React from 'react';

import { Segment, Header, Field, Button } from 'decentraland-ui';
import {
    Link
} from "react-router-dom";
import * as actionTypes from "../constants/actionTypes";
import { useDispatch, useSelector } from 'react-redux';

/**
 * 
 * @returns 
 */
const TransferCard = () => {

    // load dispacher
    const dispatch = useDispatch();

    const [amount, setAmount] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');

    const transfer = async () => {
        // check that the user set some information
        if (amount === '' || address === '') {
            dispatch({
                type: actionTypes.MODAL_SHOW,
                payload: {
                    title: "Transfer information",
                    message: "Please fill with the correct information"
                }
            });
        } else {
            // request transfer to MetaMask
            dispatch({
                type: actionTypes.ETH_TOKEN_TRANSFER_REQUESTED,
                payload: { amount, address }
            });
        }
    }

    return (
        <Segment className="Transfer-card-width">
            <div className="Header-centered">
                <Header size="large">Transfer</Header>
                <Header size="small">Send token to an account</Header>
            </div>
            <Field
                label="Amount"
                placeholder="0"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Field
                label="Address"
                placeholder="0x..."
                type="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Button primary onClick={transfer}>Send</Button>
            
            <Link to="/" className="Margin-right"><Button secondary>Back</Button></Link>
        </Segment>
    );
}

export default TransferCard;
