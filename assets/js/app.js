
const app = {
    
    bricks :[], 
    speedx : 3,
    speedy : -3,
    radiusBall : 10,
    racketHeight : 10,
    racketWidht : 70 ,
    brickWidht : 75,
    brickHeight : 20,
    nbCol : 8,
    nbRow : 5,
    score :0,
    displayScore: select('.score'),
    endGame : false,
    xBall : 0,
    yBall : 0,
    xRacket : 0,
    yracket : 0,
    
    racketAudio : new Audio('assets/sons/raquette.wav'),
    brickAudio : new Audio('assets/sons/brique_dure.wav'),
    wallAudio : new Audio('assets/sons/wall.wav'),
    perduAudio : new Audio('assets/sons/brique.wav'),
    racketAudio : new Audio('assets/sons/brique.wav'),

    init: function() {
        console.log("test")
        
        app.canvas = canvas.create('#myCanvas', 750, 450);
        app.myCanvas = select('canvas');
        app.ctx = app.myCanvas.getContext('2d');
        on('click','canvas', app.reLoad);
        on('mousemove',"", app.mouveMouse);

        //position de départ de la balle et de la raquette
        app.xBall = app.myCanvas.width/2, app.yBall = app.myCanvas.height -30;
        app.xRacket = (app.myCanvas.width - app.racketWidht) / 2, app.yracket = app.myCanvas.height - app.racketHeight - 2;
        
        // Un tableau contenant toutes les briques    
        app.bricks = [];
        for(let row = 0; row < app.nbRow; row++){
            app.bricks[row] = [];
        
            for(let col = 0; col < app.nbCol; col++){
            app.bricks[row][col] = {x: 0, y: 0, status: 1}
            }
            
        }
         // on affiche les briques , la balle , et la raquete
         app.display();
    },
    mouveMouse : function(evt){

        let posXRacketCanvas = evt.clientX - app.myCanvas.offsetLeft;
        if(posXRacketCanvas > app.racketWidht/2 && posXRacketCanvas < app.myCanvas.width - (app.racketWidht/2) ){
            app.xRacket = posXRacketCanvas-(app.racketWidht/2);
        } 
        
    },
    reLoad : function(){
        if(app.endGame === true){
            app.endGame = false;
            document.location.reload();
        }
    },
    displayBall : function(){
       circle.draw(app.ctx, app.xBall, app.yBall, app.radiusBall, 'green');
            
    },
    displayRacket : function(){
        rect.draw(app.ctx, app.xRacket, app.yracket, app.racketWidht, app.racketHeight, 'blue');
       
    },
      
    displayBricks : function(){
    
        for (let row = 0; row < app.nbRow; row++) {
            
            for (let col = 0; col <app.nbCol; col++) {
                
                if (app.bricks[row][col].status === 1) {
                    // 75 * 8 + 10 * 8 + 35 = 750
                   
                    app.bricks[row][col].x = (col * (app.brickWidht + 10) + 35);
                    app.bricks[row][col].y = (row * (app.brickHeight + 10) + 30);
    
                    let xBrick = app.bricks[row][col].x ;
                    let yBrick = app.bricks[row][col].y;
                    
                    rect.draw(app.ctx, xBrick, yBrick, app.brickWidht, app.brickHeight, '#333');
                    
                }
               
            } 
        }
        
    
        
    },

    impactDetect :function () {
        for (let row = 0; row < app.nbRow; row++) {
            
            for (let col = 0; col <app.nbCol; col++) {
                let brick = app.bricks[row][col];
               
                if (brick.status === 1) {
                    if(app.xBall > brick.x && app.xBall < brick.x + app.brickWidht && app.yBall > brick.y && app.yBall < brick.y +app.brickHeight){
                        app.brickAudio.play()
                        app.speedy = - app.speedy;
                        brick.status = 0;
                        app.score++;
                        app.displayScore.innerHTML = `Score : ${app.score}`;
    
                        if(app.score === app.nbCol * app.nbRow){
                            app.displayScore.innerHTML = `Bravo ! <br> Clique sur le casse-briques pour recommencer.`;
                            app.endGame = true;
                        }
                    }
                }
            }
        }
    },

    display : function(){
        if(app.endGame === false){

            app.ctx.clearRect(0, 0, app.myCanvas.width, app.myCanvas.height);
            app.displayBall();
            app.displayRacket();
            app.displayBricks();
            app.impactDetect();

            // on touche un mur sur le coté
            if (app.xBall + app.speedx > app.myCanvas.width - app.radiusBall || app.xBall + app.speedx < app.radiusBall){
                app.wallAudio.play()
                app.speedx = - app.speedx
            }
            // on touche le mur du haut
            if ( app.yBall + app.speedy < app.radiusBall){
                app.wallAudio.play()
                app.speedy = - app.speedy
            }

            if (app.yBall + app.speedy > app.myCanvas.height - app.radiusBall ){
                //la balle arrive en bas , on controle les coordonnées de la raquete 
                if(app.xBall > app.xRacket && app.xBall < app.xRacket+app.racketWidht){
                    app.racketAudio.play();
                    // la balle touche la raquette on change la direction en Y et on augmente la vitesse
                    // todo ajouter un angle avec speedx selon la position de la balle sur la raquete
                    posBallRacket =  (app.xRacket+ (app.racketWidht/2))-app.xBall;
                    console.log(posBallRacket);

                                     
                    app.speedy = - app.speedy - 0.1;
                }else{
                    app.endGame = true;
                    app.displayScore.innerHTML = `Perdu ! <br> Clique sur le casse-briques pour recommencer.`;
                  
                }

            }
            app.xBall += app.speedx;
            app.yBall += app.speedy;
            requestAnimationFrame(app.display);
       
        }      
    },
    
    
    
}
// On lance la fonction app.init une fois la page chargee
  // Cela évent de bloquer l'affichage de la page
//  document.addEventListener('DOMContentLoaded', app.init);