"use client"
import React, {useState, useRef } from "react";
import  "../style/nav.css";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../public/image/logo.jpeg'
import { useBlockchain } from "../blockchain/blockChainContext";

declare global {
    interface Window {
      ethereum?: any;
    }
}

export const Nav = ({NavHandler}: any) =>{
    let showRef = useRef(null);
    let [openSideBar, setOpenSideBar] = useState(false)
    const { walletAddress, connectWallet, disconnectWallet } = useBlockchain(); 

    let showSideBar = () => {
        setOpenSideBar(true)
    }

    let closeSideBar = () => {
        setOpenSideBar(false)
    }

    return(<>
        <nav>
            <section>
                <div id="nav_container">
                    <nav id="nav">
                            <div id="logo">
                                <div>
                                    <img src={logo.src} alt=""  />
                                    <h2>OTTOSWAP</h2>
                                </div>
                            </div>
                            <div>
                                <div id="link_container">
                                    <ul>
                                        <li>
                                            <a className="link" onClick={() => { window.location.href = '/integration/trade'}}>Trade</a>
                                        </li>                                 
                                        <li>
                                            <a className="link" onClick={() => { window.location.href = '/integration/pool'}}>Pool</a>
                                        </li>  
                                        <li>
                                            <a className="link" onClick={() => { window.location.href = '/integration/removeLiquidity'}}>remove pool</a>
                                        </li>    
                                        <li>
                                        {
                                            walletAddress ?
                                            <a className="link start"onClick={disconnectWallet}>Disconnet</a> :
                                            <a className="link start"onClick={connectWallet}>Connect</a>
                                        }
                                </li>    
                                        
                                    </ul>
                                </div>
                                <div id="toggle">
                                    {!openSideBar? <h2 onClick={() => showSideBar()}><FaBars></FaBars></h2> :  <h2 onClick={() => closeSideBar()}><FaTimes></FaTimes></h2>}
                                </div>
                            </div>
                    </nav>
                </div> 
                {openSideBar ?  
                    <div id="sidebar" className="show_hight" ref={showRef}>
                        <div  id="sidebar_container">
                            <ul>
                                <li>
                                    <a className="side_link" onClick={() => { window.location.href = '/integration/trade';}}>Trade</a>
                                </li>
                                <li>
                                    <a className="side_link" onClick={() => { window.location.href = '/integration/pool';}}>Pool</a>
                                </li>  
                                <li>
                                    <a className="side_link" onClick={() => { window.location.href = '/integration/removeLiquidity';}}>remove pool</a>
                                </li>   
                                <li>
                                   {
                                    walletAddress ?
                                    <a className="link start"onClick={disconnectWallet}>Disconnet</a> :
                                    <a className="link start"onClick={connectWallet}>Connect</a>
                                   }
                                    
                                </li>                          
                            </ul>
                        </div>
                    </div>
                : 
                    <div></div>
                }
            </section>
        </nav>
    </>)
}
