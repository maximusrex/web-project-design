//an express server that performs our twitter bot operations and stores files for the Twitter Photobooth
//require express server
var express = require('express');
//require this body parser.  Will need this later
var bodyParser = require('body-parser');
//let us know the server is starting
console.log('server starting');
//run an instance of express and store it in the app variable.
var app = express();

//now listen to a port
var server = app.listen(process.env.Port || 3000, listen);
//callback function once that connection is made
function listen(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Photobooth app listening at http://' + host + ':' + port);
}


//setup twitter stuff.  first, an instance of twitter
var Twit = require('twit');
var config = require('./config');
//make a new twit object with our config file.  This contains the login information!
var T = new Twit(config);

//now, on the client end serve the public folder
app.use(express.static('public'));
//after we've asked the app to use the public folder, we need to parse data coming from this folder in post requests
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

//we'll also want to save the data we get back from users to post to the page
//require fs
var fs = require('fs');
//read the json file
var data = fs.readFileSync('drawingDB.json');
//parse it
var drawingDB = JSON.parse(data);
console.log(drawingDB);

//the section below adds "paths" to the app.  The path requested on the front-end will be followed here, and the code for that path executed
        /*//simple post to twitter looks like this
        
        T.post('statuses/update', {status: 'hello world!'}, function(err,data,response){
            console.log(data);
        });*/
//tie this into the app by setting up paths

//path to send a media post to twitter
//using a post request because this will come with httpPost from p5.js
app.post('/tweetPic', tweetPic);

function tweetPic(request,response) {
    //eventually, we'll want to reply to the front end
    var reply;
        //this is what happens when the frontend client posts to the path /tweetPic
        //this is gonna be huge.  But there's a node package that will help parse it  add npm package body-parser as part of this project; and ask for the .body
        console.log(request);

        //our things that we need are at
        var tweetText = request.body.text;
        var tweetImg = request.body.img;
    
        console.log(tweetText);
        console.log(tweetImg);
    
        var reply = 'thanks for your image'
        
        //now, post that to twitter.
        T.post('media/upload', {media_data:tweetImg}, uploaded);
        
        function uploaded(err,data,response){
            if(err){
                console.log(err);
            } else {
            //what data do we get back from twitter?
            //console.log(data);    
            var mediaIdStr = data.media_id_string;
            var params = {status: tweetText, media_ids: [mediaIdStr]}
            
            T.post('statuses/update', params, tweeted);
                
                function tweeted(err,data,response){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(response);
                        
                    }
                }
                
            }
        }
    //now here, at the end of all this - send a response.
    response.send = reply;
}

//now to save an image to the db.
app.get('/saveToDB', saveToDB);

function saveToDB(request,response){
    console.log(request);
    //get the stuff
    var tweetText = request.body.text;
    var tweetImg = request.body.img;
    
    
}



        