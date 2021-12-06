//a photobooth app that posts to twitter

//variables for video and canvas frame to post
var img;
var video;
let imgList = [];//empty array of images for posting on page

//animate text on arrival
var textXpos;
var textYpos;

let xspeed = 2.8; // Speed of the shape
let yspeed = 2.2; // Speed of the shape

let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom
let rad = 200;

let frames = [];

//setup Twitter stuff
var consumerKey = "vSYV7WwRyBCO94PvRSv1igX2R";
var consumerSecret = "7vj4ryZKvu0INFthaj7e61tDzB7CmqmRHTS8EEOTyMmSYipl1R";

var token = "805832107973033984-OXHKmsWAGocUQtx1ufSTlBWRZBimr6J";
var tokenSecret = "a8H6KZx3dY2XQ0HMKbF0Sm6SCj1Z8NtyJ0jHGCI6Mn8S7";

var cb = new Codebird();

//vars for image posting to canvas
var xpos = 0;
var ypos = 0;

//config for firebase
 var config = {
    apiKey: "AIzaSyAWexnWcOLH9qiJCH0nsspXR0UmKllZ050",
    authDomain: "demo2-ea67a.firebaseapp.com",
    databaseURL: "https://demo2-ea67a.firebaseio.com",
    projectId: "demo2-ea67a",
    storageBucket: "demo2-ea67a.appspot.com",
    messagingSenderId: "86217573672"
  };
var database;

var messageInput;
let dbImages = [];


//bool for camMode, initial value is false so user has to turn on
camOn = false;
var camButton;

function setup() {
  var cnv = createCanvas(640, 480);
    

    background(255);
    cnv.parent('canvasDiv');
    
    //initial animation vars
    textXpos=width/2;
    textYpos=height/2;
    
    //style the header
    var myHeader = select('#photoboothHeader');
    myHeader.style('color:#f7f7f7;')

    pixelDensity(1);
    frameRate(24);
    video = createCapture(VIDEO);

    video.size(width/4, height/4);
    video.parent('#container');
    video.style('position:fixed;top:0;left:40;')
    //video.hide();

    //setup twitter
    cb.setConsumerKey(consumerKey, consumerSecret);
    cb.setToken(token, tokenSecret);
    cb.setUseProxy(false);
    
    
    //setup firebase
    firebase.initializeApp(config);
    database = firebase.database();

    //buttons for video controls
    var button = createButton('snap');
    button.class('interface');
    button.parent('buttonInterface');
    button.mousePressed(savetheframes);
    
    var button2 = createButton('post');
    button2.class('interface');
    button2.parent('buttonInterface');
    button2.mousePressed(postTheImage);
    
    camButton = createButton('Cam Mode');
    camButton.class('interface');
    camButton.parent('buttonInterface');
    camButton.mousePressed(camMode);
    
    messageInput = select('#message');
    
    var dbButton = createButton('Send to DB');
    dbButton.class('interface');
    dbButton.parent('buttonInterface');
    dbButton.mousePressed(dbSubmit);
    
    //finally, display whatever saved frames from previous users with a db call
    loadFirebaseImages();
    
}


/*function mouseDragged(){
    strokeWeight(12);
    stroke(255,15,15);
    line(mouseX,mouseY,pmouseX,pmouseY);
}*/

function loadFirebaseImages(){
    var ref = database.ref('savedFrames');
    ref.on("value",gotFirebaseImages,errData);  
}

function errData(error){
    console.log("image call didn't work");
    console.log(error);
}

function gotFirebaseImages(images){
    var savedImages = images.val();
    //clear the list of images
    clearList();
    console.log(savedImages);
    //now make an img element with each one of these
    var keys = Object.keys(savedImages);
    console.log(keys);
    
    var list = createElement('ul');
    list.parent('photoreel');
    list.id('photoReelList');
    var imgIndex = 0;
    for(var i=0;i<keys.length;i++){
        var key = keys[i];
        var image = savedImages[key];
        var imgTag = createImg(image.image);
        imgTag.size(160,120);
        var li = createElement('li');
        //createId
        var thisId = 'imageLI' + imgIndex;
        li.parent('photoReelList')
        li.id(thisId);
        imgTag.parent(thisId); 
        //imgTag.parent('photoreel');
        //push to the array to index
        imgList.push(li);
        imgIndex++
    }
    
}

function clearList(){
    for(var i=0;i<imgList.length;i++){
        imgList[i].remove();
    }
}

function dbSubmit(){
    saveFrames('out', 'png', 1, 2, gotDBData);//change this up to get different 
    
    function gotDBData(canvasFrame){
        //format the data to send to db as "imageData", "message"
        var imageData = canvasFrame[0].imageData;
        var messageData = messageInput.value();
        
        //reference firebase
        var savedFrames = database.ref('savedFrames');
        
        var sendData = {
            image: imageData,
            message: messageData
        }
        var savedFrame = savedFrames.push(sendData, finished);
        
        function finished(err){
            if(err){
                console.log(err);
            } else {
                console.log('Data Saved!');
            }
        }
    }
}

function camMode() {
    //switch camera mode
    if(camOn==false){
        camOn = true;
    camButton.addClass('active');    
    }
}

function draw() {
    //conditionals to control the draw view
    if(camOn===true&&frames.length<4){
        //if there's no images and the cam is on
        image(video,0,0,width,height);
    } else if(camOn===true&&frames.length>0) {
        //if there's images and the cam is on
        //put the cam image on
        image(video,0,0,width,height);
    } else if(camOn===false&&frames.length>0) {
        //if the cam is off and there's images
        for(var i=0;i<frames.length;i++){
            //console.log(frames[i]);
            image(frames[i],xpos,ypos,width/2,height/2);
            xpos = xpos + width/2;
            if(xpos>=width){
                xpos = 0;
                ypos = ypos + height/2;
                if(ypos>=height){
                    ypos = 0;
                }
            }
        }
    } else {
        //the cam is off and there's no images.  initial condition
        background(45);
        stroke('#fff');
        fill('#fff');
        textSize(32);
        

        textXpos = textXpos + xspeed * xdirection;
        textYpos = textYpos + yspeed * ydirection;
        
        if(textXpos>width-rad||textXpos<rad){
            xdirection*= -1;
        }
        if(textYpos>height-rad||ypos<rad){
            ydirection*= -1;
        }
        //draw the text
        text('Click the cam button to turn the camera on',textXpos,textYpos,200,200);
    }
    
}

function savetheframes(){
        //save the frames
        console.log('saving...');
        saveFrames('out', 'png', 8, 2, gotData);//change the variables up to get different frames
}

function gotData(data){
    //rest frames
    camOn = false;
    camButton.removeClass('active');
    clear();
    frames = [];
        //save an array of these. Take 16 down to 4
        for(var i=0;i<data.length;i+=4){
            var thisRawImage = data[i].imageData;
            //load each image
            var img = loadImage(thisRawImage);
            frames.push(img);
            //put a div with each here for selector
        }
        //check the frames now
        console.log(frames);
            
}//end gotData

//post the iamge to twitter
function postTheImage(){
    
    //run save frames again to save the new canvas, but with a different setting
    saveFrames('out', 'png', 1, 2, gotPostFrame);//change this up to get different
    
    console.log("generating image...");
    
    function gotPostFrame(data){
        console.log('making image string...')
        console.log(data[0]);
        var postImgRaw = data[0].imageData;
        var postImgArray = postImgRaw.split(',');
        var postImg = postImgArray[1];

        var params = {"media_data": postImg}
        //upload media
        console.log(' making the call...')
        cb.__call(
        "media_upload",
        params,
        function(reply,rate,err){
            if(err){
                console.log(err);             
            }else{
                console.log(reply);
                mediaString = reply.media_id_string;

                var newParams = {
                    media_ids: mediaString,
                    status: "another image post"
                }
                cb.__call("statuses_update", newParams, function(reply,rate,err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('image posted!');
                        console.log(reply);
                    }
                });
            }
        });
    }
}

