var monkey, monkey_running;

var banana, obstacle;

var bananaImage, obstaclesImage;

var bananaGroup, obstacleGroup;

var Score = 0;

var SurvivalTime = 0;

var ground;

var forestbg, forestbgImage;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");

  forestbgImage = loadImage("background.jpg")

}



function setup() {
  createCanvas(600, 600)

  ground = createSprite(200, 500, 500, 10);
  ground.velocityX = 0;
  ground.x = ground.width / 2;
  console.log(ground.x)

  forestbg = createSprite(300, 300, 700, 500);
  forestbg.addImage(forestbgImage);
  forestbg.scale = 4;
  forestbg.velocityX = -3
  forestbg.x = forestbg.width / 2;

  monkey = createSprite(100, 300, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;


  bananaGroup = new Group();
  obstacleGroup = new Group();

  Score = 0
}


function draw() {
  background("white");

  if (forestbg.x < 0) {
    forestbg.x = forestbg.width / 2;
  }

  //make the monkey stand on ground
  monkey.collide(ground)

  //make the ground invisible
  ground.visible = false;

  //make the ground move
  //forestbg.x = forestbg.width / 2;

  if (keyDown("space")) {
    monkey.velocityY = -13;
  }

  if (monkey.isTouching(obstacleGroup)) {
    monkey.scale = 0.1;
  }



  if (monkey.isTouching(bananaGroup)) {
    Score = Score + 2;
    bananaGroup.destroyEach();
  }




  //grvity for monkey
  monkey.velocityY = monkey.velocityY + 0.8

  //create function for fruit and obstacles
  fruit();
  obstacles();


  switch (Score) {
    case 10:
      monkey.scale = 0.2;
      break;
    case 20:
      monkey.scale = 0.3;
      break;
    case 30:
      monkey.scale = 0.3;
      break;
    case 40:
      monkey.scale = 0.4;
      break;

    default:
      break;
  }


  drawSprites();

  //survival time and score
  stroke("red");
  textSize(20);
  fill("red");
  text("Score:" + Score, 290, 100);

  stroke("red");
  textSize(20);
  fill("red");
  SurvivalTime = Math.ceil(frameCount / 60)
  text("SurvivalTime:" + SurvivalTime, 100, 100);
  console.log(Math.ceil(frameCount / 60))



}

function fruit() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 300, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(320, 400));
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 100;

    bananaGroup.add(banana)
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 310, 10, 10);
    obstacle.addImage("obstacle", obstaclesImage);
    obstacle.y = Math.round(random(490, 490));
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;


    obstacleGroup.add(obstacle)
  }
}