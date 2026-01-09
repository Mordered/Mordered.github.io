// ==========================
// Row 1: Pipe animation
// ==========================
(function() {
  const canvas = document.getElementById("pipe-animation");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Create array of filenames
  const frames = [];
  for (let i = 14; i <= 199; i++) {
    const numStr = i.toString().padStart(5, "0"); // 00014, 00015, ..., 00199
    frames.push(`images/pipe/${numStr}.jpg`);
  }

  const images = [];
  let loadedImages = 0;

  // Preload images
  frames.forEach((src, idx) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === 1) startAnimation(); // start as soon as first frame loads
    };
    img.onerror = () => console.error("Failed to load:", src);
    images.push(img);
  });

  let currentFrame = 0;
  const fps = 15;
  let width, height;

  function startAnimation() {
    width = canvas.parentElement.clientWidth;
    // Maintain aspect ratio based on first loaded image
    const firstImg = images.find(img => img.complete);
    const aspect = firstImg.naturalHeight / firstImg.naturalWidth;
    height = width * aspect;
    canvas.width = width;
    canvas.height = height;

    setInterval(() => {
      const img = images[currentFrame];
      if (img.complete) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        currentFrame = (currentFrame + 1) % images.length;
      }
    }, 1000 / fps);
  }
})();

