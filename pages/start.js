/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import * as IPFS from 'ipfs-core'
import { Navbar } from '../components/Navbar'
import Link from 'next/link'
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const upload = async (title, desc, file) => {
    console.log('Uploading Document to IPFS');
    return new Promise(async (resolve, reject) => {
      const ipfs = await IPFS.create({ repo: 'ipfs-' + Math.random() });
      try {
        // const ipfs = await IPFS.create()
        const filesAdded = await ipfs.add(file);
        console.log('IPFS upload Succesful');
        resolve(filesAdded);
      } catch (ex) {
        console.error(ex)
        reject(ex);
      }
    })
  }

  const worker = async (ipfspath) => { 
    console.log('Started Worker For Minting');

    const CONTRACT = await new web3.eth.Contract(contractABI, contractAddress);
    const metadata = { name: title, description, image: ipfspath, address, mintedAt: new Date().getTime() }
    console.log(address);
    const response = await CONTRACT.methods.mintTo(address, JSON.stringify(metadata)).send({ from: address });
    // setTokenId(response.events.Transfer.returnValues.tokenId);
    console.log('response',response, response.receipt, response.id);
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
    setTitle(title.value);
    setDescription(description.value);
    const id = await upload(title, description, file);
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
          <h2> Upload your Document</h2>
          <br />
          { 
            <form onSubmit={onSubmit}>
            <input type="text" name="title" id="title" placeholder='Title' />
            <input type="text" name="description" id="description" placeholder='Description' />
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
              { Url && <img src={Url} width="300px" height="300px" className="preview-img" alt="Document" /> }
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
                {document &&  <img src={document} className="preview-img" alt='ipfs link resource' /> }
                {
                  document && <Link href="/nfts"><button>View All Signed Documents</button></Link>

                }
              </div>
          }
          </div>
        </section>
      </main>
    </div>
  )
}

export default Start