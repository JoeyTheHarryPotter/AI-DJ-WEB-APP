score_leftWrist = 0;
score_rightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song = "";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 500, 500);

    fill('#ff0000');
    stroke('#ff0000');
    
    if(score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML="Volume: " + volume;
        song.setVolume(volume);
    }

    if(score_rightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML="Speed: 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML="Speed: 1.0x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML="Speed: 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML="Speed: 2.0x";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed").innerHTML="Speed: 2.5x";
            song.rate(2.5);
        }
    }
}

function play(){
    song.play();

    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("PoseNet Initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X Position: " + leftWristX + " Left Wrist Y Position: " + leftWristY);
        console.log("Right Wrist X Position: " + rightWristX + " Right Wrist Y Position: " + rightWristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score/Accuracy/Confidence: " + score_leftWrist);

        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score/Accuracy/Confidence: " + score_rightWrist);
    }
}