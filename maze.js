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
        utils.drawText(this.grid[i][j].character, this.canvas.width / columns * i - 2, this.canvas.height / rows * j + 13, "black", "fill", "25px Arial", "left", this.ctx);
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

    this.checkCell(tempCell.pos);

    //console.log("cellStack: "); console.log(cellStack);
    console.log("tempCell: "); console.log(tempCell);
    console.log("grid: "); console.log(this.grid);
  };

  this.checkCell = function(pos){
    let directions = [1, -1];

    let x = pos[0];
    let y = pos[1];

    if(this.grid[x][y].visited === false){
      console.log(this.grid[x][y]);
      this.grid[x][y].visited = true;
      this.grid[x][y].character = ' ';

      
      this.checkCell(pos);
    }
    else{
      console.log('Cell visited.');
    }

  };
}