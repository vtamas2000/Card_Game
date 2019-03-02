var point;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(45);
    point = new Point(50, 50);
    point.show();
}

function draw() {
    //point.show();
    var connection = new Connection(0,0,30,30);
    connection.show();
    //point.show();
}

function mousePressed() {
    //var point = new Point(mouseX, mouseY);
    point.select();
}