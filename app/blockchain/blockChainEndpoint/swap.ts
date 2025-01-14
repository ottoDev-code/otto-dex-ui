import { formatEther, parseUnits } from "ethers";
import { deposit, routerWriteToContract, routerWriteToContractTre, tokenWriteToContract, withdraw } from "../blockChianFunctionInstance";
import { routerContractAddress, wOttoContractAddress } from "../constant";


export const checkToken = async(
    walletAddress: string | null,
    tokenA: string,
    tokenB: string,
    amount: number,
    factoryContractFunction: (
        methodName: string,
        ...args: any[]
    ) => Promise<any>,
    routerContractFunction: (
        methodName: string,
        ...args: any[]
    ) => Promise<any>
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return
     
        const amountTokenIn = parseUnits(amount.toString(), 18); // 10 tokens with 18 decimals

        if (tokenA == "otto") {
            // const getPairContractAddress = await factoryContractFunction("getPair", [tokenB, wOttoContractAddress])
            // if (getPairContractAddress == "0x0000000000000000000000000000000000000000") {
            //     return
            // }else{
            //     const amountOut  = await routerContractFunction("getAmountsOut", amountTokenIn, [wOttoContractAddress, tokenB]);
            //     const amountEth = amountOut.map((amount: string) => formatEther(amount.toString()))
            //     console.log("amountOut", amountEth);
            //     return {status: true, amountEth}    
            // }
            if (tokenB == wOttoContractAddress) {
                return {status: true, amountEth: [amount.toString(), amount.toString()]}  
            }else{
                return
            }
        }else if( tokenB == "otto"){
            // const getPairContractAddress = await factoryContractFunction("getPair", [tokenA, wOttoContractAddress])
            // if (getPairContractAddress == "0x0000000000000000000000000000000000000000") {
            //     return
            // }else{
            //     const amountOut  = await routerContractFunction("getAmountsOut", amountTokenIn, [tokenA, wOttoContractAddress]);
            //     const amountEth = amountOut.map((amount: string) => formatEther(amount.toString()))
            //     console.log("amountOut", amountEth);
            //     return {status: true, amountEth}      
            // }
            if (tokenA == wOttoContractAddress) {
                return {status: true, amountEth: [amount.toString(), amount.toString()]}  
            }else{
                return
            }
        }
        else{
            const getPairContractAddress = await factoryContractFunction("getPair", tokenA, tokenB)
            if (getPairContractAddress == "0x0000000000000000000000000000000000000000") {
                const getPairContractAddressTwo = await factoryContractFunction("getPair", tokenA, wOttoContractAddress)
                if (getPairContractAddressTwo == "0x0000000000000000000000000000000000000000") {
                    return
                } else {
                    const getPairContractAddressTre = await factoryContractFunction("getPair", tokenB, wOttoContractAddress)
                    if (getPairContractAddressTre == "0x0000000000000000000000000000000000000000") {
                        return
                    }
                }
            }
            console.log(44)
            console.log("getPairContractAddress", getPairContractAddress)
            const amountOut  = await routerContractFunction("getAmountsOut", amountTokenIn, [tokenA, tokenB]);
            const amountEth = amountOut.map((amount: string) => formatEther(amount.toString()))
            console.log("amountOut", amountEth);
            return {status: true, amountEth}    
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

export const swap = async(
    walletAddress: string | null,
    tokenAddress: string[],
    amountIn: number,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amountIn) return

        const amountTokenIn = parseUnits(amountIn.toString(), 18); // 10 tokens with 18 decimals
        
        const tx = await routerWriteToContract(
            "swapExactTokensForTokens", 
            amountTokenIn, 
            0, 
            tokenAddress,
            walletAddress
        )
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to add liquidity', error) 
    }
}

export const swapOttoToToken = async(
    walletAddress: string | null,
    tokenAddress: string[],
    amountIn: number,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amountIn) return

        const amountTokenIn = parseUnits(amountIn.toString(), 18); // 10 tokens with 18 decimals
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // Deadline 20 minutes from now
        
        const tx = await routerWriteToContractTre(
            amountTokenIn,
            "swapExactETHForTokens", 
            0, 
            tokenAddress,
            walletAddress,
            deadline
        )
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to add liquidity', error) 
    }
}

export const swapTokenToOtto = async(
    walletAddress: string | null,
    tokenAddress: string[],
    amountIn: number,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amountIn) return

        const amountTokenIn = parseUnits(amountIn.toString(), 18); // 10 tokens with 18 decimals
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // Deadline 20 minutes from now
        
        const tx = await routerWriteToContract(
            "swapTokensForExactETH", 
            amountTokenIn, 
            0, 
            tokenAddress,
            walletAddress,
            deadline
        )
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to add liquidity', error) 
    }
}

export const depositeOtto = async(
    walletAddress: string | null,
    amount: number,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return

        const amountWei = parseUnits(amount.toString(), 18); // 10 tokens with 18 decimals
        
        const tx = await deposit(amountWei)
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to add liquidity', error) 
    }
}

export const withdrawOtto = async(
    walletAddress: string | null,
    amount: number,
) =>{
    try {
        if (!walletAddress)  throw new Error('Wallet not connected'); 

        if (!amount) return

        const amountWei = parseUnits(amount.toString(), 18); // 10 tokens with 18 decimals
        
        const tx = await withdraw(amountWei)
        return{status: true, result: tx}
    } catch (error) {
        console.log('erorr unable to add liquidity', error) 
    }
}