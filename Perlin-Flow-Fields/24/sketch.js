// Factors of  1200:
// 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25, 30, 40, 48, 50, 60, 75, 80, 100, 120, 150, 200, 240, 300, 400, 600, 1200
//
// Factors of 800:
// 1, 2, 4, 5, 8, 10, 16, 20, 25, 32, 40, 50, 80, 100, 160, 200, 400, 800
const FIELD_SIZE = 10 ; 
const NUM_FRAMES = 2500;
let DEBUG_MODE = false;

const PARTICLE_COUNT = 1;
let particles = [];
let total_particles = PARTICLE_COUNT;

let flowfield;
let starting_points = [];

let avgGen = 0;

function setup() {
  createCanvas(800, 800);
  background(255);
  // noiseSeed(1002);

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
    // if (frameCount == NUM_FRAMES) noLoop();
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

function nextStartState() {
  let startX = random(width);
  let startY = random(height);
  let particleColor = getColor(startX, startY);
  return {startX, startY, particleColor};
}

let colorIndex = 0;
function getColor(startX, startY) {
  let a = 25;
  let palette = [
    [255, 0, 0],
    [255, 255, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 0, 255],
  ]
  let c = palette[colorIndex++ % palette.length];
  return [...c, a];
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
