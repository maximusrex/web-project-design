import React, { Component } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

let params, navigate;

const withRouter = (WrappedComponent) => (props) => {
	params = useParams();
	navigate = useNavigate();
	return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

class Edit extends Component {
	//capture that data
	constructor(props) {
		super(props);
		this.onChangePostTitle = this.onChangePostTitle.bind(this);
		this.onChangePostDate = this.onChangePostDate.bind(this);
		this.onChangePostContent = this.onChangePostContent.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			post_title: "",
			post_date: "",
			post_content: "",
		};
	}
	//get the post based on ID
	componentDidMount() {
		axios
			.get("http://localhost:5000/post/" + params.id)
			.then((response) => {
				this.setState({
					post_title: response.data.post_title,
					post_date: response.data.post_date,
					post_content: response.data.post_content,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	onChangePostTitle(e) {
		this.setState({
			post_title: e.target.value,
		});
	}

	onChangePostDate(e) {
		this.setState({
			post_date: e.target.value,
		});
	}

	onChangePostContent(e) {
		this.setState({
			post_content: e.target.value,
		});
	}
	onSubmit(e) {
		e.preventDefault();
		const newEditedPost = {
			post_title: this.state.post_title,
			post_date: this.state.post_date,
			post_content: this.state.post_content,
		};
		axios
			.post("http://localhost:5000/update/" + params.id, newEditedPost)
			.then((res) => {
				console.log(res.data);
			});
		navigate("/");
	}
	render() {
		return (
			<div className="w3-container">
				<h3>Edit Post</h3>
				<form onSubmit={this.onSubmit}>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={this.state.post_title}
						onChange={this.onChangePostTitle}
					/>
					<label htmlFor="date">Date (mm-dd-yy)</label>
					<input
						type="text"
						name="date"
						id="date"
						value={this.state.post_date}
						onChange={this.onChangePostDate}
					/>
					<label htmlFor="content">Content</label>
					<textarea
						type="text"
						name="content"
						id="content"
						rows="5"
						cols="40"
						value={this.state.post_content}
						onChange={this.onChangePostContent}
					/>
					<input type="submit" value="update post" />
				</form>
			</div>
		);
	}
}

export default withRouter(Edit);
