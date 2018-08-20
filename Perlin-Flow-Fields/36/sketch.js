// Factors of  1200:
// 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25, 30, 40, 48, 50, 60, 75, 80, 100, 120, 150, 200, 240, 300, 400, 600, 1200
//
// Factors of 800:
// 1, 2, 4, 5, 8, 10, 16, 20, 25, 32, 40, 50, 80, 100, 160, 200, 400, 800
const FIELD_SIZE = 10; 
const NUM_FRAMES = 5000;
let DEBUG_MODE = true;

const PARTICLE_COUNT = 100;
let particles = [];
let total_particles = PARTICLE_COUNT;

let flowfield;
let starting_points = [];

let avgGen = 0;

function setup() {
  createCanvas(800, 800);
  ellipseMode(CORNER);
  background(41, 42, 68);
  // noiseSeed(10002);

  flowfield = new FlowField(FIELD_SIZE);


  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let { startX, startY, particleColor } = nextStartState();
    particles[i] = new Particle(startX, startY, particleColor);
  }
}

function draw() {
  // flowfield.update();

  for (let i = particles.length-1; i >= 0; i--) {
    let p = particles[i];
    p.follow(flowfield);
    p.update(flowfield);
    p.show();
  }

  if (DEBUG_MODE) {
    if (frameCount % 100 == 0) printStatus();
    if (frameCount == NUM_FRAMES) noLoop();
  }
}

function generateStartingPoints() {
  let points = [];
  let x = width *  1.00;
  let scl = height / PARTICLE_COUNT;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    points.push({
      startX: x,
      startY: scl * i,
      particleColor: getColor(x, scl * i),
    })
  }
  return points;
}

let pointsIncrementor = 0;
function nextStartState() {
  let startX = random(width);
  let startY = random(height);
  let particleColor = getColor(startX, startY);
  return {startX, startY, particleColor};
}

let hype = [
  [159, 47, 121],
  [90, 22, 55],
  [243, 65, 113],
  [1, 175, 236],
  [225, 169, 5],
]

let colorIndex = 0;
function getColor(startX, startY) {
  let a = 255;
  let palette = [...hype];
  let c = palette[colorIndex++ % palette.length];
  // let c = [0, 0, 0];
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
      printStatus();
      break;
    default:
      break;
  }
}
