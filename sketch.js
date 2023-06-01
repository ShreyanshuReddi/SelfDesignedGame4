var player
var ground
var background1
var playerImg
var backgroundImg
var groundImg
var invground
var end = 0
var play = 1
var gameState = play
var obstaclesGroup, obstacles1, obstacles2, obstacles3
var score = 0
var restart, restartImg

function preload()
{
  backgroundImg=loadImage("background.jpg")
  playerImg=loadImage("A1.png")
  groundImg=loadImage("ground.png")
  obstacles1 = loadImage("bats.png")
  obstacles2 = loadImage("ball.png")
  obstacles3 = loadImage("arrow.png")
  restartImg = loadImage("restart.png")
}

function setup() {
  createCanvas(1000,700);
  
  background1 = createSprite(500,350,1000,100)
  background1.addImage("back",backgroundImg)
  background1.scale = 1.2


  background1.velocityX = -2
  
  
  

  
  
  ground = createSprite(500,665,1000,200)
  ground.addImage("ground1",groundImg)
  ground.scale = 3

  invground = createSprite(500,720,1000,100)
  invground.visible = false


  player = createSprite(100,560,50,50)
  player.addImage("player1",playerImg)

  

  ground.velocityX = -2

  obstaclesGroup = new Group()
  
  restart = createSprite(500,400,70,40)
  
  restart.addImage("restart1", restartImg)
  restart.scale = 0.5

}

function draw() 
{
  background(51);

  
  ground.velocityX = -(5 + score/100);
  background1.velocityX = -(5 + score/100);

  player.velocityY = player.velocityY + 0.8

  player.collide(invground)

   
 
  if (gameState === play) {
    restart.visible = false
  }
    else if (gameState === end) {
      restart.visible = true
      if (mousePressedOver(restart)) {
        reset()
      }
    }

  if (gameState === play) {
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (background1.x < -100){
      background1.x = background1.width/3;
    }
  
    if (keyDown("space") && player.y > 400) {
      player.velocityY = -10
    }
    if (keyWentDown("s")) {
      player.rotation = -90
      invground.y = invground.y + 50
      player.y = player.y + 50

    }
    if (keyWentUp("s")) {
      player.rotation = 0
      invground.y = invground.y - 50

    }
    spawnObstacles()

    score = score + Math.round(getFrameRate()/60)
    
    if (obstaclesGroup.isTouching(player)) {
      gameState = end
    }
    
    


  }
    else if(gameState === end) {
      ground.velocityX = 0
      background1.velocityX = 0
      obstaclesGroup.destroyEach()
     
        if (gameState === play) {
        restart.visible = false
        }
        
        
    }



    
drawSprites()

fill("black")
textSize(20)
text("Score: " + score, 50, 75)
    
}


function spawnObstacles() {
  if(frameCount % 150 === 0) {
    
    
    
    var rand = Math.round(random(1,3))
     if (rand === 1) {
      var obstacles = createSprite(1200,460,20,20)
        obstacles.addImage(obstacles1)
        obstacles.scale = 0.5
        obstacles.velocityX = -(5 + score/100);
     }
     if (rand === 2) {
      var obstacles = createSprite(1200,600,20,20)
        obstacles.addImage(obstacles2)
        obstacles.scale = 0.7
        obstacles.rotationSpeed = -5
        obstacles.velocityX = -(7 + score/100);
        
     }
     if (rand === 3) {
      var obstacles = createSprite(1200,600,20,20)
        obstacles.addImage(obstacles3)
        obstacles.scale = 0.7
        obstacles.velocityX = -(10 + score/75);
     }


      
     obstacles.setCollider("circle", 0,0,30)
     obstacles.debug = false
      
      obstacles.lifetime = 450
    obstaclesGroup.add(obstacles)
    
  }
}

function reset() {
  gameState = play
  score = 0
}
