import React, { Component } from "react";
//The form for submitting posts
class Form extends Component {
	//set the initial state
	initialState = {
		title: "",
		date: "",
		content: "",
	};
	state = this.initialState;
	//what to do when the values change
	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};
	//when form submits, set values to state
	submitForm = () => {
		this.props.handleSubmit(this.state);
		this.setState(this.initialState);
	};

	render() {
		const { title, date, content } = this.state;
		return (
			<form>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					value={title}
					onChange={this.handleChange}
				/>
				<label htmlFor="date">Date (mm-dd-yy)</label>
				<input
					type="text"
					name="date"
					id="date"
					value={date}
					onChange={this.handleChange}
				/>
				<label htmlFor="content">Content</label>
				<textarea
					type="text"
					name="content"
					id="content"
					rows="5"
					cols="40"
					value={content}
					onChange={this.handleChange}
				/>
				<input type="button" value="submit" onClick={this.submitForm} />
			</form>
		);
	}
}

export default Form;
