// ==========================
// Row 1: Pipe animation
// ==========================
const pipeImg = document.getElementById("pipe-frame");

const totalFrames = 186; // 00014 -> 00199
let frame = 14;

function animatePipe() {
  const numStr = String(frame).padStart(5, "0"); // 00014, 00015, ...
  pipeImg.src = `images/pipe/${numStr}.jpg`;
  frame++;
  if (frame > 199) frame = 14; // loop back
}

setInterval(animatePipe, 66); // ~15 FPS

