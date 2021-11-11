import React, { Component } from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Form from "./components/Form";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

class App extends Component {
	state = {
		posts: [],
	};

	removePost = (index) => {
		const { posts } = this.state;

		this.setState({
			posts: posts.filter((post, i) => {
				return i !== index;
			}),
		});
	};

	handleSubmit = (post) => {
		this.setState({ posts: [...this.state.posts, post] });
	};

	render() {
		const { posts } = this.state;
		return (
			<div className="container w3-container">
				<Header />
				<Navbar />
				<Routes>
					<Route path="/about" element={<About />} />
					<Route
						path="/"
						element={<Posts postdata={posts} removePost={this.removePost} />}
					/>
					<Route
						path="/create"
						element={<Form handleSubmit={this.handleSubmit} />}
					/>
				</Routes>
			</div>
		);
	}
}

export default App;
