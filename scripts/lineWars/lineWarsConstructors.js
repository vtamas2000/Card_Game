function Point(x, y){
    this.x = x;
    this.y = y;
    this.r = 40;
    this.selected = false;
    
    this.show = function(){
        fill(255);
        ellipse(this.x, this.y, this.r, this.r);
    }

    this.select = function(){
        var d = dist(this.x, this.y, mouseX, mouseY);
        if (d < this.r){
            this.selected = true;
            fill(255);
            ellipse(100, 100, 70, 70);
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
        line(this.startX, this.startY, this.endX, this.endY); 
    }
}