const NUM_FRAMES = 2000;
const FIELD_SIZE = 20;

let particles = [];
const PARTICLE_COUNT = 2000;
let total_particles = PARTICLE_COUNT;

let flowfield;
let starting_points = [];

let avgGen = 0;

function preload() {
  let url = "Purple Forest Color Palette - color-hex.com.png"
  img = loadImage(url, (img) => {
    let scl = 2;
    img.resize(800 / scl, 800 / scl);
    starting_points = startPositionsFromImage(img);
    shuffle(starting_points);
  });
}

function setup() {
  createCanvas(800, 800);
  // colorMode(HSB)
  background(255);
  // background(254, 251, 254);
  noiseSeed(1002);
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

  if (frameCount % 100 == 0) {
    printStatus();
  }

  if (frameCount == NUM_FRAMES) {
    // noLoop();
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
  return random(starting_points);
}

let grays = [
  [195, 195, 195],
  [161, 161, 161],
  [131, 131, 131],
  [109, 108, 108],
  [79, 79, 79],
]
let grapes = [
  [125, 85, 159],
  [150, 114, 195],
  [181, 137, 206],
  [206, 143, 214],
  [222, 151, 236],
]

// let meadow = [
//   [144, 12, 63],
//   [253, 221, 93],
//   [170, 211, 86],
//   [24, 154, 168],
//   [120, 88, 111],
// ]
let purple_forest = [
  [28, 96, 74],
  [18, 131, 105],
  [65, 66, 124],
  [96, 88, 152],
  [146, 105, 165],
]
  
function getColor(startX, startY) {
  let a = 25;
  let palatte = purple_forest;
  // let c = random(palatte);
  let c = random(purple_forest);
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
