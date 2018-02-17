MIN_LIFESPAN = 5;
MAX_LIFESPAN = 130;

MIN_SIZE = 40;
MAX_SIZE = 70;

function Particle(x, y, c) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-TWO_PI, TWO_PI), random(-TWO_PI, TWO_PI));
  this.acc = createVector(0, 0);
  this.diameter = 3;
  this.maxSpeed = 7;
  this.lifetime = int(random(MIN_LIFESPAN, MAX_LIFESPAN));
  this.age = 0;
  this.generation = 0;
  this.strokeWeight = 0.3;
  this.color = c;
  this.living = true;
  this.theta = random(20);

  this.prevPos = this.pos.copy();

  this.update = function updateParticle(field) {
    if (this.living && this.age < this.lifetime) {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.direction = p5.Vector.sub(this.pos, this.prevPos);
      this.theta += 2;
      let h = this.theta % 120;
      this.color = [h + 170, 90, 90, 0.5];
      // if (this.age % 25 == 0){
      //   this.vel.mult(50);
      //   this.vel.rotate(HALF_PI/2);
      //   this.vel.set(this.direction.x * this.vel.x, this.direction.y * this.vel.y);
      // }
      this.diameter += random(-0.5, 0.5);
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
      this.theta = random(20);
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
        // noFill();
        stroke(this.color);
        strokeWeight(this.strokeWeight);
        // let x = cos(this.theta) * this.diameter;
        // let y = sin(this.theta) * this.diameter;
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        // strokeWeight(this.strokeWeight);
        // line(this.pos.x, this.pos.y, this.pos.x + x, this.pos.y + y);
        // for (let i = 0; i < this.diameter; i++) {
        //   let scl = 1;
        //   let x = this.pos.x + (cos(i / scl) * i);
        //   let y = this.pos.y + (sin(i / scl) * i);
        //   line(this.pos.x, this.pos.y, x, y);
        // }
        // noStroke();
        // fill(this.color);
        // this.direction.mult(this.diameter);
        // ellipse(this.pos.x, this.pos.y, this.direction.x, this.direction.y);
      }
    }
  }

  this.edges = function() {
    if (this.pos.x > width) {
      // this.pos.x = 0;
      this.pos.x -= width
      this.prevPos = this.pos.copy();
    }
    if (this.pos.x < 0) {
      // this.pos.x = width;
      this.pos.x += width;
      this.prevPos = this.pos.copy();
    }
    if (this.pos.y > height) {
      // this.pos.y = 0;
      this.pos.y -= height;
      this.prevPos = this.pos.copy();
    }
    if (this.pos.y < 0) {
      // this.pos.y = height;
      this.pos.y += height;
      this.prevPos = this.pos.copy();
    }
  }
}
