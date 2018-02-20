MIN_LIFESPAN = 250;
MAX_LIFESPAN = 500;

MIN_SIZE = 10;
MAX_SIZE = 20;

function Particle(x, y, c, vel) {
  this.pos = createVector(x, y);
  this.vel = vel || createVector(random(-TWO_PI, TWO_PI), random(-TWO_PI, TWO_PI));
  this.acc = createVector(0, 0);
  this.diameter = 20;
  this.maxSpeed = 1;
  this.lifetime = int(random(MIN_LIFESPAN, MAX_LIFESPAN));
  this.age = 0;
  this.generation = 0;
  this.strokeWeight = 0.2;
  this.color = c;
  this.living = true;
  this.theta = 0;

  this.prevPos = this.pos.copy();

  this.update = function updateParticle(field) {
    if (this.living && this.age < this.lifetime) {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      // this.vel.mult(20);
      this.direction = p5.Vector.sub(this.pos, this.prevPos);
      this.theta += 0.01;
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
      // this.diameter = 5;
      // this.theta = random(20);
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
        // fill(this.color);
        stroke(this.color);
        strokeWeight(this.strokeWeight);
        this.direction.mult(this.diameter);
        ellipse(this.pos.x, this.pos.y, this.direction.x, this.direction.y);
      }
    }
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x -= width
      this.prevPos = this.pos.copy();
    }
    if (this.pos.x < 0) {
      this.pos.x += width;
      this.prevPos = this.pos.copy();
    }
    if (this.pos.y > height) {
      this.pos.y -= height;
      this.prevPos = this.pos.copy();
    }
    if (this.pos.y < 0) {
      this.pos.y += height;
      this.prevPos = this.pos.copy();
    }
  }
}
