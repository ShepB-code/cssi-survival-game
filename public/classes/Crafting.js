class Crafting {
  constructor() {
    this.sprite = createSprite(width / 2, height, 300, 100);
    this.recipes = {
      sword: {
        wood: 3,
      },
      bow: {
        wood: 2,
        string: 1,
      },
    };
    this.validRecipes = [];
    this.inventoryStats = {};
  }

  showSelf() {
    drawSprite(this.sprite);
  }

  getValidRecipes() {
    for (const key in this.recipes) {
      let recipe = this.recipes[key];
      let valid = false;

      for (const itemType in recipe) {
        if (this.inventoryStats[itemType] >= recipe[itemType]) {
          valid = true;
        } else {
          valid = false;
        }
      }

      if (valid && this.recipeNotInValidRecipes(recipe)) {
        this.validRecipes.push(recipe);
      }
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
  }

  updateInventoryStats(inventory) {
    this.inventoryStats = {}; //resetting it
    inventory.itemsInInventory.forEach((item) => {
      if (item.name in this.inventoryStats) {
        this.inventoryStats[item.name]++; //increment the number
      } else {
        this.inventoryStats[item.name] = 1;
      }
    });
  }
}
