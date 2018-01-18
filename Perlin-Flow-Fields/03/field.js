function FlowField(fieldSize) {
  let xyIncr = 0.1;
  let zIncr = 0.0;
  let zOff = 0.0;

  this.fieldSize = fieldSize
  this.cols = floor(width / this.fieldSize);
  this.rows = floor(height / this.fieldSize);

  this.field = new Array(this.cols * this.rows);

  this.update = function updateFlowField() {
    let yOff = 0.0;
    for (let y = 0; y < this.rows; y++) {
      let xOff = 0;
      for (let x = 0; x < this.cols; x++) {
        let idx = x + (y * this.cols);
        let angle = generateFieldAngle(xOff, yOff, zOff);
        let v = p5.Vector.fromAngle(angle);
        v.setMag(0.5);
        this.field[idx] = v;

        xOff += xyIncr;
      }
      yOff += inc;
    }

    zOff += zIncr;
  }

  this.update();

  function generateFieldAngle(xOff, yOff, zOff) {
    let n = noise(xOff, yOff, zOff); // 0 < n < 1
    let f = 5;
    n = floor(n * f) / f;
    return n * TWO_PI;
  }
}