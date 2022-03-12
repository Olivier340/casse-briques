
const control = {
  
    rightPressed : false,
    leftPressed : false,
   
    init: function() {
        on("keydown","", control.keyDownHandler);
        on("keyup","", control.keyDownHandler);
    },
   
    keyDownHandler :function(e) {
        if(e.keyCode == 39) {
            control.rightPressed = true;
        }
        else if(e.keyCode == 37) {
            control.leftPressed = true;
        }
    },
    keyUpHandler : function(e) {
        if(e.keyCode == 39) {
            control.rightPressed = false;
        }
        else if(e.keyCode == 37) {
            control.leftPressed = false;
        }

    },
    mouveMouse : function(evt){

        let posXRacketCanvas = evt.clientX - app.myCanvas.offsetLeft;
        console.log(posXRacketCanvas )
        if(posXRacketCanvas > app.racketWidht/2 && posXRacketCanvas < app.myCanvas.width - (app.racketWidht/2) ){
            app.xRacket = posXRacketCanvas-(app.racketWidht/2);
        } 
        
    },
}

