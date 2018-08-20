const NUM_FRAMES = 2000;
const FIELD_SIZE = 10;

let particles = [];
const PARTICLE_COUNT = 50;
let total_particles = PARTICLE_COUNT;

let flowfield;
let starting_points = [];

let avgGen = 0;
// let maxDist;


function setup() {
  createCanvas(800, 800);
  // colorMode(HSB)
  ellipseMode(CENTER);
  background(255);
  // noiseSeed(1002);

  flowfield = new FlowField(FIELD_SIZE);
  // maxDist = ((width / 2) ** 2 + (height / 2) ** 2) ** 0.5;

  // starting_points = generateStartPositions(flowfield);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let {startX, startY} = getStartPosition(flowfield);
    let c = getColor(startX, startY);
    particles[i] = new Particle(startX, startY, c);
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
  // if (starting_points.length == 0) {
  //   console.log('generating');
  //   starting_points = generateStartPositions(field);
  // }
  // let {startX, startY} = starting_points.pop(Math.floor(random(starting_points.length)))
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

function getColor(h) {
  let a = 255;
  // h = h + avgGen/10;
  // h = h + 160 
  // let offset = 111;
  // h = abs((h + offset) % TWO_PI);
  // let c = map(h, 0, TWO_PI, 0, 360);
  // c = c + 125
  // c = c % 360
  let palatte = [
    [0, 0, 0, a],
  ]
  let c = random(palatte);
  return c;
  // return [c, 90, 85, a];
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

// function mousePressed() {
//   // let { startX, startY } = getStartPosition();
//   let c = getColor(mouseX, mouseY, 0);
//   let p = new Particle(mouseX, mouseY, c);
//   particles.push(p);
//   total_particles++;
// }