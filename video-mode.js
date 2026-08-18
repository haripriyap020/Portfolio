/**
 * CINEMATIC 3D VIDEO MODE & SHOWREEL TOUR CONTROLLER
 * Fullscreen widescreen letterbox tour with live telemetry, subtitles & audio visualizer
 */

const VIDEO_CHAPTERS = [
  {
    id: 0,
    title: "HARIPRIYA PATRA // NEURAL INTRODUCTION",
    text: "B.Tech Computer Science (Artificial Intelligence) Engineer at VIEW (CGPA: 7.43). Building high-performance AI and software systems.",
    imageSrc: "hero-character-main.jpg",
    cameraAngle: "CAM 01 // 35mm ANAMORPHIC T1.5"
  },
  {
    id: 1,
    title: "PROJECT: DEEPFACE EMOTION RECOGNITION AI",
    text: "Computer vision neural network detecting facial landmarks and classifying real-time emotional states (Happy, Sad, Angry, Neutral).",
    imageSrc: "project-deepface.jpg",
    cameraAngle: "CAM 02 // MACRO NEURAL SCAN"
  },
  {
    id: 2,
    title: "PROJECT: CONVERSATIONAL NEURAL CHATBOT",
    text: "Python-driven conversational AI agent featuring multi-turn context retention, dialogue parsing, and conversational UI.",
    imageSrc: "project-chatbot.jpg",
    cameraAngle: "CAM 03 // HOLOGRAPHIC CORE"
  },
  {
    id: 3,
    title: "ENTERPRISE EXPERIENCE: NALCO SYSTEMS DEPT",
    text: "Completed hands-on internship in Systems Department at National Aluminium Company Limited (NALCO), optimizing enterprise IT operations.",
    imageSrc: "companion-character-1.jpg",
    cameraAngle: "CAM 04 // ENTERPRISE TERMINAL"
  },
  {
    id: 4,
    title: "SYSTEMS: SMARTPARK & UPI NEOPAY PROTOCOL",
    text: "Smart automated vehicle entry/slot allocator and instant cryptographic UPI payment QR generation engine.",
    imageSrc: "project-parking.svg",
    cameraAngle: "CAM 05 // INFRASTRUCTURE GRID"
  },
  {
    id: 5,
    title: "COLLABORATE // INITIALIZE DIRECT CONTACT",
    text: "Open for AI / Software Engineering internships & opportunities. Email: haripriyap014@gmail.com | Phone: +91 7815047615",
    imageSrc: "companion-character-2.jpg",
    cameraAngle: "CAM 06 // DIRECT UPLINK"
  }
];

class VideoModeController {
  constructor() {
    this.overlay = document.getElementById('video-mode-overlay');
    this.triggerBtn = document.getElementById('video-mode-trigger-btn');
    this.closeBtn = document.getElementById('video-close-btn');

    this.sceneImg = document.getElementById('cinema-scene-img');
    this.captionTitle = document.getElementById('cinema-caption-title');
    this.captionText = document.getElementById('cinema-caption-text');
    this.camStat = document.getElementById('cinema-cam-angle');
    this.timeDisplay = document.getElementById('cinema-time-code');
    this.progressBar = document.getElementById('cinema-timeline-progress');
    this.playBtn = document.getElementById('cinema-play-btn');
    this.chapterPills = document.querySelectorAll('.chapter-pill');
    this.audioBars = document.querySelectorAll('.audio-bar');

    this.currentChapter = 0;
    this.isPlaying = false;
    this.chapterDuration = 6.5; // seconds per chapter
    this.elapsedInChapter = 0;
    this.lastTimestamp = 0;
    this.animFrame = null;

    this.init();
  }

  init() {
    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', () => this.open());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }

    const prevBtn = document.getElementById('cinema-prev-step');
    const nextBtn = document.getElementById('cinema-next-step');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevChapter());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextChapter());

    this.chapterPills.forEach((pill, idx) => {
      pill.addEventListener('click', () => this.goToChapter(idx));
    });

    const track = document.getElementById('cinema-timeline-track');
    if (track) {
      track.addEventListener('click', (e) => {
        const rect = track.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        const targetChapter = Math.min(VIDEO_CHAPTERS.length - 1, Math.floor(ratio * VIDEO_CHAPTERS.length));
        this.goToChapter(targetChapter);
      });
    }

    // Keyboard Shortcuts (V for Video Mode, Space for Play/Pause, Esc for Close)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'v' || e.key === 'V') {
        if (!this.overlay.classList.contains('active') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          this.open();
        }
      } else if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      } else if (e.code === 'Space' && this.overlay.classList.contains('active')) {
        e.preventDefault();
        this.togglePlay();
      }
    });
  }

  open() {
    if (!this.overlay) return;
    this.overlay.classList.add('active');
    this.currentChapter = 0;
    this.elapsedInChapter = 0;
    this.isPlaying = true;
    this.updatePlayBtnState();
    this.applyChapter();

    if (window.cyberAudio) {
      window.cyberAudio.initContext();
      if (window.cyberAudio.isMuted) {
        window.cyberAudio.toggleMute(); // Auto-unmute for cinematic immersion
      } else {
        window.cyberAudio.startDrone();
      }
    }

    this.lastTimestamp = performance.now();
    this.loop();
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    this.isPlaying = false;
    cancelAnimationFrame(this.animFrame);
    if (window.cyberAudio) {
      window.cyberAudio.playClick();
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.updatePlayBtnState();
    if (this.isPlaying) {
      this.lastTimestamp = performance.now();
      this.loop();
    }
    if (window.cyberAudio) {
      window.cyberAudio.playClick();
    }
  }

  updatePlayBtnState() {
    if (this.playBtn) {
      this.playBtn.innerHTML = this.isPlaying ? '❚❚' : '▶';
    }
  }

  goToChapter(idx) {
    this.currentChapter = idx;
    this.elapsedInChapter = 0;
    this.applyChapter();
    if (window.cyberAudio) window.cyberAudio.playWhoosh();
  }

  nextChapter() {
    this.currentChapter = (this.currentChapter + 1) % VIDEO_CHAPTERS.length;
    this.elapsedInChapter = 0;
    this.applyChapter();
    if (window.cyberAudio) window.cyberAudio.playWhoosh();
  }

  prevChapter() {
    this.currentChapter = (this.currentChapter - 1 + VIDEO_CHAPTERS.length) % VIDEO_CHAPTERS.length;
    this.elapsedInChapter = 0;
    this.applyChapter();
    if (window.cyberAudio) window.cyberAudio.playWhoosh();
  }

  applyChapter() {
    const chap = VIDEO_CHAPTERS[this.currentChapter];
    if (!chap) return;

    if (this.sceneImg) {
      this.sceneImg.style.opacity = '0';
      setTimeout(() => {
        this.sceneImg.src = chap.imageSrc;
        this.sceneImg.style.opacity = '1';
      }, 250);
    }

    if (this.captionTitle) this.captionTitle.textContent = chap.title;
    if (this.captionText) this.captionText.textContent = chap.text;
    if (this.camStat) this.camStat.textContent = chap.cameraAngle;

    this.chapterPills.forEach((pill, i) => {
      pill.classList.toggle('active', i === this.currentChapter);
    });
  }

  loop() {
    if (!this.isPlaying) return;

    const now = performance.now();
    const dt = (now - this.lastTimestamp) / 1000;
    this.lastTimestamp = now;

    this.elapsedInChapter += dt;

    if (this.elapsedInChapter >= this.chapterDuration) {
      this.elapsedInChapter = 0;
      this.currentChapter = (this.currentChapter + 1) % VIDEO_CHAPTERS.length;
      this.applyChapter();
    }

    // Update Progress Bar
    const totalProg = ((this.currentChapter + (this.elapsedInChapter / this.chapterDuration)) / VIDEO_CHAPTERS.length) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${totalProg.toFixed(1)}%`;
    }

    // Update Timecode (00:00:14)
    const currentSeconds = Math.floor(this.currentChapter * this.chapterDuration + this.elapsedInChapter);
    const mins = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
    const secs = String(currentSeconds % 60).padStart(2, '0');
    const ms = String(Math.floor((this.elapsedInChapter % 1) * 30)).padStart(2, '0');
    if (this.timeDisplay) {
      this.timeDisplay.textContent = `00:${mins}:${secs}:${ms}`;
    }

    // Animate Audio Equalizer Bars
    this.audioBars.forEach(bar => {
      const h = Math.random() * 80 + 20;
      bar.style.height = `${h}%`;
    });

    this.animFrame = requestAnimationFrame(() => this.loop());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.videoMode = new VideoModeController();
});
