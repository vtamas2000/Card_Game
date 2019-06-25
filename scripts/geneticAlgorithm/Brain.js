class Brain {
 // PVector[] directions;//series of vectors which get the dot to the goal (hopefully)

  
  constructor(size) {
    this.step = 0;
    this.directions = [];
    this.randomize();
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  //sets all the vectors in directions to a random vector with length 1
  randomize() {
    for (let i = 0; i< 1000; i++) {
     let randomAngle = random(2*PI);
      this.directions.push(p5.Vector.fromAngle(randomAngle));
    }
  }

  //-------------------------------------------------------------------------------------------------------------------------------------
  //returns a perfect copy of this brain object
  clone() {
    let clone = new Brain(this.directions.length);
    for (let i = 0; i < this.directions.length; i++) {
      clone.directions[i] = this.directions[i].copy();
    }

    return clone;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------

  //mutates the brain by setting some of the directions to random vectors
  mutate() {
    let mutationRate = 0.01;//chance that any vector in directions gets changed
    for (let i = 0; i< this.directions.length; i++) {
      let rand = random(1);
      if (rand < mutationRate) {
        //set this direction as a random direction 
        let randomAngle = random(2*PI);
        this.directions[i] = p5.Vector.fromAngle(randomAngle);
      }
    }
  }
}