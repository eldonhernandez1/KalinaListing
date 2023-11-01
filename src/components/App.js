import { useEffect, useState } from 'react';
import { ethers } from 'ethers'

// Components
import Navigation from './Navigation';
import Search from './Search';
import Progress from './Progress';
import Info from './Info';

// ABIs
import Escrow from '../abis/Escrow.json'
import RealEstate from '../abis/RealEstate.json'

// Config
import config from '../config.json';

function App() {
  const [account, setAccount] = useState(null)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <hr /> {/*  I may remove this horizontal rule */}
     
      <h2 className='my-4 text-center'>Introducing an exciting way to mint Real Estate NFTs on the blockchain</h2>
    </div>
  );
}

export default App;
