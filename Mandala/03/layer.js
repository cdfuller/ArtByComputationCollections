const STROKE_WEIGHT = 2.5;

LAYERS = {
  'red_squares': red_squares,
  'triangles': triangles,
  'green_circle': green_circle,
  'white_line': white_line
}

function red_squares(r, theta) {
  strokeWeight(STROKE_WEIGHT);
  stroke(0);
  length = 40;
  for (let i = r; i > 100; i -= 75) {
    fill(255, 0, 0);
    let x = i;
    rect(x, 0, length, length);
  }
}

function triangles(r, theta, c) {
  strokeWeight(STROKE_WEIGHT);
  stroke(0);
  let length = 50;
  let centerOffset = 100;
  let inc = 50;
  for (let i = centerOffset; i < r * 0.9; i += inc) {
    fill(c);
    // rotate(-0.01);
    let baseX = i;
    rotate(0.1);
    push();
      translate(i-50, 0);
      noStroke();
      // rotate(PI);
      rotate(-0.2);
      let x = length * cos(theta);
      let y = length * sin(theta);
      triangle(-5, 10, x, y+length/2, x, -y-length/2);
    pop();
  }
}

function green_circle(r, theta) {
  strokeWeight(STROKE_WEIGHT);
  stroke(0);
  for (let i = r; i > 100; i -= 75) {
    fill(0, 255, 0);
    let x = i;
    // rotate(0.1);
    ellipse(x, 0, 50, 50);
  }
}

function white_line(r, theta, c) {
  strokeWeight(STROKE_WEIGHT);
  stroke(c);
  // noFill();
  let length = 50;
  let centerOffset = 100;
  let inc = 50;
  for (let i = 0; i < 5; i++) {
    rotate(i);
    let xAnchor1 = (r / i) + 10;
    let yAnchor1 = i * 2;
    let xControl1 = (r / i) * 0.5;
    let yControl1 = 50;
    let xControl2 = (r / i) * 0.5;
    let yControl2 = 50;
    let xAnchor2 = (r / i) * 3;
    let yAnchor2 = i * 5;
    bezier(
      xAnchor1,
      yAnchor1,
      xControl1,
      yControl1,
      xControl2,
      yControl2,
      xAnchor2,
      yAnchor2
    );
  }
}
