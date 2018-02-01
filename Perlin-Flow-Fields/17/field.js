function FlowField(fieldSize) {
  let xIncr = 4.011;
  let yIncr = xIncr;
  let zIncr = 0.0;
  // let zOff = 10.02;
  let zOff = 0.0;

  this.fieldSize = fieldSize;
  this.cols = floor(width / this.fieldSize);
  this.rows = floor(height / this.fieldSize);

  this.field = new Array(this.cols * this.rows);



  this.update = function updateFlowField() {
    // console.log('generate');
    let yOff = 0.0;
    for (let y = 0; y < this.rows; y++) {
      let xOff = 0;
      for (let x = 0; x < this.cols; x++) {
        let idx = x + (y * this.cols);
        let angle = generateFieldAngle(xOff, yOff, zOff);
        let v = p5.Vector.fromAngle(angle);
        v.setMag(0.3);
        this.field[idx] = v;

        xOff += xIncr;
      }
      yOff += yIncr;
    }

    if (frameCount % 500 == 0) {
      // zOff += 0.2;
      // console.log(frameCount);
      // zIncr = 0.0
    }
    zOff += zIncr;
  }

  this.update();

  this.getVector = function getVectorFlowField(_x, _y) {
    let x = floor(_x / this.fieldSize);
    let y = floor(_y / this.fieldSize);
    let idx = x + (y * this.cols);
    let vector = this.field[idx];
    return vector;
  }

  // this.getVectorOverlayGraphic = function() {
  //   // let overlay = createGraphics()
  //   for (let y = 0; y < this.rows; y++) {
  //     for (let x = 0; x < this.cols; x++) {
  //       let idx = x + (y * this.cols);
  //       let v = this.field[idx];
  //       push();
  //       stroke(0, 128);
  //       strokeWeight(1);
  //       translate(x * this.fieldSize, y * this.fieldSize);
  //       rotate(v.heading());
  //       line(0, 0, this.fieldSize, 0);
  //       pop();
  //     }
  //   }
  // }

  function generateFieldAngle(xOff, yOff, zOff) {
    let n = noise(xOff, yOff, zOff); // 0 < n < 1
    // let f = 4;
    // n = floor(n * f) / f;
    return - n * TWO_PI;
  }
}