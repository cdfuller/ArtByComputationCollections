let FIELD_SIZE = 50;

let particles = [];
let PARTICLE_COUNT = 25;
let total_particles = PARTICLE_COUNT;

let flowfield;
let starting_points = [];

// let maxDist;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB)
  ellipseMode(CENTER);
  background(255);
  // noiseSeed(1002);
  noiseDetail(8, 0.10); 
  frameRate(120);

  flowfield = new FlowField(FIELD_SIZE);
  // maxDist = ((width / 2) ** 2 + (height / 2) ** 2) ** 0.5;

  starting_points = generateStartPositions(flowfield);

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
  
  if (frameCount % 500 == 0) {
    printStatus();
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
  if (starting_points.length == 0) {
    console.log('generating');
    starting_points = generateStartPositions(field);
  }
  let {startX, startY} = starting_points.pop(Math.floor(random(starting_points.length)))
  // let startX = random(width);
  // let startY = random(height);
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
  return positions;
}

function getColor(x, y, z) {
  let a = 10;
  let inc = 2.101;
  let base  = random(2) > 1 ? 0 : 120
  let offset = base;
  // let offset = 0;
  let c = noise(x*inc, y*inc, z*inc) * 360 + offset;
  // let palette = [
  //   [76, 175, 80, a],
  //   [124, 77, 255, a],
  //   [3, 169, 244, a],
  //   [255, 235, 59, a],
  // ]
  // let c = random(palette);
  // c[3] = c[3] + 4;
  return [c, 95, int(random(83, 87)), a];
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
  return particles.reduce((prev, curr) => prev + int(curr.generation), 0) / particles.length;
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