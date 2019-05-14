var boundary = 2;
var size = 600;
var limit = 1000;

function setup(){
    //createCanvas(600, 600);
    createCanvas(windowWidth, windowHeight);
    background(0);
    //loadPixels();
}

function draw(){   
    for(var x = 0; x < width; x++){
        for(var y = 0; y < height; y++){
            //Complex number is a + bi
            //console.log(x + " " + y);
            var a = map(x, 0, width, -2.5, 1);
            var b = map(y, 0, height, -1, 1);
            var n;
            var x1 = a;
            var x2 = b;
            


            for(n = 0; n < 100; n++){
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

            var alpha = map(n, 0, 100, 255, 0);
            stroke(color(alpha, alpha, alpha));
            point(x, y);

            /* var pix = (x + y * width) * 4;
            pixels[pix + 0] = alpha;
            pixels[pix + 1] = alpha;
            pixels[pix + 2] = alpha;
            pixels[pix + 3] = 0; */
        }
    }
    noLoop();
}