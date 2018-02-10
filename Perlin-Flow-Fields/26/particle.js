MIN_LIFESPAN = 500;
MAX_LIFESPAN = 1000;

function Particle(x, y, c) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-TWO_PI, TWO_PI), random(-TWO_PI, TWO_PI));
  this.acc = createVector(0, 0);
  this.diameter = random(20, 150);
  this.maxSpeed = 2;
  this.lifetime = int(random(MIN_LIFESPAN, MAX_LIFESPAN));
  this.age = 0;
  this.generation = 0;
  this.strokeWeight = 0.15;
  this.color = c;

  this.prevPos = this.pos.copy();

  this.update = function updateParticle(field) {
    if (this.age < this.lifetime) {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.direction = p5.Vector.sub(this.pos, this.prevPos);
      this.prevPos = this.pos.copy();
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.edges();
      this.age += 1;
    } else {
      let { startX, startY, particleColor } = nextStartState();
      this.color = particleColor
      this.pos = createVector(startX, startY);
      this.prevPos = this.pos.copy();
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.lifetime = int(random(MIN_LIFESPAN, MAX_LIFESPAN))
      this.age = 0;
      this.generation += 1;
      this.diameter = random(20, 150);
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
    if (this.age > 10 && frameCount > 0) {
      this.direction.normalize()
      this.direction.mult(this.diameter);
      stroke(this.color);
      strokeWeight(this.strokeWeight);
      // fill(this.color);
      let center = createVector(width/2, height/2);
      let r = p5.Vector.sub(this.pos, center);
      r.normalize();
      r.mult(width/2);
      r.add(center);
      line(this.pos.x, this.pos.y, r.x, r.y);
      let secondaryColor = [...this.color];
      secondaryColor[3] = secondaryColor[3] * 4
      strokeWeight(this.strokeWeight*6);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
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
