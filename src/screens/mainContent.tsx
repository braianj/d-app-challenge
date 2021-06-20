import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConnectWallet from "../components/connectWallet";
import { Navbar, Page, Footer, Section, Modal, Button } from 'decentraland-ui';
import { RootState } from '../reducers'
import {
    BrowserRouter as Router
} from "react-router-dom";
import Routes from '../navigation/routes';
import * as actionTypes from "../constants/actionTypes";

declare const window: any;
declare const ethereum: any;
/**
 * 
 * @returns 
 */
const MainContent = () => {

    // load dispacher
    const dispatch = useDispatch();

    // If there is a selected address, then try connect metamask to fill redures with information
    React.useEffect(
        () => {
            
            // Is MetaMask is installed
            if (window.ethereum) {
                ethereum
                    .request({ method: 'eth_accounts' })
                    .then((accounts) => {
                        if (accounts.length) {
                            dispatch({ type: actionTypes.ETH_CONNECT_METAMASK_REQUESTED })
                        }
                    })
                    .catch((err) => {
                        // Some unexpected error.
                        // For backwards compatibility reasons, if no accounts are available,
                        // eth_accounts will return an empty array.
                        console.error("error: ", err);
                    });

                ethereum.on('chainChanged', (chainId: any) => {
                    // Handle the new chain.
                    window.location.reload();
                });
            }
        },
        [dispatch],
    );

    // Get wallet connection reducer to check if it's connected or not
    const walletConnection = useSelector((state: RootState) => state.walletConnection);

    // Get modal reducer
    const modal = useSelector((state: RootState) => state.modal);

    // Dispatch hide the modal
    const hideModal = () => {
        dispatch({ type: actionTypes.MODAL_HIDE })
    }

    return (
        <div className="Page-story-container">
            <Navbar isFullscreen activePage="marketplace" />
            <Page isFullscreen className="Page-content">
                {walletConnection.isConnected ?
                    <Section>
                        <Router>
                            <Routes />
                        </Router>
                    </Section> :
                    <ConnectWallet />
                }
                <Modal size="small" open={modal.show}>
                    <Modal.Header>{modal.title}</Modal.Header>
                    <Modal.Content>
                        {modal.message}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={hideModal}>Close</Button>
                    </Modal.Actions>
                </Modal>
            </Page>
            <Footer isFullscreen />
        </div>
    );
}

export default MainContent;
