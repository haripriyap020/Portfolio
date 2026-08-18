/**
 * 3D PARALLAX & TILT PHYSICS ENGINE
 * Lerp-based smooth tracking for 16:9 Hero Stage Card and Project Cards
 */

class ParallaxEngine {
  constructor() {
    this.heroCard = document.getElementById('hero-3d-card');
    this.heroStage = document.getElementById('hero-stage-viewport');
    this.heroTypo = document.getElementById('extruded-3d-text');
    this.heroChar = document.getElementById('stage-character-layer');

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.bounds = null;
    this.isHoveringHero = false;

    this.init();
  }

  init() {
    if (!this.heroCard) return;

    this.updateBounds();
    window.addEventListener('resize', () => this.updateBounds());

    // Mouse Tracking on Window
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

    // Mouse Enter / Leave on Hero Card
    this.heroCard.addEventListener('mouseenter', () => {
      this.isHoveringHero = true;
    });

    this.heroCard.addEventListener('mouseleave', () => {
      this.isHoveringHero = false;
      this.mouse.targetX = 0;
      this.mouse.targetY = 0;
    });

    // Touch Support for Mobile / Tablet Gyro Emulation
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth) * 2 - 1;
        const normY = (touch.clientY / window.innerHeight) * 2 - 1;
        this.mouse.targetX = normX;
        this.mouse.targetY = normY;
      }
    }, { passive: true });

    // Interactive 3D Tilt on Grid Cards
    this.initProjectCards();

    // Start 60fps Physics Render Loop
    this.render();
  }

  updateBounds() {
    if (this.heroCard) {
      this.bounds = this.heroCard.getBoundingClientRect();
    }
  }

  onMouseMove(e) {
    if (!this.bounds) this.updateBounds();

    if (this.isHoveringHero && this.bounds) {
      const centerX = this.bounds.left + this.bounds.width / 2;
      const centerY = this.bounds.top + this.bounds.height / 2;

      this.mouse.targetX = (e.clientX - centerX) / (this.bounds.width / 2);
      this.mouse.targetY = (e.clientY - centerY) / (this.bounds.height / 2);
    } else {
      // Gentle ambient window parallax
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      this.mouse.targetX = normX * 0.4;
      this.mouse.targetY = normY * 0.4;
    }
  }

  initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateY(-6px) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
      });
    });
  }

  render() {
    // Smooth Lerp Physics
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    if (this.heroCard) {
      const maxRotate = 10;
      const rotX = -this.mouse.y * maxRotate;
      const rotY = this.mouse.x * maxRotate;

      this.heroCard.style.transform = `perspective(1400px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    }

    if (this.heroTypo) {
      const shiftX = -this.mouse.x * 24;
      const shiftY = -this.mouse.y * 14;
      this.heroTypo.style.transform = `translateZ(35px) translate3d(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px, 0)`;
    }

    if (this.heroChar) {
      const charShiftX = this.mouse.x * 16;
      const charShiftY = this.mouse.y * 10;
      this.heroChar.style.transform = `translateZ(65px) translate3d(${charShiftX.toFixed(1)}px, ${charShiftY.toFixed(1)}px, 0) scale(1.04)`;
    }

    requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.parallax = new ParallaxEngine();
});
