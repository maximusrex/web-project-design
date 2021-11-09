import React, { Component } from "react";

const Description = () => {
	return (
		<div className="about-main">
			<p>
				This is where I'd put information about my site! Like a an about me or
				anything else.
			</p>
		</div>
	);
};

//class component
class About extends Component {
	render() {
		return (
			<div className="about w3-panel w3-card">
				<h1>About this Site</h1>
				<Description />
			</div>
		);
	}
}

export default About;
