class Slice {

  constructor(r, theta, c) {
    this.radius = r;
    this.theta = theta;
    this.layers = [
      'triangles',
      // 'green_circle',
      // 'red_squares', 
      // 'white_line',
    ];
    this.color = c;
  }

  draw(c) {

    this.layers.forEach((layer) => {
      push();
        LAYERS[layer](this.radius, this.theta, c);
      pop();
    })
  }
}