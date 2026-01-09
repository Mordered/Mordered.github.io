const img = document.getElementById("kolmogorov-frame");

const totalFrames = 200;
let frame = 0;

function animate() {
  img.src = `images/kolmogorov/frame_${String(frame).padStart(3, '0')}.png`;
  frame = (frame + 1) % totalFrames;
}

setInterval(animate, 50); // ~16 FPS

