//Create variables here
var dog, dogIMG, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  
  dogIMG = loadImage("dogImg.png");

  happyDog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 1000);

  dog = createSprite(500,500)
  dog.addImage(dogIMG);
  dog.scale = 0.5;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill(255);
  text("Note: Press the up arrow to feed Drago milk!",300,30);
}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}