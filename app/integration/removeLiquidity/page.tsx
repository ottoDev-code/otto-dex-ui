import { Nav } from "@/app/components/nav";
import { RemoveLiquidity } from "@/app/components/removeLiquidity";
import { BlockchainProvider } from '../../blockchain/blockChainContext';


export default function TradePage() {

    return(<>
        <BlockchainProvider>
            <Nav></Nav> 
            <RemoveLiquidity></RemoveLiquidity>
        </BlockchainProvider>
    </>)
}