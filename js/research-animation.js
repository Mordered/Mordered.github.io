// ==========================
// Row 1: Pipe animation
// ==========================
(function() {
  const canvas = document.getElementById("pipe-animation");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const totalFrames = 186; // 00014 -> 00199
  const startFrame = 14;
  const images = [];

  // Preload images
  for (let i = 0; i < totalFrames; i++) {
    const numStr = (startFrame + i).toString().padStart(5, "0"); // 00014, 00015, ...
    const img = new Image();
    img.src = `images/pipe/${numStr}.jpg`;
    images.push(img);
  }

  let current = 0;
  const fps = 15;

  function draw() {
    const img = images[current];
    if (img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    current = (current + 1) % totalFrames;
  }

  // Update canvas size on window resize
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.width * 0.6; // optional default ratio, overridden by CSS
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  setInterval(draw, 1000 / fps);
})();

