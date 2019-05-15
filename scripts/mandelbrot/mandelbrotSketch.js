var boundary = 1;
var size = 600;
var limit = 10000000;
var maxIterations = 1000;
var diffX = 0;
var diffY = 0;
gradient = GradientGenerator.createGradient(['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#000000']);

function setup(){
    //createCanvas(600, 600);
    createCanvas(windowWidth, windowHeight);
    background(0);
    //loadPixels();
}

function draw(){ 
    mandelbrot(diffX, diffY);
    noLoop();  
    /* for(var x = 0; x < width; x++){
        for(var y = 0; y < height; y++){
            //Complex number is a + bi
            //console.log(x + " " + y);
            var a = map(x, 0, width, -2.5 * boundary, boundary)-0.4;
            var b = map(y, 0, height, -boundary, boundary);
            var n;
            var x1 = a;
            var x2 = b;
            


            for(n = 0; n < maxIterations; n++){
                //New complex number is p + qi

                var p = a*a - b*b + x1;
                var q = 2*a*b + x2;
                
                a = p;
                b = q;

                if ((Math.abs(a) + Math.abs(b)) > limit){
                    //console.log(n);
                    break;
                }
            }
            //var sum = Math.abs(a) + Math.abs(b);
            var alpha = map(n, 0, maxIterations, 0, 1);
            var col = gradient.getColorBytesAt(alpha);
            //console.log(col.r + " " + col.g + " " + col.b);
            stroke(color(col.r, col.g, col.b));
            point(x, y);

            //var pix = (x + y * width) * 4;
            //pixels[pix + 0] = alpha;
            //pixels[pix + 1] = alpha;
            //pixels[pix + 2] = alpha;
            //pixels[pix + 3] = 0; 
        }
    }*/
}

/* function mousePressed(){
    var offsetX = map(mouseX, 0, width, -boundary, 2.5 * boundary);
    var offsetY = map(mouseY, 0, height, -boundary, boundary);
    mandelbrot(offsetX, offsetY);
} */

function keyPressed(){
    if(keyCode === UP_ARROW){
        boundary += 0.2;
    }

    if(keyCode === DOWN_ARROW){
       boundary -= 0.2;
    }

    if(keyCode === RIGHT_ARROW){
       diffX += boundary/4;
    }

    if(keyCode === LEFT_ARROW){
        diffX -= boundary/4;
    }

    if(key == " "){
        mandelbrot(diffX, diffY);
    }
}

function mandelbrot(offsetX, offsetY){
    for(var x = 0; x < width; x++){
        for(var y = 0; y < height; y++){
            //Complex number is a + bi
            //console.log(x + " " + y);
            var a = map(x, 0, width, -2.5 * boundary, boundary)+offsetX;
            var b = map(y, 0, height, -boundary, boundary)+offsetY;
            var n;
            var x1 = a;
            var x2 = b;
            


            for(n = 0; n < maxIterations; n++){
                //New complex number is p + qi

                var p = a*a - b*b + x1;
                var q = 2*a*b + x2;
                
                a = p;
                b = q;

                if ((Math.abs(a) + Math.abs(b)) > limit){
                    //console.log(n);
                    break;
                }
            }
            //var sum = Math.abs(a) + Math.abs(b);
            var alpha = map(n, 0, maxIterations, 0, 1);
            var col = gradient.getColorBytesAt(alpha);
            //console.log(col.r + " " + col.g + " " + col.b);
            stroke(color(col.r, col.g, col.b));
            point(x, y);

            /* var pix = (x + y * width) * 4;
            pixels[pix + 0] = alpha;
            pixels[pix + 1] = alpha;
            pixels[pix + 2] = alpha;
            pixels[pix + 3] = 0; */
        }
    }
}