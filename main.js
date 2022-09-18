noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
rightWristX = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(550,550);
    canvas.position(560,150);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    background('#f2f0c7');
    document.getElementById("square_side").innerHTML = "Width and height of the square will be "+difference +"px";
    fill('#b51f4e');
    stroke('#b51f4e');
    square(noseX,noseY,difference);

}

function modelLoaded(){
    console.log('Posenet model is initialized');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose x = "+noseX +", nose y = "+noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX-rightWristX);
        console.log("left wrist x = "+leftWristX+ ", right wrist x = "+rightWristX +", difference = "+difference);
        
    }
}