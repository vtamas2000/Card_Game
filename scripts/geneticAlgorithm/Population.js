class Population {
  

  constructor(size) {
    
    this.dots = [];
    this.fitnessSum = 0;
    this.gen = 1;
    this.bestDot = 0;//the index of the best dot in the dots[]
    this.minStep = 1000;
    
    
    //dots = [];
    for (let i = 0; i< size; i++) {
      this.dots.push(new Dot());
    }
  }


  //------------------------------------------------------------------------------------------------------------------------------
  //show all dots
  show() {
    fill(50);
    textSize(20);
    text("generation: " + this.gen, 10, 20);
    fill(50);
    textSize(20);
    text("minstep: " + this.minStep, 10, 40);
    for (let i = 1; i< this.dots.length; i++) {
      this.dots[i].show();
    }
    this.dots[0].show();
  }

  //-------------------------------------------------------------------------------------------------------------------------------
  //update all dots 
  update() {
    for (let i = 0; i< this.dots.length; i++) {
      if (this.dots[i].brain.step > this.minStep) {//if the dot has already taken more steps than the best dot has taken to reach the goal
        this.dots[i].dead = true;//then it dead
      } else {
        this.dots[i].update();
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------------------------
  //calculate all the fitnesses
  calculateFitness() {
    for (let i = 0; i< this.dots.length; i++) {
      this.dots[i].calculateFitness();
    }
  }


  //------------------------------------------------------------------------------------------------------------------------------------
  //returns whether all the dots are either dead or have reached the goal
  allDotsDead() {
    for (let i = 0; i< this.dots.length; i++) {
      if (!this.dots[i].dead && !this.dots[i].reachedGoal) { 
        return false;
      }
    }

    return true;
  }



  //-------------------------------------------------------------------------------------------------------------------------------------

  //gets the next generation of dots
 naturalSelection() {
    //Dot[] newDots = new Dot[dots.length];//next gen
    let newDots = [];
    for (let i = 0; i < this.dots.length; i++){
      newDots.push(new Dot());
    }
    this.setBestDot();
    this.calculateFitnessSum();

    //the champion lives on 
    newDots[0] = this.dots[this.bestDot].gimmeBaby();
    newDots[0].isBest = true;
    for (let i = 1; i< newDots.length; i++) {
      //select parent based on fitness
      let parent = this.selectParent();

      //get baby from them
      newDots[i] = parent.gimmeBaby();
    }

    this.dots = newDots.slice(0);
    this.gen++;
  }


  //--------------------------------------------------------------------------------------------------------------------------------------
  //you get it
 calculateFitnessSum() {
    this.fitnessSum = 0;
    for (let i = 0; i< this.dots.length; i++) {
      this.fitnessSum += this.dots[i].fitness;
    }
  }

  //-------------------------------------------------------------------------------------------------------------------------------------

  //chooses dot from the population to return randomly(considering fitness)

  //this function works by randomly choosing a value between 0 and the sum of all the fitnesses
  //then go through all the dots and add their fitness to a running sum and if that sum is greater than the random value generated that dot is chosen
  //since dots with a higher fitness function add more to the running sum then they have a higher chance of being chosen
  selectParent() {
    let rand = random(this.fitnessSum);


   let runningSum = 0;

    for (let i = 0; i< this.dots.length; i++) {
      runningSum += this.dots[i].fitness;
      if (runningSum > rand) {
        return this.dots[i];
      }
    }

    //should never get to this point

    return null;
  }

  //------------------------------------------------------------------------------------------------------------------------------------------
  //mutates all the brains of the babies
  mutateDemBabies() {
    for (let i = 1; i< this.dots.length; i++) {
      this.dots[i].brain.mutate();
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------
  //finds the dot with the highest fitness and sets it as the best dot
  setBestDot() {
    let max = 0;
    let maxIndex = 0;
    for (let i = 0; i < this.dots.length; i++) {
      if (this.dots[i].fitness > max) {
        max = this.dots[i].fitness;
        maxIndex = i;
      }
    }

   this.bestDot = maxIndex;

    //if this dot reached the goal then reset the minimum number of steps it takes to get to the goal
    if (this.dots[this.bestDot].reachedGoal) {
      this.minStep = this.dots[this.bestDot].brain.step;
      print("step:", this.minStep);
    }
  }
}