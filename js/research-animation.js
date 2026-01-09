// ==========================
// Row 1: Pipe animation
// ==========================

(function(){
  const canvas = document.getElementById("pipe-animation");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Generate file names 00014.jpg -> 00199.jpg
  const frames = [];
  for (let i = 14; i <= 199; i++) {
    const numStr = i.toString().padStart(5, '0'); // 00014, 00015, ...
    frames.push(`/images/pipe/${numStr}.jpg`);
  }

  const images = [];
  let loaded = 0;

  frames.forEach((src, idx) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loaded++;
      // Start animation when first image is loaded (do not wait for all)
      if (loaded === 1) startAnimation();
    };
    img.onerror = () => {
      console.error("Failed to load:", src);
    };
    images.push(img);
  });

  let currentFrame = 0;
  const fps = 15;
  let width, height;

  function startAnimation() {
    // Set canvas width = parent column width
    width = canvas.parentElement.clientWidth;
    const aspect = images[0].naturalHeight / images[0].naturalWidth;
    height = width * aspect;
    canvas.width = width;
    canvas.height = height;

    setInterval(() => {
      if (images[currentFrame].complete) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(images[currentFrame], 0, 0, width, height);
        currentFrame = (currentFrame + 1) % images.length;
      }
    }, 1000 / fps);
  }

})();

