class Mandala {
  constructor(sliceCount) {
    this.theta = TWO_PI / sliceCount;
    this.slices = Array.from({ length: sliceCount }, () => {
      return new Slice(RADIUS, this.theta);
    }); 
  }

  update() {

  }

  draw() {
    let gentle_pride = [
      [242, 82, 53],
      [238, 170, 86],
      [238, 232, 96],
      [100, 242, 138],
      [99, 148, 231],
    ]
    let palette = gentle_pride;
    let colorIndex = 0;
    translate(width/2, height/2);
    this.slices.forEach((slice, i) => {
      push();
        // console.log(i, this.theta * i);
        let c = palette[colorIndex++ % palette.length];
        rotate(this.theta * i);
        slice.draw(c);
      pop();
    });
  }
}