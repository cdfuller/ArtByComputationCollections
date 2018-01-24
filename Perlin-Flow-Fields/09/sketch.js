let FIELD_SIZE = 16;

let particles = [];
let PARTICLE_COUNT = 2000;
let total_particles = PARTICLE_COUNT;

let flowfield;
let starting_points;


function setup() {
  createCanvas(800, 800);
  // background(0);
  background([65, 0, 75, 255]);
  // background(255);
  noiseSeed(1002);
  noiseDetail(16); 
  starting_points = [
    {x: width/4, y: height/4},
    {x: width/4*3, y: height/4},
    {x: width/4*3, y: height/4*3},
    {x: width/4, y: height/4*3},
  ]

  flowfield = new FlowField(FIELD_SIZE);



  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let startX = random(width);
    let startY = random(height);
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
  
  if (frameCount % 100 == 0) {
    printStatus();
  }
}


function getColor() {
  let a = 10;
  let palette = [
    [255, 0, 0, a],
    [255, 0, 0, a],
    [255, 0, 255, a],
    [255, 0, 255, a],
    [200, 0, 200, a],
    [100, 0, 100, a],
    [25, 0, 25, a],
    [0, 0, 255, a],
    [0, 0, 255, a],
    [0, 0, 0, 3],
    [0, 0, 0, 3],
    [255, 255, 255, 3],
    [255, 255, 255, 3],
  ]
  let c = random(palette);
  c[3] = c[3] + 4;
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

