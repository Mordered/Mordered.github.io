const canvas = document.getElementById("kolmogorov-canvas");
const ctx = canvas.getContext("2d");

const NX = 128;
const NY = 128;

canvas.width = NX;
canvas.height = NY;

// Fields
let omega = new Float32Array(NX * NY);
let u = new Float32Array(NX * NY);
let v = new Float32Array(NX * NY);

// Parameters
const dt = 0.01;
const nu = 0.01;
const forcingK = 4;
const forcingAmp = 0.08;

// Index helper
const idx = (x, y) => ((y + NY) % NY) * NX + ((x + NX) % NX);

// Initialize with noise
for (let i = 0; i < omega.length; i++) {
  omega[i] = 0.2 * (Math.random() - 0.5);
}

// Compute velocity from vorticity (simple Poisson solve, Jacobi)
function computeVelocity() {
  const psi = new Float32Array(NX * NY);

  for (let iter = 0; iter < 30; iter++) {
    for (let y = 1; y < NY - 1; y++) {
      for (let x = 1; x < NX - 1; x++) {
        const i = idx(x, y);
        psi[i] =
          0.25 *
          (psi[idx(x + 1, y)] +
           psi[idx(x - 1, y)] +
           psi[idx(x, y + 1)] +
           psi[idx(x, y - 1)] +
           omega[i]);
      }
    }
  }

  for (let y = 0; y < NY; y++) {
    for (let x = 0; x < NX; x++) {
      const i = idx(x, y);
      u[i] = (psi[idx(x, y + 1)] - psi[idx(x, y - 1)]) * 0.5;
      v[i] = -(psi[idx(x + 1, y)] - psi[idx(x - 1, y)]) * 0.5;
    }
  }
}

// Time step vorticity
function step() {
  computeVelocity();

  const newOmega = new Float32Array(omega.length);

  for (let y = 1; y < NY - 1; y++) {
    for (let x = 1; x < NX - 1; x++) {
      const i = idx(x, y);

      const adv =
        u[i] * (omega[idx(x + 1, y)] - omega[idx(x - 1, y)]) * 0.5 +
        v[i] * (omega[idx(x, y + 1)] - omega[idx(x, y - 1)]) * 0.5;

      const lap =
        omega[idx(x + 1, y)] +
        omega[idx(x - 1, y)] +
        omega[idx(x, y + 1)] +
        omega[idx(x, y - 1)] -
        4 * omega[i];

      // Kolmogorov forcing
      const force = forcingAmp * Math.sin((2 * Math.PI * forcingK * y) / NY);

      newOmega[i] =
        omega[i] +
        dt * (-adv + nu * lap + force);
    }
  }

  omega = newOmega;
}

// Draw vorticity field
function render() {
  const img = ctx.createImageData(NX, NY);
  for (let i = 0; i < omega.length; i++) {
    const w = omega[i];
    const c = Math.max(-1, Math.min(1, w * 6));

    img.data[4 * i + 0] = 30 + 220 * Math.max(0, c);
    img.data[4 * i + 1] = 30;
    img.data[4 * i + 2] = 30 + 220 * Math.max(0, -c);
    img.data[4 * i + 3] = 255;
  }

  ctx.putImageData(img, 0, 0);
}

function animate() {
  step();
  render();
  requestAnimationFrame(animate);
}

animate();

