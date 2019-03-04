var points = [];
var connections = [];
var intersections = [];

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
        for(var j = i + 1; j < connections.length; j++){
            var checkIfActuallyIntersects = connections[i].intersects(connections[j]).doesIntersect;
            if(checkIfActuallyIntersects){
                var x = connections[i].intersects(connections[j]).intersectionX;
                var y = connections[i].intersects(connections[j]).intersectionY;
                var newIntersection = new Intersection(x, y);
                intersections.push(newIntersection);
            }
        }
    }

    for(var i = 0; i < intersections.length; i++){
        intersections[i].show();
    }
}

function mousePressed() {
    var pointToConnect1;
    var pointToConnect2;
    for(var i = 0; i < points.length; i++){
        points[i].select();
        if (points[i].selected && !pointToConnect1){
            pointToConnect1 = points[i];
        } else if (points[i].selected && !pointToConnect2){
            pointToConnect2 = points[i];
        }
    }

    if (pointToConnect1 && pointToConnect2){
        var connection = new Connection(pointToConnect1.x, pointToConnect1.y, pointToConnect2.x, pointToConnect2.y);
        connections.push(connection);
        pointToConnect1.selected = false;
        pointToConnect2.selected = false;
        pointToConnect1 = undefined;
        pointToConnect2 = undefined;
    }

    //console.log(connections);
    console.log(points);
}

function keyPressed() {
    if (keyCode === SHIFT){
        var newPoint = new Point(mouseX, mouseY);
        points.push(newPoint);
        console.log(points);
    }
}