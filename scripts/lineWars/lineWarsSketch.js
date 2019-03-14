var points = [];
var connections = [];
var intersections = [];
var turnsMade = 0;
var player1Color;
var player2Color;

function setup() {
    createCanvas(windowWidth, windowHeight);
    player1Color = color(52, 26, 219, 255);
    player2Color = color(232, 110, 69, 255);
}

function draw() {
    background(45);
    for(var i = 0; i < points.length; i++){
        points[i].show();
        points[i].update(connections);
    }

    for(var i = 0; i < connections.length; i++){
        connections[i].show();
        connections[i].update(intersections);
    }

    for(var i = 0; i < intersections.length; i++){
        intersections[i].show();
    }
}

function mousePressed() {
    var pointToConnect1;
    var pointToConnect2;
    intersections = [];

    for(var i = 0; i < points.length; i++){
        points[i].select();
        if (points[i].selected && !pointToConnect1){
            pointToConnect1 = points[i];
        } else if (points[i].selected && !pointToConnect2){
            pointToConnect2 = points[i];
        }
    }

    if (pointToConnect1 && pointToConnect2){
        var connection = new Connection(pointToConnect1, pointToConnect2);
        connections.push(connection);
        pointToConnect1.selected = false;
        pointToConnect2.selected = false;
        pointToConnect1 = undefined;
        pointToConnect2 = undefined;
    }

    for(var i = 0; i < connections.length; i++){
        for(var j = i + 1; j < connections.length; j++){
            if(connections[i].intersects(connections[j]).doesIntersect){
                var x = connections[i].intersects(connections[j]).intersectionX;
                var y = connections[i].intersects(connections[j]).intersectionY;
                var newIntersection = new Intersection(x, y, connections[i], connections[j]);
                intersections.push(newIntersection);
            }
        }
    }

    //console.log(connections);
    //console.log(points);
    console.log(intersections);
}

function keyPressed() {
    if (key == 'y'){
        var newPoint = new Point(mouseX, mouseY, 1, player1Color);
        points.push(newPoint);
        //console.log(1/0);
    }

    if (key == 'x'){
        var newPoint = new Point(mouseX, mouseY, 2, player2Color);
        points.push(newPoint);
    }
}