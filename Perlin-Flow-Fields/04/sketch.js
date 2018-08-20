let inc = 0.1;
let FIELD_SIZE = 20;
let cols, rows;
let zOff = 0;

let particles = [];
let PARTICLE_COUNT = 3000;

let flowfield;
let starting_points;


function setup() {
  createCanvas(800, 800);
  background(255);
  // noiseSeed(1002);
  // noiseDetail(16);
  starting_points = [
    {x: width/4, y: height/4},
    {x: width/4*3, y: height/4},
    {x: width/4*3, y: height/4*3},
    {x: width/4, y: height/4*3},
  ]

  flowfield = new FlowField(FIELD_SIZE);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // let start = random(starting_points)
    let startX = random(width*0.15, width*0.85);
    let startY = random(height*0.15, height*0.85);
    particles[i] = new Particle(startX, startY);
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