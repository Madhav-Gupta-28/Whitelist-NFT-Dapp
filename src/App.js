import React , {useState , useEffect } from 'react'
import "./App.css"
import { address } from './constant/address'
import abi from "./constant/Whitelist.json"
import Web3Modal from "web3modal"
import {ethers} from "ethers"

const App = () => {
  const [numberofWhiteListed , setnumberofWhiteListed] = useState(0);
  const [account , setaccount] = useState();
  const [walletconnected , setwalletconnected] = useState(false)
  const [hasjoinedWhitelist, sethasJoinedWhitelist] = useState(false);
  const [loading , setloading] = useState(false)



  // renders the button 
  const renderButton = () => {
    if (walletconnected) {
      if (hasjoinedWhitelist) {
        return (
          <div className={"description"}>
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return <button className={"button"}>Loading...</button>;
      } else {
        return (
          <button  onClick={joinWhiteList} className={"button"}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectMetamask} className={"button"}>
          Connect your wallet
        </button>
      );
    }
  };
  // it connect the metamask 

  const connectMetamask = async() =>{
    // check for mumbai chain
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if(chainId !== '0x13881')
    {
      alert('Swicth Network to Mumbai')
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
     })
    }else{
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setaccount(accounts[0]);
      console.log(account)
      // window.location.replace(location.pathname)
      setwalletconnected(true)
      getNumberOfWhitelisted()
      checkIfAddressInWhitelist()
    }

  }


  // joinWhiteList function

  const joinWhiteList = async() => {
    const provider  = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const whitelistnft = new ethers.Contract("0xBcF7b0FBDa0E44f33bC97228B1c9840378739b4c",abi.abi,signer)

    const tx = await whitelistnft.addAddressToWhitelist();
    console.log(tx);
    alert("Added to Whitelist Succesfully")
  }

  const getNumberOfWhitelisted = async () => {
    try {
      const provider  = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const whitelistnft = new ethers.Contract("0xBcF7b0FBDa0E44f33bC97228B1c9840378739b4c",abi.abi,signer)
      const _numberOfWhitelisted =
        await whitelistnft.numAddressesWhitelisted();
      setnumberofWhiteListed(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfAddressInWhitelist = async () => {
    try {
      const provider  = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const whitelistnft = new ethers.Contract("0xBcF7b0FBDa0E44f33bC97228B1c9840378739b4c",abi.abi,signer)
      const address = await signer.getAddress();
      // call the whitelistedAddresses from the contract
      const _joinedWhitelist = await whitelistnft.whitelistedAddresses(
        address)
        sethasJoinedWhitelist(_joinedWhitelist)
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
  },[walletconnected])

 

  return (
    <>
    <div className='main'>

   
      <div className='header'>
        <div className='heading'>
          <h1>AIFT</h1>
        </div>
 
          <button onClick={connectMetamask} className='btn'>{walletconnected ? "Connected" : "Connect"}</button>

      </div>
    <div className='content'>
      <div className='main'>
        <h1>
          Welcome to <span>AIFT</span> World
        </h1>
        <p>It is an <span>Amazing</span> <span>AI Generated </span>NFT Marketplace</p>
        <p>For Early 10 User there is gonna to a Free NFT Minted Program </p>
        <p>So What are you waiting for <span>{numberofWhiteListed}</span> People have already Joined.</p>
        <div>
          {renderButton()}
        </div>

      </div>
    </div>
    </div>
    </>
  )
}

export default App