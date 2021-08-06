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
    
    camera.position.y = height / 2 + 200;

    var manager = new SceneManager();
    manager.bkImage = background("green");
    manager.wire();
    manager.showScene( Intro );
}