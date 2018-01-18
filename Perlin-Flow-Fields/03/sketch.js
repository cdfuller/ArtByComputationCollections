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


  // let yOff = 0;

  // for (let y = 0; y < rows; y++) {
  //   let xOff = 0;
  //   for (let x = 0; x < cols; x++) {
  //     let idx = x + y * cols
  //     let r = noise(xOff, yOff, zOff);
  //     let v = p5.Vector.fromAngle(r * TWO_PI);
  //     v.setMag(0.1);
  //     flowfield[idx] = v;
  //     xOff += inc;
  //     // Draw directions
  //     // stroke(0, 75);
  //     // strokeWeight(0.5);
  //     // push();
  //     // translate(x * scl, y * scl);
  //     // rotate(v.heading());
  //     // line(0, 0, scl, 0);
  //     // pop();
  //   }
  //   yOff += inc;
  // }
  // zOff += 0.005;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
  }
}


function mousePressed() {
  noLoop();
  console.log("STOPPED");
}

function keyPressed() {
  loop();
  console.log("STARTED");
}