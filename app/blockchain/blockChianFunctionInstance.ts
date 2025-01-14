import { ethers, parseUnits, hexlify, isAddress, getAddress, BigNumberish, parseEther,  } from 'ethers';
import { tokenAbi } from './abi/tokenAbi';
import { factoryAbi } from "./abi/factoryAbi";
import { pairAbi } from "./abi/pairAbi";
import { routerAbi } from "./abi/routeAbi";
import { connectWallet } from "./bolckChaintServer";
import { routerContractAddress, wOttoContractAddress } from './constant';
import { wethAbi } from './abi/wOttoAbi';

export const tokenReadFromContract = async (contractAddress: string, veiwFunction: string): Promise<string> => {
    const { provider } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, tokenAbi, provider);
  
    try {
    //   const result: any = await contract.myViewFunction();
        const result: any = await contract[veiwFunction]();
        console.log("result", result)
        return result.toString(); // Convert BigNumber to string
    } catch (err) {
      console.error("Failed to read from contract:", err);
      throw new Error("Error reading from contract");
    }
};

export const tokenWriteToContract = async (amount: any, contractAddress: string, changeFunction: string,  ...args: any[]): Promise<any> => {
    const { signer } = await connectWallet();
    const validContractAddress = getAddress(contractAddress);
    const contract = new ethers.Contract(validContractAddress, tokenAbi, signer);

    try {
        const sanitizedArgs = args.map(arg =>
            typeof arg === "string" && isAddress(arg)
              ? getAddress(arg)
              : arg
        );
     
        const tx = await contract[changeFunction](...sanitizedArgs, {value: amount });

        console.log('tx', tx)
        console.log("Transaction sent:", tx.hash);
    
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction confirmed:", tx);

        return tx
    
    } catch (err) {
      console.error("Failed to write to contract:", err);
      throw new Error("Error writing to contract");
    }
};

export const routerReadFromContract = async (veiwFunction: string, ...args: any[]): Promise<string> => {
    const { provider } = await connectWallet();
    const contract = new ethers.Contract(routerContractAddress, tokenAbi, provider);
  
    try {
        const sanitizedArgs = args.map(arg =>
            typeof arg === "string" && isAddress(arg)
              ? getAddress(arg)
              : arg
        );
        const result: any = await contract[veiwFunction](...sanitizedArgs,);
        console.log("result", result)
        return result.toString(); // Convert BigNumber to string
    } catch (err) {
      console.error("Failed to read from contract:", err);
      throw new Error("Error reading from contract");
    }
};

export const routerWriteToContract = async ( changeFunction: any,  ...args: any[]): Promise<any> => {
    const { signer } = await connectWallet();
    const validContractAddress = getAddress(routerContractAddress);
    const contract = new ethers.Contract(validContractAddress, routerAbi, signer);
    console.log(1)
  
    try {
        const sanitizedArgs = args.map(arg =>
            typeof arg === "string" && isAddress(arg)
              ? getAddress(arg)
              : arg
        );
    
        const tx = await contract[changeFunction](...sanitizedArgs,);

        console.log('tx', tx)

        console.log("Transaction sent:", tx.hash);
  
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction confirmed:", tx);
        return tx
    } catch (err) {
      console.error("Failed to write to contract:", err);
      throw new Error("Error writing to contract");
    }
};


export const routerWriteToContractTwo = async (amount: any, ...args: any[]): Promise<any> => {
    const { signer } = await connectWallet();
    const validContractAddress = getAddress(routerContractAddress);
    const contract = new ethers.Contract(validContractAddress, routerAbi, signer);
    const ethAmountDesired = parseUnits("20", 18); // 20 tokens with 18 decimals

    console.log(1)
    
  
    try {
        const sanitizedArgs = args.map(arg =>
            typeof arg === "string" && isAddress(arg)
              ? getAddress(arg)
              : arg
        );

        // console.log("Function name:", changeFunction);
        console.log("Arguments:", sanitizedArgs);
    
        const tx = await contract.addLiquidityETH(...sanitizedArgs, {value: amount});

        console.log('tx', tx)

        console.log("Transaction sent:", tx.hash);
  
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction confirmed:", tx);
        return tx
    } catch (err) {
      console.error("Failed to write to contract:", err);
      throw new Error("Error writing to contract");
    }
};

export const routerWriteToContractTre = async (amount: any, method: any, ...args: any[]): Promise<any> => {
    const { signer } = await connectWallet();
    const validContractAddress = getAddress(routerContractAddress);
    const contract = new ethers.Contract(validContractAddress, routerAbi, signer);
    const ethAmountDesired = parseUnits("20", 18); // 20 tokens with 18 decimals

    console.log(1)
    
  
    try {
        const sanitizedArgs = args.map(arg =>
            typeof arg === "string" && isAddress(arg)
              ? getAddress(arg)
              : arg
        );

        // console.log("Function name:", changeFunction);
        console.log("Arguments:", sanitizedArgs);
    
        const tx = await contract[method](...sanitizedArgs, {value: amount});

        console.log('tx', tx)

        console.log("Transaction sent:", tx.hash);
  
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction confirmed:", tx);
        return tx
    } catch (err) {
      console.error("Failed to write to contract:", err);
      throw new Error("Error writing to contract");
    }
};

export const pairWriteToContract = async (amount: any, contractAddress: string, changeFunction: string,  ...args: any[]): Promise<any> => {
  const { signer } = await connectWallet();
  const validContractAddress = getAddress(contractAddress);
  const contract = new ethers.Contract(validContractAddress, pairAbi, signer);

  try {
      const sanitizedArgs = args.map(arg =>
          typeof arg === "string" && isAddress(arg)
            ? getAddress(arg)
            : arg
      );
   
      const tx = await contract[changeFunction](...sanitizedArgs, {value: amount });

      console.log('tx', tx)
      console.log("Transaction sent:", tx.hash);
  
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction confirmed:", tx);

      return tx
  
  } catch (err) {
    console.error("Failed to write to contract:", err);
    throw new Error("Error writing to contract");
  }
};

export const deposit = async (amount: any): Promise<any> => {
  const { signer } = await connectWallet();
  const validContractAddress = getAddress(wOttoContractAddress);
  const contract = new ethers.Contract(validContractAddress, wethAbi, signer);

  try {
      const tx = await contract.deposit( {value: amount});

      console.log('tx', tx)

      console.log("Transaction sent:", tx.hash);

      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction confirmed:", tx);
      return tx
  } catch (err) {
    console.error("Failed to write to contract:", err);
    throw new Error("Error writing to contract");
  }
};

export const withdraw = async (amount: any): Promise<any> => {
  const { signer } = await connectWallet();
  const validContractAddress = getAddress(wOttoContractAddress);
  const contract = new ethers.Contract(validContractAddress, wethAbi, signer);

  try {
      const tx = await contract.withdraw(amount);

      console.log('tx', tx)

      console.log("Transaction sent:", tx.hash);

      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction confirmed:", tx);
      return tx
  } catch (err) {
    console.error("Failed to write to contract:", err);
    throw new Error("Error writing to contract");
  }
};

export const transferWotto = async (amount: any, recipient: string): Promise<any> => {
  const { signer } = await connectWallet();
  const validContractAddress = getAddress(wOttoContractAddress);
  const contract = new ethers.Contract(validContractAddress, wethAbi, signer);

  try {
      const tx = await contract.transfer(recipient, amount);

      console.log('tx', tx)

      console.log("Transaction sent:", tx.hash);

      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction confirmed:", tx);
      return tx
  } catch (err) {
    console.error("Failed to write to contract:", err);
    throw new Error("Error writing to contract");
  }
};

export const transferOtto = async (amount: any, recipient: string): Promise<any> => {
  const { signer } = await connectWallet();
  try {
    const tx = await signer.sendTransaction({
      to: recipient,
      value: amount,
    });

      console.log("Transaction sent:", tx.hash);

      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction confirmed:", tx);
      return tx
  } catch (err) {
    console.error("Failed to write to contract:", err);
    throw new Error("Error writing to contract");
  }
};


