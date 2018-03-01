// Factors of  1200:
// 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25, 30, 40, 48, 50, 60, 75, 80, 100, 120, 150, 200, 240, 300, 400, 600, 1200
//
const NOISE_SEED = 10011;
const RANDOM_SEED = NOISE_SEED;
const NUM_FRAMES = 5000;
const DEBUG_MODE = true;

let RADIUS;
let LOBE_COUNT = 6;
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


let colorIndex = 0;
function getColor() {
  let gentle_pride = [
    [242, 82, 53],
    [238, 170, 86],
    [238, 232, 96],
    [100, 242, 138],
    [99, 148, 231],
  ];
let burple = [
  [83, 19, 98],
  [129, 76, 197],
  [66, 0, 63],
  [80, 61, 131],
  [52, 28, 94],
]
  let palette = burple;
  // let c = palette[colorIndex++ % palette.length];
  let c = [0, 0, 0];
  return [...c, 255];
}