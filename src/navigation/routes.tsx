import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WalletCard from "../components/walletCard";
import TransferCard from "../components/transferCard";
import { RootState } from '../reducers'
import {
    Switch,
    Route,
    useHistory,
    useLocation
} from "react-router-dom";
import * as actionTypes from '../constants/actionTypes';

/**
 * 
 * @returns 
 */
const Routes = () => {

    const walletConnection = useSelector((state: RootState) => state.walletConnection);
    const transfer = useSelector((state: RootState) => state.transfer);

    // load dispacher
    const dispatch = useDispatch();

    const history = useHistory();
    const location = useLocation();
    
    React.useEffect(
        () => {
            // Prevent reload site in transfer component
            if ((walletConnection.isConnected && location.pathname === '/transfer' && history.action === 'POP') || (transfer.succeded && location.pathname === '/transfer')) {
                history.replace("/");
            }
            if (transfer.succeded) {
                dispatch({ type: actionTypes.ETH_TOKEN_TRANSFER_CLEAR});
            }
        },
        [walletConnection.isConnecting, walletConnection.isConnected, location, history, transfer.succeded, dispatch],
    );

    return (
        <Switch>
            <Route exact path="/">
                <WalletCard></WalletCard>
            </Route>
            <Route path="/transfer">
                <TransferCard></TransferCard>
            </Route>
        </Switch>
    );
}

export default Routes;
