//a photobooth app that posts to

//makes use of the p5.js function saveframes https://p5js.org/reference/#/p5/saveFrames which saves a set of snapshots of the canvas

//variables for video and canvas frame to post
var img;
let imgList = []; //empty array of images for posting on page

let frames = [];

var messageInput;
let dbImages = [];
var cnv;

function setup() {
	cnv = createCanvas(640, 480);

	background(255);
	cnv.parent("canvasDiv");

	textXpos = width / 2;
	textYpos = height / 2;

	//style the header
	var myHeader = select("#photoboothHeader");
	myHeader.style("color:#f7f7f7;");

	pixelDensity(1);
	frameRate(24);

	//buttons for video controls
	var button = createButton("snap");
	button.class("interface");
	button.parent("buttonInterface");
	button.mousePressed(savetheframes);

	var button2 = createButton("post");
	button2.class("interface");
	button2.parent("buttonInterface");
	button2.mousePressed(postTheImage);

	messageInput = select("#message");
}

function mouseDragged() {
	strokeWeight(12);
	stroke(255, 15, 15);
	line(mouseX, mouseY, pmouseX, pmouseY);
}

function savetheframes() {
	//save the frames
	console.log("saving...");
	saveFrames("out", "png", 8, 2, gotData); //change the variables up to get different frames
}

function gotData(data) {
	// clear();
	frames = [];
	var xpos = 0;
	var ypos = 0;
	//save an array of these. Take 16 down to 4
	for (var i = 0; i < data.length; i += 4) {
		var thisRawImage = data[i].imageData;
		console.log(thisRawImage);
		//load each image
		var img = loadImage(thisRawImage);
		frames.push(img);

		image(img, xpos, ypos, width / 2, height / 2);
		xpos = xpos + width / 2;
		if (xpos >= width) {
			xpos = 0;
			ypos = ypos + height / 2;
			if (ypos >= height) {
				ypos = 0;
			}
		}
	}
	//check the frames now
	console.log(frames);
} //end gotData

//post the iamge to twitter
function postTheImage() {
	//run save frames again to save the new canvas with 4 pics, but with a different setting
	saveFrames("out", "png", 1, 2, gotPostFrame);

	function gotPostFrame(data) {
		console.log("image generated from canvas, sending");
		//use http post to post this to the server with our path
		var rawImage = data[0].imageData;
		//console.log(rawImage);
		//split this string to send to twitter
		var imgString = rawImage.split(",");
		//the base 64 string with no header will be at the second position of this array
		var imgTweet = imgString[1];
		//get the text
		var tweetText = messageInput.value(); //should probably check this at some point to make sure no one inputs sth funky
		//format it as an object
		//let's make a key, too
		var tweetData = {
			text: tweetText,
			img: imgTweet,
		};

		var JSONtweetData = JSON.stringify(tweetData);
		console.log(JSONtweetData);
		//console.log(tweetData);
		//send that to the server with httpPost: https://p5js.org/reference/#/p5/httpPost
		//this is another p5.js function to make a post request. You could also do this with vanilla js

		httpPost("/tweetPic", tweetData, tweetPosted, tweetError);
	}

	function tweetPosted(data) {
		console.log(data);
	}
	function tweetError(err) {
		console.log(err);
	}
}
