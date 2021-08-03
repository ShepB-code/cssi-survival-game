class Item {
  constructor(x, y, name) {
    this.sprite = createSprite(x, y, 20, 20);
    this.name = name;
    this.size = 10;
    this.color = "red";
  }

  showSelf() {
    drawSprite(this.sprite);
  }
}
