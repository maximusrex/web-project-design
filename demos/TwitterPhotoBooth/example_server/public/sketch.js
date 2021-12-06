//how do we get information loaded to from the server?
var nameInput;
var scoreInput;

function setup(){
    //createCanvas(400,400);
    //background(51);
    //access that file on the server with a simple loadJSON to that path
    //loadJSON('all',gotData);
    
    var button = select('#submit');
    button.mousePressed(submitData);
    nameInput = select('#name');
    scoreInput = select('#score');
    //call the function to draw the initial data
    drawData();
}

function drawData(){
    //just so we have a function to draw our data to the canvas that we can redo when we get more data
    loadJSON('all',gotData);
}

function gotData(data){

    //background(51);
    console.log(data);
    //this serves back an object.  it's not an array
    //so we have to traverse it like in the firebase object
    //grab the keys - the object is a series of key-value pairs
    var keys = Object.keys(data);
    console.log(keys);//gives you an array of keys
    //clear the canvas
    myDiv = createDiv();
    myDiv.id('scores')
    for(var i=0;i<keys.length;i++){
        //the name is the key
        var name = keys[i];
        //score is the value of the key, what's the value at each name?
        var score = data[name];
        var newP = createP(name + ': ' + score);
        newP.parent('scores');
    }
}

//what happens when we hit submitData?
function submitData(){
    //get the data
    var name = nameInput.value();
    var score = scoreInput.value();
    //well here we're using a get request to send data.  In other scenarios, we're going to use a post. 
    loadJSON('add/' + name + '/' + score, finished);
    function finished(data){
        console.log(data);
        //draw the canvas again
        clearTheP();//clear that div out
        drawData();
    }
}

function clearTheP(){
    //remove the scores div.  We'll redraw it in GotData
    var myDiv = select('#scores');
    //grab the node list of elements
    myDiv.remove();
    
}