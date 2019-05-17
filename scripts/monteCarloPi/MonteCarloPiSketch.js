var inside = 0;
const pontos_pi = 3.14159265;

class Circle
{
	constructor(x, y, r)
	{
		this.x = x;
		this.y = y;
		this.r = r;
	}
	
	show()
	{
		fill(color(0, 255, 0));
    ellipse(this.x, this.y, this.r);
    noFill();
	}
	
	incircle(x, y, r)
	{
		let d = dist(x, y, this.x, this.y);
		
		if(d < r)
		{
			inside++;
			//console.log("in circle: " + inside);
		}
	}
}


//var n = 1000; // hany kis kor legyen
//var m = 1000; // hany kiserlet legyen
var n = n_input;
var m = m_input;
var r = 600; // 400// nagy kor sugara
var R = 7.5; //5 // kis kor sugara
var k = 0; // futasok szama

let pi_values = [];
var pi_osszeg = 0;
var pi_atlagos = 0;


var startTime, endTime;

startTime = new Date();
let text_x_pos;
let text_y_pos;
function setup() {
	//createCanvas(1000, 1000);
	createCanvas(windowWidth, windowHeight);  
	text_x_pos = width/2 - 300;
	text_y_pos = height/2-432; 
}

function draw() {

  background(220);
  let circles = [];
  
  let pi = 0;
  inside = 0;
	
	var min_x = width/2 - r/2;
  var max_x = width/2 + r/2;

  var min_y = height/2 - r/2;
  var max_y = height/2 + r/2;
	
	rectMode(CENTER);
	rect(width/2, height/2, r,r);
	
  stroke(color(0, 0, 255));
 // strokeWeight(3);
  fill(color(0, 0, 255, 75));
  ellipse(width/2, height/2, r);
	
  stroke(0);
  strokeWeight(0.5);
  noFill();
  
  for(let i = 0; i < n; i++)
	{
		let circle = new Circle(random(min_x,max_x), random(min_y, max_y), R);
		circles.push(circle);		
	}
	
	for(let i = 0; i < circles.length; i++)
	{	
		circles[i].show();	
	}
	
	for(let i = 0; i < circles.length; i++)
	{	
		circles[i].incircle(width/2, height/2, r/2);	
	}
	
  let outside = circles.length - inside;
	//console.log(inside);
	//console.log(outside);
	let sum = inside + outside;
	
	let rect_area = r*r;
	let ratio = inside / sum;
	
	pi = (rect_area * ratio)/((r/2)*(r/2));
  pi_values[k] = pi;
	
	console.log("Pi: " + pi);
	push();
	textSize(32);
	fill(255, 0, 0);
	text("Pi: " + pi, text_x_pos, text_y_pos);
	pop();
  k++;
     
  if(k >= m)
  {
    for(let i = 0; i < pi_values.length; i++)
		{
 			 //console.log("pi_values[" + i +"]: " + pi_values[i]);
       pi_osszeg += pi_values[i];
       pi_atlagos = pi_osszeg/m;
		}
    
		//console.log("pi average: " + pi_atlagos);
		push();
		textSize(32);
		fill(255, 0, 0);
		text("Pi average: " + pi_atlagos, text_x_pos, text_y_pos+32);
		pop();
		//console.log("pi average and pi difference: " + abs( pi_atlagos - pontos_pi));
		push();
		textSize(32);
		fill(255, 0, 0);
		text("Pi average and Pi difference: " + abs( pi_atlagos - pontos_pi), text_x_pos, text_y_pos+64);
		pop();

    endTime = new Date();
    var timeDiff = endTime - startTime;
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
	  console.log("Elapsed time: " + seconds + " seconds");
		push();
		textSize(32);
		fill(255, 0, 0);
		text("Elapsed time: " + seconds + " seconds", text_x_pos, text_y_pos+96);
		pop();
		noLoop();
  }
}

