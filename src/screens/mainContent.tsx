import React from 'react';
import { useSelector } from 'react-redux';
import ConnectWallet from "../components/connectWallet";
import WalletCard from "../components/walletCard";
import TransferCard from "../components/transferCard";
import { Navbar, Page, Footer, Section, Segment, Header, HeaderMenu, Field, Button } from 'decentraland-ui';
import { RootState } from '../reducers'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

/**
 * 
 * @returns 
 */
const MainContent = () => {

    const walletConnection = useSelector((state: RootState) => state.walletConnection);

    return (
        <div className="Page-story-container">
            <Navbar isFullscreen activePage="marketplace" />
            <Page isFullscreen className="Page-content">
                {walletConnection.isConnected ?
                    <Section>
                        <Router>
                            <Switch>
                                <Route exact path="/">
                                    <WalletCard></WalletCard>
                                </Route>
                                <Route path="/transfer">
                                    <TransferCard></TransferCard>
                                </Route>
                            </Switch>
                        </Router>
                    </Section> :
                    <ConnectWallet />
                }
            </Page>
            <Footer isFullscreen />
        </div>
    );
}

export default MainContent;
