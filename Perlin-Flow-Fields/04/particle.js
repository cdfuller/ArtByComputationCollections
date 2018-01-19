function Particle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-TWO_PI, TWO_PI), random(-TWO_PI, TWO_PI));
  this.acc = createVector(0, 0);
  this.maxSpeed = 1;
  this.lifetime = 1600;
  this.age = random(this.lifetime);
  this.strokeColor = 0;
  this.strokeWeight = 1;

  this.prevPos = this.pos.copy();

  this.update = function updateParticle() {
    if (this.age < this.lifetime) {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.prevPos = this.pos.copy();
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.edges();
      this.age += 1;
    } else {
      // let start = random(starting_points);
      let startX = random(width*0.15, width*0.85);
      let startY = random(height*0.15, height*0.85);
      this.pos = createVector(startX, startY);
      this.prevPos = this.pos.copy();
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.lifetime = 1600;
      this.age = random(1600);
    }
  }

  this.applyForce = function applyForceParticle(force) {
    this.acc.add(force);
  }

  this.follow = function followParticle(flowfield) {
    let x = floor(this.pos.x / flowfield.fieldSize);
    let y = floor(this.pos.y / flowfield.fieldSize);
    let idx = x + y * flowfield.cols;
    let force = flowfield.field[idx];
    this.applyForce(force);
  }

  this.show = function showParticle() {
    if (frameCount % 1000 == 0) {
      this.strokeColor = abs(this.strokeColor - 255);
      this.strokeWeight = this.strokeWeight - 0.2;
    }
    stroke(this.strokeColor, 30);
    strokeWeight(this.strokeWeight);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.prevPos = this.pos.copy();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.prevPos = this.pos.copy();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.prevPos = this.pos.copy();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.prevPos = this.pos.copy();
    }
  }
}