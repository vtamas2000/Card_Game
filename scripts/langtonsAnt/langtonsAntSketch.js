var antX;
var antY;
var grid;
//var input = "rll";
var rule = input.split("");
var colors = new Array(rule.length);

//UP, RiGHT, DOWN, LEFT
var dir;

function setup(){
    createCanvas(windowWidth, windowHeight);
    //createCanvas(400, 400);
    for(var i = 0; i < colors.length; i++){
        var r = floor(random(255));
        var g = floor(random(255));
        var b = floor(random(255));
        colors[i] = color(r, g, b);
    }
    antX = floor(width/2);
    antY = floor(height/2);
    grid = make2DArray(width, height);
    dir = 0;
    //background(255);
}

function draw(){
    strokeWeight(1);
    /*for(var i = 0; i < 1000; i++){
        if (grid[antX][antY] == 0){
            turn("r");
            grid[antX][antY] = 1;
        } else if (grid[antX][antY] == 1){
            turn("l");
            grid[antX][antY] = 0;
        }
    

        stroke(color(255));
        if(grid[antX][antY] == 1){
            stroke(color(0));
        }

        point(antX, antY);
        moveForward(dir);
    }*/

    for(var i = 0; i < 1000; i++){
        var state = grid[antX][antY];
        turn(rule[state]);
        state++;
        if(state > rule.length - 1){
            state = 0;
        }

        grid[antX][antY] = state;
        
        stroke(color(colors[state]));

        point(antX, antY);
        moveForward(dir);
    }
    //console.log(antX + " " + antY);  
}

function make2DArray(col, row){
    var arr = new Array();
    for(var i = 0; i < col; i++){
        arr[i] = new Array();
        for(var j = 0; j < row; j++){
            arr[i][j] = 0;
        }
    }
    return arr;
}

function moveForward(direction){
    switch(direction){
        case 0:
            antY--;
            if(antY < 0){
                antY = height - 1;
            }
            break;
        case 1:
            antX++;
            if(antX > width){
                antX = 0;
            }
            break;
        case 2:
            antY++;
            if(antY > height){
                antY = 0;
            }
            break;
        case 3:
            antX--;
            if(antX < 0){
                antX = width - 1;
            }
            break;
    }

    if(antX > width - 1){
        antX = 0;
    } else if(antX < 0){
        antX = width - 1;
    } else if(antY > height - 1){
        antY = 0;
    } else if(antY < 0){
        antY = height - 1;
    }
}

function turn(side){
    if (side == "r"){
        dir++;
        if (dir > 3){
            dir = 0;
        }
    }
    if (side == "l"){
        dir--;
        if (dir < 0){
            dir = 3;
        }
    }
}