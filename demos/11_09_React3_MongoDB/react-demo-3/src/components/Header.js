import React, { Component } from "react";

const siteName = "Max's Website";

const Title = () => {
	return <h1>{siteName}</h1>;
};

//simple component
const Tagline = () => {
	return <p className="tagline">the greatest site in the world</p>;
};

//class component
class Header extends Component {
	render() {
		return (
			<div className="myHeader w3-panel w3-light-blue">
				<Title />
				<Tagline />
			</div>
		);
	}
}

export default Header;
