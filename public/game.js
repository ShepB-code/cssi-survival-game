function Game() {
    let MAP_W = 3000;
    let MAP_H = 590;

    let canvas;
    let currentCanvasX;
    let currentCanvasY;
    let player;
    let itemArray = [];
    let enemyArray = [];
    let inventory;
    let health;
    let crafting;

    let spawnerTimer;

    var me = this;

    this.enter = function() {
        canvas = createCanvas(927, 590);
        initGame();
    }    

    this.draw = function() {
        image( this.sceneManager.bkImage, 0, 0);

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
        handlePlayerDeath();
    
        //draw inventory
        inventory.showSelf();
    
        //draw health
        health.updatePosition(currentCanvasX, currentCanvasY + 200);
        health.showSelf(player);
    
        //draw items
        drawItems();
    
        //show enemies
        drawEnemies();
    
        // handle player attacking enemy
        if (player.attacking) {
          player.handleAttack(enemyArray);
        }

        // spawn items and enemies when none
        spawnerTimer--;
        if (spawnerTimer < 0) {
          spawnerTimer = 500;
          spawnItemsAndEnemies();
        }
    }

    // INITIALIZE THE GAME

    function initGame() {
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
        for (let i = 0; i < 7; i++) {
          enemyArray.push(new Enemy(random(MAP_W)));
        }
    }

    // KEY EVENT HANDLERS

    this.keyPressed = function() {
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
                player.craftingIsOpen = false;
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

    this.mouseReleased = function() {
        player.attacking = false;
    }

    this.mousePressed = function() {
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

    // DRAW FUNCTIONS
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

    // MOVE FUNCTION

    function moveBackgrounds(xOffset) {
      layersArray.forEach((layer) => {
        layer.moveSelf(xOffset > 0, currentCanvasX); //moveSelf(directionBoolean, currentXposition)
      });
    }

    // SPAWN FUNCTION
    function spawnItemsAndEnemies() {
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

    // EVENT HANDLERS
    function handlePlayerDeath() {
        if(player.health <= 0) {
            player.health = 0;
            me.sceneManager.showScene(GameOver);
        }
    }
    
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
}