import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="w3-bar w3-light-gray">
			<Link className="w3-bar-item w3-button" to="/">
				Posts{" "}
			</Link>
			<Link className="w3-bar-item w3-button" to="/create">
				Create New Post{" "}
			</Link>
			<Link className="w3-bar-item w3-button" to="/about">
				About Me{" "}
			</Link>
		</div>
	);
}
export default Navbar;
