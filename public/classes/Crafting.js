class Crafting {
  constructor() {
    this.sprite = createSprite(width / 2, height, 150, 150);
    this.leftArrowSprite = createSprite(this.sprite.position.x, height, 20, 20);
    this.rightArrowSprite = createSprite(
      this.sprite.position.x + this.sprite.width,
      height,
      20,
      20
    );
    this.displayItemSprite = createSprite(
      this.sprite.position.x - 15,
      this.sprite.position.y - 15,
      30,
      30
    );

    this.recipes = {
      sword: {
        name: "sword",
        ingredients: {
          wood: 3,
        },
      },
      bow: {
        name: "bow",
        ingredients: {
          wood: 2,
          thread: 1,
        },
      },
    };
    this.validRecipes = [];
    this.inventoryStats = {};
    this.index = 0;
    this.currentRecipe = null;

    this.sprite.addAnimation(
      "craftingMenu",
      "../assets/crafting/craftingMenu.png"
    );
    this.leftArrowSprite.addAnimation(
      "leftArrow",
      "../assets/crafting/leftCraftArrow.png"
    );
    this.rightArrowSprite.addAnimation(
      "rightArrow",
      "../assets/crafting/rightCraftArrow.png"
    );

    this.displayItemSprite.addAnimation(
      "addSlot",
      "../assets/crafting/addSlot.png"
    );
    this.displayItemSprite.addAnimation(
      "bow",
      "../assets/crafting/bowCrafting.png"
    );
    this.displayItemSprite.addAnimation(
      "sword",
      "../assets/crafting/swordCrafting.png"
    );
  }

  showSelf() {
    drawSprite(this.sprite);
    drawSprite(this.leftArrowSprite);
    drawSprite(this.rightArrowSprite);
    if (this.currentRecipe != null) {
      this.displayItemSprite.changeAnimation(this.currentRecipe["name"]);
      drawSprite(this.displayItemSprite);
    } else {
      drawSprite(this.displayItemSprite);
    }
  }
  cycleRecipes(key) {
    if (key == "beginning") {
      this.index = 0;
    }
    if (key == "ArrowRight") {
      if (this.index < this.validRecipes.length - 1) {
        this.index++;
      }
    } else if (key == "ArrowLeft") {
      if (this.index > 0) {
        this.index--;
      }
    }
    this.currentRecipe = this.validRecipes[this.index];

    if (this.index >= this.validRecipes.length - 1) {
      this.rightArrowSprite.visible = false;
    } else {
      this.rightArrowSprite.visible = true;
    }
    if (this.index <= 0) {
      this.leftArrowSprite.visible = false;
    } else {
      this.leftArrowSprite.visible = true;
    }
  }
  purchaseItem(inventory, allItems) {
    if (this.validRecipes.length < 1) {
      return;
    }

    if (this.isValidPurchase()) {
      console.log(this.inventoryStats);
      //remove items from the inventory
      for (const itemType in this.currentRecipe["ingredients"]) {
        //check if there is enough resources to buy the item
        for (let i = 0; i < this.currentRecipe["ingredients"][itemType]; i++) {
          //use the items
          for (const key in inventory.items) {
            //find an item in the inventory that matches our needs
            if (
              inventory.items[key].item != null &&
              itemType == inventory.items[key].item.name
            ) {
              //if we found the item then we remove it from the items array
              for (let j = 0; j < allItems.length; j++) {
                if (allItems[j] == inventory.items[key].item) {
                  allItems.splice(j, 1);
                  break;
                }
              }
              //lastly we remove it from the inventory;
              inventory.items[key].item = null;
              break;
            }
          }
        }
      }

      if (this.currentRecipe["name"] == "sword") {
        let item = new Sword(width / 2);
        allItems.push(item);
        inventory.addItem(item);
      } else if (this.currentRecipe["name"] == "bow") {
        let item = new Bow(width / 2);
        allItems.push(item);
        inventory.addItem(item);
      }
      this.updateInventoryStats(inventory);
      this.getValidRecipes();
      this.cycleRecipes("beginning");
    }
  }
  isValidPurchase() {
    for (const key in this.currentRecipe["ingredients"]) {
      if (this.inventoryStats[key] < this.currentRecipe["ingredients"][key]) {
        return false;
      }
    }
    return true;
  }
  getValidRecipes() {
    this.validRecipes = []; //resetting
    for (const key in this.recipes) {
      let recipe = this.recipes[key];
      let valid = false;
      for (const itemType in recipe["ingredients"]) {
        if (this.inventoryStats[itemType] >= recipe["ingredients"][itemType]) {
          valid = true;
        } else {
          valid = false;
          break;
        }
      }
      if (valid && this.recipeNotInValidRecipes(recipe)) {
        this.validRecipes.push(recipe);
      }
    }
    if (this.validRecipes.length < 1) {
      this.currentRecipe = null;
    }
  }

  recipeNotInValidRecipes(recipe) {
    for (let recipeItem of this.validRecipes) {
      if (recipe == recipeItem) {
        return false;
      }
    }
    return true;
  }
  updatePosition(x) {
    this.sprite.position.x = x;
    this.leftArrowSprite.position.x = x - this.sprite.width / 2;
    this.rightArrowSprite.position.x = x + this.sprite.width / 2;
    this.displayItemSprite.position.x = x - 15;
  }

  updateInventoryStats(inventory) {
    this.inventoryStats = {
      wood: 0,
      thread: 0,
    };
    for (const key in inventory.items) {
      if (inventory.items[key].item != null) {
        let name = inventory.items[key].item.name;
        if (name in this.inventoryStats) {
          this.inventoryStats[name]++; //increment the number
        } else {
          this.inventoryStats[name] = 1;
        }
      }
    }
    //console.log(this.inventoryStats);
  }
}
