// ==========================
// Row 1: Pipe animation
// ==========================
const pipeImg = document.getElementById("pipe-frame");

let frame = 14;           // start frame
const totalFrames = 186;  // 00014 -> 00199
const fps = 15;           // frames per second

function animatePipe() {
  // pad number to 5 digits: 00014, 00015, ...
  const numStr = String(frame).padStart(5, '0');
  pipeImg.src = `images/pipe/${numStr}.jpg`;

  frame++;
  if (frame > 199) frame = 14; // loop back
}

// call every 1000/fps milliseconds
setInterval(animatePipe, 1000 / fps);

