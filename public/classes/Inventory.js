class Inventory {
  constructor(x, y) {
    this.squareSize = 30;
    this.items = {};
    this.itemsInInventory = [];
    for (let i = 1; i < 10; i++) {
      this.items[i] = new InventorySquare(
        x + this.squareSize * (i - 1),
        height + 150,
        this.squareSize
      );

      this.currentItemSquare = null;
      this.currentItem = null;
    }

    //key pressed = 9; inventory[9]
  }

  showSelf() {
    for (const key in this.items) {
      this.items[key].showSelf();
    }
  }

  addItem(item) {
    console.log(this.items);
    for (const key in this.items) {
      if (!this.items[key].hasItem()) {
        this.items[key].addItem(item);
        this.itemsInInventory.push(item);
        console.log(this.itemsInInventory);
        break;
      }
    }
  }
  removeItem() {
    if (this.currentItemSquare != null) {
      for (let i = 0; i < this.itemsInInventory.length; i++) {
        //removing item from the array
        if (this.currentItemSquare.item == this.itemsInInventory[i]) {
          this.itemsInInventory.splice(i, 1);
        }
      }
      console.log(this.itemsInInventory);
      this.currentItemSquare.removeItem();
      this.currentItem = null;
    }
  }

  updatePosition(canvasX) {
    for (let i = 1; i < 10; i++) {
      this.items[i].x = canvasX + this.squareSize * (i - 1);
      if (this.items[i].hasItem()) {
        this.items[i].item.sprite.position.x =
          this.items[i].x + this.items[i].squareSize / 2;
        this.items[i].item.sprite.position.y =
          this.items[i].y + this.items[i].squareSize / 2;
      }
    }
  }

  handleKeyPress(key) {
    if (this.currentItemSquare != null) {
      this.currentItemSquare.color = "white";
    }
    this.currentItemSquare = this.items[key];
    this.currentItemSquare.color = "yellow";

    this.currentItem = this.currentItemSquare.item;

    console.log(this.currentItemSquare);
  }
}

class InventorySquare {
  //9 of these
  //empty squares
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.squareSize = size;
    this.color = "white";
    this.item = null;
  }

  showSelf() {
    push();
    fill(this.color);
    rect(this.x, this.y, this.squareSize, this.squareSize);
    if (this.item != null) {
      this.item.showSelf();
    }
    pop();
  }

  hasItem() {
    return this.item != null;
  }

  addItem(item) {
    this.item = item;
    this.item.sprite.position.x = this.x + this.squareSize / 2;
    this.item.sprite.position.y = this.y + this.squareSize / 2;
  }

  removeItem() {
    this.item = null;
  }
}
