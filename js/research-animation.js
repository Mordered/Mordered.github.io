// ==========================
// Row 1: Pipe animation
// ==========================
(function() {
  const canvas = document.getElementById("pipe-animation");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Filenames 00014.jpg -> 00199.jpg
  const frames = [];
  for (let i = 14; i <= 199; i++) {
    const numStr = i.toString().padStart(5, "0"); // 00014, 00015, ...
    frames.push(`images/pipe/${numStr}.jpg`);
  }

  const images = frames.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });

  let currentFrame = 0;
  const fps = 15;

  function drawFrame() {
    const img = images[currentFrame];
    if (img.complete) {
      const ctxWidth = canvas.width;
      const ctxHeight = canvas.height;
      ctx.clearRect(0, 0, ctxWidth, ctxHeight);
      ctx.drawImage(img, 0, 0, ctxWidth, ctxHeight);
    }
    currentFrame = (currentFrame + 1) % images.length;
  }

  setInterval(drawFrame, 1000 / fps);

})();

