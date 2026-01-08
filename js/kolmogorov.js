const canvas = document.getElementById("kolmogorov-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 300;

let t = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 5) {
    const u = Math.sin(2 * Math.PI * y / canvas.height + t);
    ctx.beginPath();
    ctx.moveTo(200, y);
    ctx.lineTo(200 + 80 * u, y);
    ctx.strokeStyle = "rgba(0,200,255,0.6)";
    ctx.stroke();
  }

  t += 0.05;
  requestAnimationFrame(draw);
}

draw();

