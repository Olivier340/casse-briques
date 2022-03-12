
const circle = {

  
  draw : (ctx, x, y, radius, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, circle.degToRad(0), circle.degToRad(360), false);
    ctx.fill();
    
    return {
      radius: radius,
      x: x,
      y: y,
      color: color
    };
  },
  degToRad : (degrees) => degrees * Math.PI / 180,

  reportArea : (radius, listId) =>{
    let listItem = document.createElement('li');
    listItem.textContent = `${name} area is ${Math.round(Math.PI * (radius * radius))}px squared.`

    let list = document.getElementById(listId);
    list.appendChild(listItem);
  },

  reportPerimeter : (radius, listId) => {
    let listItem = document.createElement('li');
    listItem.textContent = `${name} circumference is ${Math.round(2 * Math.PI * radius)}px.`

    let list = document.getElementById(listId);
    list.appendChild(listItem);
  },
}

