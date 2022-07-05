import React, { useState } from 'react'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { contractABI, contractAddress } from '../contract'




const Sign = () => {
    const sdk = new ThirdwebSDK("mumbai");
    const contract = sdk.getNFTCollection(contractAddress);
    const nfts = async () => {
        contract.getAll().then(res => {
            console.log(res);
        });
    }
    nfts();
  return (
    <div>
        <h1>Sign your Document on the Blockchain</h1>
        <div className="form-container">
          <form>
            
          </form>
        </div>
    </div>
  )
}

export default Sign
