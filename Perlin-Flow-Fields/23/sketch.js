// Factors of  1200:
// 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25, 30, 40, 48, 50, 60, 75, 80, 100, 120, 150, 200, 240, 300, 400, 600, 1200
//
// Factors of 800:
// 1, 2, 4, 5, 8, 10, 16, 20, 25, 32, 40, 50, 80, 100, 160, 200, 400, 800
const FIELD_SIZE = 10; 
const NUM_FRAMES = 2500;
let DEBUG_MODE = false;

const PARTICLE_COUNT = 2000;
let particles = [];
let total_particles = PARTICLE_COUNT;

let flowfield;
let starting_points = [];

let avgGen = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB)
  background(255);
  // noiseSeed(1002);
  rectMode(CORNERS);

  flowfield = new FlowField(FIELD_SIZE);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // let {startX, startY} = getStartPosition(flowfield);
    let { startX, startY, particleColor } = nextStartState();
    particles[i] = new Particle(startX, startY, particleColor);
  }
}

function draw() {
  // flowfield.update();

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update(flowfield);
    particles[i].show();
  }

  if (DEBUG_MODE) {
    if (frameCount % 100 == 0) printStatus();
    if (frameCount == NUM_FRAMES) noLoop();
  }
}

function getInsetStartPosition(divisions, offset=false) {
  let startX, startY;
  // constrain to the f-2 center
  if (divisions > 0) {
    let f = divisions;
    startX = random(width / f, width / f * (f - 1));
    startY = random(height / f, height / f * (f - 1));
  } else {
    startX = random(width);
    startY = random(height);
  }
  if (offset) {
    // offset - bottom right
    // startX = startX + (width/f) * 0.5;
    // startY = startY + (height/f) * 0.5;
  }
  return {startX, startY};
}

function generateStartPositions(field) {
  positions = [];
  for (let i = 0; i < field.rows; i++) {
    for (let j = 0; j < field.cols; j++) {
      positions.push({
        startX: j * field.fieldSize,
        startY: i * field.fieldSize
      })
    }
  }
  return shuffle(positions);
}

function startPositionsFromImage(img) {
  positions = [];
  img.loadPixels();
  for (let y = 0; y < img.width; y++) {
    for (let x = 0; x < img.height; x++) {
      let i = (x + (y * img.width)) * 4;
      let r = img.pixels[i + 0];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];

      let scl = 8;
      let a = 100;
      let loc = {
        startX: x*scl,
        startY: y*scl,
        particleColor: [r, g, b, a],
      }
      positions.push(loc);
    }
  }
  return positions;
}

function nextStartState() {
  let startX = random(width);
  let startY = random(height);
  let particleColor = getColor(startX, startY);
  return {startX, startY, particleColor};
}

let grapes = [
  [125, 85, 159],
  [150, 114, 195],
  [181, 137, 206],
  [206, 143, 214],
  [222, 151, 236],
]
  
function getColor(startX, startY) {
  let a = 8;
  let h = random(260, 300);
  let s = int(random(30, 100));
  let b = int(random(40, 100));
  return [h, s, b, a];
}

function printStatus() {
  let fc = frameCount
  let avg = averageAge().toFixed(1);
  let ls = averageLifespan().toFixed(1);
  let gen = averageGeneration().toFixed(1);
  let tot = total_particles;
  let fr = frameRate().toFixed(1);
  let s = `${fc}\tavg: ${avg} ls: ${ls} gen: ${gen} total: ${tot} fr: ${fr}`
  console.log(s);
}

function averageAge() {
  return particles.reduce((prev, curr) => prev + int(curr.age), 0) / particles.length;
}

function averageGeneration() {
  avgGen = particles.reduce((prev, curr) => prev + int(curr.generation), 0) / particles.length;
  return avgGen;
}

function averageLifespan() {
  return particles.reduce((prev, curr) => prev + int(curr.lifetime), 0) / particles.length;
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
      break;
    default:
      break;
  }
}
