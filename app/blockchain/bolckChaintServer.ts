import { ethers, parseUnits, hexlify } from 'ethers';
import { rpc } from './constant';


export const connectWallet = async (): Promise<{
    provider: ethers.BrowserProvider; //goooo
    // provider: ethers.JsonRpcProvider;
    signer: ethers.Signer;
    walletAddress: string | null
  }> => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request MetaMask account access
        await window.ethereum.request({ method: "eth_requestAccounts"});
  
        // Create a provider and signer
        // const provider = new ethers.BrowserProvider(window.ethereum);
        // const provider = new ethers.JsonRpcProvider(rpc)
        const provider =  new ethers.BrowserProvider(window.ethereum)//goo
        // await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();

        const walletAddress = await signer.getAddress()
  
        return { provider, signer, walletAddress };
      } catch (err) {
        console.error("MetaMask connection failed:", err);
        throw new Error("User denied wallet connection");
      }
    } else {
      throw new Error("MetaMask is not installed");
    }
  };
