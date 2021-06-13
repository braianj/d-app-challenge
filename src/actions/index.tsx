
declare const ethereum: any;


interface connectWalletProps {
    currentAccount: string | null
}
interface connectWalletResp {
    account: string|null,
    error?: string
}

const connectMetaMaskWallet = async ({ currentAccount }: connectWalletProps): Promise<connectWalletResp> => {
    try{
        const accounts: any = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
            return { account: null, error: 'Please connect to MetaMask.' }
        } else if (accounts[0] !== currentAccount) {
            console.log(accounts[0]);
            return { account: accounts[0] };
        }
        return { account: currentAccount };
        
    } catch (err: any) {
        console.log("Error::");
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');

            return { account: null, error: err };
        } else {
            console.error(err);

            return { account: null, error: err};
        }
    }

}

export { 
    connectMetaMaskWallet 
};