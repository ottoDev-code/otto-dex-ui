import { ethers, formatEther, parseUnits } from "ethers";
import { useBlockchain } from "../blockChainContext";
import { tokenWriteToContract, routerWriteToContract, routerWriteToContractTwo } from "../blockChianFunctionInstance";
import { routerContractAddress, wOttoContractAddress } from "../constant";

export const checkToken = async(
    walletAddress: string | null,
    tokenA: string,
    tokenB: string,
    amount: number,
    tokenType: string,
    factoryContractFunction: (
        methodName: string,
        ...args: any[]
    ) => Promise<any>,
    pairContractFunction: (
        contractAddress: string,
        methodName: string,
        ...args: any[]
    ) => Promise<any>
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return

        let getPairContractAddress

        if (tokenA == "otto") {
            getPairContractAddress = await factoryContractFunction("getPair", tokenB, wOttoContractAddress)
        }else if( tokenB == "otto"){
            getPairContractAddress = await factoryContractFunction("getPair", tokenA, wOttoContractAddress)
        }
        else{
            getPairContractAddress = await factoryContractFunction("getPair", tokenA, tokenB)

        }

        if (getPairContractAddress == "0x0000000000000000000000000000000000000000") {
            return 
        }else{
            const token0 = await pairContractFunction(getPairContractAddress,"token0",)
            const token1 = await pairContractFunction(getPairContractAddress,"token1",)

            const [reserveA, reserveB] =  await pairContractFunction(getPairContractAddress,"getReserves",)

            const ethValueA = formatEther(reserveA.toString());
            const ethValueB = formatEther(reserveB.toString());
            if (tokenType == "A") {
                if (tokenType == "A" && tokenA == "otto") {
                    const amountBOptimal = (amount * parseFloat(ethValueA)) / parseFloat(ethValueB);
                    return {status: true, token1: amount, token2: amountBOptimal}    
                }else{
                    if (tokenA.toString().toLowerCase() === token0.toString().toLowerCase()) {
                        const amountBOptimal = (amount * parseFloat(ethValueB)) / parseFloat(ethValueA);
                        return {status: true, token1: amount, token2: amountBOptimal}
                    }else{
                        const amountBOptimal = (amount * parseFloat(ethValueA)) / parseFloat(ethValueB);
                        return {status: true, token1: amount, token2: amountBOptimal}
                    }
                }         
            }else{
                if (tokenB == "otto") {
                    const amountAOptimal = (amount * parseFloat(ethValueA)) / parseFloat(ethValueB);
                    return {status: true, token1: amountAOptimal, token2: amount}
                }else{
                    if (tokenB.toString().toLowerCase() === token1.toString().toLowerCase()) { 
                        const amountAOptimal = (amount * parseFloat(ethValueA)) / parseFloat(ethValueB);
                        return {status: true, token1: amountAOptimal, token2: amount}
                    }else{
                        const amountAOptimal = (amount * parseFloat(ethValueB)) / parseFloat(ethValueA);
                        return {status: true, token1: amountAOptimal, token2: amount}
                    }
                }
            }
        }

    } catch (error) {
        console.log('erorr unable to check token', error)
    }
}

export const approveToken = async(
    walletAddress: string | null,
    tokenContractAddress: string,
    amount: string,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return
        const amountInWei = parseUnits(amount, 18);
        const tx = await tokenWriteToContract(0, tokenContractAddress, "approve", routerContractAddress, amountInWei )
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to approved token', error) 
    }
}

export const addLiquidity = async(
    walletAddress: string | null,
    token0ContractAddress: string,
    token1ContractAddress: string,
    amount0: number,
    amount1: number,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount0 || !amount1) return

        const amountADesired = parseUnits(amount0.toString(), 18); // 10 tokens with 18 decimals
        const amountBDesired = parseUnits(amount1.toString(), 18); // 20 tokens with 18 decimals
        const amountAMin = parseUnits((amount0 - 1).toString(), 18); // 9 tokens minimum
        const amountBMin = parseUnits((amount1 - 1).toString(), 18); 

        const tx = await routerWriteToContract(
            "addLiquidity", 
            token0ContractAddress, 
            token1ContractAddress, 
            amountADesired, 
            amountBDesired, 
            amountAMin, 
            amountBMin, 
            walletAddress
        )
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to add liquidity', error) 
    }
}


export const addLiquidityByEth = async(
    walletAddress: string | null,
    tokenAddress: string,
    tokenAmount: number,
    ethAmount: number,
) =>{
    try {
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // Deadline 20 minutes from now
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!tokenAmount || !ethAmount) return

        const tokenAmountDesired = parseUnits(tokenAmount.toString(), 18); // 10 tokens with 18 decimals
        const ethAmountDesired = parseUnits(ethAmount.toString(), 18); // 20 tokens with 18 decimals
        const tokenAmountMin = parseUnits((tokenAmount - 1).toString(), 18); // 9 tokens minimum
        const ethAmountMin = parseUnits((ethAmount - 1).toString(), 18); 

        const tx = await routerWriteToContractTwo(
            ethAmountDesired,
            tokenAddress, 
            tokenAmountDesired, 
            tokenAmountMin, 
            ethAmountMin,  
            walletAddress,
            deadline
        )
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to add liquidity', error) 
    }
}