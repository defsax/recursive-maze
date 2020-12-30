import * as utils from './utils.js';

export default function Maze(r, c){
  let rows = r;
  let columns = c;

  let wallList = [];

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
          character: '■',
          color: 'black',
          walls: [],
          path: [],
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

    // for(let i = 0; i < columns; i++){
    //   for(let j = 0; j < rows; j++)
    //     // utils.drawText(this.grid[i][j].character, this.canvas.width / columns * i - 2, this.canvas.height / rows * j + 13, "black", "fill", "25px Arial", "left", this.ctx);
    //     utils.drawRect(this.canvas.width / columns * i, this.canvas.height / rows * j, 10, 10, this.grid[i][j].color, 'white', this.ctx);
    // }
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
    //tempCell.visited = true;
    cellStack.push(tempCell);

    this.checkCell({x: tempCell.pos[0], y: tempCell.pos[1]}, {x: tempCell.pos[0], y: tempCell.pos[1]});
    //this.drawWalls();

    //console.log(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  };

  const randomizeDirections = function(){
    const DIRECTIONS = [
      [0,  1],
      [1,  0],
      [0, -1],
      [-1, 0]
    ];
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
      
      //console.log(nextPos);
      //console.log(this.grid[nextPos.x][nextPos.y]);
      //see if next cell is a negative or larger than maze size
      // if(nextPos.x < 0 || nextPos.x > columns || nextPos.y < 0 || nextPos.y > rows)
      if(this.grid[nextPos.x] === undefined || this.grid[nextPos.x][nextPos.y] === undefined){
        continue;
      }
      //see if next cell has been visited. if not,
      else if(this.grid[nextPos.x][nextPos.y].visited === false){
        //console.log(nextPos);console.log(' not visited.');
        this.checkCell(nextPos, pos);
      } 
      else {
        //visited
        if(nextPos.x !== lastPos.x && nextPos.y !== lastPos.y){
          //console.log('next pos is not last pos.');
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

  this.getAvailableCell = function(directionList, position){
    for(let i = 0; i < directionList.length; i++){
      if(this.grid[position[0] + directionList[i][0]] [position[1] + directionList[i][1]].visited === false)
        return directionList[i];
    }
  };
}