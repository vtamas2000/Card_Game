let test;
var goal;


function setup() {
  createCanvas(windowWidth, windowHeight);
  test = new Population(1000);
  goal  = createVector(400, 10);
  frameRate(100);
}

function draw() {
  //background(220);
   background(255);

  //draw goal
  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 10, 10);

  //draw obstacle(s)
  fill(0, 0, 255);

  rect(0, 300, 600, 10);


  if (test.allDotsDead()) {
    //genetic algorithm
    test.calculateFitness();
    test.naturalSelection();
    test.mutateDemBabies();
  } else {
    //if any of the dots are still alive then update and then show them

    test.update();
    test.show();
  }
}