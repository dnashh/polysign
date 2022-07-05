import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { contractABI, contractAddress } from '../contract'

import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)


const NFT = () => {
    
   useEffect(()=>{
       getNFTS()

   },[])

    const [NFTS, setNFTS] = useState([]);

    const getNFTS = async () => {
        //setNFTS([]);
        console.log("try")
        const CONTRACT = await new web3.eth.Contract(contractABI, contractAddress);
        const response = CONTRACT.methods
        const totalSupply = await response.totalSupply().call();
        for (let i = 0; i < totalSupply; i++) { 
            const token = await response.tokenURI(i).call();
            try {
                const metadata = JSON.parse(token);
                setNFTS(prev => [...prev, metadata]);
            } catch {
                console.log('Not a valid metadata');
            }
        }

    }
    


    return (
        <div>
            <Navbar />
            <main className='nft-container'>
                { NFTS.length == 0 && <h1>Loading Signed Documents...</h1> }
                {NFTS.map((nft, index) => {
                    return (
                        <div key={index} className="nft-card">
                            <h2>{nft.name}</h2>
                            <img src={nft.image} alt="nft-image" />
                            <p className="description">{nft.description}</p>
                            {
                                nft.address && <p>ownedBy: {nft.address?.substring(0,5) + "...." + nft.address?.substring(nft.address.length-5, nft.address.length -1)}</p>
                            }
                        </div>
                    )
                })}
            </main>
        </div>

    )
}

export default NFT