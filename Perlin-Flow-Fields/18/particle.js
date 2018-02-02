MIN_LIFESPAN = 250;
MAX_LIFESPAN = 1000;

function Particle(x, y, c) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-TWO_PI, TWO_PI), random(-TWO_PI, TWO_PI));
  this.acc = createVector(0, 0);
  this.maxSpeed = 1;
  this.diameter = 8;
  this.lifetime = int(random(MIN_LIFESPAN, MAX_LIFESPAN));
  this.age = 0;
  this.generation = 0;
  this.strokeColor = 0;
  this.strokeAlpha = 255;
  this.strokeWeight = 0.6;
  this.color = c;

  this.prevPos = this.pos.copy();

  this.update = function updateParticle(field) {
    if (this.age < this.lifetime) {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.direction = p5.Vector.sub(this.pos, this.prevPos);
      let h = this.direction.heading();
      this.prevPos = this.pos.copy();
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.edges();
      this.age += 1;
    } else {
      let { startX, startY } = getStartPosition(field);
      this.color = getColor()
      this.pos = createVector(startX, startY);
      this.prevPos = this.pos.copy();
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.lifetime = int(random(MIN_LIFESPAN, MAX_LIFESPAN))
      this.age = 0;
      this.generation += 1;
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
    if (this.age > 6 && frameCount > 0) {
      // let direction = p5.Vector.sub(this.prevPos, this.pos);
      stroke(this.color);
      strokeWeight(this.strokeWeight);
      // strokeJoin(ROUND);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      // drawShape(this.pos.x, this.pos.y, direction.heading())
      // noFill();
      // noStroke();
    }
    if (this.age == 1) {
      fill(255);
      strokeWeight(this.strokeWeight);
      stroke(this.color);
      ellipse(this.pos.x, this.pos.y, this.diameter);
    }
    if (this.age == this.lifetime-1) {
      fill(0);
      strokeWeight(this.strokeWeight);
      ellipse(this.pos.x, this.pos.y, this.diameter/2);
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

function drawShape(x, y, heading) {
  push();
  translate(x, y);
  rotate(heading);
  beginShape();
  vertex(0, 20);
  vertex(20, 20);
  vertex(20, 0);
  vertex(0, 0);
  endShape(CLOSE);
  pop();
}