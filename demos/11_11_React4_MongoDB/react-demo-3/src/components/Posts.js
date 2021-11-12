import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//the single post
const Post = (props) => (
	<div className="w3-card w3-panel postMain">
		<h2>{props.post.post_title}</h2>
		<span className="post-date">{props.post.post_date}</span>
		<div className="post-content">{props.post.post_content}</div>
		<Link className="w3-button w3-blue" to={"/edit/" + props.post._id}>
			Edit
		</Link>
		<a
			className="w3-button w3-red"
			href="/"
			onClick={() => {
				props.deletePost(props.post._id);
			}}
		>
			Delete
		</a>
	</div>
);

//Component to list all the posts
class Posts extends Component {
	//constructor to store data
	constructor(props) {
		super(props);
		//first,delete method
		this.deletePost = this.deletePost.bind(this);
		this.state = { posts: [] };
	}
	//get data from db
	componentDidMount() {
		axios
			.get("http://localhost:5000/posts/")
			.then((response) => {
				console.log(response);
				this.setState({ posts: response.data });
				console.log(this.state.posts);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	//delete a record
	deletePost(id) {
		axios.delete("http://localhost:5000/" + id).then((response) => {
			console.log(response.data);
		});
		//reset the state
		this.setState({
			post: this.state.posts.filter((el) => el._id !== id),
		});
	}
	//The method to map all the posts and make a Post for ea
	postList() {
		return this.state.posts.map((currentpost) => {
			console.log(currentpost);
			return (
				<Post
					post={currentpost}
					deletePost={this.deletePost}
					key={currentpost._id}
				/>
			);
		});
	}
	//render the postList
	render() {
		return (
			<div className="w3-container postsMain">
				<h1>Posts</h1>
				<div className="w3-container postList">{this.postList()}</div>
			</div>
		);
	}
}
export default Posts;
