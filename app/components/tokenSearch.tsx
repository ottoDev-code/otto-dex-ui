// TokenSelector.tsx
"use client"
import React, { useState } from "react";
import  "../style/tokenSearch.css";
import { FaPlus, FaMagnifyingGlass, FaRegStar, FaX } from "react-icons/fa6";
import logo from '../public/image/logo.jpeg'

import { useBlockchain } from "../blockchain/blockChainContext";
import { formatEther } from "ethers";

import { tokenReadFromContract } from "../blockchain/blockChianFunctionInstance";
import { wOttoContractAddress } from "../blockchain/constant";

const tokenList = [
    { name: "otto", symbol: "OTTO", image: logo.src, contract: "otto", balance: 0 },
    { name: "wrapped Otto", symbol: "WOTTO", image: logo.src, contract: wOttoContractAddress, balance: 0 },
];

export type Token = {
    name: string;
    symbol: string;
    image: any;
    contract: string;
    balance: number;
};

interface TokenSelectorProps {
    onSelectToken: (token: Token) => void; // Specify the type of onSelectToken
    onClose: () => void; 
}


const TokenSearch: React.FC<TokenSelectorProps> = ({ onSelectToken, onClose }) => {
    const [search, setSearch] = useState("");
    const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokenList);
    const { walletAddress, tokenContractFunction} = useBlockchain(); 

    const handleSearch = async (e: any) => {
        const value = e.target.value;
        setSearch(value);
        let tokenMetadata
        try {
            tokenMetadata = await tokenContractFunction(value, "getTokenMetadata", [])
        } catch (error) {
            console.log("wale wale")
           tokenMetadata = "logo"
        }
        // let tokenMetadata = await tokenContractFunction(value, "getTokenMetadata", [])
        // if (!tokenMetadata) {
        //     console.log("wale wale")
        //     tokenMetadata = "logo"
        // }
        const tokenSymbol = await tokenContractFunction(value, "symbol", [])
        const tokenName = await tokenContractFunction(value, "name", [])
        const tokenBalance = await tokenContractFunction(value, "balanceOf", [walletAddress])
        console.log("tokenSymbol", tokenSymbol)
        console.log("tokenName", tokenName)
        console.log("tokenMetadata", tokenMetadata)
        console.log("tokenBalance", formatEther(tokenBalance.toString()))

        const  token: Token = { name: tokenName, symbol: tokenSymbol, image: tokenMetadata[2], contract: value, balance: parseFloat(formatEther(tokenBalance.toString())) }
        console.log("token", token)
        setFilteredTokens([token])
    };

    return (
        <div className="token-selector-modal">
            <div id="search-header">
                <h2>select token</h2>
                <p onClick={onClose}><FaX /></p>
            </div>
            <div id="search-input">
                <p><FaMagnifyingGlass /></p>
                <input
                    type="text"
                    placeholder="Search token"
                    value={search}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>
            <div id="tokens">
                <p><FaRegStar /></p>
                <p>tokens</p>
            </div>
            
            <div className="token-list">
                {filteredTokens.map((token, index) => (
                    <div
                        key={index}
                        className="token-item"
                        onClick={() => onSelectToken(token)}
                    >
                        <img src={token.image} alt={token.name} />
                        <div>
                            <p className="token-symbol">{token.symbol}</p>
                            <p className="token-name">{token.name}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TokenSearch;
