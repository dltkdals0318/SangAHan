// Array
let len = 300;
let xpos = [];
let ypos = [];

let bgImg;

// 색상
let colTail;
let colMid;
let colHead;

function preload() {
  bgImg = loadImage("../source/background.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255);

  // 색상 정의
  colTail = color("#dfcdb3");
  colMid = color("#413832");
  colHead = color(0);

  for (let i = 0; i < len; i++) {
    xpos[i] = 0;
    ypos[i] = 0;
  }
}

function draw() {
  let offsetX = 0;
  let offsetY = 0;
  let drawW = width;
  let drawH = height;

  if (bgImg && bgImg.width > 0 && bgImg.height > 0) {
    let scale = min(width / bgImg.width, height / bgImg.height);
    drawW = bgImg.width * scale;
    drawH = bgImg.height * scale;
    offsetX = (width - drawW) / 2;
    offsetY = (height - drawH) / 2;

    background(0);
    image(bgImg, offsetX, offsetY, drawW, drawH);
  } else {
    background(0);
  }

  xpos[len - 1] = mouseX;
  ypos[len - 1] = mouseY;

  for (let i = 0; i < len - 1; i++) {
    xpos[i] = xpos[i + 1];
    ypos[i] = ypos[i + 1];
  }

  push();
  drawingContext.save();

  drawingContext.beginPath();
  drawingContext.rect(offsetX, offsetY, drawW, drawH);
  drawingContext.clip();

  noStroke();
  for (let i = 0; i < len; i++) {
    let t = i / (len - 1);

    let c;
    if (t < 0.5) {
      // colTail → colMid
      let tt = map(t, 0, 0.5, 0, 1);
      c = lerpColor(colTail, colMid, tt);
    } else {
      // colMid → colHead
      let tt = map(t, 0.5, 1, 0, 1);
      c = lerpColor(colMid, colHead, tt);
    }

    fill(c);

    let d = map(i, 0, len - 1, 170, 20);
    circle(xpos[i], ypos[i], d);
  }

  drawingContext.restore();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

