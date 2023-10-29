import Navbar from 'react-bootstrap/Navbar';

import logo from '../logo.png';

const Navigation = () => {
	return(
	<Navbar>
		<img 
		alt="Kalina" 
		src={ logo } 
		width="40" 
		height="40" 
		className="d-inline-block aligh-top mx-3"
	/>
		<Navbar.Brand href="#" className="fw-light fs-2 text">KalinaListing</Navbar.Brand>
	</Navbar>			
	)
}

export default Navigation;
