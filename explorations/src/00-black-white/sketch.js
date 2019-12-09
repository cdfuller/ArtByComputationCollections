/// <reference path="../../node_modules/@types/p5/global.d.ts" />

let grid;
const CELL_SIZE = 20;

function setup() {
    createCanvas(1200, 1200);
    noStroke();
    rectMode(CENTER)
    
    grid = new Grid();
    grid.build()
}

function draw() {
    background(0);
    grid.draw();
    grid.update();
}

function steppedNoise(x, y, z) {
    let n = noise(x, y, z);
    let f1 = 13;
    let f2 = 7;
    n = int(n * f1) / f2;
    if (n < 0.50) {
        n += 0.5;
    }
    return n;
}

class Agent {
    constructor(x, y, n) {
        this.x = x;
        this.y = y;
        this.n = n;
        this.width = int(CELL_SIZE * 0.9);
        this.variance = 0.01;
    }

    update() {
        let noiseOffset = 50;
        this.variance = steppedNoise(this.x / noiseOffset, this.y / noiseOffset, frameCount/100);
    }

    draw() {
        let jitter = 2.3;
        let xOffset = ((this.variance * 2) - 1) * jitter;
        let yOffset = ((this.variance * 2) - 1) * jitter;
        fill(255);
        ellipse(this.x + xOffset, this.y + yOffset, this.width, this.width);
        fill(0);
        let w = this.width * this.variance;
        ellipse(this.x, this.y, w, w);
        let w2 = this.width * (this.variance / 3);
        fill(255);
        ellipse(this.x, this.y, w2, w2);
        let w3 = this.width * (this.variance / 5);
        fill(0);
        ellipse(this.x, this.y, w3, w3);
    }
}

class Grid {
    constructor() {
        this.data = [];
        this.xOffset = CELL_SIZE;
        this.yOffset = CELL_SIZE;
        this.xCount = width / this.xOffset;
        this.yCount = height / this.yOffset;
        this.xStart = this.xOffset / 2;
        this.yStart = this.yOffset / 2;
    }

    build() {
        for (let x = this.xStart; x < width; x += this.xOffset) {
            for (let y = this.yStart; y < height; y += this.yOffset) {
                let agent = new Agent(x, y, this.data.length);
                this.data.push(agent);
            }
        }
    }

    update() {
        this.data.forEach(agent => agent.update());
    }

    draw() {
        this.data.forEach(agent => agent.draw());
    }
}