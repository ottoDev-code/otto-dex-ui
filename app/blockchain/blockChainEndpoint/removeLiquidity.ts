import { formatEther, parseUnits } from "ethers";
import { pairWriteToContract, routerWriteToContract } from "../blockChianFunctionInstance";
import { routerContractAddress } from "../constant";


export const getTotalPair = async(
    walletAddress: string | null,
    factoryContractFunction: (
        methodName: string,
        ...args: any[]
    ) => Promise<any>,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        const getTotalPair = await factoryContractFunction("allPairsLength",)
        return {status: true, getTotalPair: getTotalPair}
    } catch (error) {
        console.log('erorr unable to get total pair', error)
        return {status: false}
    }
}

export const fetchPair = async(
    walletAddress: string | null,
    currentPage: number,
    itemsPerPage: number,
    total: number,
    factoryContractFunction: (
        methodName: string,
        ...args: any[]
    ) => Promise<any>,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        const start = (currentPage - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, total);

        const pairsList: string[] = [];
        for (let i = start; i < end; i++) {
          const pair = await factoryContractFunction("allPairs", i)
          pairsList.push(pair);
        }
        return {status: true, pairsList: pairsList}
    } catch (error) {
        console.log('erorr unable to get pair list', error)
        return {status: false}
    }
}

export const getPairDetail = async(
    walletAddress: string | null,
    PairContractAddress: string,
    pairContractFunction: (
        contractAddress: string,
        methodName: string,
        ...args: any[]
    ) => Promise<any>
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        const token0 = await pairContractFunction(PairContractAddress, "token0", )
        const token1 = await pairContractFunction(PairContractAddress, "token1", )
        const liquidityBal = await pairContractFunction(PairContractAddress, "liquidityBalanceOf", walletAddress)
        const ethLiquidityBal = formatEther(liquidityBal.toString());
        return {status: true, token0, token1, ethLiquidityBal}
    } catch (error) {
        console.log('erorr unable to get pair list', error)
        return {status: false}
    }
}

export const getTokenDetail = async(
    walletAddress: string | null,
    tokenContract: string,
    tokenContractFunction: (
        contractAdress: string,
        methodName: string,
        args: any[]
    ) => Promise<any>
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        const tokenSymbol = await tokenContractFunction(tokenContract, "symbol", [])
        const tokenName = await tokenContractFunction(tokenContract, "name", [])
        const tokenBalance = await tokenContractFunction(tokenContract, "balanceOf", [walletAddress])

        const ethTokenBal = formatEther(tokenBalance.toString());
        return {status: true, tokenSymbol, tokenName, ethTokenBal}
    } catch (error) {
        console.log('erorr unable to get pair list', error)
        return {status: false}
    }
}

export const approveToken = async(
    walletAddress: string | null,
    tokenContractAddress: string,
    amount: number,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return
        const amountInWei = parseUnits(amount.toString(), 18);
        const tx = await pairWriteToContract(0, tokenContractAddress, "approve", routerContractAddress, amountInWei )
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to approved token', error) 
    }
}



export const removeLiquidity = async(
    walletAddress: string | null,
    token0ContractAddress: string,
    token1ContractAddress: string,
    amount: number,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return

        const amountDesired = parseUnits(amount.toString(), 18); // 10 tokens with 18 decimals
       

        const tx = await routerWriteToContract(
            "removeLiquidity", 
            token0ContractAddress, 
            token1ContractAddress, 
            amountDesired, 
            0, 
            0,  
            walletAddress
        )
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to add liquidity', error) 
    }
}
