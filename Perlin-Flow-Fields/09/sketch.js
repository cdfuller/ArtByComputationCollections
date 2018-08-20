let FIELD_SIZE = 20;

let particles = [];
let PARTICLE_COUNT = 250;
let total_particles = PARTICLE_COUNT;

let flowfield;
let starting_points;

// let maxDist;


function setup() {
  createCanvas(800, 800);
  colorMode(HSB)
  // background(0);
  // background([65, 0, 75, 255]);
  background(201, 100, 34);
  // noiseSeed(1002);
  noiseDetail(16); 
  starting_points = [
    {x: width/4, y: height/4},
    {x: width/4*3, y: height/4},
    {x: width/4*3, y: height/4*3},
    {x: width/4, y: height/4*3},
  ]

  flowfield = new FlowField(FIELD_SIZE);
  // maxDist = ((width / 2) ** 2 + (height / 2) ** 2) ** 0.5;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let {startX, startY} = getStartPosition();
    let c = getColor();
    particles[i] = new Particle(startX, startY, c);
  }
}

function draw() {
  // flowfield.update();

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
  }
  
  if (frameCount % 250 == 0) {
    printStatus();  
  }
}

function getStartPosition() {
  let f = 6;
  let startX = random(width / f, width / f * (f - 1));
  let startY = random(height / f, height / f * (f - 1));
  startX = startX + (width/f) * 0.5;
  startY = startY + (height/f) * 0.5;
  return {startX, startY};
}


function getColor() {
  let a = 8;
  let palette = [
    [201, 0, 100, a],
  ]
  let c = random(palette);
  // c[3] = c[3] + 4;
  return c;
}

function printStatus() {
  let fc = frameCount
  let avg = averageAge().toFixed(2);
  let ls = averageLifespan().toFixed(2);
  let tot = total_particles;
  let fr = frameRate().toFixed(2);
  let s = `${fc}\tavg: ${avg} ls: ${ls} total: ${tot} fr: ${fr}`
  console.log(s);
}

function averageAge() {
  return particles.reduce((prev, curr) => prev + int(curr.age), 0) / particles.length;
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

