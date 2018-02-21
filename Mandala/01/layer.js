const STROKE_WEIGHT = 2;

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
  let length = 100;
  for (let i = r; i > 100; i -= 75) {
    fill(c);
    // rotate(-0.01);
    let baseX = i;
    rotate(0.1);
    push();
    translate(i, 0);
      rotate(PI);
      let x = length * cos(theta);
      let y = length * sin(theta);
      triangle(0, 0, x, y+length/2, x, -y-length/2);
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

function white_line(r, theta) {
  strokeWeight(STROKE_WEIGHT);
  stroke(255);
  line(0, 0, r, 0);
}