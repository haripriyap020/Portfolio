/**
 * INTERACTIVE GLOWING DUST & HOLOGRAPHIC PARTICLE CANVAS
 * High-performance 60fps canvas particle field
 */

class ParticleField {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 75;
    this.mouse = { x: -1000, y: -1000 };

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    const isCyan = Math.random() > 0.4;
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      radius: Math.random() * 2 + 0.8,
      color: isCyan ? 'rgba(0, 240, 255,' : 'rgba(255, 0, 127,',
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2,
      baseAlpha: Math.random() * 0.5 + 0.2,
      alpha: 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulse: 0
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;
      p.alpha = p.baseAlpha + Math.sin(p.pulse) * 0.2;

      // Mouse gentle interaction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x -= (dx / dist) * 1.2;
        p.y -= (dy / dist) * 1.2;
      }

      // Screen wrap
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Draw particle glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color} ${Math.max(0.1, p.alpha)})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color.includes('240') ? '#00f0ff' : '#ff007f';
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.particleField = new ParticleField();
});
