class Dot{


  constructor(){
    this.brain = new Brain(1000);
    this.dead = false;
    this.reachedGoal = false;
    this.isBest = false; //true if this dot is the best dot from the previous generation
    this.fitness = 0  
    this.pos = createVector(width/2, height- 10);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  
  }

  show() {
    //if this dot is the best dot from the previous generation then draw it as a big green dot
    if (this.isBest) {
      fill(0, 255, 0);
      ellipse(this.pos.x, this.pos.y, 8, 8);
    } else { //all other dots are just smaller black dots
      fill(0);
      ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  }

    move() {

    if (this.brain.directions.length > this.brain.step) {//if there are still directions left then set the acceleration as the next PVector in the direcitons array
      this.acc = this.brain.directions[this.brain.step];
      this.brain.step++;
    } else {//if at the end of the directions array then the dot is dead
      this.dead = true;
    }

    //apply the acceleration and move the dot
    this.vel.add(this.acc);
    this.vel.limit(5);//not too fast
    this.pos.add(this.vel);
  }
  
   update() {
    if (!this.dead && !this.reachedGoal) {
      this.move();
      if (this.pos.x< 2|| this.pos.y<2 || this.pos.x>width-2 || this.pos.y>height -2) {//if near the edges of the window then kill it 
        this.dead = true;
      } else if (dist(this.pos.x, this.pos.y, goal.x, goal.y) < 5) {//if reached goal

        this.reachedGoal = true;
      } else if (this.pos.x< 600 && this.pos.y < 310 && this.pos.x > 0 && this.pos.y > 300) {//if hit obstacle
        this.dead = true;
      }
    }
  }
  
  
  
   calculateFitness() {
    if (this.reachedGoal) {//if the dot reached the goal then the fitness is based on the amount of steps it took to get there
      this.fitness = 1.0/16.0 + 10000.0/(this.brain.step * this.brain.step);
    } else {//if the dot didn't reach the goal then the fitness is based on how close it is to the goal
      let distanceToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
      this.fitness = 1.0/(distanceToGoal * distanceToGoal);
    }
  }
  
  gimmeBaby() {
   let baby = new Dot();
    baby.brain = this.brain.clone();//babies have the same brain as their parents
    return baby;
  }
  
  
  

}