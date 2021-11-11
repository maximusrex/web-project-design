import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

let params, navigate;
const withRouter = (WrappedComponent) => (props) => {
	params = useParams();
	navigate = useNavigate();
	console.log(params);
	return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

class Edit extends Component {
	// This is the constructor that stores the data.
	constructor(props) {
		super(props);
		console.log(props);
		this.onChangePostTitle = this.onChangePostTitle.bind(this);
		this.onChangePostDate = this.onChangePostDate.bind(this);

		this.onChangePostContent = this.onChangePostContent.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			post_title: " ",
			post_date: " ",
			post_content: " ",
		};
	}
	// This will get the record based on the id from the database.
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
			.catch(function (error) {
				console.log(error);
			});
	}

	// These methods will update the state properties.
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
	// This function will handle the submission.
	onSubmit(e) {
		e.preventDefault();
		const newEditedPost = {
			post_title: this.state.post_title,
			post_date: this.state.post_date,
			post_content: this.state.post_content,
		};
		console.log(newEditedPost);

		// This will send a post request to update the data in the database.
		axios
			.post("http://localhost:5000/update/" + params.id, newEditedPost)
			.then((res) => console.log(res.data));

		navigate("/");
	}

	// This following section will display the update-form that takes the input from the user to update the data.
	render() {
		return (
			<div>
				<h3 align="center">Update Post</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Post Title: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.post_title}
							onChange={this.onChangePostTitle}
						/>
					</div>
					<div className="form-group">
						<label>Date (mm/dd/yyyy): </label>
						<input
							type="text"
							className="form-control"
							value={this.state.post_date}
							onChange={this.onChangePostDate}
						/>
					</div>
					<div className="form-group">
						<label>What do you want to say? </label>
						<textarea
							className="form-control"
							id="exampleFormControlTextarea1"
							rows="5"
							value={this.state.post_content}
							onChange={this.onChangePostContent}
						></textarea>
					</div>
					<br />

					<div className="form-group">
						<input
							type="submit"
							value="Update Post"
							className="btn btn-primary"
						/>
					</div>
				</form>
			</div>
		);
	}
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(Edit);
