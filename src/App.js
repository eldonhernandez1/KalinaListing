import { useEffect, useState } from 'react';
import { ethers } from 'ethers'

// Components
import Home from './components/Home';
import Navigation from './components/Navigation';
import Search from './components/Search';

// ABIs
import Escrow from '../src/abis/Escrow.json'
import RealEstate from '../src/abis/RealEstate.json'

// Config
import config from '../src/config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)
  const [totalSupply, setTotalSupply] = useState(3)

  const [account, setAccount] = useState(null)
  const [homes, setHomes] = useState([])
  const [home, setHome] = useState([])
  const [toggle, setToggle] = useState(false)

  // Load Blockchain Data
  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    console.log(provider)

    const {chainId} = await provider.getNetwork()

    const realEstate = new ethers.Contract(config[chainId].realEstate.address, RealEstate, provider)
    
    try {
      const totalSupply = await realEstate.totalSupply();
      setTotalSupply(totalSupply)

    } catch (error) {
      console.error("Error fetching totalSupply:", error);
    }
    console.log(totalSupply)
    const homes = []
    
    for (var i = 1; i <= totalSupply; i++) {
      try {
        const uri = await realEstate.tokenURI(i);
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const metadata = await response.json();
        homes.push(metadata);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    }
    setHomes(homes);

    const escrow = new ethers.Contract(config[chainId].escrow.address, Escrow, provider)
    setEscrow(escrow)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const toggleProp = (home) => {
    setHome(home)
    toggle ? setToggle(false) : setToggle(true);
  }

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <Search />
      <div className='cards__section'>
      <h2 className="m-4 text-center">This is Kalina Listing, an exciting way to mint Real Estate NFTs on the blockchain. Easily mint your NFT for homeownership.</h2>
      <h3>Homes For Sale</h3>

      <hr />

      <div className='cards'>
          {homes.map((home, index) => (
            <div className='card' key={index} onClick={() => toggleProp(home)}>
              <div className='card__image'>
                <img src={home.image} alt="Home" />
              </div>
              <div className='card__info'>
                <h4>.{home.attributes[0].value} ETH</h4>
                <p>
                  <strong>{home.attributes[1].value}</strong> bds |
                  <strong>{home.attributes[2].value}</strong> ba |
                  <strong>{home.attributes[3].value}</strong> sqft
                </p>
                <p>{home.address}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      {toggle && ( // Conditionally render Home based on isHomeVisible state
        <Home
          home={home}
          provider={provider}
          account={account}
          escrow={escrow}
          toggleProp={toggleProp}
        />
      )}
    </div>
  );
}

export default App;
