import * as utils from './utils.js';

export default function Maze(r, c){
  let rows = r;
  let columns = c;

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
          visited: false
        };
        this.grid[i][j] = Cell;
      }
    }

    // console.log(this.grid);

    // let x = 5;
    // let y = 5;

    // this.grid[x][y].character = ' ';

    // //x += 1;
    // y += -1;
    // this.grid[x][y].character = ' ';

    this.setVisitedCells();
    this.createMaze();
  };

  this.update = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(let i = 0; i < columns; i++){
      for(let j = 0; j < rows; j++)
        // utils.drawText(this.grid[i][j].character, this.canvas.width / columns * i - 2, this.canvas.height / rows * j + 13, "black", "fill", "25px Arial", "left", this.ctx);
        utils.drawRect(this.canvas.width / columns * i, this.canvas.height / rows * j, 10, 10, this.grid[i][j].color, 'white', this.ctx);
    }
  };
  
  this.resize = function(w, h){
    this.canvas.width = w;
    this.canvas.height = h;
  };

  this.setVisitedCells = function(){
    //set borders to 'visited' so they remain untouched

    for(let i = 0; i < columns; i++){
      this.grid[i][0].visited = true;
      this.grid[i][columns - 1].visited = true;
    }

    for(let i = 0; i < rows; i++){
      this.grid[0][i].visited = true;
      this.grid[rows - 1][i].visited = true;
    }
  };

  this.createMaze = function(){
    let cellStack = [];
    let tempCell = this.grid[Math.floor(columns / 2)][Math.floor(rows / 2)];
    //tempCell.visited = true;
    cellStack.push(tempCell);

    //debugger;
    this.checkCell(tempCell.pos, [0,0]);

    console.log(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    //console.log("cellStack: "); console.log(cellStack);
    console.log("tempCell: "); console.log(tempCell);
    console.log("grid: "); console.log(this.grid);
  };

  this.checkCell = function(pos, lastPos){
    //set grid at current position
    this.grid[pos[0]][pos[1]].visited = true;
    this.grid[pos[0]][pos[1]].character = ' ';
    this.grid[pos[0]][pos[1]].color = 'white';

    
    //direction list
    let directions = [
      [0,  1],
      [1,  0],
      [0, -1],
      [-1, 0]
    ];

    while(directions.length !== 0){
      //select random direction
      let nextDir = Math.floor(Math.random() * directions.length);
      
      //see if next cell has been visited. if not,
      if(this.grid[pos[0] + directions[nextDir][0]] [pos[1] + directions[nextDir][1]].visited === false){
        //create nextpos for clarity
        let nextPos = [pos[0] + directions[nextDir][0], pos[1] + directions[nextDir][1]];

        //remove next direction so that we don't create a wall over top of the next spot...
        directions.splice(nextDir, 1);
        if(directions.length > 1){
          
          let wallPos = this.getAvailableCell(directions, pos);

          if(wallPos !== undefined){
            this.grid[pos[0] + wallPos[0]][pos[1] + wallPos[1]].visited = true;
            this.grid[pos[0] + wallPos[0]][pos[1] + wallPos[1]].character = '■';
            this.grid[pos[0] + wallPos[0]][pos[1] + wallPos[1]].color = 'black';
          }
        }

        //call self recursively
        this.checkCell(nextPos, pos);
      } else {
        //direction has already been visited, so take it out of dir array so it can't be reselected
        directions.splice(nextDir, 1);
        //get a new random dir
        nextDir = Math.floor(Math.random() * directions.length);
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