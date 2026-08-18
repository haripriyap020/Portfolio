/**
 * DYNAMIC NEON LIGHTING & SHADER STUDIO ENGINE
 * Real-time color preset switcher, bloom & rim intensity controller
 */

class LightingEngine {
  constructor() {
    this.presetBtns = document.querySelectorAll('.preset-btn');
    this.rimSlider = document.getElementById('slider-rim-intensity');
    this.bloomSlider = document.getElementById('slider-bloom-strength');
    this.wireframeToggle = document.getElementById('toggle-wireframe-grid');

    this.rimValDisplay = document.getElementById('val-rim-intensity');
    this.bloomValDisplay = document.getElementById('val-bloom-strength');
    this.currentPreset = 'cyberpunk';

    this.init();
  }

  init() {
    // Preset Buttons
    this.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        if (preset) this.setPreset(preset);
      });
    });

    // Rim Light Intensity Slider
    if (this.rimSlider) {
      this.rimSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        document.documentElement.style.setProperty('--rim-intensity', val);
        if (this.rimValDisplay) this.rimValDisplay.textContent = `${Math.round(val * 100)}%`;
      });
    }

    // Volumetric Bloom Slider
    if (this.bloomSlider) {
      this.bloomSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        document.documentElement.style.setProperty('--bloom-strength', val);
        if (this.bloomValDisplay) this.bloomValDisplay.textContent = `${Math.round(val * 100)}%`;
      });
    }

    // Wireframe Grid Toggle
    if (this.wireframeToggle) {
      this.wireframeToggle.addEventListener('change', (e) => {
        const checked = e.target.checked;
        document.documentElement.style.setProperty('--wireframe-opacity', checked ? '0.25' : '0.0');
      });
    }
  }

  setPreset(presetName) {
    this.currentPreset = presetName;
    document.body.setAttribute('data-lighting-preset', presetName);

    this.presetBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-preset') === presetName);
    });

    // Update Telemetry Color Indicators
    const orb = document.getElementById('studio-hologram-orb');
    if (orb) {
      orb.style.animation = 'none';
      orb.offsetHeight; /* trigger reflow */
      orb.style.animation = 'orb-float 4s ease-in-out infinite alternate';
    }

    if (window.cyberAudio) {
      window.cyberAudio.playClick();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.lightingEngine = new LightingEngine();
});
