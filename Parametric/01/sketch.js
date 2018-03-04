// Factors of  1200:
// 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25, 30, 40, 48, 50, 60, 75, 80, 100, 120, 150, 200, 240, 300, 400, 600, 1200
//
const NOISE_SEED = 10014;
const RANDOM_SEED = NOISE_SEED;
const NUM_FRAMES = 5000;
const DEBUG_MODE = true;

let HIST_LENGTH = 6;
let history = [];

let jitter = 5.1;

function setup() {
  createCanvas(1200, 1200);
  background(51);
  // background(255);
  noiseSeed(NOISE_SEED);
  randomSeed(RANDOM_SEED);
  colorMode(HSB);

  strokeWeight(1.2);
  
  let loc = new Point(random(width), random(height));
  history.push(loc);
}

function draw() {
  translate(width/2, height/2);

  if (history.length < HIST_LENGTH) {
    let p = new Point(random(width), random(height));
    history.push(p);
  }

  history.forEach(p => {
    p.update();
  });

  for (let i = 0; i < history.length; i++) {
    let p1 = history[i];
    for (let j = i+1; j < history.length; j++) {
      let p2 = history[j];
      let h = lerp(p1.h, p2.h, 0.5);
      stroke(h, 100, 100);
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }


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


class Point{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.theta = 0.0;
    // this.r = Math.min(width, height) / 1.5;
    this.r = 0;
    this.h = random(360);
  }

  update() {
    this.theta -= 0.01;
    this.r += random(-jitter, jitter) + 0.2;
    // this.r += random(-jitter, jitter) - 0.2;

    this.x = cos(this.theta) * this.r;
    this.y = sin(this.theta) * this.r;

    this.h = (this.h + random(-jitter, jitter) + 0.2) % 360;
  }
}