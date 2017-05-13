let pCanvas;
let pCtx;
let canvasWidth = 100;
let canvasHeight = 100;
let tCanvas;
let tCtx;

function init() {
  console.log('onload');
  pCanvas = document.getElementById('patternCanvas');
  pCtx = pCanvas.getContext('2d');

  tCanvas = document.getElementById('triangleCanvas');
  tCtx = tCanvas.getContext('2d');

  pattern();
  triangle();
};

function pattern () {
  pCtx.clearRect(0,0,canvasWidth,canvasHeight);
  const duration = document.getElementById('dur-input').value;   
  const longerEdge = (canvasWidth > canvasHeight) ? canvasWidth : canvasHeight;

  pCtx.beginPath();
  pCtx.lineWidth = 1;
  pCtx.strokeStyle = 'blue';
  
  for(let i = 0; (i * duration) < (longerEdge * 2); i++){
    const startX = i * duration - longerEdge;
    const startY = 0;
    const endX = i * duration;
    const endY = longerEdge;
    pCtx.moveTo(startX, startY);
    pCtx.lineTo(endX, endY);
  }
 for(let i = 0; (i * duration) < (longerEdge * 2); i++){
    const startX = i * duration;
    const startY = 0;
    const endX = i * duration - longerEdge;
    const endY = longerEdge;
    pCtx.moveTo(startX, startY);
    pCtx.lineTo(endX, endY);
  }
 pCtx.stroke();
 pCtx.closePath();
};

const lenaImg = new Image();
lenaImg.src = 'img/lena.jpg';

function triangle() {
  tCtx.beginPath();
  tCtx.strokeStyle= 'green';
  tCtx.fillStyle = 'green';
  tCtx.moveTo(25, 50);
  tCtx.lineTo(70, 75);
  tCtx.lineTo(70, 25);
  tCtx.fill();
}

function mask() {
  pCtx.globalCompositeOperation = 'source-in';
  pCtx.drawImage(tCanvas, 0 ,0);
}

function overlapMasked () {
  let overlapCanvas = document.getElementById('overlapCanvas');
  const oCtx = overlapCanvas.getContext('2d');
  oCtx.drawImage(pCanvas,0,0);
}

function overlap () {
  let overlapCanvas = document.getElementById('overlapCanvas');
  if(!overlapCanvas){
    overlapCanvas = document.createElement('canvas'); 
    overlapCanvas.id = 'overlapCanvas';
    overlapCanvas.width = lenaImg.width; 
    overlapCanvas.height = lenaImg.height; 
    canvasWidth = lenaImg.width; 
    canvasHeight = lenaImg.height; 
    document.body.appendChild(overlapCanvas);
  }
  const oCtx = overlapCanvas.getContext('2d');

  oCtx.clearRect(0,0,canvasWidth,canvasHeight);
  oCtx.globalAlpha = 1;
  oCtx.drawImage(lenaImg, 0, 0, lenaImg.width, lenaImg.height);
  const duration = document.getElementById('dur-input').value;   

  oCtx.beginPath();
  oCtx.lineWidth = 1;
  oCtx.strokeStyle = 'blue';
  const opacity = document.getElementById('opa-input').value;   
  oCtx.globalAlpha = parseFloat(opacity);
 
  const x1 =  parseInt(document.getElementsByName("rect-x1")[0].value);
  const x2 =  parseInt(document.getElementsByName("rect-x2")[0].value); 
  const y1 =  parseInt(document.getElementsByName("rect-y1")[0].value);
  const y2 =  parseInt(document.getElementsByName("rect-y2")[0].value); 

  const width = x2 - x1;
  const height = y2 - y1;

  let startX, startY, endX, endY;
  // straight to right down 
  for(let i = 0; (i * duration) < (width + height); i++){

    if((i * duration) < height){
      startX = x1;
      startY = y2 - (i * duration);
    } else {
      startX = x1 + (i * duration) - height;
      startY = y1;
    }
    if((i * duration) < width){
      endX = x1 + (i * duration);
      endY = y2;
    } else {
      endX = x2;
      endY = y2 - ((i * duration) - width);
    }
    oCtx.moveTo(startX, startY);
    oCtx.lineTo(endX, endY);
  }

  // straight to right up 
  for(let i = 0; (i * duration) < (width + height); i++){
    if((i * duration) < height){
      startX = x1;
      startY = y1 + (i * duration);
    } else {
      startX = x1 + (i * duration) - height;
      startY = y2;
    }
    if((i * duration) < width){
      endX = x1 + (i * duration);
      endY = y1;
    } else {
      endX = x2;
      endY = y1 + (i * duration) - width;
    }

    oCtx.moveTo(startX, startY);
    oCtx.lineTo(endX, endY);
  }

  oCtx.rect(x1, y1, width, height);
  oCtx.stroke();
  oCtx.closePath();

  window.scrollTo(0, document.body.scrollHeight);
};

function overlapOldCode () {
  let overlapCanvas = document.getElementById('overlapCanvas');
  if(!overlapCanvas){
    overlapCanvas = document.createElement('canvas'); 
    overlapCanvas.id = 'overlapCanvas';
    overlapCanvas.width = lenaImg.width; 
    overlapCanvas.height = lenaImg.height; 
    canvasWidth = lenaImg.width; 
    canvasHeight = lenaImg.height; 
    document.body.appendChild(overlapCanvas);
  }

  const oCtx = overlapCanvas.getContext('2d');

  oCtx.clearRect(0,0,canvasWidth,canvasHeight);
  oCtx.globalAlpha = 1;
  oCtx.drawImage(lenaImg, 0, 0, lenaImg.width, lenaImg.height);
  const duration = document.getElementById('dur-input').value;   
  const longerEdge = (canvasWidth > canvasHeight) ? canvasWidth : canvasHeight;

  oCtx.beginPath();
  oCtx.lineWidth = 1;
  oCtx.strokeStyle = 'blue';
  const opacity = document.getElementById('opa-input').value;   
  oCtx.globalAlpha = opacity;
  //oCtx.globalCompositeOperation = 'destination-atop';
  
  for(let i = 0; (i * duration) < (longerEdge * 2); i++){
    const startX = i * duration - longerEdge;
    const startY = 0;
    const endX = i * duration;
    const endY = longerEdge;
    oCtx.moveTo(startX, startY);
    oCtx.lineTo(endX, endY);
  }
  for(let i = 0; (i * duration) < (longerEdge * 2); i++){
    const startX = i * duration;
    const startY = 0;
    const endX = i * duration - longerEdge;
    const endY = longerEdge;
    oCtx.moveTo(startX, startY);
    oCtx.lineTo(endX, endY);
  }

  oCtx.stroke();
  oCtx.closePath();

  window.scrollTo(0, document.body.scrollHeight);
};

