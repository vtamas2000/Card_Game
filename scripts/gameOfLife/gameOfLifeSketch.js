var grid;
var cols;
var rows;
var started = false;

function setup(){
    var canvasX = floor(windowWidth/res) * res;
    var canvasY = floor(windowHeight/res) * res;
    createCanvas(canvasX, canvasY);
    cols = width/res;
    rows = height/res;
    grid = make2DArray(cols, rows);
}

function draw(){
    background(255);
    stroke(0);
    //console.log(cols);
    //console.log(rows);
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            var x = i * res;
            var y = j * res;
            if (grid[i][j] == 1){
                fill(0);
            } else {
                fill(255);
            }
            rect(x, y, res-1, res-1);
        }
    }
    if(started){
        grid = evolve(grid);
    }
}

function mousePressed(){
    var col = floor(mouseX/res);
    var row = floor(mouseY/res);
    grid[col][row] = 1;
}

function mouseDragged(){
    var col = floor(mouseX/res);
    var row = floor(mouseY/res);
    grid[col][row] = 1;
}

function keyPressed(){
    if(key == " "){
        if(!started){
            started = true;
        } else {
            started =  false;
        } 
    }

    if(key == "r"){
        started = false;
        for (var i = 0; i < cols; i++){
            for (var j = 0; j < rows; j++){
                grid[i][j] = floor(random(2));
            }
        }
    }

    if(key == "x"){
        started = false;
        grid = make2DArray(cols, rows);
    }

    if(keyCode === ENTER){
        grid = evolve(grid);
    }
}

function touchStarted(){
    if (touches.length == 3){
        started = false;
        for (var i = 0; i < cols; i++){
            for (var j = 0; j < rows; j++){
                grid[i][j] = floor(random(2));
            }
        }
    } 

    if (touches.length == 2){
        if(!started){
            started = true;
        } else {
            started =  false;
        } 
    }

    if (touches.length == 4){
        started = false;
        grid = make2DArray(cols, rows);
    }
}

function make2DArray(cols, rows){
    var arr = new Array();
    for(var i = 0; i < cols; i++){
        arr[i] = new Array();
        for(var j = 0; j < rows; j++){
            arr[i][j] = 0;
        }
    }
    return arr;
}

function evolve(arr){
    var next = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            var current = arr[i][j];
            var neighbours = countNeighbours(i, j, arr);
            if (current == 0 && neighbours == 3){
                next[i][j] = 1;
            } else if (current == 1 && (neighbours < 2 || neighbours > 3)){
                next[i][j] = 0;
            } else {
                next[i][j] = arr[i][j];
            }
        }
    }
    return next;
}

function countNeighbours(x, y, arr){
    var sum = 0;
    for (var i = -1; i < 2; i++){
        for (var j = -1; j < 2; j++){
            var col = (x + i + cols) % cols;
            var row = (y + j + rows) % rows;
            /*if (col < 0){
                col = cols - 1;
            } else if (col == cols){
                col = 0;
            }
            if (row < 0){
                row = rows - 1;
            } else if (row == rows){
                row = 0;
            }*/
            if((arr[col][row] == 1) && ((col != x) || (row != y))){
                sum++;
            }
        }
    }
    return sum;
}