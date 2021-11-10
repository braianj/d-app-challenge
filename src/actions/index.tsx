
import { HexBase64BinaryEncoding } from "crypto";
import { ethers } from "ethers";
import { 
    connectWalletRespInterface, 
    connectTokenRespInterface, 
    connectWalletPropsInterface, 
    transferPropsInterface,
    transferRespInterface
} from "../interfaces";
import env from "react-dotenv";

declare const window: any;
declare const ethereum: any;

// The ERC-20 Contract ABI
const dummyAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

/**
 * Action to connect to metamask wallet
 * @param param0 
 * @returns 
 */
const connectMetaMaskWallet = async ({ currentAccount }: connectWalletPropsInterface): Promise<connectWalletRespInterface> => {
    try{
        // get account connected
        const accounts: Array<HexBase64BinaryEncoding> = await ethereum.request({ method: 'eth_requestAccounts' });
        
        // if no account connected return error
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            return { account: null, error: 'Please connect to MetaMask.' }
        } else if (accounts[0] !== currentAccount) {
            return { account: accounts[0] };
        }

        return { account: currentAccount };
        
    } catch (err: any) {
        return { account: null, error: err };
    }

}

/**
 * Action to get information of token
 * @param param0 
 * @returns 
 */
const getTokenInformation = async ({ currentAccount }: connectWalletPropsInterface): Promise<connectTokenRespInterface> => {
    try{

        // get provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // DUMMY contract token
        const dummyAddress = env.DOMMY_TOKEN_CONTRACT;

        // Dummy toekn Contract object
        const dummyContract = new ethers.Contract(dummyAddress, dummyAbi, provider);

        // Token
        const name: string = await dummyContract.name();

        // ERC-20 token symbol
        const symbol: string = await dummyContract.symbol();

        // Balance of address address
        const balanceNotFormated: HexBase64BinaryEncoding = await dummyContract.balanceOf(currentAccount);

        // Format balance
        const balance: string = ethers.utils.formatUnits(balanceNotFormated, env.DOMMY_TOKEN_DECIMALS);

        // Get network information
        const networkInformation = await provider.getNetwork();

        console.log(networkInformation);
        
        return { name, symbol, balance, network: networkInformation.name };
        
    } catch (err: any) {
        console.log(err);
        return { name: "", symbol: "", balance: "", error: err, network: "" };
    }

}

const requestTransfer = async ({ address, amount }: transferPropsInterface): Promise<transferRespInterface> => {
    try {
        // get provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        // DUMMY contract token
        const dummyAddress = env.DOMMY_TOKEN_CONTRACT;

        // Dummy toekn Contract object
        const dummyContract = new ethers.Contract(dummyAddress, dummyAbi, provider);

        const dummyWithSigner = dummyContract.connect(signer);

        // Balance of address address
        const data: any = await dummyWithSigner.transfer(address, ethers.utils.parseUnits(amount, env.DOMMY_TOKEN_DECIMALS))
        console.log("before confirmed");
        const info = await provider.waitForTransaction(data.hash, 1);
        console.log("Confirmed: ", info);

        return {
            success: true,
            transferData: data
        };

    } catch (err: any) {
        console.log("Error in transfer: ", err);
        return {
            success: false,
            error: err
        };
    }
    

}

export { 
    connectMetaMaskWallet,
    getTokenInformation,
    requestTransfer
};