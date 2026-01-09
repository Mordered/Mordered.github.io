// ==========================
// Row 1: Pipe animation
// ==========================
const pipeImg = document.getElementById("pipe-frame");

let frame = 14;           // start frame
const lastFrame = 199;

function animatePipe() {
  const numStr = String(frame).padStart(5, '0');  // 00014, 00015, ...
  // add cache buster
  pipeImg.src = `images/pipe/${numStr}.jpg?cb=${Date.now()}`;

  frame++;
  if (frame > lastFrame) frame = 14;  // loop back
}

setInterval(animatePipe, 50);

