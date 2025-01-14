import { Nav } from "@/app/components/nav";
import { Send } from "@/app/components/send";
import { BlockchainProvider } from '../../blockchain/blockChainContext';


export default function SendPage() {

    return(<>
        <BlockchainProvider>
            <Nav></Nav> 
            <Send></Send>
        </BlockchainProvider>
    </>)
}