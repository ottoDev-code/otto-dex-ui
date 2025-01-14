import { parseUnits } from "ethers";
import { tokenWriteToContract, transferOtto, transferWotto } from "../blockChianFunctionInstance";

export const transferToken = async(
    walletAddress: string | null,
    tokenContractAddress: string,
    amount: string,
    recipientAddress: string,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return
        const amountInWei = parseUnits(amount, 18);
        const tx = await tokenWriteToContract(0, tokenContractAddress, "transfer", recipientAddress, amountInWei )
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to send token', error) 
    }
}

export const transferWOtto = async(
    walletAddress: string | null,
    amount: string,
    recipient: string
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return

        const amountWei = parseUnits(amount, 18); // 10 tokens with 18 decimals
        
        const tx = await transferWotto(amountWei, recipient)
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to transfer Wrapp otto', error) 
    }
}

export const transferOttoNative = async(
    walletAddress: string | null,
    amount: string,
    recipient: string
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return

        const amountWei = parseUnits(amount, 18); // 10 tokens with 18 decimals
        
        const tx = await transferOtto(amountWei, recipient)
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to transfer Wrapp otto', error) 
    }
}