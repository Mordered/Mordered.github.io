// ==========================
// Row 1: Pipe animation
// ==========================

(function(){
  const canvas = document.getElementById("pipe-animation");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Generate file names 0014.jpg -> 0199.jpg
  const frames = [];
  for (let i = 14; i <= 199; i++) {
    const numStr = i.toString().padStart(4, '0'); // 0014, 0015, ...
    frames.push(`/images/pipe/${numStr}.jpg`);
  }

  let images = [];
  let loaded = 0;

  // Load all images
  frames.forEach((src, idx) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loaded++;
      if (loaded === frames.length) {
        startAnimation();
      }
    };
    images.push(img);
  });

  // Animation settings
  let currentFrame = 0;
  const fps = 15;
  let width, height;

  function startAnimation() {
    // Set canvas width to container width, keep aspect ratio from first image
    width = canvas.parentElement.clientWidth;
    const aspect = images[0].height / images[0].width;
    height = width * aspect;
    canvas.width = width;
    canvas.height = height;

    setInterval(() => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(images[currentFrame], 0, 0, width, height);
      currentFrame = (currentFrame + 1) % images.length;
    }, 1000 / fps);
  }

})();

