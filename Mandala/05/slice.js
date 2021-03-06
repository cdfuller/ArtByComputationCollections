class Slice {

  constructor(r, theta, c) {
    this.radius = r*0.98;
    this.theta = theta;
    this.layers = [
      // 'green_circle',
      // 'red_squares', 
      // 'white_line',
      // 'triangles',
      // 'walker',
      'curve',
    ];
    this.color = c;
  }

  draw(c) {

    this.layers.forEach((layer, i, arr) => {
      push();
        LAYERS[layer](this.radius, this.theta, c);
      pop();
    })
  }
}