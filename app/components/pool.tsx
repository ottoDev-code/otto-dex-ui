"use client"
import React, {useState, useRef } from "react";
import  "../style/pool.css";
import logo from '../public/image/logo.jpeg'
import { FaPlus, FaRegCircle } from "react-icons/fa6";
import TokenSearch, { Token } from "./tokenSearch";
import { addLiquidity, checkToken, approveToken, addLiquidityByEth } from "../blockchain/blockChainEndpoint/liquidity";
import { useBlockchain } from "../blockchain/blockChainContext";

import { tokenWriteToContract, routerWriteToContract } from "../blockchain/blockChianFunctionInstance";
import { formatEther, getAddress, parseUnits } from "ethers";
import { wOttoContractAddress } from "../blockchain/constant";

export const Pool = () =>{
    const { walletAddress, connectWallet, factoryContractFunction, pairContractFunction, tokenContractFunction, provider } = useBlockchain(); 

    const [showTokenSelector, setShowTokenSelector] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [token1Symbol, setToken1Symbol] = useState('OTTO');
    const [token1Name, setToken1Name] = useState('otto');
    const [token1Img, setToken1Img] = useState<any>(logo.src);
    const [token1Contract, setToken1Contract] = useState<string | undefined>('otto');
    const [token1Bal, setToken1Bal] = useState(0);
    const [token1amount, setToken1Amount] = useState('0');

    const [token2Symbol, setToken2Symbol] = useState('Select Token');
    const [token2Name, setToken2Name] = useState('otto');
    const [token2Img, setToken2Img] = useState<any>(null);
    const [token2Contract, setToken2Contract] = useState<string | undefined>('otto');
    const [token2Bal, setToken2Bal] = useState(0);
    const [token2amount, setToken2Amount] = useState('0');

    const [searchIndex, setSearchIndex] = useState(1);

    const closeTokenSelector = () => {
        setShowTokenSelector(false);
    };

    const searchForToken = async(index: number) => {
        // await addLiquidity(walletAddress, tokenContractFunction)
        setShowTokenSelector(true);
        setSearchIndex(index)
    };

    const handleTokenSelect = async (token: Token, tokenIndex: any) => {
        if (tokenIndex === 1) {
            if (token.contract != token2Contract) {
                if (token.symbol == "OTTO") {
                    const balance = await provider!.getBalance(walletAddress!);
                    const balanceInETH =  parseFloat(formatEther(balance.toString()))
                    setToken1Bal(balanceInETH)
                }else if(token.symbol == "WOTTO"){
                    const wOttoBalance = await tokenContractFunction(wOttoContractAddress, "balanceOf", [walletAddress])
                    const wOttoBalanceEth = parseFloat(formatEther(wOttoBalance.toString()))
                    setToken1Bal(wOttoBalanceEth)
                }else{
                    setToken1Bal(token.balance)
                }
                console.log("token", token)
                setToken1Symbol(token.symbol)
                setToken1Img(token.image)
                setToken1Contract(token?.contract)
                setToken1Name(token.name)
                // setToken1Bal(token.balance)
            }
        } else {
            // setSelectedToken2(token);
            if (token.contract != token1Contract) {
                if (token.symbol == "OTTO") {
                    const balance = await provider!.getBalance(walletAddress!);
                    const balanceInETH =  parseFloat(formatEther(balance.toString()))
                    setToken2Bal(balanceInETH)
                }else if(token.symbol == "WOTTO"){
                    const wOttoBalance = await tokenContractFunction(wOttoContractAddress, "balanceOf", [walletAddress])
                    const wOttoBalanceEth = parseFloat(formatEther(wOttoBalance.toString()))
                    setToken2Bal(wOttoBalanceEth)
                }else{
                    setToken2Bal(token.balance)
                }
                setToken2Symbol(token.symbol)
                setToken2Img(token.image)
                setToken2Contract(token?.contract)
                setToken2Name(token.name)
                // setToken2Bal(token.balance)
            } 
           
        }
        setShowTokenSelector(false);
        setToken1Amount('0')
        setToken2Amount('0')
    };


    const checkTokenPair = async(tokenType: string, amount: number ) => {
        // await addLiquidity(walletAddress, tokenContractFunction)
       const tokenCheck = await checkToken(walletAddress, token1Contract!, token2Contract!, amount, tokenType, factoryContractFunction, pairContractFunction )
       if (tokenCheck?.status) {
            setToken1Amount(tokenCheck!.token1.toString())
            setToken2Amount(tokenCheck!.token2.toString())
       }
       if ((!token1amount || parseFloat(token1amount) == 0) || (!token2amount || parseFloat(token2amount) == 0)) {
            setIsButtonDisabled(true)
       }else{
            setIsButtonDisabled(false)
       }
       console.log('token1amount', token1amount)
       console.log('token2amount', token2amount)
    };


    const addLiquidityPool = async() => {
        if (token1Contract == "otto") {
            const approveToken2 = await approveToken(walletAddress, token2Contract!, token2amount, )
            console.log('approveToken2', approveToken2)
            const addLiquidityPoolByEth = await addLiquidityByEth(walletAddress, token2Contract!, parseFloat(token2amount), parseFloat(token1amount),)
            console.log('addLiquidityPoolByEth', addLiquidityPoolByEth)
        }else if(token2Contract == "otto"){
            const approveToken1 = await approveToken(walletAddress, token1Contract!, token1amount, )
            console.log('approveToken1', approveToken1)
            const addLiquidityPoolByEth = await addLiquidityByEth(walletAddress, token1Contract!, parseFloat(token1amount), parseFloat(token2amount),)
            console.log('addLiquidityPoolByEth', addLiquidityPoolByEth)
        }else {
            const approveToken1 = await approveToken(walletAddress, token1Contract!, token1amount )
            console.log('approveToken1', approveToken1)
            const approveToken2 = await approveToken(walletAddress, token2Contract!, token2amount, )
            console.log('approveToken2', approveToken2)
            const addLiquidityPoole = await addLiquidity(walletAddress, token1Contract!, token2Contract!, parseFloat(token1amount), parseFloat(token2amount), )
            console.log('addLiquidityPoole', addLiquidityPoole) 
        }

        setToken1Symbol("OTTO")
        setToken1Name('otto')
        setToken1Img(logo.src)
        setToken1Contract('otto')
        setToken1Bal(0)
        setToken1Amount('0')

        setToken2Symbol("Select Token")
        setToken2Name('otto')
        setToken2Img(null)
        setToken2Contract('otto')
        setToken2Bal(0)
        setToken2Amount('0')

        setIsButtonDisabled(true)
    };

    // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8


    return(<>
    <div>
        <section id="liquidity-body">
            <div id="liquidity-head">
                {/* <p><FaArrowCircleDown/></p> */}
                <h2>add liquidity</h2>
            </div>
            <div id="liquidity-wrapper">
                <div id="liquidity-wrapper-left">
                    <div id="token-label">
                        <p>choose token pair</p>
                    </div>
                    <div id="token-contianer">
                        <div className="token" onClick={() => searchForToken(1)}>
                            <div className="token-image">
                                <img src={token1Img} alt=""  />
                            </div>
                            {/* <p>USDT</p> */}
                            <p>{token1Symbol}</p>
                            <select name="" id="">
                                
                            </select>
                        </div>
                        <div id="token-join">
                            <FaPlus />
                        </div>
                        <div className="token" onClick={() => searchForToken(2)}>
                            <div className="token-image">
                                {
                                    token2Img? <img src={token2Img} alt=""  />: ""
                                }
                                {/* <img src={token2Img} alt=""  /> */}
                            </div>
                            <p>{token2Symbol}</p>
                            <select name="" id="">
                                
                            </select>
                        </div>
                    </div>
                    <div id="price-range">
                        <ul>
                            <li>
                                <div className="up-range">
                                    <p>0.01%</p>
                                    <p className="mark"><FaRegCircle/></p>
                                </div>
                                <p className="selected">5% selected</p>
                            </li>
                            <li>
                                <div className="up-range">
                                    <p>0.01%</p>
                                    <p className="mark"><FaRegCircle/></p>
                                </div>
                                <p className="selected">5% selected</p>
                            </li>
                            <li>
                                <div className="up-range">
                                    <p>0.01%</p>
                                    <p className="mark"><FaRegCircle/></p>
                                </div>
                                <p className="selected">5% selected</p>
                            </li>
                            <li>
                                <div className="up-range">
                                    <p>0.01%</p>
                                    <p className="mark"><FaRegCircle/></p>
                                </div>
                                <p className="selected">5% selected</p>
                            </li>
                        </ul>
                    </div>
                    <div id="amount-label">
                        <p>deposit amounts</p>
                    </div>
                    <div className="amount-container">
                        <div className="amount-up">
                            <div className="amount-wrapper">
                                <div className="amount-image">
                                    <img src={token1Img} alt=""  />
                                </div>
                                <p>{token1Symbol}</p>
                            </div>
                            <div className="amount-input">
                                <input type="text" value={token1amount} onChange={(e) => setToken1Amount(e.target.value)} onKeyUp={() => checkTokenPair("A", parseFloat(token1amount))} placeholder="0.0003"/>
                            </div>
                        </div>
                        <div className="amount-down">
                            {/* <p>Balance of USDC <span>Max</span></p> */}
                            <p>Balance <span>Max</span></p>
                            {/* <p>~$ 588.34</p> */}
                            <p>{token1Bal.toFixed(3)}</p>
                        </div>
                    </div>

                    <div className="amount-container">
                        <div className="amount-up">
                            <div className="amount-wrapper">
                                <div className="amount-image">
                                    {
                                        token2Img? <img src={token2Img} alt=""  /> :""
                                    }
                                    {/* <img src={token2Img} alt=""  /> */}
                                </div>
                                <p>{token2Symbol}</p>
                            </div>
                            <div className="amount-input">
                                <input type="text" value={token2amount} onChange={(e) => setToken2Amount(e.target.value)} onKeyUp={() => checkTokenPair("B", parseFloat(token2amount))} placeholder="0.0003"/>
                            </div>
                        </div>
                        <div className="amount-down">
                            {/* <p>Balance of USDC <span>Max</span></p> */}
                            <p>Balance  <span>Max</span></p>
                            {/* <p>~$ 588.34</p> */}
                            <p>{token2Bal.toFixed(3)}</p>
                        </div>
                    </div>

                    <div id="submit-button">
                        {/* <button onClick={() => addLiquidityPool()}>supply</button> */}
                        {
                            walletAddress ?
                            <button disabled={isButtonDisabled} onClick={() => addLiquidityPool()}>supply</button> :
                            <button onClick={connectWallet}>Connect Wallet</button>
                        }
                                    
                    </div>
                </div>
                <div id="liquidity-wrapper-right">

                </div>
            </div>

            
            {showTokenSelector && (
            <TokenSearch onSelectToken={(token) => handleTokenSelect(token, searchIndex)} onClose={closeTokenSelector} />
        )}
            
        </section>


       </div>
       
    </>)
}
