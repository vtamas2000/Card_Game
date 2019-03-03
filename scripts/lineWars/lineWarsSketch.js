var points = [];
var selectedPoints = [];
var connections = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(45);
    //point = new Point(50, 50);
}

function draw() {
    for(var i = 0; i < points.length; i++){
        points[i].show();
    }

    for(var i = 0; i < connections.length; i++){
        connections[i].show();
    }
}

function mousePressed() {
    for(var i = 0; i < points.length; i++){
        points[i].select();
        if (points[i].selected){
            points[i].selected = false;
            selectedPoints.push(points[i]);
        }
    }

    if (selectedPoints.length === 2){
        var connection = new Connection(selectedPoints[0].x, selectedPoints[0].y, selectedPoints[1].x, selectedPoints[1].y);
        connections.push(connection);
        selectedPoints = [];
    }

    console.log(connections);
    console.log(selectedPoints);
}

function keyPressed() {
    if (keyCode === SHIFT){
        var newPoint = new Point(mouseX, mouseY);
        points.push(newPoint);
        console.log(points);
    }
}