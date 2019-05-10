var antX;
var antY;
var grid;

//UP, RiGHT, DOWN, LEFT
var dir;

function setup(){
    //createCanvas(windowWidth, windowHeight);
    createCanvas(400, 400);
    antX = floor(width/2);
    antY = floor(height/2);
    grid = make2DArray(width, height);
    dir = 0;
    //background(255);
    console.log(antX + " " + antY);
}

function draw(){
    strokeWeight(1);
    for(var i = 0; i < 1000; i++){
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