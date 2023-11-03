import Navbar from 'react-bootstrap/Navbar';
import { ethers } from 'ethers';
import logo from '../logo.png';

const Navigation = ({ account, setAccount }) => {
	const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
	}
	return(
	<Navbar>
		<ul className='nav__links'>
			<li><a href='/Buy'>Buy</a></li>
			<li><a href='/Rent'>Rent</a></li>
			<li><a href='/Sell'>Sell</a></li>
		</ul>
		<div className='nav__brand pl-5'>
			<img 
				alt="Kalina" 
				src={ logo } 
				width="40" 
				height="40" 
				className="align-top mx-1"
			/>
			<h1 className='mt-2 ml-2'>Kalina Listing</h1>
		</div>
		{account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}
	</Navbar>			
	)
}

export default Navigation;
