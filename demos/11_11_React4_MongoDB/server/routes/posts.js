const express = require("express");
const postRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//the route to get all the posts .find({}) is for finding and the object is empty to get everything
postRoutes.route("/posts").get((req, res) => {
	let db_connect = dbo.getDb("blog");
	db_connect
		.collection("posts")
		.find({})
		.toArray((err, result) => {
			if (err) throw err;
			res.json(result);
		});
});
//route to add a new post.  This will pass data through myobj, received from the frontend thru the req.body.  we'll have to set up to send this data from the front end
postRoutes.route("/create/add").post((req, response) => {
	let db_connect = dbo.getDb();
	let myobj = {
		post_title: req.body.post_title,
		post_date: req.body.post_date,
		post_content: req.body.post_content,
	};
	db_connect.collection("posts").insertOne(myobj, (err, res) => {
		if (err) throw err;
		response.json(res);
	});
});

// the route to get a single post. in the front, we'll use the _id that comes along with each post to pass the :id through the route
postRoutes.route("/post/:id").get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("posts").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

//the route to delete a post.  Here we use the ObjectId to pass the correct id to _id (which is how the db calls it)
postRoutes.route("/:id").delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("posts").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.status(obj);
	});
});

//the route to update/edit posts.  This also uses ObjectID and a query to search the _id values for the correct post  .updateOne updates, like insertOne inserted.  We pass it the newvalues object with $set to set the new values
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

module.exports = postRoutes;
