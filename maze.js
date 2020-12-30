import * as utils from './utils.js';

export default function Maze(r, c){
  let rows = r;
  let columns = c;

  let wallList = [];

  const DIRECTIONS = [
    [0,  -1], //up
    [1,   0], //right
    [0,   1], //down
    [-1,  0]  //left
  ];

  const COMPASS = [
    'up',
    'right',
    'down',
    'left'
  ];

  this.initialize = function(){
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');


    //Create 2d array placeholder
    this.grid = new Array(columns);
    for(let i = 0; i < columns; i++){
      this.grid[i] = new Array(rows);

      //populate grid with cells
      for(let j = 0; j < rows; j++){
        let Cell = {
          pos: [i, j],
          //character: '■',
          //color: 'black',
          walls: [true, true, true, true],
          //path: [],
          visited: false
        };
        this.grid[i][j] = Cell;
      }
    }
    this.setBorders();
    this.createMaze();
  };

  this.update = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(let i = 0; i < wallList.length; i++){
      let offsetX = this.canvas.width / columns;
      let offsetY = this.canvas.height / rows;
      utils.drawLine(offsetX * wallList[i].x, offsetY * wallList[i].y, offsetX * wallList[i].dx, offsetY * wallList[i].dy, this.ctx);
    }
  };
  
  this.resize = function(w, h){
    this.canvas.width = w;
    this.canvas.height = h;
  };

  this.setBorders = function(){
    //create walls in wallList

    //left
    wallList.push({x: 0, y: 0, dx: 0, dy: rows});
    //bottom
    wallList.push({x: 0, y: rows, dx: columns, dy: rows});
    //right
    wallList.push({x: columns, y: 0, dx: columns, dy: rows});
    //top
    wallList.push({x: 0, y: 0, dx: columns, dy: 0});
  };

  this.createMaze = function(){
    let cellStack = [];
    let tempCell = this.grid[Math.floor(columns / 2)][Math.floor(rows / 2)];
    cellStack.push(tempCell);

    this.checkCell({x: tempCell.pos[0], y: tempCell.pos[1]}, {x: tempCell.pos[0], y: tempCell.pos[1]});

    removeDuplicates(wallList);
  };

  const removeDuplicates = function(array){
    console.log(array);
    /*
      things = new Object();
      things.thing = new Array();

      things.thing.push({place:"here",name:"stuff"});
      things.thing.push({place:"there",name:"morestuff"});
      things.thing.push({place:"there",name:"morestuff"});
    */


    // array = array.filter((thing, index, self) => index === self.findIndex((t) => (
    //   t.x === thing.x && t.y === thing.y && t.dx === thing.dx && t.dy === thing.dy
    // )));
    array = array.filter((thing,i,a)=>a.findIndex(t=>(
      //t.place === v.place && t.name===v.name
      t.x === thing.x && t.y === thing.y && t.dx === thing.dx && t.dy === thing.dy
      ))===i);
    console.log(array);
};

  const randomizeDirections = function(){
    let randomized = [];

    while(randomized.length < DIRECTIONS.length){
      let dir = Math.floor(Math.random() * DIRECTIONS.length);
      if(!randomized.includes(DIRECTIONS[dir]))
        randomized.push(DIRECTIONS[dir]);
    }

    return randomized;
  };

  this.checkCell = function(pos, lastPos){
    //set grid attribs at current position
    this.grid[pos.x][pos.y].visited = true;
    this.grid[pos.x][pos.y].character = ' ';
    this.grid[pos.x][pos.y].color = 'white';
    
    //direction list, randomize
    let directions = randomizeDirections();

    //loop through each adjacent cell of current cell
    for(let i of directions){

      //set next position
      let nextPos = {
        x: pos.x + i[0], 
        y: pos.y + i[1]
      };
      
      //check for undefined cells. if cell is undefined, it's outside of the maze
      if(this.grid[nextPos.x] === undefined || this.grid[nextPos.x][nextPos.y] === undefined){
        continue;
      }
      //see if next cell has been visited. if not,
      else if(this.grid[nextPos.x][nextPos.y].visited === false){
        //remove cell walls at correct directions from both cells
        for(let j = 0; j < DIRECTIONS.length; j++){
          if(i[0] === DIRECTIONS[j][0] && i[1] === DIRECTIONS[j][1]){
            this.grid[nextPos.x][nextPos.y].walls[j] = false;
            this.grid[pos.x][pos.y].walls[j] = false;
            console.log(this.grid[nextPos.x][nextPos.y]);
            console.log(i); 
            console.log('direction: ' + COMPASS[j]);
          }
        }
        this.checkCell(nextPos, pos);
      } 
      else {
        //visited
        if(nextPos.x !== lastPos.x && nextPos.y !== lastPos.y){
          let x = pos.x;
          let y = pos.y;
          let dx = pos.x;
          let dy = pos.y;

          let dirs = {
            up:     [0,  -1],
            right:  [1,  0],
            down:   [0, 1],
            left:   [-1, 0]
          };

          let length = 1;

          if(i[0] === dirs.up[0] && i[1] === dirs.up[1]){
            dx += length;
          } else if(i[0] === dirs.right[0] && i[1] === dirs.right[1]){
            x += length;
            y += length;
            dx += length;
          } else if(i[0] === dirs.down[0] && i[1] === dirs.down[1]){
            x += length;
            y += 1;
            dy += length;
          } else if(i[0] === dirs.left[0] && i[1] === dirs.left[1]){       
            dy += length;
          }
          wallList.push({x: x, y: y, dx: dx, dy: dy});
        }
        //else
          //console.log('next pos is last pos.');
        //is visited cell lastPos? if not, make wall
      }
    }

    //if we get down here, return because all directions have been taken
    return;
  };
}