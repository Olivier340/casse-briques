
const rect ={

  draw : (ctx, x, y, widht, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, widht, height);

    return {
      x: x,
      y: y,
      widht: widht,
      height: height,
      color: color
    };
  },
}



