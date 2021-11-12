import React, { Component } from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Form from "./components/Form";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Edit from "./components/Edit";
import { Routes, Route } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<div className="container w3-container">
				<Header />
				<Navbar />
				<Routes>
					<Route path="/about" element={<About />} />
					<Route path="/" element={<Posts />} />
					<Route path="/create" element={<Form />} />
					<Route path="/edit/:id" element={<Edit />} />
				</Routes>
			</div>
		);
	}
}

export default App;
