
const canvas = {

  create : (id, width, height) => {

    let canvasElem = document.createElement('canvas');

    //on selectionne la div devant contenir le canva
    let myContainer = select(id);
    //on insere le canva dans la div
    myContainer.appendChild(canvasElem);


    canvasElem.id = "canvas";
    canvasElem.width = width;
    canvasElem.height = height;

    let ctx = canvasElem.getContext('2d');

    return {
      ctx: ctx,
      id: canvasElem.id,
      width: width,
      height: height
    };
  }
}
