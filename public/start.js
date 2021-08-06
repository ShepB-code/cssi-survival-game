let layersArray;

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

    arcadeFont = loadFont("assets/PressStart2P.ttf");
}

function setup() {
    createCanvas(927, 590);
    colorMode(HSB, 360, 100, 100);

    textFont(arcadeFont);

    camera.off();
    camera.position.y = height / 2 + 200;

    layersArray = [];

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

    var manager = new SceneManager();
    manager.bkImage = background("green");
    manager.wire();
    manager.showScene( Intro );
}