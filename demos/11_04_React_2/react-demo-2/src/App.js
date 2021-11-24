import React, { Component } from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Form from "./components/Form";
import { Routes, Route } from "react-router-dom";

class App extends Component {
	state = {
		posts: [],
	};
	//a function to remove posts
	removePost = (index) => {
		const { posts } = this.state;

		this.setState({
			posts: posts.filter((post, i) => {
				return i !== index;
			}),
		});
	};
	//a function to add the post to the data set when submitted
	handleSubmit = (post) => {
		this.setState({ posts: [...this.state.posts, post] });
	};

	render() {
		//rendering the elements and passing data to components
		const { posts } = this.state;
		return (
			<div className="container w3-container">
				<Header />
				<Posts postdata={posts} removePost={this.removePost} />
				<Form handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}

export default App;
