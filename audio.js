/**
 * PROCEDURAL WEB AUDIO API SYNTHESIZER
 * Zero external dependencies - generates futuristic cyberpunk SFX on the fly.
 */

class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Default muted for smooth browser autoplay compliance
    this.droneOsc = null;
    this.droneGain = null;
    this.initElements();
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initElements() {
    const muteBtn = document.getElementById('audio-toggle-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => this.toggleMute());
    }

    // Attach sound triggers to interactive elements
    document.addEventListener('mouseover', (e) => {
      if (this.isMuted) return;
      if (e.target.closest('.cyber-btn, .nav-link-item, .persona-thumb-btn, .filter-tab-btn, .project-card, .preset-btn')) {
        this.playHover();
      }
    });

    document.addEventListener('click', (e) => {
      if (this.isMuted) return;
      if (e.target.closest('.cyber-btn, .nav-arrow-btn, .preset-btn, .chapter-pill, .filter-tab-btn')) {
        this.playClick();
      }
    });
  }

  toggleMute() {
    this.initContext();
    this.isMuted = !this.isMuted;
    
    const muteBtn = document.getElementById('audio-toggle-btn');
    const audioIcon = document.getElementById('audio-status-icon');
    const audioLabel = document.getElementById('audio-status-label');

    if (muteBtn) {
      if (this.isMuted) {
        muteBtn.classList.remove('active');
        if (audioIcon) audioIcon.textContent = '🔇';
        if (audioLabel) audioLabel.textContent = 'AUDIO: MUTED';
        this.stopDrone();
      } else {
        muteBtn.classList.add('active');
        if (audioIcon) audioIcon.textContent = '🔊';
        if (audioLabel) audioLabel.textContent = 'AUDIO: ACTIVE';
        this.playClick();
        this.startDrone();
      }
    }
  }

  playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playWhoosh() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, this.ctx.currentTime + 0.25);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.15);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  startDrone() {
    if (this.isMuted || !this.ctx || this.droneOsc) return;
    try {
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note sub-bass drone

      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.015, this.ctx.currentTime + 2);

      this.droneOsc.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc.start();
    } catch (e) {}
  }

  stopDrone() {
    if (this.droneOsc && this.ctx) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.droneOsc) {
            this.droneOsc.stop();
            this.droneOsc.disconnect();
            this.droneOsc = null;
            this.droneGain = null;
          }
        }, 500);
      } catch (e) {
        this.droneOsc = null;
      }
    }
  }
}

window.cyberAudio = new CyberAudioEngine();
