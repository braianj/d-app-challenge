import React from 'react';

import { Segment, Header, HeaderMenu, Field, Button } from 'decentraland-ui';
import {
    Link
} from "react-router-dom";

/**
 * 
 * @returns 
 */
const TransferCard = () => {

    return (
        <Segment style={{ width: 800 }}>
            <div className="Header-centered">
                <Header size="large">Transfer</Header>
                <Header size="small">Send token to an account</Header>
            </div>
            <Field
                label="Amount"
                placeholder="0"
                type="number"
                value=""
            />
            <Field
                label="Address"
                placeholder="0x..."
                type="address"
                value=""
            />
            <Button primary>Invite</Button>
            <Link to="/">back</Link>
        </Segment>
    );
}

export default TransferCard;
