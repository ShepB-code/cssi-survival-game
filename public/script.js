// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseIsPressed,
 *    mouseX, mouseY, rect, stroke, strokeWeight, width, io
 */

let MAP_W = 1600;
let MAP_H = 590;

let currentCanvasX;
let currentCanvasY;
let canvas;
let player;
let itemArray = [];
let enemyArray = [];
let layersArray = [];
let inventory;
let health;
let crafting;

let spawnerTimer;

let l1, l2, l3, l3Lights, l4, l5, l5Lights, l6, l7, l8, l9;

let backgroundLayer1,
  backgroundLayer2,
  backgroundLayer3,
  backgroundLayer3Lights,
  backgroundLayer4,
  backgroundLayer5,
  backgroundLayer5Lights,
  backgroundLayer6,
  backgroundLayer7,
  backgroundLayer8,
  backgroundLayer9;

function preload() {
  l1 = loadImage("assets/Layer1.png");
  l2 = loadImage("assets/Layer2.png");
  l3 = loadImage("assets/Layer3.png");
  l3Lights = loadImage("assets/Layer3Lights.png");
  l4 = loadImage("assets/Layer4.png");
  l5 = loadImage("assets/Layer5.png");
  l5Lights = loadImage("assets/Layer5Lights.png");
  l6 = loadImage("assets/Layer6.png");
  l7 = loadImage("assets/Layer7.png");
  l8 = loadImage("assets/Layer8.png");
  l9 = loadImage("assets/Layer9.png");
}
function setup() {
  canvas = createCanvas(927, 590);
  colorMode(HSB, 360, 100, 100);
  frameRate = 144;

  player = new Player();
  inventory = new Inventory(0, height);
  crafting = new Crafting();
  health = new HealthBar(0, 225, player.health);
  player.inventory = inventory;

  spawnerTimer = 500;
  for (let i = 0; i < 10; i++) {
    itemArray.push(new Thread(random(MAP_W)));
  }

  for (let i = 0; i < 10; i++) {
    itemArray.push(new Wood(random(MAP_W)));
  }

  for (let i = 0; i < 10; i++) {
    itemArray.push(new Beef(random(MAP_W)));
  }

  for (let i = 0; i < 10; i++) {
    itemArray.push(new Lettuce(random(MAP_W)));
  }

  // Initializing enemies
  for (let i = 0; i < 5; i++) {
    enemyArray.push(new Enemy(random(MAP_W)));
  }

  camera.position.y = height / 2 + 200;

  backgroundLayer1 = new Background(l1, l1, 0.5);
  backgroundLayer2 = new Background(l2, l2, 0.75);
  backgroundLayer3 = new Background(l3, l3, 1);
  backgroundLayer3Lights = new Background(l3Lights, l3Lights, 1.5);
  backgroundLayer4 = new Background(l4, l4, 1.75);
  backgroundLayer5 = new Background(l5, l5, 2);
  backgroundLayer5Lights = new Background(l5Lights, l5Lights, 2.5);
  backgroundLayer6 = new Background(l6, l6, 2.75);
  backgroundLayer7 = new Background(l7, l7, 3);
  backgroundLayer8 = new Background(l8, l8, 3.75);
  backgroundLayer9 = new Background(l9, l9, 4);

  layersArray.push(backgroundLayer1);
  layersArray.push(backgroundLayer2);
  layersArray.push(backgroundLayer3);
  layersArray.push(backgroundLayer3Lights);
  layersArray.push(backgroundLayer4);
  layersArray.push(backgroundLayer5);
  layersArray.push(backgroundLayer5Lights);
  layersArray.push(backgroundLayer6);
  layersArray.push(backgroundLayer7);
  layersArray.push(backgroundLayer8);
  layersArray.push(backgroundLayer9);
}

function draw() {
  background("green");
  //getting x, y coordinates for our canvas (updating with player movement);
  currentCanvasX = player.sprite.position.x - width / 2;
  currentCanvasY = 0;

  //updating our camera x position with the x coordinate of our player (height remains the same)
  camera.position.x = player.sprite.position.x;

  //getting x and y coordinates to increment our player by
  player.handlePosition(); //handles the y position with jumping
  let [xOffset, yOffset] = player.handleMovement();

  player.chooseAnimation(xOffset);

  //update player, crafting, and inventory positions
  player.moveSelf(xOffset, yOffset);
  crafting.updatePosition(player.sprite.position.x);
  inventory.updatePosition(currentCanvasX);

  camera.off();

  //update crafting inventory stats
  crafting.updateInventoryStats(inventory);

  crafting.getValidRecipes();
  camera.off();

  camera.on();

  //draw backgrounds
  drawBackgrounds();

  if (xOffset != 0) {
    //only move background when we're moving
    moveBackgrounds(xOffset);
  }

  //draw player

  if (player.craftingIsOpen) {
    crafting.showSelf();
  }
  player.showSelf();
  player.handleDeath();

  //draw inventory
  inventory.showSelf();

  //draw health
  health.updatePosition(currentCanvasX, currentCanvasY + 200);
  health.showSelf(player);

  //draw items
  drawItems();

  //show enemies
  drawEnemies();

  if (player.attacking) {
    player.handleAttack(enemyArray);
  }

  spawnerTimer--;
  if (spawnerTimer < 0) {
    spawnerTimer = 500;
    spawnItems();
  }
}

//DRAW FUNCTIONS
function drawBackgrounds() {
  layersArray.forEach((layer) => {
    layer.showSelf();
  });
}
function drawEnemies() {
  enemyArray.forEach((enemy) => {
    enemy.reverseMap();
    // Rendering enemies and moving if enemy in player view
    if (
      enemy.sprite.position.x > currentCanvasX &&
      enemy.sprite.position.x < currentCanvasX + width
    ) {
      enemy.showSelf();
      enemy.handleMovement(player);
    }
  });
}

function drawItems() {
  itemArray.forEach((item) => {
    if (
      item.sprite.position.x > currentCanvasX &&
      item.sprite.position.x < currentCanvasX + width
    ) {
      item.showSelf();
    }
    item.handleMovement();
  });
}

//MOVE FUNCTIONS
function moveBackgrounds(xOffset) {
  layersArray.forEach((layer) => {
    layer.moveSelf(xOffset > 0, currentCanvasX); //moveSelf(directionBoolean, currentXposition)
  });
}

//SPAWN FUNCTIONS

function spawnItems() {
  //spawn random items
  let itemTypeArray = ["wood", "thread", "beef", "lettuce"];

  //3 random items
  for (let i = 0; i < 3; i++) {
    let itemType = random(itemTypeArray);
    if (itemType == "wood") {
      itemArray.push(new Wood(random(currentCanvasX, currentCanvasX + width)));
    } else if (itemType == "thread") {
      itemArray.push(
        new Thread(random(currentCanvasX, currentCanvasX + width))
      );
    } else if (itemType == "beef") {
      itemArray.push(new Beef(random(currentCanvasX, currentCanvasX + width)));
    } else {
      itemArray.push(
        new Lettuce(random(currentCanvasX, currentCanvasX + width))
      );
    }
  }

  //spawn 1 enemy
  enemyArray.push(new Enemy(currentCanvasX, currentCanvasX + width));
}

//EVENT HANDLERS
function handleEating(index, satisfaction) {
  if (player.health != 100) {
    inventory.removeItem();
    itemArray.splice(index, 1);
  }

  player.health += satisfaction;

  if (player.health >= 100) {
    player.health = 100;
  }
}

function keyPressed() {
  console.log(keyCode);

  if (keyCode == 32) {
    //space
    player.handleKeyPress(key);
  }

  if (keyCode == 37 || keyCode == 39) {
    //left or right arrow
    crafting.cycleRecipes(key);
  }
  if (keyCode == 73) {
    //i
    player.handleKeyPress(key);

    crafting.cycleRecipes("beginning");
  }
  if (keyCode == 81) {
    //q
    player.handleKeyPress(key);
  }
  if (keyCode >= 49 && keyCode <= 57) {
    inventory.handleKeyPress(key); //value from 1-9
  }
  if (keyCode == 69) {
    if (player.craftingIsOpen) {
      crafting.purchaseItem(inventory, itemArray);
    } else {
      for (var item of itemArray) {
        if (player.itemPlayerCollision(item)) {
          inventory.addItem(item);
        }
      }
    }
    //key = e
  }
}

function mouseReleased() {
  player.attacking = false;
}
function mousePressed() {
  if (inventory.currentItem != null) {
    let index;
    for (let i = 0; i < itemArray.length; i++) {
      if (itemArray[i] == inventory.currentItem) {
        index = i;
        break;
      }
    }
    if (inventory.currentItem.name == "beef") {
      handleEating(index, 20);
    } else if (inventory.currentItem.name == "lettuce") {
      handleEating(index, 15);
    } else if (inventory.currentItem.name == "sword") {
      player.attacking = true;
    } else if (inventory.currentItem.name == "bow") {
      player.attacking = true;
    }
  }
}
