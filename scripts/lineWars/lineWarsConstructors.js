function Point(x, y, player, col) {
    this.x = x;
    this.y = y;
    this.r = 40;
    this.pulseR = this.r;
    this.col = col;
    this.selected = false;
    this.power = 1;
    this.player = player;
    this.firstMoveMade = false;
    
    if(this.player === -1){
        this.power = 0;
    }

    //Visuals go here
    this.show = function(){
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.r, this.r);
        /* if (this.selected){
            this.col = color(26, 219, 99);
        } else {
            this.col = col;
        } */
    }

    //Math goes here
    this.update = function(connectionsArray) {
        if (this.firstMoveMade){
            this.power = 0;
            for(var i = 0; i < connectionsArray.length; i++){
                var d1 = dist(this.x, this.y, connectionsArray[i].startX, connectionsArray[i].startY);
                var d2 = dist(this.x, this.y, connectionsArray[i].endX, connectionsArray[i].endY);

                if(d1 < this.r){
                    this.power++;
                }

                if(d2 < this.r){
                    this.power++;
                }
            }
        }
        //console.log(this.power);
    }

    this.select = function(){
        var d = dist(this.x, this.y, mouseX, mouseY);
        if (d < this.r){
            this.selected = true;
            this.firstMoveMade = true;
            /* this.col = color(26, 219, 99);
            this.r = 60; */
        }
    }

    /* this.pulse = function() {
        if (frameCount % 100 === 0){
            console.log("Pulse");
            
        }
    } */
}

function Connection(startPoint, endPoint) {
    this.startX = startPoint.x;
    this.startY = startPoint.y;
    this.endX = endPoint.x;
    this.endY = endPoint.y;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.power = 0;
    this.nrOfIntersections = 0;
    this.length = dist(this.startX, this.startY, this.endX, this.endY);
    this.col = color(52, 26, 219);
    this.belongsTo;

    //Visuals go here
    this.show = function() {
        stroke(this.col); 
        strokeWeight(5);
        line(this.startX, this.startY, this.endX, this.endY); 
    }

    //Math goes here
    this.update = function(intersectionsArray) {
        this.power = this.startPoint.power + this.endPoint.power;
        for(var i = 0; i < intersectionsArray.length; i++){
            if(this === intersectionsArray[i].connection1 || this === intersectionsArray[i].connection2){
                this.power -= 1;
            }
        }
        console.log("line power " + this.power);
    }

    this.intersects = function(other) {
        //Normal vector equation of line this and other (A,B,C,D are normal vector koordinates):
        //A*x + B*y = A*x1 + A*y1
        //C*x + D*y = C*x3 + D*y3
        //Solve this for x and y:
        //x = (A*D*x1 + B*D*y1 - B*C*x3 - B*D*y3)/(A*D - B*C)
        //y = (A*C*x1 + B*C*y1 - A*C*x3 - A*D*y3)/(B*C - A*D)
        
        var A = this.endY - this.startY; 
        var B = this.startX - this.endX;
        var C = other.endY - other.startY;
        var D = other.startX - other.endX;

        var intersectionX = (A*D*this.startX + B*D*this.startY - B*C*other.startX - B*D*other.startY)/(A*D - B*C);
        var intersectionY = (A*C*this.startX + B*C*this.startY - A*C*other.startX - A*D*other.startY)/(B*C - A*D);

        var d1 = dist(intersectionX, intersectionY, this.startX, this.startY);
        var d2 = dist(intersectionX, intersectionY, this.endX, this.endY);
        var d3 = dist(intersectionX, intersectionY, other.startX, other.startY);
        var d4 = dist(intersectionX, intersectionY, other.endX, other.endY);

        if (d1 < this.length && d2 < this.length && d3 < other.length && d4 < other.length){
            return {
                intersectionX: intersectionX,
                intersectionY: intersectionY,
                doesIntersect: true
            }
        } else {
            return {
                doesIntersect: false
            }
        }
    }
}

function Intersection(x, y, connection1, connection2) {
    this.x = x;
    this.y = y;
    this.connection1 = connection1;
    this.connection2 = connection2;

    this.show = function() {
        fill(155);
        ellipse(this.x, this.y, 30, 30);
    }
}

function validMove(thisTurn, point1, point2) {
    //Need to check everything for pont1 and point2, as well, 
    //because their succession matters in pointsArray

    if(point1.player !== thisTurn && point2.player !== thisTurn){
        return false;
    } else if(point1.player === point2.player){
        return true;
    } else if(point1.player === -1 || point2.player === -1){
        return true;
    } else if(point1.player !== point2.player){
        if(point1.power > point2.power && point1.player === thisTurn){
            console.log("Fired");
            return true;
        } else if (point2.power > point1.power && point2.player === thisTurn){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function makeMove(nrOfPlayers, pointsArray, connectionsArray, intersectionsArray){
    //turnsMade is a global variable in the main program!!!

    var thisPlayer = turnsMade % nrOfPlayers;
    var pointToConnect1 = undefined;
    var pointToConnect2 = undefined;

    for(var i = 0; i < pointsArray.length; i++){
        pointsArray[i].select();
        if (pointsArray[i].selected && !pointToConnect1){
            pointToConnect1 = pointsArray[i];
        } else if (pointsArray[i].selected && !pointToConnect2){
            pointToConnect2 = pointsArray[i];
        }
    }

    console.log(thisPlayer);
    if(pointToConnect1 && pointToConnect2){
        if(validMove(thisPlayer, pointToConnect1, pointToConnect2)){
            console.log("Move valid");
            var connection = new Connection(pointToConnect1, pointToConnect2);
            connectionsArray.push(connection);
            pointToConnect1.selected = false;
            pointToConnect2.selected = false;
            turnsMade++;
            /* pointToConnect1 = undefined;
            pointToConnect2 = undefined; */
        } else {
            pointToConnect1.selected = false;
            pointToConnect2.selected = false;
            console.log("Move invalid");
        }
    }

    intersectionsArray = [];
    for(var i = 0; i < connectionsArray.length; i++){
        for(var j = i + 1; j < connectionsArray.length; j++){
            if(connectionsArray[i].intersects(connectionsArray[j]).doesIntersect){
                var x = connectionsArray[i].intersects(connectionsArray[j]).intersectionX;
                var y = connectionsArray[i].intersects(connectionsArray[j]).intersectionY;
                var newIntersection = new Intersection(x, y, connectionsArray[i], connectionsArray[j]);
                intersectionsArray.push(newIntersection);
            }
        }
    }
}