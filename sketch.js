var michael,michael_img;
var bordas;
var chao,chaoimg;
var chaorobado;
var obs,obstacle1_img;
var nuvem;
var cloud;
var cacto;
var pontuacao = 0;
var grupocacto;
var gruponuvem;
var PLAY = 1;
var GAMEOVER = 2;
var modo = PLAY;
var gameover;
var restart;
var gameover_img;
var restart_img;
var morte;
var checkPoint;
var pulo;
var die;
function preload(){
  //pre carrega as imagens do jogo
  
  michael_img = loadAnimation("trex1.png","trex3.png","trex4.png");
  chaoimg = loadImage("ground2.png");
  obstacle1_img = loadImage("obstacle1.png"); 
  cloud = loadImage("cloud.png");
  restart_img = loadImage("restart.png");
  gameover_img = loadImage("gameOver.png");
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
  pulo = loadSound("jump.mp3");
  morte = loadSound("die.mp3");
  checkPoint = loadSound("checkPoint.mp3");
  die = loadImage("trex_collided.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  //var num = Math.round(random(1,10))
  //console.log(num)
  chao = createSprite(width/2,height-10,600,20);
  chao.addImage(chaoimg);
  chaorobado = createSprite(width/2,height-5,width,10);
  chaorobado.visible = false;
  grupocacto = new Group();
  gruponuvem = new Group();
  gameover = createSprite(width/2,height/2);
  gameover.addImage(gameover_img);
  restart = createSprite(width/2,height/2+50);
  restart.addImage(restart_img);
  gameover.visible = false;
  restart.visible = false;
  
  
  //configurações do dinossauro michael
  michael = createSprite(50,height-100,20,20);
  michael.addAnimation("running",michael_img);
  michael.addImage("die",die);
  michael.scale = 0.5;
  michael.debug = false;
  michael.setCollider("circle",0,0,30);
  //wmichael.setCollider("circle",100,0,30);
  bordas = createEdgeSprites();

}

function draw(){
  background('white');

 if (modo === PLAY){
  cloudgenerator();
  cactogenerator();
  pontuacao = pontuacao + Math.round(frameRate()/60)
  chao.velocityX = -(5+pontuacao/100);

  if (pontuacao%100===0&&pontuacao>0){
    checkPoint.play();
  }
   
  if (chao.x<0){
    chao.x = chao.width/2;
   }

   
  if(touches.length>0&&michael.isTouching(chao)){
    touches=[]
    michael.velocityY = -17;
    pulo.play();
  }
   
  //gravidade
  michael.velocityY = michael.velocityY + 1;

  if (michael.isTouching(grupocacto)){
  modo = GAMEOVER;  
  morte.play();
  //michael.velocityY=-17;
  }
  
 }
 

 else if (modo===GAMEOVER){
 grupocacto.setVelocityXEach(0);
 gruponuvem.setVelocityXEach(0);
 chao.velocityX = 0;
 michael.velocityY = 0;
 michael.changeAnimation("die");
 grupocacto.setLifetimeEach(-1);
 gruponuvem.setLifetimeEach(-1);
 gameover.visible = true;
 restart.visible = true;
 if (touches.length){
  reset();
  touches=[]
 }
 }

  

  

 text("points: "+pontuacao,width-100,50)
 
 


 
 


  michael.collide(chaorobado);

  drawSprites();
}

function cloudgenerator(){
  if (frameCount%60===0){
    nuvem = createSprite(width+25,100,20,20);
    nuvem.velocityX = -3;
    nuvem.addImage(cloud);
    nuvem.scale = 0.7;
    nuvem.y = Math.round(random(height-150,height-100));
    nuvem.depth = michael.depth;
    michael.depth = michael.depth + 1;
    nuvem.lifetime = width+20;
    gruponuvem.add(nuvem);


  }

  

}

function cactogenerator(){
if (frameCount%80===0){
cacto = createSprite(width+15,height-20,20,20);
cacto.velocityX = -(5+pontuacao/100);
var cactoaleatorio = Math.round(random(1,6));
switch(cactoaleatorio){
  case 1: cacto.addImage(cacto1);
  break ;

  case 2: cacto.addImage(cacto2);
  break ;

  case 3: cacto.addImage(cacto3);
  break ;

  case 4: cacto.addImage(cacto4);
  break ;

  case 5: cacto.addImage(cacto5);
  break ;

  case 6: cacto.addImage(cacto6);
  break ;

default: break;

  
}
cacto.scale = 0.6;
cacto.lifetime = width+4;
grupocacto.add(cacto);
}



}

function reset(){
modo=PLAY;
grupocacto.destroyEach()
gruponuvem.destroyEach()
gameover.visible=false;
restart.visible=false;
pontuacao=0;
michael.changeAnimation("running");
}

