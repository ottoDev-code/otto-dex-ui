"use client"
import React, {useState, useRef } from "react";
import  "../style/trade.css";
import { FaArrowCircleDown } from "react-icons/fa";
import logo from '../public/image/logo.jpeg'
import TokenSearch, { Token } from "./tokenSearch";
import { approveToken, checkToken, depositeOtto, swap, swapOttoToToken, swapTokenToOtto, withdrawOtto } from "../blockchain/blockChainEndpoint/swap";
import { useBlockchain } from "../blockchain/blockChainContext";
import { wOttoContractAddress } from "../blockchain/constant";
import { formatEther } from "ethers";

export const Trade = () =>{
    const { walletAddress, connectWallet, factoryContractFunction, routerContractFunction, provider, tokenContractFunction} = useBlockchain();  

    const [showTokenSelector, setShowTokenSelector] = useState(false);
    const [searchIndex, setSearchIndex] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [token1Symbol, setToken1Symbol] = useState('OTTO');
    const [token1Name, setToken1Name] = useState('otto');
    const [token1Img, setToken1Img] = useState<any>(logo.src);
    const [token1Contract, setToken1Contract] = useState<string | undefined>('otto');
    const [token1Bal, setToken1Bal] = useState(0);
    const [token1amount, setToken1Amount] = useState('0');

    const [token2Symbol, setToken2Symbol] = useState('Token');
    const [token2Name, setToken2Name] = useState('otto');
    const [token2Img, setToken2Img] = useState<any>(null);
    const [token2Contract, setToken2Contract] = useState<string | undefined>('otto');
    const [token2Bal, setToken2Bal] = useState(0);
    const [token2amount, setToken2Amount] = useState('0');

    const searchForToken = async(index: number) => {
        // await addLiquidity(walletAddress, tokenContractFunction)
        setShowTokenSelector(true);
        setSearchIndex(index)
    };

    const closeTokenSelector = () => {
        setShowTokenSelector(false);
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

    const checkTokenPair = async( amount: number ) => {
        // await addLiquidity(walletAddress, tokenContractFunction)
       const tokenCheck = await checkToken(walletAddress, token1Contract!, token2Contract!, amount, factoryContractFunction, routerContractFunction )
       console.log("tokenCheck", tokenCheck)
       if (tokenCheck?.status) {
            const lastAmount = tokenCheck!.amountEth[tokenCheck!.amountEth.length - 1];
            const token2AmountEquivalent = parseFloat(Number(lastAmount).toFixed(3));
            setToken2Amount(token2AmountEquivalent.toString());
           
       }
       if ((!token1amount || parseFloat(token1amount) == 0) || (!token2amount || parseFloat(token2amount) == 0)) {
            setIsButtonDisabled(true)
       }else{
            setIsButtonDisabled(false)
       }
    };

    const swapToken = async() => {
        if (token1Contract == "otto") {
            const swapOttoToken = await depositeOtto(walletAddress, parseFloat(token1amount),)
            console.log('swapOttoToken', swapOttoToken)
        }else if(token2Contract == "otto"){
            const swapTokenOtto = await withdrawOtto(walletAddress, parseFloat(token1amount),)
            console.log('swapTokenOtto', swapTokenOtto)
        }else {
            const approveToken1 = await approveToken(walletAddress, token1Contract!, token1amount )
            console.log('approveToken1', approveToken1)
            const swaptokenForToken = await swap(walletAddress, [token1Contract!, token2Contract!],  parseFloat(token1amount))
            console.log('swaptokenForToken', swaptokenForToken) 
        }

        setToken1Symbol("OTTO")
        setToken1Name('otto')
        setToken1Img(logo.src)
        setToken1Contract('otto')
        setToken1Bal(0)
        setToken1Amount('0')

        setToken2Symbol("Token")
        setToken2Name('otto')
        setToken2Img(null)
        setToken2Contract('otto')
        setToken2Bal(0)
        setToken2Amount('0')

        setIsButtonDisabled(true)
    };

        

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
                        <p className="label">you sell:</p>
                        <div className="input-container">
                            <input type="text" name="" id="" placeholder="0.00" value={token1amount} onChange={(e) => setToken1Amount(e.target.value)}  onKeyUp={() => checkTokenPair(parseFloat(token1amount))}/>
                            <div className="search-token" onClick={() => searchForToken(1)}>
                                <div className="token-image">
                                    <img src={token1Img} alt=""  />
                                </div>
                                <p>{token1Symbol}</p>
                                <select name="" id="">
                                    {/* <option value="wale">USDT</option>
                                    <option value="wale">NEAR</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="trade-info-container">
                            <p>USDT equivalent 0.00</p>
                            <p>Balance {token1Bal.toFixed(3)} <span className="max">MAX</span></p>

                        </div>
                    </div>
                </div>

                <div id="connet-icon">
                <FaArrowCircleDown></FaArrowCircleDown>
                </div>

                <div id="trade-body-wrapper">
                    <div id="from-container" className="trade-body-input">
                        <p className="label">you receive:</p>
                        <div className="input-container">
                            <input type="text" name="" id="" placeholder="0.00" readOnly value={token2amount} onChange={(e) => setToken2Amount(e.target.value)} />
                            <div className="search-token" onClick={() => searchForToken(2)}>
                                <div className="token-image">
                                    {/* <img src={logo.src} alt=""  /> */}
                                    {
                                        token2Img? <img src={token2Img} alt=""  />: ""
                                    }
                                </div>
                                <p>{token2Symbol}</p>
                                <select name="" id="">
                                
                                    {/* <option value="wale">USDT</option>
                                    <option value="wale">NEAR</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="trade-info-container">
                            <p>USDT equivalent 0.00</p>
                            <p>Balance {token2Bal.toFixed(3)} <span className="max">MAX</span></p>

                        </div>
                    </div>
                </div>

                <div id="submit-button">
                {
                    walletAddress ?
                    <button disabled={isButtonDisabled} onClick={() => swapToken()} >Swap</button> :
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
