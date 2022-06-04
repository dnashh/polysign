/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import * as IPFS from 'ipfs-core'
import { Navbar } from '../components/Navbar'
import { contractABI, contractAddress } from '../contract'
import { useWeb3 } from "@3rdweb/hooks" 
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

const Start = () => {

  const [document, setDocument] = useState(null)
  const [tokenId, setTokenId] = useState(null);
  const [response, setResponse] = useState(null);
  const [file, setFile] = useState(false);
  const [Url, setUrl] = useState(false);
  const { address } = useWeb3();


  const upload = async (file) => {
    console.log('Uploading Document to IPFS');
    try {
      const ipfs = await IPFS.create()
      const filesAdded = await ipfs.add(file);
      console.log('IPFS upload Succesful');
      return filesAdded;
    } catch (ex) {
      console.error(ex)
      return null;
    }
  }

  const worker = async (ipfspath) => { 
    console.log('Started Worker For Minting');
    const CONTRACT = await new web3.eth.Contract(contractABI, contractAddress);
    const response = await CONTRACT.methods.mintNFT({ image: ipfspath }).send({ from: address });
    setTokenId(response.events.Transfer.returnValues.tokenId);
    console.log('response',response);
    setResponse(response);

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Form');
    const file = e.target.document.files[0]
    if (!file) {
      console.log('File Doesn\'t Exist, Upload and Continue!')
      return;
    }
    var reader = new FileReader();
    var url = reader.readAsDataURL(file)
    setUrl(url);
    const { title, description } = e.target
    const id = await upload(file);
    console.info('onChange', id);
    const path = `https://ipfs.io/ipfs/${id.path}`
    id && setDocument(path);
  }

  return (
    <div>
      <div><Navbar /></div>
      <main className="container">
        <section>
          <div className="center-all">
          <h1>Sign Your Documents in Three Simple Steps</h1>
          { !document && <div className='flow-wrap'>
          <div className="round">1</div>
          <h3> Upload your Document</h3>
          { 
            <form onSubmit={onSubmit}>
            <label htmlFor="document">Choose File to Upload or Drag and Drop Here</label>
            <input type="file" name="document" id="document"  />
            { file && <p>{file.name }</p> }
            <br />
            <button type="submit">Submit</button>
           </form>
          }

          </div> }
          <br /><br />
          {
            document && !response && <div className='flow-wrap'>
              <div className="round">2</div>
              <h2>Document Uploaded to IPFS</h2>
              {/* { <img src={Url} alt="Document" /> } */}
              { document &&  <img src={document} alt='ipfs link resource' width='600px' /> }
              { document && <button onClick={() => {worker(document)}}>Sign with Wallet</button>}
            </div>
          }
          <br />
          {
            response && <div className='flow-wrap'>
                <div className="round">3</div>
                { response && <h2>Token Mint Successful</h2> }
                <br />
                {document &&  <img src={document} alt='ipfs link resource' width='600px' /> }
              </div>
          }
          </div>
        </section>
      </main>
    </div>
  )
}

export default Start