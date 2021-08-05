class Item {
  constructor(x, name) {
    this.sprite = createSprite(x, height + 120, 20, 20);
    this.name = name;
    this.xSpeed = 2.75;
  }

  showSelf() {
    drawSprite(this.sprite);
  }

  handleMovement() {
    if (keyIsDown(65)) {
      //key = a
      this.sprite.position.x += this.xSpeed;
    }
    if (keyIsDown(68)) {
      //key = d
      this.sprite.position.x += -this.xSpeed;
    }
  }
}
class Rock extends Item {
  constructor(x, y) {
    super(x, "rock");
    this.radius = 5;
    this.sprite.shapeColor = color(40);
    this.sprite.setCollider("circle", 0, 0, this.radius);
  }

  showSelf() {
    super.showSelf();
  }

  handleMovement() {
    super.handleMovement();
  }
}
class Thread extends Item {
  constructor(x, y) {
    super(x, "thread");
    this.width = 10;
    this.height = 10;
    this.sprite.shapeColor = color(90);
    this.sprite.setCollider("rectangle", 0, 0, this.width, this.height);
    this.sprite.addAnimation("string", "../assets/material/string.png");
  }

  showSelf() {
    super.showSelf();
  }

  handleMovement() {
    super.handleMovement();
  }
}

class Wood extends Item {
  constructor(x, y) {
    super(x, "wood");
    this.width = 10;
    this.height = 10;
    this.sprite.shapeColor = color(35, 71, 38);
    this.sprite.setCollider("rectangle", 0, 0, this.width, this.height);
    this.sprite.addAnimation("wood", "../assets/material/log.png");
  }

  showSelf() {
    super.showSelf();
  }

  handleMovement() {
    super.handleMovement();
  }
}
class Beef extends Item {
  constructor(x, y) {
    super(x, "beef");
    this.radius = 5;
    this.sprite.shapeColor = color(351, 89, 71);
    this.sprite.setCollider("circle", 0, 0, this.radius);

    this.sprite.addAnimation("beef", "../assets/item/beef.png");
  }

  showSelf() {
    super.showSelf();
  }

  handleMovement() {
    super.handleMovement();
  }
}

class Lettuce extends Item {
  constructor(x, y) {
    super(x, "lettuce");
    this.radius = 5;
    this.sprite.shapeColor = color(115, 100, 100);
    this.sprite.setCollider("circle", 0, 0, this.radius);
    this.sprite.addAnimation("lettuce", "../assets/item/lettuce.png");
  }

  showSelf() {
    super.showSelf();
  }

  handleMovement() {
    super.handleMovement();
  }
}

class Bow extends Item {
  constructor(x) {
    super(x, "bow");
    this.radius = 5;
    this.sprite.shapeColor = color(50);
    this.sprite.setCollider("circle", 0, 0, this.radius);

    this.sprite.addAnimation("bow", "../assets/item/bow.png");
  }

  showSelf() {
    super.showSelf();
  }
}

class Sword extends Item {
  constructor(x) {
    super(x, "sword");
    this.width = 10;
    this.height = 10;
    this.sprite.shapeColor = color(30, 100, 40);
    this.damage = 20;
    this.sprite.setCollider("rectangle", 0, 0, this.width, this.height);
    this.sprite.addAnimation("sword", "../assets/item/sword.png");
  }

  showSelf() {
    super.showSelf();
  }
}