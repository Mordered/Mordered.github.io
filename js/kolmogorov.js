const canvas = document.getElementById("kolmogorov-canvas");
const ctx = canvas.getContext("2d");

// Resize canvas to match CSS size
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let t = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ny = 40;
  const amplitude = canvas.width * 0.35;

  for (let i = 0; i < ny; i++) {
    const y = (i / (ny - 1)) * canvas.height;
    const u = Math.sin(2 * Math.PI * y / canvas.height + t);

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, y);
    ctx.lineTo(canvas.width / 2 + amplitude * u, y);
    ctx.strokeStyle = "rgba(0, 200, 255, 0.7)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  t += 0.03;
  requestAnimationFrame(draw);
}

draw();

