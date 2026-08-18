/**
 * MAIN APP CONTROLLER & INTERACTIVE SCRIPTS
 * Contact terminal simulation, live clock, copy clipboard, and event bindings
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Footer Clock
  const clockEl = document.getElementById('footer-live-clock');
  function updateClock() {
    if (clockEl) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      const dateStr = now.toISOString().split('T')[0];
      clockEl.textContent = `${dateStr} ${timeStr} IST // SYSTEM OK 🟢`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Interactive Terminal Commands Simulation
  const termOutput = document.getElementById('terminal-live-feed');
  const termInputs = [
    "whoami ➔ Haripriya Patra [CSE - AI Engineer]",
    "cat /etc/skills.json ➔ Python, Java, SQL, DeepFace, OpenCV, WebGL",
    "git status ➔ branch: main [0 pending commits, 100% test pass]",
    "nalco --verify-internship ➔ Systems Dept IT Workflows [Certified ✓]",
    "contact --ping ➔ haripriyap014@gmail.com [Status: Open for opportunities]"
  ];

  let termIndex = 0;
  if (termOutput) {
    setInterval(() => {
      const line = document.createElement('div');
      line.className = 'term-line';
      line.innerHTML = `<span class="term-prompt">$</span> <span>${termInputs[termIndex]}</span>`;
      termOutput.appendChild(line);

      // Keep only last 6 lines
      if (termOutput.children.length > 6) {
        termOutput.removeChild(termOutput.children[0]);
      }

      termIndex = (termIndex + 1) % termInputs.length;
    }, 3800);
  }

  // 3. Contact Form Submission
  const contactForm = document.getElementById('cyber-contact-form');
  const formStatus = document.getElementById('form-submit-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      if (formStatus) {
        formStatus.textContent = 'TRANSMITTING ENCRYPTED TELEMETRY...';
        formStatus.style.color = 'var(--neon-cyan)';
      }

      if (window.cyberAudio) window.cyberAudio.playClick();

      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = 'MESSAGE DISPATCHED SUCCESSFULLY ✓ (We will reach out to ' + emailInput.value + ')';
          formStatus.style.color = 'var(--neon-green)';
        }
        contactForm.reset();

        setTimeout(() => {
          if (formStatus) formStatus.textContent = '';
        }, 5000);
      }, 1200);
    });
  }

  // 4. Copy Direct Contact Triggers
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('haripriyap014@gmail.com').then(() => {
        const orig = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = 'COPIED EMAIL ✓';
        if (window.cyberAudio) window.cyberAudio.playClick();
        setTimeout(() => {
          copyEmailBtn.innerHTML = orig;
        }, 2500);
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+91 7815047615').then(() => {
        const orig = copyPhoneBtn.innerHTML;
        copyPhoneBtn.innerHTML = 'COPIED PHONE ✓';
        if (window.cyberAudio) window.cyberAudio.playClick();
        setTimeout(() => {
          copyPhoneBtn.innerHTML = orig;
        }, 2500);
      });
    });
  }

  // 5. Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    if (e.key === 'm' || e.key === 'M') {
      if (window.cyberAudio) window.cyberAudio.toggleMute();
    }
  });

  console.log("%c⚡ HARIPRIYA PATRA // 3D CYBERNETIC PORTFOLIO ONLINE", "color:#00f0ff; font-weight:bold; font-size:16px;");
});
