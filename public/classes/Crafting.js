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

    this.leftArrowSprite.shapeColor = "red";
    this.rightArrowSprite.shapeColor = "orange";

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
    this.currentRecipe;
  }

  showSelf() {
    drawSprite(this.sprite);
    drawSprite(this.leftArrowSprite);

    drawSprite(this.rightArrowSprite);

    rect(this.sprite.position.x, this.sprite.position.y, 30, 30);
  }
  cycleRecipes(key) {
    if (key == "beginning") {
      this.index = 0;
      this.currentRecipe = this.validRecipes[this.index];
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

    console.log(this.index);
    console.log(this.currentRecipe);
    console.log(this.validRecipes);
  }
  purchaseItem(inventory, allItems) {
    this.validRecipes.splice(this.index, 1);
    //remove items from the inventory
    for (const key in inventory.items) {
      for (const itemType in this.currentRecipe["ingredients"]) {
        if (
          inventory.items[key].item != null &&
          itemType == inventory.items[key].item.name
        ) {
          if (this.currentRecipe["ingredients"][itemType] > 0) {
            for (let i = 0; i < allItems.length; i++) {
              if (allItems[i] == inventory.items[key].item) {
                allItems.splice(i, 1);
                break;
              }
            }
            this.currentRecipe["ingredients"][itemType]--;
            inventory.items[key].item = null;
          }
        }
      }
    }
    if (this.currentRecipe["name"] == "sword") {
      inventory.addItem(new Sword(width / 2));
    } else if (this.currentRecipe["name"] == "bow") {
      inventory.addItem(new Bow(width / 2));
    }
  }
  getValidRecipes() {
    //this.validRecipes = []; //resetting
    for (const key in this.recipes) {
      let recipe = this.recipes[key];
      let valid = false;
      //console.log(recipe);

      for (const itemType in recipe["ingredients"]) {
        //console.log(recipe["ingredients"][itemType]);
        if (this.inventoryStats[itemType] >= recipe["ingredients"][itemType]) {
          valid = true;
        } else {
          valid = false;
        }
      }
      if (valid && this.recipeNotInValidRecipes(recipe)) {
        console.log("getting here");
        this.validRecipes.push(recipe);
      }
    }
    //console.log(this.validRecipes);
  }

  recipeNotInValidRecipes(recipe) {
    console.log("recipe not in valid recipes");
    for (let recipeItem of this.validRecipes) {
      console.log("recipe not in valid recieps loop");
      console.log(
        `Comparing ${recipe.name} && ${recipeItem.name} result = ${
          recipe == recipeItem
        }`
      );
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
  }

  updateInventoryStats(inventory) {
    this.inventoryStats = {}; //resetting it

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
