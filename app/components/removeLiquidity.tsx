"use client"
import React, {useState, useRef } from "react";
import  "../style/removeLiquidity.css";
import { FaArrowCircleDown } from "react-icons/fa";
import logo from '../public/image/logo.jpeg'

export const RemoveLiquidity = () =>{

    const [progress, setProgress] = useState(0);


    const handleProgressChange = (event: any) => {
        setProgress(event.target.value);
    };

    return (
        <div>
            <section id="remove-liquity-container">
                {/* <div id="remove-liquidity-wrapper"> */}
                    <div id="remove-liquidity-head">
                        <h2>remove liquidity</h2>
                    </div>
                    <div id="remove-liquidity-wrapper">
                        <div id="remove-liquidity-token">
                            <div id="token-img">
                                <img src={logo.src} alt=""  />
                            </div>
                            <p>USDC<span>/</span>OTTO</p>
                        </div>
                        <div id="amount-container">
                            <p>amount</p>
                            <p className="amount">20%</p>
                            <div className="range-amount">
                                <input type="range" min="0" max="100"/>
                            </div>
                            <ul>
                                <li><button>25%</button></li>
                                <li><button>50%</button></li>
                                <li><button>75%</button></li>
                                <li><button>100%</button></li>
                            </ul>
                        </div>
                        <div id="token-detail-container">
                            <div className="token-detail-wrapper">
                                <p>pooled USDC:</p>
                                <div>
                                    <p>1489.40</p>
                                    <div className="token-detail-img">
                                        <img src={logo.src} alt=""  />
                                    </div>
                                </div>
                            </div>
                            <div className="token-detail-wrapper">
                                <p>pooled USDC:</p>
                                <div>
                                    <p>1489.40</p>
                                    <div className="token-detail-img">
                                        <img src={logo.src} alt=""  />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="remove-botton">
                            <button>remove</button>
                        </div>
                    </div>
            </section>
        </div>
      );
      
}
