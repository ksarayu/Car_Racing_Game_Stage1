var ball;
var database;
var positionref;
var pos;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    console.log(database);

    positionref = database.ref("ball/position");
    positionref.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function writePosition(x,y){
    var positionref = database.ref("ball/position");
    positionref.set({x: pos.x + x, y: pos.y + y});
}

function readPosition(data){
    pos = data.val();
    ball.x = pos.x;
    ball.y = pos.y;
}

function showError(){
    console.log("There be an error betaaaa");
}
