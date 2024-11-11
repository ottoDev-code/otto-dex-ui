"use client"
import React, {useState, useRef } from "react";
import  "../style/nav.css";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

import logo from '../public/image/near.jpeg'

export const Nav = ({NavHandler}: any) =>{

        let showRef = useRef(null);
    
        let [openSideBar, setOpenSideBar] = useState(false)
    
        let showSideBar = () => {
            // let sidebar = showRef.current; 
            // sidebar.classList.toggle('show_hight');
    
            // NavHandler();
            setOpenSideBar(true)
        }
    
        let closeSideBar = () => {
            //let sidebar = showRef.current; 
            //sidebar.classList.toggle('show_hight');
            // NavHandler();
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
                                            <a className="link">Explore</a>
                                        </li>    

                                         <li>
                                            <a className="link start" onClick={() => { window.location.href = '/'}}>Connect wallet</a>
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
                                    <a className="side_link" onClick={() => { window.location.href = '/';}}>Explore</a>
                                </li>   
                                <li>
                                    <a className="side_link start" onClick={() => { window.location.href = '/';}}>Connect wallet</a>
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
