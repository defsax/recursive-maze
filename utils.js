export function drawText(text, x, y, color, type, font, align, context){
  context.font = font;
  context.textAlign = align;
  switch(type){
    case "stroke":
      context.strokeStyle = color;
      context.strokeText(text, x, y);
      break;
    case "fill":
      context.fillStyle = color;
      context.fillText(text, x, y);
      break;
    default:
      console.log("Unknown type.");
      break;
  }
}

export function drawRect(x, y, w, h, fill, stroke = 'black', context){
  context.beginPath();
  context.rect(x, y, w, h);
  context.fillStyle = fill;
  context.fill();
  context.strokeStyle = stroke;
  context.stroke();
  context.closePath();
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}