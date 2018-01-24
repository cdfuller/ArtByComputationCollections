MIN_LIFESPAN = 0
MAX_LIFESPAN = 250

function Particle(x, y, c) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-TWO_PI, TWO_PI), random(-TWO_PI, TWO_PI));
  this.acc = createVector(0, 0);
  this.maxSpeed = 1;
  this.diameter = 2;
  this.lifetime = random(MIN_LIFESPAN, MAX_LIFESPAN);
  this.age = 0;
  this.strokeColor = 0;
  this.strokeAlpha = 255;
  this.strokeWeight = 0.15  ;
  this.color = c;

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
      let { startX, startY } = getStartPosition();
      this.pos = createVector(startX, startY);
      this.prevPos = this.pos.copy();
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.lifetime = random(MIN_LIFESPAN, MAX_LIFESPAN)
      this.age = 0;

      total_particles++;
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
    // if (frameCount > 0 && frameCount % 500 == 0) {
    //   this.strokeColor = min(abs(this.strokeColor + 100), 255);
    //   this.strokeWeight = this.strokeWeight - 0.75;
    // }
    if (this.age > 2 && frameCount > 0) {
      stroke(this.color);
      strokeWeight(this.strokeWeight);
      strokeJoin(ROUND);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      noFill();
      // noStroke();
      // fill(this.color);
      // ellipse(this.pos.x, this.pos.y, this.diameter);
    }
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
