var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,189,87);

  foodObj.display();

    fedTime = database.ref("FeedTime");
    fedTime.on("value", function(data){
    lastFed = data.val();
    })

    fill(225,255,254);
    textSize(15);
    if(lastFed >= 12){
      text("Last Feed:" + lastFed % 12 + "PM",400,50);
    }
    else if(lastFed == 0){
      text("Last Feed: 12AM",400,50);
    }
    else{
      text("Last Feed:" + lastFed + "AM",400,50)
    }

    fill("black");
    stroke("black");
    text("Food remaining : "+foodS,150,60);
    textSize(13);
    text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

  drawSprites();
 
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock
  if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    feedTime : hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}