import React, { Component } from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Form from "./components/Form";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

//change to remove data from this, add to other routes

class App extends Component {
	render() {
		return (
			<div className="container w3-container">
				<Header />
				<Navbar />
				<Routes>
					<Route path="/" element={<Posts />}></Route>
					<Route path="/create" element={<Form />}></Route>
					<Route path="/about" element={<About />}></Route>
				</Routes>
			</div>
		);
	}
}

export default App;
