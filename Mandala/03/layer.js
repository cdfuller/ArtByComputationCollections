const STROKE_WEIGHT = 10;

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
  for (let i = r; i > r * 0.9; i -= 75) {
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
  noFill();
  // line(0, 0, r, 0);
  bezier1(r);
  bezier2(r);
  bezier3(r);
  }

function bezier1(r) {
  let xAnchor1 = r * 0.1;
  let yAnchor1 = 0;
  let xControl1 = r * 0.25;
  let yControl1 = 50
  let xControl2 = r * 0.25;
  let yControl2 = 50;
  let xAnchor2 = r * 0.3;
  let yAnchor2 = 0;
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

function bezier2(r) {
  let xAnchor1 = r * 0.3;
  let yAnchor1 = 0;
  let xControl1 = r * 0.45;
  let yControl1 = r * 0.2;
  let xControl2 = r * 0.6;
  let yControl2 = r * 0.2;
  let xAnchor2 = r * 0.7;
  let yAnchor2 = 50;
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

function bezier3(r) {
  let xAnchor1 = r * 0.7;
  let yAnchor1 = 50;
  let xControl1 = r * 0.8;
  let yControl1 = r * 0.2;
  let xControl2 = r * 0.8;
  let yControl2 = r * 0.2;
  let xAnchor2 = r * 0.95;
  let yAnchor2 = 50;
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

