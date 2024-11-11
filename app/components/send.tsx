"use client"
import React, {useState, useRef } from "react";
import  "../style/send.css";
import logo from '../public/image/near.jpeg'

export const Send = () =>{

        

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
                            <input type="text" name="" id="" placeholder="0.00"/>
                            <div className="search-token">
                                <div className="token-image">
                                    <img src={logo.src} alt=""  />
                                </div>
                                <select name="" id="">
                                    <option value="wale">USDT</option>
                                    <option value="wale">NEAR</option>
                                </select>
                            </div>
                        </div>
                        <div className="trade-info-container">
                            <p>USDT equivalent 0.00</p>

                        </div>
                    </div>
                </div>

                <div id="trade-body-wrapper-to">
                    <div id="from-container" className="trade-body-input">
                        <p className="label">to:</p>
                        <div className="input-container">
                            <input type="text" name="" id="" placeholder="Wallet address"/>
                            
                        </div>
                    </div>
                </div>

                <div id="submit-button">
                    <button>connet wallet</button>
                </div>
            </div>
        </section>
    </>)
}
