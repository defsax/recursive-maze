import Maze from './maze.js';

window.addEventListener("load", function(){
  //Modify canvas size AND grid size here:
  const WIDTH = 600;
  const HEIGHT = 600;
  const rows = 10;
  const columns = 10;
  
  window.maze = new Maze(rows, columns);
  window.maze.initialize();
  window.maze.resize(WIDTH, HEIGHT);

  loop();
});

const loop = function(){
  window.maze.update();
  requestAnimationFrame(loop);
}