function Particle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxSpeed = 1;
  this.age = 0;
  this.lifetime = random(500, 2500);

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
      // console.log(this.age);
      this.pos = createVector(random(width), random(height));
      this.prevPos = this.pos.copy();
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.age = 0;
      this.lifetime = random(500, 2500);
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
    stroke(255, 20);
    strokeWeight(1);
    // point(this.pos.x, this.pos.y);
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