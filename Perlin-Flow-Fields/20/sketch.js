const NUM_FRAMES = 2000;
const FIELD_SIZE = 10;

let particles = [];
const PARTICLE_COUNT = 50;
let total_particles = PARTICLE_COUNT;

let flowfield;
let starting_points = [];

let avgGen = 0;

let img;

function preload() {
  let url = "rainbow-gradient.png"
  img = loadImage(url, (img) => {
    let scl = 8;
    img.resize(800/scl, 800/scl);
    starting_points = startPositionsFromImage(img);
  });
}


function setup() {
  createCanvas(800, 800);
  background(0);
  // noiseSeed(1002);

  flowfield = new FlowField(FIELD_SIZE);


  for (let i = 0; i < starting_points.length; i++) {
    // let {startX, startY} = getStartPosition(flowfield);
    let {startX, startY, particleColor} = starting_points[i];
    // let c = getColor(startX, startY);
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

function getStartPosition(field) {
  // constrain to the f-2 center
  // let f = 8;
  // let startX = random(width / f, width / f * (f - 1));
  // let startY = random(height / f, height / f * (f - 1));
  // offset - bottom right
  // startX = startX + (width/f) * 0.5;
  // startY = startY + (height/f) * 0.5;
  let startX = random(width);
  let startY = random(height);
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

      let sat = getSaturation([r, g, b, 255]);

      if (sat > 50) {
        let scl = 8;
        let loc = {
          startX: x*scl,
          startY: y*scl,
          particleColor: [r, g, b, 50],
        }
        positions.push(loc);
      }
    }
  }
  return positions;
}

let posIncrementor = 0;
function nextStartPosition() {
  // return starting_points[posIncrementor++ % starting_points.length];
  return random(starting_points);
}

function getColor(startX, startY) {
  let a = 25;
  let palatte = [
    [0, 0, 0, a],
  ]
  let c = random(palatte);
  return c;
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

function getSaturation(rgba) {
  var red = rgba[0];
  var green = rgba[1];
  var blue = rgba[2];

  var val = Math.max(red, green, blue);
  var chroma = val - Math.min(red, green, blue);

  var sat;
  if (chroma === 0) {  // Return early if grayscale.
    sat = 0;
  }
  else {
    sat = chroma / val;
  }

  return int(sat * 100);
};