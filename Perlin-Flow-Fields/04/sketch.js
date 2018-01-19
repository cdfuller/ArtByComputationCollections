let inc = 0.1;
let FIELD_SIZE = 20;
let cols, rows;
let zOff = 0;

let particles = [];
let PARTICLE_COUNT = 3000;

let flowfield;

function setup() {
  createCanvas(800, 800);
  background(0);
  noiseSeed(1002);
  noiseDetail(16);

  flowfield = new FlowField(FIELD_SIZE);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  flowfield.update();
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
  }
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