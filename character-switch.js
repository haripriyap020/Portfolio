/**
 * CHARACTER / PERSONA SWITCHER ENGINE
 * Seamless transition between Haripriya Patra's 3D personas & technical specialties
 */

const PERSONAS_DATA = [
  {
    id: 0,
    name: "AI & NEURAL ARCHITECT",
    tag: "01 // HARIPRIYA PATRA",
    typoText: "AI // DEV",
    badgeTitle: "B.Tech CSE (AI) @ VIEW",
    badgeDesc: "Deep Learning • Computer Vision • Python Core",
    imageSrc: "hero-character-main.jpg",
    polycount: "48.2K",
    shader: "SSS-OCTANE",
    fps: "60 FPS",
    accentMood: "cyberpunk"
  },
  {
    id: 1,
    name: "FULL-STACK SYSTEMS DEV",
    tag: "02 // HARIPRIYA PATRA",
    typoText: "SYSTEMS",
    badgeTitle: "NALCO Systems Alumna",
    badgeDesc: "Python • Java • SQL • IT Automation",
    imageSrc: "companion-character-1.jpg",
    polycount: "52.8K",
    shader: "METALLIC-PBR",
    fps: "60 FPS",
    accentMood: "sunset"
  },
  {
    id: 2,
    name: "VISION & INTELLIGENCE",
    tag: "03 // HARIPRIYA PATRA",
    typoText: "VISION",
    badgeTitle: "DeepFace & NLP Specialist",
    badgeDesc: "Facial Emotion Recognition • AI Chatbot",
    imageSrc: "companion-character-2.jpg",
    polycount: "61.4K",
    shader: "HOLO-RAYTRACED",
    fps: "60 FPS",
    accentMood: "midnight"
  }
];

class PersonaSwitcher {
  constructor() {
    this.currentIndex = 0;
    this.charImg = document.getElementById('hero-character-img');
    this.typoText = document.getElementById('extruded-3d-text');
    this.personaTag = document.getElementById('hero-persona-tag');
    this.badgeTitle = document.getElementById('hero-badge-title');
    this.badgeDesc = document.getElementById('hero-badge-desc');
    this.polycountVal = document.getElementById('telemetry-polycount');
    this.shaderVal = document.getElementById('telemetry-shader');
    
    this.prevBtn = document.getElementById('hero-prev-btn');
    this.nextBtn = document.getElementById('hero-next-btn');
    this.thumbBtns = document.querySelectorAll('.persona-thumb-btn');

    this.init();
  }

  init() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    this.thumbBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => this.switchTo(index));
    });

    // Keyboard Arrow Controls
    window.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  switchTo(index) {
    if (index === this.currentIndex || index < 0 || index >= PERSONAS_DATA.length) return;
    this.currentIndex = index;
    this.applyState();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % PERSONAS_DATA.length;
    this.applyState();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + PERSONAS_DATA.length) % PERSONAS_DATA.length;
    this.applyState();
  }

  applyState() {
    const data = PERSONAS_DATA[this.currentIndex];
    if (!data) return;

    if (window.cyberAudio) {
      window.cyberAudio.playWhoosh();
    }

    // Update active thumb button
    this.thumbBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === this.currentIndex);
    });

    // Animate Character Image Transition
    if (this.charImg) {
      this.charImg.style.opacity = '0';
      this.charImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        this.charImg.src = data.imageSrc;
        this.charImg.style.opacity = '1';
        this.charImg.style.transform = 'scale(1.04)';
      }, 200);
    }

    // Update Extruded 3D Typography
    if (this.typoText) {
      this.typoText.style.opacity = '0';
      setTimeout(() => {
        this.typoText.textContent = data.typoText;
        this.typoText.style.opacity = '1';
      }, 200);
    }

    // Update HUD & Metadata
    if (this.personaTag) this.personaTag.textContent = data.tag;
    if (this.badgeTitle) this.badgeTitle.textContent = data.badgeTitle;
    if (this.badgeDesc) this.badgeDesc.textContent = data.badgeDesc;
    if (this.polycountVal) this.polycountVal.textContent = data.polycount;
    if (this.shaderVal) this.shaderVal.textContent = data.shader;

    // Trigger mood lighting if preset switcher available
    if (window.lightingEngine && data.accentMood) {
      window.lightingEngine.setPreset(data.accentMood);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.personaSwitcher = new PersonaSwitcher();
});
