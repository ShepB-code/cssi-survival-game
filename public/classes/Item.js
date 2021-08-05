class Item {
  constructor(x, name) {
    this.sprite = createSprite(x, height + 120, 20, 20);
    this.name = name;
  }

  showSelf() {
    drawSprite(this.sprite);
    this.sprite.debug = mouseIsPressed;
  }
}
class Rock extends Item {
  constructor(x, y) {
    super(x, "rock");
    this.radius = 5;
    this.sprite.setCollider("circle", 0, 0, this.radius);
  }

  showSelf() {
    super.showSelf();
  }
}
class Thread extends Item {
  constructor(x, y) {
    super(x, y, 10, 10, "thread");
    this.width = 10;
    this.height = 10;
    this.sprite.setCollider("rectangle", 0, 0, this.width, this.height);
  }

  showSelf() {
    super.showSelf();
  }
}

class Wood extends Item {
  constructor(x, y) {
    super(x, y, 10, 10, "wood");
    this.width = 10;
    this.height = 10;
    this.sprite.setCollider("rectangle", 0, 0, this.width, this.height);
  }

  showSelf() {
    super.showSelf();
  }
}
class Beef extends Item {
  constructor(x, y) {
    super(x, y, 10, 10, "beef");
    this.radius = 5;
    this.sprite.setCollider("circle", 0, 0, this.radius);
  }

  showSelf() {
    super.showSelf();
  }
}

class Lettuce extends Item {
  constructor(x, y) {
    super(x, y, 10, 10, "lettuce");
    this.radius = 5;
    this.sprite.setCollider("circle", 0, 0, this.radius);
  }

  showSelf() {
    super.showSelf();
  }
}

class Bow extends Item {
  constructor(x, y) {
    super(x, y, 10, 10, "bow");
    this.radius = 5;
    this.sprite.setCollider("circle", 0, 0, this.radius);
  }

  showSelf() {
    super.showSelf();
  }
}

class Sword extends Item {
  constructor(x, y) {
    super(x, y, 10, 10, "sword");
    this.width = 10;
    this.height = 10;
    this.sprite.setCollider("rectangle", 0, 0, this.width, this.height);
  }

  showSelf() {
    super.showSelf();
  }
}
