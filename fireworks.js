// Run the script only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  let particles = [];

  // Particle class
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = Math.random() * 3 + 1; // Random particle size
      this.speedX = Math.random() * 4 - 2; // Random horizontal speed
      this.speedY = Math.random() * 4 - 2; // Random vertical speed
      this.alpha = 1; // Opacity
      this.decay = Math.random() * 0.01 + 0.005; // Fading speed
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= this.decay; // Gradually fade out
      if (this.alpha < 0) this.alpha = 0; // Prevent negative opacity
    }
  }

  // Create a burst of particles at a random position
  function createParticles(x, y) {
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(x, y, color));
    }
  }

  // Animation loop
  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Fading effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();

      // Remove particles that have completely faded
      if (particle.alpha <= 0) {
        particles.splice(index, 1);
      }
    });

    requestAnimationFrame(animate);
  }

  // Spawn random fireworks
  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    createParticles(x, y);
  }, 500);

  // Start animation
  animate();
});
