function Point(x, y){
    this.x = x;
    this.y = y;
    this.r = 40;
    this.col = color(52, 26, 219)
    this.selected = false;
    
    this.show = function(){
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.r, this.r);
    }

    this.select = function(){
        var d = dist(this.x, this.y, mouseX, mouseY);
        if (d < this.r){
            this.selected = true;
            this.col = color(26, 219, 99);
            this.r = 60;
        }
    }
}

function Connection(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;

    this.show = function() {
        stroke(255); 
        strokeWeight(5);
        line(this.startX, this.startY, this.endX, this.endY); 
    }
}