const express = require("express");

// postRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /post.
const postRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the posts.
postRoutes.route("/posts").get(function (req, res) {
	let db_connect = dbo.getDb("myBlog");
	db_connect
		.collection("posts")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single post by id
postRoutes.route("/post/:id").get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("posts").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new post.
postRoutes.route("/create/add").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myobj = {
		post_title: req.body.post_title,
		post_date: req.body.post_date,
		post_content: req.body.post_content,
	};
	db_connect.collection("posts").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//update/edit a post by id
postRoutes.route("/update/:id").post((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			post_title: req.body.post_title,
			post_date: req.body.post_date,
			post_content: req.body.post_content,
		},
	};
	db_connect.collection("posts").updateOne(myquery, newvalues, (err, res) => {
		if (err) throw err;
		console.log(`post ${req.body.post_title} updated`);
		response.json(res);
	});
});

// This section will help you delete a post
postRoutes.route("/:id").delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("posts").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.status(obj);
	});
});

module.exports = postRoutes;
