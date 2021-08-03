// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseIsPressed,
 *    mouseX, mouseY, rect, stroke, strokeWeight, width, io
 */

let MAP_W = 1600;
let MAP_H = 800;

let currentCanvasX;
let currentCanvasY;
let canvas;
let player;
let itemArray = [];
let inventory;

function setup() {
  canvas = createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);

  player = new Player();
  inventory = new Inventory(0, height - 20, player);
  player.inventory = inventory;
  for (let i = 0; i < 100; i++) {
    itemArray.push(new Item(random(MAP_W), random(MAP_H), i));
  }
}

function draw() {
  background("green");

  camera.position.x = player.sprite.position.x;
  camera.position.y = player.sprite.position.y;

  player.showSelf();

  let [xOffset, yOffset] = player.handleMovement();
  currentCanvasX = player.sprite.position.x - width / 2;
  currentCanvasY = player.sprite.position.y - height / 2;
  rect(currentCanvasX - xOffset, currentCanvasY - yOffset, 10, 10);

  inventory.updatePosition(
    currentCanvasX - xOffset,
    currentCanvasY + height - inventory.squareSize - yOffset
  );
  inventory.showSelf();

  player.moveSelf(xOffset, yOffset);

  //player.showInventory();
  for (let i = 0; i < itemArray.length; i++) {
    if (
      itemArray[i].sprite.position.x > currentCanvasX &&
      itemArray[i].sprite.position.x < currentCanvasX + width &&
      itemArray[i].sprite.position.y > currentCanvasY &&
      itemArray[i].sprite.position.y < currentCanvasY + height
    ) {
      itemArray[i].showSelf();
    }
  }
  //itemPlayerCollision();

  camera.off();
}
function keyPressed() {
  console.log(keyCode);
  if (keyCode == 81) {
    //q
    player.handleKeyPress(key);
  }
  if (keyCode >= 49 && keyCode <= 57) {
    inventory.handleKeyPress(key); //value from 1-9
  }
  if (keyCode == 69) {
    //key = e
    for (var item of itemArray) {
      if (itemPlayerCollision(item)) {
        inventory.addItem(item);
      }
    }
  }
}

function itemPlayerCollision(item) {
  if (
    collideRectRect(
      player.sprite.position.x,
      player.sprite.position.y,
      50,
      50,
      item.sprite.position.x,
      item.sprite.position.y,
      20,
      20
    )
  ) {
    return true;
  }
}
