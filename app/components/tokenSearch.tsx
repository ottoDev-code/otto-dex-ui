// TokenSelector.tsx
"use client"
import React, { useState } from "react";
import  "../style/tokenSearch.css";
import { FaPlus, FaMagnifyingGlass, FaRegStar, FaX } from "react-icons/fa6";
import logo from '../public/image/near.jpeg'

const tokenList = [
    { name: "USDT", symbol: "USDT", image: "/image/usdt.png" },
    { name: "NEAR", symbol: "NEAR", image: "/image/near.jpeg" },
    { name: "ETH", symbol: "ETH", image: "/image/eth.png" },
    { name: "USDT", symbol: "USDT", image: "/image/usdt.png" },
    { name: "NEAR", symbol: "NEAR", image: "/image/near.jpeg" },
    { name: "ETH", symbol: "ETH", image: "/image/eth.png" },
    { name: "USDT", symbol: "USDT", image: "/image/usdt.png" },
    { name: "NEAR", symbol: "NEAR", image: "/image/near.jpeg" },
    { name: "ETH", symbol: "ETH", image: "/image/eth.png" },
    { name: "USDT", symbol: "USDT", image: "/image/usdt.png" },
    { name: "NEAR", symbol: "NEAR", image: "/image/near.jpeg" },
    { name: "ETH", symbol: "ETH", image: "/image/eth.png" },
    { name: "USDT", symbol: "USDT", image: "/image/usdt.png" },
    { name: "NEAR", symbol: "NEAR", image: "/image/near.jpeg" },
    { name: "ETH", symbol: "ETH", image: "/image/eth.png" },
    { name: "USDT", symbol: "USDT", image: "/image/usdt.png" },
    { name: "NEAR", symbol: "NEAR", image: "/image/near.jpeg" },
    { name: "ETH", symbol: "ETH", image: "/image/eth.png" },
    // Add more tokens here...
];

type Token = {
    name: string;
    symbol: string;
    image: string;
};

interface TokenSelectorProps {
    onSelectToken: (token: Token) => void; // Specify the type of onSelectToken
    onClose: () => void; 
}


const TokenSearch: React.FC<TokenSelectorProps> = ({ onSelectToken, onClose }) => {
    const [search, setSearch] = useState("");
    const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokenList);

    const handleSearch = (e: any) => {
        const value = e.target.value;
        setSearch(value);
        setFilteredTokens(
            tokenList.filter((token) =>
                token.name.toLowerCase().includes(value.toLowerCase())
            )
        );
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
                        <img src={logo.src} alt={token.name} />
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
