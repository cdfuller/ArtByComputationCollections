MIN_LIFESPAN = 30;
MAX_LIFESPAN = 500;

MIN_SIZE = 10;
MAX_SIZE = 50;

function Particle(x, y, c) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-TWO_PI, TWO_PI), random(-TWO_PI, TWO_PI));
  this.acc = createVector(0, 0);
  this.diameter = floor(random(MIN_SIZE, MAX_SIZE) / 5) * 10;
  this.maxSpeed = 1;
  this.lifetime = int(random(MIN_LIFESPAN, MAX_LIFESPAN));
  this.age = 0;
  this.generation = 0;
  this.strokeWeight = 0.3;
  this.color = c;
  this.living = true;

  this.prevPos = this.pos.copy();

  this.update = function updateParticle(field) {
    if (this.living && this.age < this.lifetime) {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.direction = p5.Vector.sub(this.pos, this.prevPos);
      this.prevPos = this.pos.copy();
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.edges();
      this.age += 1;
    } else {
      // this.living = false;
      let { startX, startY, particleColor } = nextStartState();
      this.color = particleColor
      this.pos = createVector(startX, startY);
      this.prevPos = this.pos.copy();
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.lifetime = int(random(MIN_LIFESPAN, MAX_LIFESPAN))
      this.age = 0;
      this.generation += 1;
      this.diameter = random(MIN_SIZE, MAX_SIZE);
      // this.color = getColor(startX, startY, this.generation);
      total_particles++;
    }
  }

  this.applyForce = function applyForceParticle(force) {
    this.acc.add(force);
  }

  this.follow = function followParticle(flowfield) {
    let force = flowfield.getVector(this.pos.x, this.pos.y);
    this.applyForce(force);
  }

  this.show = function showParticle() {
    if (this.living) {
      if (this.age > 2 && frameCount > 0) {
        noFill();
        stroke(this.color);
        // noStroke();
        // fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.diameter);
      }
    }
  }

  this.edges = function() {
    // if (this.pos.x > width) {
    //   this.pos.x = 0;
    //   this.prevPos = this.pos.copy();
    // }
    // if (this.pos.x < 0) {
    //   this.pos.x = width;
    //   this.prevPos = this.pos.copy();
    // }
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
