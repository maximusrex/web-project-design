import React, { Component } from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Form from "./components/Form";

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
				<Posts postdata={posts} removePost={this.removePost} />
				<Form handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}

export default App;
