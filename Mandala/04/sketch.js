// Factors of  1200:
// 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25, 30, 40, 48, 50, 60, 75, 80, 100, 120, 150, 200, 240, 300, 400, 600, 1200
//
const NOISE_SEED = 10006;
const RANDOM_SEED = NOISE_SEED;
const NUM_FRAMES = 5000;
const DEBUG_MODE = true;

let RADIUS;
let LOBE_COUNT = 200;
let mandala;

function setup() {
  createCanvas(1200, 1200);
  // background(31, 42, 62);
  background(255);
  noiseSeed(NOISE_SEED);
  randomSeed(RANDOM_SEED);

  rectMode(CENTER);

  RADIUS = min(width, height)/2;
  mandala = new Mandala(LOBE_COUNT);
}

function draw() {

  mandala.update();
  mandala.draw();
  noLoop();

  if (DEBUG_MODE) {
    if (frameCount % 100 == 0) printStatus();
    if (frameCount == NUM_FRAMES) noLoop();
  }
}

function printStatus() {
}

function keyPressed() {
  switch (key) {
    case 'S':
      loop();
      console.log("Started looping");
      break;
    case ' ':
      noLoop();
      console.log("Stopped looping");
      printStatus();
      break;
    default:
      break;
  }
}
