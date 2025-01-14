"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers, parseUnits, hexlify } from 'ethers';
import { tokenAbi } from './abi/tokenAbi';
import { factoryAbi } from "./abi/factoryAbi";
import { pairAbi } from "./abi/pairAbi";
import { routerAbi } from "./abi/routeAbi";
import { chainId, factoryContractAddress, networkName, routerContractAddress, rpc } from './constant';

interface BlockchainContextProps {
    // provider: ethers.providers.Web3Provider | null;
    provider: ethers.JsonRpcProvider | null;
    signer: ethers.Signer | null;
    walletAddress: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    tokenContractFunction: (contractAdress: string, methodName: string, args: any[]) => Promise<any>;
    pairContractFunction: (contractAdress: string, methodName: string, args: any[]) => Promise<any>;
    factoryContractFunction: (methodName: string, args: any[]) => Promise<any>;
    routerContractFunction: ( methodName: string, args: any[]) => Promise<any>;
}

const BlockchainContext = createContext<BlockchainContextProps | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
  
    // Smart contract details
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
    const CONTRACT_ABI: any = [ /* Add your ABI here */ ];
    const TOKON_ABI: any = tokenAbi
  
    const connectWallet = async () => {
      try {
        if (!window.ethereum) {
          alert('MetaMask is not installed. Please install it.');
          return;
        }

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }); //goooooo

        await window.ethereum.request({ method: "eth_requestAccounts",})
  
        // const web3Provider =  new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts", //gooooooo
          params: [
            {
              chainId: `0x${chainId.toString(16)}`, // Chain ID in hexadecimal
              chainName: networkName,
              rpcUrls: [rpc],
              nativeCurrency: {
                name: "OttoChain Native Token",
                symbol: "OTTO", // Replace with the native token symbol
                decimals: 18,
              },
              blockExplorerUrls: ["https://explorer.ottochain.network"], // Replace with the actual block explorer URL
            },
          ],
       });

       await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });

      const walletAddress = accounts[0]; //gooooo
      console.log('walletAddress connected:', walletAddress); ///

        // const web3Provider = new ethers.JsonRpcProvider(rpc)
        // // await web3Provider.send('eth_requestAccounts', []);
        // const web3Signer = await web3Provider.getSigner();
        // const wallet = await web3Signer.getAddress();
  
        // setProvider(web3Provider);
        // setSigner(web3Signer);
        // setWalletAddress(wallet);
  
        // console.log('Wallet connected:', wallet);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setWalletAddress(null);
        setContract(null);
        if (window.ethereum?.removeAllListeners) {
            window.ethereum.removeAllListeners();
        }
        console.log('Wallet disconnected');
    };

    const tokenContractFunction = async (contractAdress: string, methodName: string, args: any[]) => {
        if (!signer) {
          connectWallet()
        } 
        try {
          // const web3Provider = new ethers.JsonRpcProvider(rpc)
          const contractInstance = new ethers.Contract(contractAdress, TOKON_ABI, signer);
          const result = await contractInstance[methodName](...args);
          return result;
        } catch (error) {
          console.error(`Error calling ${methodName}:`, error);
          throw error;
        }
    };

    const pairContractFunction = async (contractAdress: string, methodName: string, ...args: any[]) => {
        if (!signer) {
          throw new Error('Please connect your wallet.');
        }
        try {
            const contractInstance = new ethers.Contract(contractAdress, pairAbi, signer);
            const result = await contractInstance[methodName](...args);
            return result;
        } catch (error) {
          console.error(`Error calling ${methodName}:`, error);
          throw error;
        }
    };

    const factoryContractFunction = async (methodName: string, ...args: any[]) => {
        if (!signer) {
          throw new Error('Please connect your wallet.');
        }
        try {
            const contractInstance = new ethers.Contract(factoryContractAddress, factoryAbi, signer);
            const result = await contractInstance[methodName](...args);
            return result;
        } catch (error) {
          console.error(`Error calling ${methodName}:`, error);
          throw error;
        }
    };

    const routerContractFunction = async (methodName: string, ...args: any[]) => {
        if (!signer) {
          throw new Error('Please connect your wallet.');
        }
        console.log('args', args)
    
        try {
          const contractInstance = new ethers.Contract(routerContractAddress, routerAbi, signer);
          const result = await contractInstance[methodName](...args);
          // await result.wait()
          return result;
        } catch (error) {
          console.error(`Error calling ${methodName}:`, error);
          throw error;
        }
    };
  
    return (
      <BlockchainContext.Provider
        value={{ provider, signer, walletAddress, connectWallet, disconnectWallet, tokenContractFunction, pairContractFunction, factoryContractFunction, routerContractFunction }}
      >
        {children}
      </BlockchainContext.Provider>
    );
};

export const useBlockchain = (): BlockchainContextProps => {
    const context = useContext(BlockchainContext);
    if (!context) {
      throw new Error('useBlockchain must be used within a BlockchainProvider');
    }
    return context;
};