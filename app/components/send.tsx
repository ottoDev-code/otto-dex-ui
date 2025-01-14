"use client"
import React, {useState, useRef } from "react";
import  "../style/send.css";
import logo from '../public/image/logo.jpeg'
import TokenSearch, { Token } from "./tokenSearch";
import { transferOttoNative, transferToken, transferWOtto } from "../blockchain/blockChainEndpoint/transfer";
import { useBlockchain } from "../blockchain/blockChainContext";
import { wOttoContractAddress } from "../blockchain/constant";
import { formatEther } from "ethers";

export const Send = () =>{
    const { walletAddress, connectWallet, tokenContractFunction, provider } = useBlockchain(); 
    const [showTokenSelector, setShowTokenSelector] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
        
    const [searchIndex, setSearchIndex] = useState(1);

    const [tokenSymbol, setTokenSymbol] = useState('select Token');
    const [tokenName, setTokenName] = useState('otto');
    const [tokenImg, setTokenImg] = useState<any>(logo.src);
    const [tokenContract, setTokenContract] = useState<string | undefined>('otto');
    const [tokenBal, setTokenBal] = useState(0);
    const [tokenAmount, setTokenAmount] = useState('0');
    const [recipientAddress, setRecipientAddress] = useState('');

    const closeTokenSelector = () => {
        setShowTokenSelector(false);
    };

    const searchForToken = async(index: number) => {
        // await addLiquidity(walletAddress, tokenContractFunction)
        setShowTokenSelector(true);
        setSearchIndex(index)
    };

    const handleTokenSelect = async (token: Token, tokenIndex: any) => {
        if (token.symbol == "OTTO") {
            const balance = await provider!.getBalance(walletAddress!);
            const balanceInETH =  parseFloat(formatEther(balance.toString()))
            setTokenBal(balanceInETH)
        }else if(token.symbol == "WOTTO"){
            const wOttoBalance = await tokenContractFunction(wOttoContractAddress, "balanceOf", [walletAddress])
            const wOttoBalanceEth = parseFloat(formatEther(wOttoBalance.toString()))
            setTokenBal(wOttoBalanceEth)
        }else{
            setTokenBal(token.balance)
        }

        setTokenSymbol(token.symbol)
        setTokenImg(token.image)
        setTokenContract(token?.contract)
        setTokenName(token.name)

        setShowTokenSelector(false);

        setRecipientAddress("")
        setTokenAmount('0')
       
    };

    const transferTokenHandler = async() => {
        alert("ok")

    //     if ((!tokenAmount || parseFloat(tokenAmount) == 0) || (!recipientAddress || recipientAddress == "")) {
    //         setIsButtonDisabled(true)
    //    }else{
    //         setIsButtonDisabled(false)
    //    }
        if (tokenSymbol == "OTTO") {
            alert("otto")
            const transferedToken = await transferOttoNative(walletAddress, tokenAmount, recipientAddress,)
            console.log('transferedOtto', transferedToken)
            
        }else if(tokenSymbol == "WOTTO"){
            alert("wotto")
            const transferedToken = await transferWOtto(walletAddress, tokenAmount, recipientAddress,)
            console.log('transferedWOtto', transferedToken)
        }else{
            const transferedToken = await transferToken(walletAddress, tokenContract!, tokenAmount, recipientAddress,)
            console.log('transferedToken', transferedToken)
        }
        setRecipientAddress("")
        setTokenAmount('0')
        // setIsButtonDisabled(true)
    }

    return(<>
        <section id="trade-container">
            <div id="trade-header-container">
                <h2>Trade</h2>
                {/* <p>Lorem ipsum dolor sit amet.</p> */}
            </div>
            <div id="trade-button-container">
                <div>
                    <a onClick={() => { window.location.href = '/integration/trade'}} id="swap-button" className="trade-button">Swap</a>
                </div>
                <div>
                    <a onClick={() => { window.location.href = '/integration/send'}} id="send-button" className="trade-button">Send</a>
                </div>
            </div>
            <div id="trade-body-container">
                <div id="trade-body-wrapper">
                    <div id="from-container" className="trade-body-input">
                        <p className="label">you are sending:</p>
                        <div className="input-container">
                            <input type="text" name="" id="" placeholder="0.00" value={tokenAmount} onChange={(e) => setTokenAmount(e.target.value)}/>
                            <div className="search-token" onClick={() => searchForToken(1)}>
                                {/* <div className="token-image">
                                    <img src={logo.src} alt=""  />
                                </div> */}
                                <p className="token-name">{tokenSymbol}</p>
                                <select name="" id="">
                                  
                                    {/* <option value="wale">USDT</option>
                                    <option value="wale">NEAR</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="trade-info-container">
                            <p>USDT equivalent {tokenBal.toFixed(4)}</p>
                        </div>
                    </div>
                </div>

                <div id="trade-body-wrapper-to">
                    <div id="from-container" className="trade-body-input">
                        <p className="label">to:</p>
                        <div className="input-container reciver-address">
                            <input type="text" name="" id="" placeholder="Wallet address" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)}/>
                            
                        </div>
                    </div>
                </div>

                <div id="submit-button">
                {
                    walletAddress ?
                    <button onClick={() => transferTokenHandler()}>Transfer</button> :
                    <button onClick={connectWallet}>Connect Wallet</button>
                }
                </div>
            </div>
            {showTokenSelector && (
                <TokenSearch onSelectToken={(token) => handleTokenSelect(token, searchIndex)} onClose={closeTokenSelector} />
            )}
        </section>
    </>)
}
