var w = 70, h = 70 , bs = 32, player = 1;
let board = [];
var button;
var buttonclicked;

var socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CORNER); //draw circles from their top left point
  textAlign(CENTER, CENTER);
  button = createButton("Restart");
  button.position(windowWidth/2, windowHeight);
  button.size(100, 30);
  button.style("font-family","Comic Sans MS");
  button.style("background-color", "green");
  button.style("color", "yellow");
  button.mouseClicked(RestartGame);
  
  socket = io('/play');
  socket.on('mouse', newPiece);
  
  
  for (let x = 0; x < h; x++) 
  {
    board[x] = []; // create nested array
    for (let y = 0; y < w; y++)
    {
      let distance = dist(width / 2, height / 2, x, y);
      board[x][y] = 0;
    }
  }
}

function p(y, x) {
  return (y < 0 || x < 0 || y >= h || x >= w) ? 0 : board[y][x];
}

function getWinner() {  //loops through rows, columns, diagonals, etc
  for (let y = 0;y< h; y++)
    for(let x = 0; x < w; x++)
    if(p(y,x) !=0 && p(y,x) == p(y,x+1) && p(y,x) == p(y,x+2) && p(y,x) == p(y,x+3) && p(y,x)==p(y,x+4))
      return p(y,x);
  
  for (let y = 0; y < h; y++)
    for(let x = 0; x<w; x++)
    if(p(y,x) != 0 && p(y,x) == p(y+1,x) && p(y,x) == p(y+2,x) && p(y,x) == p(y+3,x) && p(y,x) == p(y+4,x))
      return p(y,x);
  
  for (let y = 0; y < h; y++)
    for(let x = 0; x < w; x++)
      for(let d =-1; d <= 1; d+=2)
    if(p(y,x) != 0 && p(y,x) == p(y+1*d,x+1) && p(y,x) == p(y+2*d,x+2) && p(y,x) == p(y+3*d,x+3) && p(y,x) == p(y+4*d,x+4))
      return p(y,x);
  
  for (let y = 0; y < h; y++)
    for(let x = 0; x < w; x++)
      if(p(y,x) == 0)
        return 0;
  return -1; //tie
}

/*function nextSpace(x) { //finds the next space (from the bottom)
  for (let y = h-1;y >= 0;y--) if (board[y][x]==0) return y;
  return -1;
}*/ // this function is for connect 4
var isdragging;
function mouseDragged(event)
{
   isdragging = event.returnValue;
   //console.log(isdragging);
}

function newPiece(data){
  
  for (let j = 0; j < h; j++) 
  { 
    
     for (let i = 0; i < w; i++) 
      {
    
        if (board[j][i]>0)
        {
          //fill(board[j][i]==1 ? 255 : 0, board[j][i]==2 ? 255 : 0, 0);
          fill(0);
          stroke(100)
          textSize(bs/2)
          text(board[j][i] == 1 ? 'X': 'O',i*bs, j*bs, bs, bs);
        }
      }
  }
  
  
}


function mouseClicked() {
  
  let x = int(mouseX / bs), y = int(mouseY / bs) //y = nextSpace(x);
  
  var data = {
    x: x,
    y: y,
    player: player
  }
  socket.emit('mouse', data);

  if (y >= 0 && board[y][x] == 0 && !isdragging && !buttonclicked) 
  {
    board[y][x] = player; 
    player = player == 1 ? 2 : 1; //switch to the other player (1->2  2->1)
  }
  
}

function RestartGame()
{
  for (let y = 0; y < h; y++)
    for(let x = 0; x < w; x++)
      board[y][x] = 0;
  button.position(windowWidth/2, windowHeight);
  button.size(100, 30);
  let x = int(mouseX / bs), y = int(mouseY / bs)
  board[y][x] = 0; 
  player = 1;
  buttonclicked = true;
}

function draw() {

  if (getWinner() == 0) 
  {
    isdragging = false;
    buttonclicked = false;
   // console.log(isdragging);
    for (let j = 0; j < h; j++) 
    {
      
      for (let i = 0; i < w; i++) 
      {
          fill(255);
          rect(i*bs, j*bs, bs, bs);

          if (board[j][i]>0)
          {
                //fill(board[j][i]==1 ? 255 : 0, board[j][i]==2 ? 255 : 0, 0);
            		fill(0);
            		stroke(100)
            		textSize(bs/2)
                text(board[j][i] == 1 ? 'X': 'O',i*bs, j*bs, bs, bs);
          }
    	}
    }
  }
  else
  {
    background(0);
    fill(255);
    textSize(80);
    text("Player "+getWinner()+" Wins!", width/2,height/2);
    button.position(width/2 - 75,height/2 + 50);
    button.size(200, 50);
    /*if(keyIsPressed && keyCode == ENTER)
    {
     RestartGame();
  	} */ 	
  }
}
