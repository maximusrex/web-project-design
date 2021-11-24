import React from "react";

const PostBody = (props) => {
	const posts = props.postdata.map((post, index) => {
		return (
			<div key={index} className="postContainer w3-panel w3-card">
				<h1>{post.title}</h1>
				<p className="postDate">{post.date}</p>
				<div className="postContent">{post.content}</div>
				<button
					className="w3-button w3-round-xlarge w3-light-blue w3-hover-blue"
					onClick={() => props.removePost(index)}
				>
					Delete Post
				</button>
			</div>
		);
	});

	return <div className="postsMain">{posts}</div>;
};

const Posts = (props) => {
	const { postdata, removePost } = props;
	return (
		<div className="w3-conatiner">
			<PostBody postdata={postdata} removePost={removePost} />
		</div>
	);
};

export default Posts;
