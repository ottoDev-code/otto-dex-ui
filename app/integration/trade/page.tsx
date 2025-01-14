import { Nav } from "@/app/components/nav";
import { Trade } from "@/app/components/trade";
import { BlockchainProvider } from '../../blockchain/blockChainContext';

export default function TradePage() {

    return(<>
        <BlockchainProvider>
            <Nav></Nav> 
            <Trade></Trade>
        </BlockchainProvider>
    </>)
}