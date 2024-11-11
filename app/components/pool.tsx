"use client"
import React, {useState, useRef } from "react";
import  "../style/pool.css";
import logo from '../public/image/near.jpeg'
import { FaPlus, FaRegCircle } from "react-icons/fa6";
import TokenSearch from "./tokenSearch";

export const Pool = () =>{
    const [showTokenSelector, setShowTokenSelector] = useState(false);
    const [selectedToken1, setSelectedToken1] = useState(null);
    const [selectedToken2, setSelectedToken2] = useState(null);

    const handleTokenSelect = (token: any, tokenIndex: any) => {
        if (tokenIndex === 1) {
            setSelectedToken1(token);
        } else {
            setSelectedToken2(token);
        }
        setShowTokenSelector(false);
    };

    const closeTokenSelector = () => {
        setShowTokenSelector(false);
    };

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
                        <div className="token" onClick={() => setShowTokenSelector(true)}>
                            <div className="token-image">
                                <img src={logo.src} alt=""  />
                            </div>
                            <p>USDT</p>
                            <select name="" id="">
                                
                            </select>
                        </div>
                        <div id="token-join">
                            <FaPlus />
                        </div>
                        <div className="token" onClick={() => setShowTokenSelector(true)}>
                            <div className="token-image">
                                <img src={logo.src} alt=""  />
                            </div>
                            <p>USDT</p>
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
                                    <img src={logo.src} alt=""  />
                                </div>
                                <p>ETH</p>
                            </div>
                            <div className="amount-input">
                                <input type="text" name="" id="" placeholder="0.0003"/>
                            </div>
                        </div>
                        <div className="amount-down">
                            <p>Balance of USDC <span>Max</span></p>
                            <p>~$ 588.34</p>
                        </div>
                    </div>

                    <div className="amount-container">
                        <div className="amount-up">
                            <div className="amount-wrapper">
                                <div className="amount-image">
                                    <img src={logo.src} alt=""  />
                                </div>
                                <p>ETH</p>
                            </div>
                            <div className="amount-input">
                                <input type="text" name="" id="" placeholder="0.0003"/>
                            </div>
                        </div>
                        <div className="amount-down">
                            <p>Balance of USDC <span>Max</span></p>
                            <p>~$ 588.34</p>
                        </div>
                    </div>

                    <div id="submit-button">
                        <button>supply</button>
                    </div>
                </div>
                <div id="liquidity-wrapper-right">

                </div>

                
                
            </div>

            
            {showTokenSelector && (
            <TokenSearch onSelectToken={(token) => handleTokenSelect(token, 1)} onClose={closeTokenSelector} />
        )}
            
        </section>


       </div>
       
    </>)
}
