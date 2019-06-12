var limit;
var numbers = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
    limit = width * height;
    for(var i = 0; i < limit; i++){
        numbers[i] = i;
    }
}

function draw(){
    stroke(getColor());
    var nextPrime;
    for(var i = 0; i < limit; i++){
        if (numbers[i] > 1){
            nextPrime = i;
            break;
        }
    }

    for(var j = nextPrime; j < limit; j = j + nextPrime){
        point(getX(j), getY(j));
        //console.log(getX(j) + " " + getY(j));
        numbers[j] = 0;
    }
    /*console.log(getPrime(1000000));
    noLoop();*/
}

function getColor(){
    var r = floor(random(255));
    var g = floor(random(255));
    var b = floor(random(255));
    return color(r, g, b);
}

function getX(number){
    return (number - getY(number) * width);
}

function getY(number){
    return (floor(number/width));
}

function getPrime(max){
    //Returns biggest prime under max
    var reachedMax = false;

    for (var h = 0; h < max; h++){
        numbers[h] = h;
    }

    while(!reachedMax){
        var nextPrime;
        //console.log("kjbsd");
        for(var i = 0; i < max; i++){
            if (numbers[i] > 1){
                nextPrime = i;
                break;
            }
        }

        for(var j = nextPrime; j < max; j = j + nextPrime){
            //console.log(getX(j) + " " + getY(j));
            numbers[j] = 0;
        }

        for(var k = 0; k < max; k++){
            if (numbers[k] > 1){
                break;
            }
            if (k == max - 1){
                reachedMax = true;
                return nextPrime;
            }
        }
    }
}