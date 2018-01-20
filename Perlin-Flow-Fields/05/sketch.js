let inc = 0.1;
let FIELD_SIZE = 20;
let cols, rows;
let zOff = 0;

let particles = [];
let PARTICLE_COUNT = 3;

let flowfield;
let starting_points;


function setup() {
  createCanvas(800, 800);
  background(255);
  noiseSeed(1002);
  // noiseDetail(16);
  starting_points = [
    {x: width/4, y: height/4},
    {x: width/4*3, y: height/4},
    {x: width/4*3, y: height/4*3},
    {x: width/4, y: height/4*3},
  ]

  flowfield = new FlowField(FIELD_SIZE);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let startX, startY;
    if (random(1) > 0.5) {
      startX = map(i, 0, PARTICLE_COUNT, 0, width);
      startY = map(i, 0, PARTICLE_COUNT, height, 0);
    } else {
      startX = map(i, 0, PARTICLE_COUNT, 0, width);
      startY = map(i, 0, PARTICLE_COUNT, 0, height);
    }
    // let startX = random(width);
    // let startY = random(height);
    particles[i] = new Particle(startX, startY);
  }
}

function draw() {
  flowfield.update();

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    // particles[i].show();
  }
  p0 = particles[0].pos.copy();
  p1 = particles[1].pos.copy();
  p2 = particles[2].pos.copy();
  strokeWeight(1);
  stroke(0, 15);
  line(p0.x, p0.y, p1.x, p1.y);
  line(p1.x, p1.y, p2.x, p2.y);
  line(p0.x, p0.y, p2.x, p2.y);
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