// TokenSelector.tsx
"use client"
import React, { useEffect, useState } from "react";
import  "../style/tokenSearch.css";
import { FaPlus, FaMagnifyingGlass, FaRegStar, FaX } from "react-icons/fa6";
import logo from '../public/image/logo.jpeg'

import { useBlockchain } from "../blockchain/blockChainContext";
import { formatEther } from "ethers";

import { tokenReadFromContract } from "../blockchain/blockChianFunctionInstance";
import { wOttoContractAddress } from "../blockchain/constant";
import { fetchPair, getPairDetail, getTokenDetail, getTotalPair } from "../blockchain/blockChainEndpoint/removeLiquidity";

export type TokenDetail = {
    token1Symbol: string;
    token2Symbol: string;
    token1Balance: number;
    token2Balance: number;
    token1Contract: string;
    token2Contract: string;
    liquidity: number;
    pairContract: string;
};

interface TokenSelectorProps {
    onSelectToken: (token: TokenDetail) => void; // Specify the type of onSelectToken
    onClose: () => void; 
}


const PairSearch: React.FC<TokenSelectorProps> = ({ onSelectToken, onClose }) => {
    const [search, setSearch] = useState("");
    const [filteredPairs, setFilteredPairs] = useState<TokenDetail[]>([]);
    
    const { walletAddress, tokenContractFunction, factoryContractFunction, pairContractFunction} = useBlockchain(); 

    const handleSearch = async (e: any) => {
        const value = e.target.value;
        setSearch(value);
        const filteredPair = filteredPairs.filter(pair =>
            pair.token1Symbol.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPairs(filteredPair)
    };

    const getPairDetails = async () => {
        try {
            const totalPairDetail = await getTotalPair(walletAddress, factoryContractFunction)
            const totalPair =  Number(totalPairDetail?.getTotalPair)
            console.log("totalPair", totalPair)

            const pairList = await fetchPair(walletAddress, 1, 9, totalPair, factoryContractFunction)
            if (pairList.pairsList) {
                let pairsDetial = []
                for (let i = 0; i < pairList.pairsList.length; i++) {
                    const pair = pairList.pairsList[i];

                    console.log("pair", pair)
                    
                    const fetchPairDetail = await getPairDetail(walletAddress, pair, pairContractFunction)
                    console.log("fetchPairDetail", fetchPairDetail)

                    const token1Detail = await getTokenDetail(walletAddress, fetchPairDetail?.token0, tokenContractFunction)
                    console.log("token1Detail", token1Detail)

                    const token2Detail = await getTokenDetail(walletAddress, fetchPairDetail?.token1, tokenContractFunction)
                    console.log("token2Detail", token2Detail)

                    const token: TokenDetail = { 
                        token1Symbol: token1Detail.tokenSymbol, 
                        token2Symbol: token2Detail.tokenSymbol,
                        token1Balance: parseFloat(token1Detail.ethTokenBal!),
                        token2Balance: parseFloat(token2Detail.ethTokenBal!),
                        token1Contract: fetchPairDetail?.token0,
                        token2Contract:  fetchPairDetail?.token1,
                        liquidity: parseFloat(fetchPairDetail.ethLiquidityBal!),
                        pairContract: pair
                    }

                    pairsDetial.push(token)

                }

                setFilteredPairs(pairsDetial)
                // console.log('filteredPairs', filteredPairs)
            }
            
        } catch (error) {
            
        }
        
    };

    useEffect(() => {
        getPairDetails()
    }, [])

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
                <p>pairs</p>
            </div>
            
            <div className="token-list">
                {filteredPairs.map((token, index) => (
                    <div
                        key={index}
                        className="token-item"
                        // onClick={() => onSelectToken(token)}
                        // onClick={() => getPairDetails()}
                        onClick={() => onSelectToken(token)}
                    >
                        {/* <img src={token.image} alt={token.name} /> */}
                        <div>
                            <p className="token-symbol">{token.token1Symbol}/{token.token2Symbol}</p>
                            {/* <p className="token-name">{token.name}</p> */}
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PairSearch;
