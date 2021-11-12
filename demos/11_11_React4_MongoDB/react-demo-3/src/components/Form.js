import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
	//this is a constructor to bind our data to the methods
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

	//These methods update the state properties
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

		const newpost = {
			post_title: this.state.post_title,
			post_date: this.state.post_date,
			post_content: this.state.post_content,
		};
		axios.post("http://localhost:5000/create/add", newpost).then((res) => {
			console.log(res.data);
		});
		this.setState({
			post_title: "",
			post_date: "",
			post_content: "",
		});
	}

	render() {
		const { title, date, content } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					value={title}
					onChange={this.onChangePostTitle}
				/>
				<label htmlFor="date">Date (mm-dd-yy)</label>
				<input
					type="text"
					name="date"
					id="date"
					value={date}
					onChange={this.onChangePostDate}
				/>
				<label htmlFor="content">Content</label>
				<textarea
					type="text"
					name="content"
					id="content"
					rows="5"
					cols="40"
					value={content}
					onChange={this.onChangePostContent}
				/>
				<input type="submit" value="create post" />
			</form>
		);
	}
}

export default Form;
