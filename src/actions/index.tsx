
import { HexBase64BinaryEncoding } from "crypto";
import { ethers } from "ethers";
import { connectWalletRespInterface, connectTokenRespInterface, connectWalletPropsInterface } from "../interfaces"

declare const window: any;
declare const ethereum: any;

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
            //console.log('Please connect to MetaMask.');
            return { account: null, error: 'Please connect to MetaMask.' }
        } else if (accounts[0] !== currentAccount) {
            return { account: accounts[0] };
        }

        return { account: currentAccount };
        
    } catch (err: any) {
        // TODO: handle error
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
        const dummyAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

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

        // Dummy toekn Contract object
        const dummyContract = new ethers.Contract(dummyAddress, dummyAbi, provider);
        console.log("dummyContract: ", dummyContract);

        // Token
        const name: string = await dummyContract.name()
        console.log("name: ", name);

        // ERC-20 token symbol
        const symbol: string = await dummyContract.symbol();
        console.log("symbol: ", symbol);

        // Balance of address address
        const balanceNotFormated: HexBase64BinaryEncoding = await dummyContract.balanceOf(currentAccount)
        console.log("balanceNotFormated: ", balanceNotFormated);

        // Format balance
        const balance: string = ethers.utils.formatUnits(balanceNotFormated, 0);
        console.log("balance: ", balance);
        
        return { name, symbol, balance };
        
    } catch (err: any) {
        console.log("Error::");
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');

            return { name: "", symbol: "", balance: "", error: err };
        } else {
            console.error(err);

            return { name: "", symbol: "", balance: "", error: err };
        }
    }

}

export { 
    connectMetaMaskWallet,
    getTokenInformation
};