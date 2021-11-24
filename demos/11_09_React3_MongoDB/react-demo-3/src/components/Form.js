import React, { Component } from "react";

class Form extends Component {
	initialState = {
		title: "",
		date: "",
		content: "",
	};
	state = this.initialState;

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

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
