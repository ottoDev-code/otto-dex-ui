import { Nav } from "@/app/components/nav";
import { Pool } from "@/app/components/pool";
import { BlockchainProvider } from '../../blockchain/blockChainContext';


export default function PoolPage() {

    return(<>
           <BlockchainProvider>
            <Nav></Nav> 
            <Pool></Pool>
           </BlockchainProvider>
        
    </>)
}