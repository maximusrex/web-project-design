//an express server in node.  Serving up and example app that stores data to a json file and lets the user input the json data
//run npm server.js in this folder in your command line to start, and go to http://localhost:3000

//first, require express; a reference to a function that we'll hold in a variable
var express = require('express');
//lets get some things together
console.log('server starting....');
//we have a reference to express, so now create the app. Run the function.
var app = express();
//now listen to a port
// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

//and host files on it.  Serve a static website, for example
//if we want to just serve some static files.
//this tells the app to serve the public folder at port 3000
app.use(express.static('public'));

//this is the standard format for writing get commands
app.get('/myPath', executeWhenPathIsFollowed);

//go to http://localhost:3000/myPath to see what happens
function executeWhenPathIsFollowed(request, response){
    response.send("a command executed!! And we got this back");
}

//or have that path extend to a variable, and send some things back
//go to http://localhost:3000/myPath/someVariable to see the result here
app.get('/myPath/:myVariable/:num', enterVariable);
function enterVariable(request, response){
    //the server will check what's at /:myVariable/30 and send that back.
    var data = request.params;
    var myVariable = data.myVariable;
    //this is the second part of that path, it's expecting a number
    var num = data.num;
    var reply = "";
    //now do that for some unmber 
    for(var i=0;i<num;i++){
        reply += "your variable was: ";
    }
    response.send(reply);
}

//now to make a version of this where the user can send and recieve data with more specific parameters

//or create some data and serve it back (like a score sheet).  But this would be hard-coded into our app
/*var scores = {
    "max": 30,
    "joe": 55,
    "mjs": 20,
    "jfo": 31
}*/
//but what if we want this data to "persist".  And not just a hard coded into our code.  One way to do this is to save a text file or json file and load that when you run the program
//instead of creating that json object, load some json
//need to use the fs module, the file system module built into node
var fs = require('fs');
//read the json file
var scores = fs.readFileSync('scores.json');
//parse it
var scores = JSON.parse(data);
console.log(scores);


//so make a path to get all of this, this whole json object
app.get('/all', sendAll);

function sendAll(request,response){
    response.send(scores);
}

//make a path to add someting to this data.
app.get('/add/:name/:score?', newEntry);

function newEntry(request,response){
    //everytime we go to the above route it will add a score to our database file
    var data = request.params;
    var name = data.name;
    var score = Number(data.score);
    var reply;
    //setup some conditionals in case this does not come in right
    //and reply with json objects
    if(!score){
       var reply = {
           msg: "score is required"
       }
       response.send(reply);
    } else {
        //add the data to the object with name as key and score as value
        scores[name] = score;
        //make it the right format with .stringify, and some formatting options
        var data = JSON.stringify(scores, null, 2);
        //write the new score to the db
        fs.writeFile('scores.json', data, finished);
        
        function finished(err){
            if(err){
                console.log(err);
            } else {
                var reply = {
                msg: "thanks for adding your score",
                newScores: scores
                }
            console.log('thanks for your addition, it worked.')
            }
            response.send(reply);
        }
        
    }
    
}











