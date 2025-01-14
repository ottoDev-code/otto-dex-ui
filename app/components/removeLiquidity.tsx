"use client"
import React, {useState, useRef } from "react";
import  "../style/removeLiquidity.css";
import { FaArrowCircleDown } from "react-icons/fa";
import logo from '../public/image/logo.jpeg'
import PairSearch, { TokenDetail } from "./pairSearch";
import { approveToken, removeLiquidity } from "../blockchain/blockChainEndpoint/removeLiquidity";
import { useBlockchain } from "../blockchain/blockChainContext";

export const RemoveLiquidity = () =>{
    const { walletAddress, connectWallet, } = useBlockchain(); 
    const [amount, setAmount] = useState(0);

    const [showTokenSelector, setShowTokenSelector] = useState(false);
    const [searchIndex, setSearchIndex] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [token1Symbol, setToken1Symbol] = useState('');
    const [token1Bal, setToken1Bal] = useState(0);
    const [token1Contract, setToken1Contract] = useState<string>('');

    const [token2Symbol, setToken2Symbol] = useState('Select Token');
    const [token2Bal, setToken2Bal] = useState(0);
    const [token2Contract, setToken2Contract] = useState<string>('');

    const [pairContract, setPairContract] = useState('');
    const [liquidity, setLiquidity] = useState(0);


    const handleProgressChange = (event: any) => {
        setAmount(event.target.value);
        if ((!amount || amount == 0)) {
            setIsButtonDisabled(true)
       }else{
            setIsButtonDisabled(false)
       }
    };

    const searchForToken = async(index: number) => {
        // await addLiquidity(walletAddress, tokenContractFunction)
        setShowTokenSelector(true);
        setSearchIndex(index)
    };

    const closeTokenSelector = () => {
        setShowTokenSelector(false);
    };
    
    const handleTokenSelect = (pair: TokenDetail, tokenIndex: any) => {
        console.log("pair", pair)
        setToken1Symbol(pair.token1Symbol)
        setToken1Bal(pair.token1Balance)
        setToken1Contract(pair.token1Contract)

        setToken2Symbol(pair.token2Symbol)
        setToken2Bal(pair.token2Balance)
        setToken2Contract(pair.token2Contract)

        setLiquidity(pair.liquidity)

        setPairContract(pair.pairContract)
        setShowTokenSelector(false);

        setAmount(0)
 
    };

    const removeLiquidityPoool = async() => {
        if (!liquidity || liquidity == 0) {
            alert("Please choose token")
        }
        console.log("liquidity", liquidity)
        const poolPercentage = (amount /100) * liquidity
        const approvedToken = await approveToken(walletAddress, pairContract, poolPercentage)
        console.log("approvedToken", approvedToken)

        const removedLiquidity = await removeLiquidity(walletAddress, token1Contract!, token2Contract!, poolPercentage)
        console.log("removedLiquidity", removedLiquidity)
        setAmount(0)
        setLiquidity(0)
    };

    return (
        <div>
            <section id="remove-liquity-container">
                {/* <div id="remove-liquidity-wrapper"> */}
                    <div id="remove-liquidity-head">
                        <h2>remove liquidity</h2>
                    </div>
                    <div id="remove-liquidity-wrapper">
                        <div id="remove-liquidity-token" onClick={() => searchForToken(1)}>
                            {/* <div id="token-img">
                                <img src={logo.src} alt=""  />
                            </div> */}
                            <p>{token1Symbol}<span>/</span>{token2Symbol}</p>
                        </div>
                        <div id="amount-container">
                            <p>amount</p>
                            <p className="amount">{amount}%</p>
                            <div className="range-amount">
                                <input type="range" min="0" max="100"  value={amount} onChange={handleProgressChange}/>
                            </div>
                            <ul>
                                <li><button onClick={() => setAmount(25)}>25%</button></li>
                                <li><button onClick={() => setAmount(50)}>50%</button></li>
                                <li><button onClick={() => setAmount(75)}>75%</button></li>
                                <li><button onClick={() => setAmount(100)}>100%</button></li>
                            </ul>
                        </div>
                        <div id="token-detail-container">
                            <div className="token-detail-wrapper">
                                <p>pooled {token1Symbol}:</p>
                                <div>
                                    <p>{token1Bal.toFixed(3)}</p>
                                    {/* <div className="token-detail-img">
                                        <img src={logo.src} alt=""  />
                                    </div> */}
                                </div>
                            </div>
                            <div className="token-detail-wrapper">
                                <p>pooled {token2Symbol}:</p>
                                <div>
                                    <p>{token2Bal.toFixed(3)}</p>
                                    {/* <div className="token-detail-img">
                                        <img src={logo.src} alt=""  />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div id="remove-botton">
                        {
                            walletAddress ?
                            <button  disabled={isButtonDisabled} onClick={() => removeLiquidityPoool()}>remove</button> :
                            <button onClick={connectWallet}>Connect Wallet</button>
                        }
                        </div>
                    </div>
                    {showTokenSelector && (
                        <PairSearch onSelectToken={(token) => handleTokenSelect(token, searchIndex)} onClose={closeTokenSelector} />
                    )}
            </section>
        </div>
      );
      
}
