var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obs1, obs2, obs3, obs4, obs5, obs6;
var score = 0;
var obsgroup
var cloudsgroup
var PLAY = 1
var END = 0
var gameState = PLAY
var gameOver, gameOverImG
var reset, resetImg
var score;
var diesound;
var jumpsound;
var checkpointsound;

var cloudImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png")
  groundImage = loadImage("ground2.png");
  obs1 = loadImage ("obstacle1.png");
  obs2 = loadImage ("obstacle2.png");
  obs3 = loadImage ("obstacle3.png");
  obs4 = loadImage ("obstacle4.png");
  obs5 = loadImage ("obstacle5.png");
  obs6 = loadImage ("obstacle6.png");
  resetImg = loadImage ("restart.png");
  gameOverImg = loadImage ("gameOver.png");
  diesound = loadSound ("die.mp3");
  jumpsound = loadSound ("jump.mp3");
  checkpointsound = loadSound ("checkpoint.mp3");
}

function setup() {

  obsgroup = new Group()
  cloudsgroup = new Group()

  createCanvas(600,200)
  
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  reset = createSprite(300, 140);
  reset.addImage(resetImg);
  reset.scale = 0.5

  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)

   //trex.debug = true;
   trex.setCollider("circle", 0, 0, 40);
}

function draw() {
  //definir cor do plano de fundo
  background(180);
  textSize(15)
  text ("score: " + score, 500, 50)
  

  if( gameState === PLAY){
    ground.velocityX = -4;
    score = score + Math.round (frameCount/60)
    
    if(score > 0 && score % 100 === 0){
      checkpointsound.play ();
    }

    gameOver.visible = false
    reset.visible = false

    if(keyDown("space")&& trex.y >= 146) {
      trex.velocityY = -10;
      jumpsound.play ();
    }

    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnClouds()
    spawnObstacle()

    if (obsgroup.isTouching(trex)){
      gameState = END
    //trex.velocityY = -10
    diesound.play ()
   }
   
  }
  
  if ( gameState === END){
    ground.velocityX = 0;
    obsgroup.setVelocityXEach(0)
    cloudsgroup.setVelocityXEach(0)
    trex.changeAnimation (trex_collided)
    obsgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1); 
    trex.velocityY = 0;
    gameOver.visible = true
    reset.visible = true
  }

  //console.log(trex.y)
  
  
  
  //Pulando o trex ao pressionar a tecla de espaço
  
  
  
  
  
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  //Gerar Nuvens
  

  console.log(frameCount)

  drawSprites();
}

//função para gerar as nuvens
function spawnClouds(){
 //escreva seu código aqui
 
 if(frameCount %60 === 0){
 var cloud = createSprite (600, 100, 40, 10)
 cloud.addImage(cloudImage)
 cloud.velocityX = -3
 cloud.scale = 0.5
 cloud.y = Math.round(random(25, 75  )) 
 cloud.depth = trex.depth
 trex.depth = trex.depth +1 
 cloud.lifetime = 210
 cloudsgroup.add(cloud)
  }



}

function spawnObstacle(){

  if (frameCount %60 === 0){
    var obstacle = createSprite (615 , 165, 10, 40)
    obstacle.velocityX = -(6+ score/100)
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obs1);
      break;
      case 2: obstacle.addImage(obs2);
      break;
      case 3: obstacle.addImage(obs3);
      break;
      case 4: obstacle.addImage(obs4);
      break;
      case 5: obstacle.addImage(obs5);
      break;
      case 6: obstacle.addImage(obs6);
      break;
      default: break;
    }
    obstacle.scale = 0.6;
    obstacle.lifetime = 300
    obsgroup.add(obstacle)
  }

}


