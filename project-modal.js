/**
 * INTERACTIVE PROJECT VAULT & MODAL INSPECTOR
 * Detailed technical breakdown, stack tags, live code preview & simulation
 */

const PROJECTS_DATA = {
  deepface: {
    title: "DeepFace Facial Emotion AI",
    category: "ARTIFICIAL INTELLIGENCE // COMPUTER VISION",
    subtitle: "Real-time emotion classification & facial landmark vectorization",
    imageSrc: "project-deepface.jpg",
    tags: ["Python", "DeepFace", "OpenCV", "Machine Learning", "Neural Nets"],
    description: "Built a Python-based computer vision application that captures video streams and static images, extracts facial landmark geometries, and performs deep neural classification to determine emotional expressions (Happy, Sad, Angry, Neutral) with high precision.",
    highlights: [
      "Convolutional Neural Network feature extraction for micro-expressions",
      "Real-time webcam pipeline processing at 30+ FPS with minimal CPU overhead",
      "Confidence score telemetry reporting and automated emotion distribution analysis"
    ],
    codeSnippet: `# DeepFace Emotion Classifier Pipeline
from deepface import DeepFace
import cv2

def analyze_facial_emotions(frame):
    predictions = DeepFace.analyze(
        img_path=frame,
        actions=['emotion'],
        enforce_detection=False
    )
    primary_emotion = predictions[0]['dominant_emotion']
    confidence = predictions[0]['emotion'][primary_emotion]
    return {"emotion": primary_emotion, "confidence": f"{confidence:.2f}%"}`
  },

  chatbot: {
    title: "NeuroChat Conversational Agent",
    category: "ARTIFICIAL INTELLIGENCE // NLP",
    subtitle: "Multi-turn conversational bot with context retention & intent mapping",
    imageSrc: "project-chatbot.jpg",
    tags: ["Python", "NLP", "Regex", "Conversational AI", "Dialogue Trees"],
    description: "Developed an intelligent conversational chatbot in Python equipped with intent recognition, entity extraction, and conversational memory, enabling responsive natural dialogues across diverse domain inquiries.",
    highlights: [
      "Custom tokenization and intent parsing architecture",
      "Dynamic session memory retaining context across multi-turn exchanges",
      "Modular knowledge base interface for extensible domain plug-ins"
    ],
    codeSnippet: `# NLP Conversational Agent Core
class NeuroChatBot:
    def __init__(self, model_profile="v1.4"):
        self.context_memory = []
        self.intent_registry = self.load_intents()

    def process_query(self, user_text):
        tokens = self.tokenize_input(user_text)
        intent = self.resolve_intent(tokens)
        response = self.generate_response(intent, context=self.context_memory)
        self.context_memory.append({"user": user_text, "bot": response})
        return response`
  },

  parking: {
    title: "SmartPark Matrix Management",
    category: "SYSTEMS ARCHITECTURE // AUTOMATION",
    subtitle: "Real-time vehicle entry/exit tracking and smart slot allocation algorithm",
    imageSrc: "project-parking.svg",
    tags: ["Python", "Data Structures", "Algorithms", "GUI", "Automation"],
    description: "An automated vehicle management system built in Python to supervise parking facility capacity, track timestamps for vehicle entry/exit, calculate dynamic tariffs, and optimize slot allocations in real time.",
    highlights: [
      "Efficient spatial hash allocation for instantaneous vacant slot routing",
      "Automated entry receipt generation with unique alphanumeric vehicle IDs",
      "Comprehensive parking analytics dashboard logging peak hour utilization"
    ],
    codeSnippet: `# Smart Slot Allocation Dispatcher
class SmartParkingSystem:
    def __init__(self, capacity=100):
        self.slots = {i: None for i in range(1, capacity + 1)}

    def park_vehicle(self, license_plate):
        for slot_id, occupied in self.slots.items():
            if occupied is None:
                self.slots[slot_id] = {"plate": license_plate, "timestamp": time.time()}
                return f"SUCCESS: Assigned to Slot {slot_id}"
        return "ERROR: Facility At Maximum Capacity"`
  },

  upiqr: {
    title: "UPI NeoPay QR Generator",
    category: "FINTECH // CRYPTOGRAPHY",
    subtitle: "Dynamic NPCI-compliant payment QR code synthesis with instant verification",
    imageSrc: "project-upiqr.svg",
    tags: ["Python", "QRCode Engine", "Pillow", "FinTech", "NPCI Protocol"],
    description: "A cryptographic UPI utility that transforms user-entered VPA identifiers into scannable high-density QR payment payloads compatible with PhonePe, Google Pay, and Paytm platforms.",
    highlights: [
      "NPCI URI specification compliance for zero-error payment routing",
      "Custom visual styling engine embedding branding logos and high-contrast styling",
      "Transaction amount pre-fill payload options for merchant checkout integration"
    ],
    codeSnippet: `# UPI Dynamic QR Generator
import qrcode

def generate_merchant_qr(vpa_id, merchant_name, amount=None):
    payload = f"upi://pay?pa={vpa_id}&pn={merchant_name}"
    if amount:
        payload += f"&am={amount}&cu=INR"
    
    qr = qrcode.QRCode(version=1, box_size=10, border=4)
    qr.add_data(payload)
    qr.make(fit=True)
    return qr.make_image(fill_color="#00f0ff", back_color="#050816")`
  },

  rentcalc: {
    title: "RentFlow Financial Matrix",
    category: "FINANCIAL UTILITY // ALGORITHMS",
    subtitle: "Automated lease, amenity & split-billing calculations",
    imageSrc: "project-rentcalc.svg",
    tags: ["Python", "Financial Math", "CLI", "Data Handling"],
    description: "A precision utility crafted in Python for multi-tenant lease math, utility expense aggregation, and granular split billing with itemized audit logs.",
    highlights: [
      "Customizable weighting for differential room and amenity utilization",
      "Instant summary breakdown exportable to formatted text receipts",
      "Robust input validation preventing arithmetic calculation anomalies"
    ],
    codeSnippet: `# Split Financial Rent Engine
def calculate_lease_breakdown(base_rent, utilities, occupants):
    total_cost = base_rent + sum(utilities.values())
    per_tenant_share = total_cost / len(occupants)
    return {
        "gross_total": f"₹{total_cost:,.2f}",
        "per_member": f"₹{per_tenant_share:,.2f}",
        "members": {m: per_tenant_share for m in occupants}
    }`
  },

  gamesuite: {
    title: "Python Cyber Utility & Game Suite",
    category: "PYTHON ENGINE // SOFTWARE TOOLS",
    subtitle: "Real-time digital clock, notepad editor, spell checker & Minimax arcade",
    imageSrc: "project-gamesuite.svg",
    tags: ["Python", "Tkinter", "Minimax AI", "String Algorithms", "File I/O"],
    description: "A rich software collection of independent Python desktop tools and game engines, featuring a real-time digital clock, Lexical Spell Checker using Levenshtein distance, a full-featured notepad text editor, and an invincible AI Tic-Tac-Toe powered by the Minimax algorithm.",
    highlights: [
      "Minimax game theory heuristic for optimal AI player moves",
      "Dynamic GUI event loop with low-latency Tkinter canvas rendering",
      "Levenshtein distance lexical matching engine for spelling suggestions"
    ],
    codeSnippet: `# Minimax Decision Algorithm for AI Tic-Tac-Toe
def minimax(board, depth, is_maximizing):
    score = evaluate_board(board)
    if score == 10 or score == -10: return score
    if not is_moves_left(board): return 0

    if is_maximizing:
        best = -1000
        for move in get_empty_cells(board):
            board[move] = 'X'
            best = max(best, minimax(board, depth + 1, False))
            board[move] = ' '
        return best
    else:
        best = 1000
        for move in get_empty_cells(board):
            board[move] = 'O'
            best = min(best, minimax(board, depth + 1, True))
            board[move] = ' '
        return best`
  }
};

class ProjectModalController {
  constructor() {
    this.backdrop = document.getElementById('project-modal-backdrop');
    this.closeBtn = document.getElementById('modal-close-btn');

    this.modalImg = document.getElementById('modal-media-img');
    this.modalTitle = document.getElementById('modal-title');
    this.modalCategory = document.getElementById('modal-category');
    this.modalSubtitle = document.getElementById('modal-subtitle');
    this.modalDesc = document.getElementById('modal-desc');
    this.modalTags = document.getElementById('modal-tags');
    this.modalHighlights = document.getElementById('modal-highlights');
    this.modalCode = document.getElementById('modal-code-snippet');
    this.copyCodeBtn = document.getElementById('modal-copy-code-btn');

    this.currentProjectKey = null;
    this.init();
  }

  init() {
    // Project Card Clicks
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-project-key');
        if (key && PROJECTS_DATA[key]) {
          this.open(key);
        }
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        if (e.target === this.backdrop) this.close();
      });
    }

    if (this.copyCodeBtn) {
      this.copyCodeBtn.addEventListener('click', () => this.copyCode());
    }

    // Category Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-tab-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.applyFilter(filter);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop && this.backdrop.classList.contains('active')) {
        this.close();
      }
    });
  }

  applyFilter(filter) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filter === 'all' || cardCategory === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  open(key) {
    const p = PROJECTS_DATA[key];
    if (!p || !this.backdrop) return;
    this.currentProjectKey = key;

    if (this.modalImg) this.modalImg.src = p.imageSrc;
    if (this.modalTitle) this.modalTitle.textContent = p.title;
    if (this.modalCategory) this.modalCategory.textContent = p.category;
    if (this.modalSubtitle) this.modalSubtitle.textContent = p.subtitle;
    if (this.modalDesc) this.modalDesc.textContent = p.description;

    if (this.modalTags) {
      this.modalTags.innerHTML = p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
    }

    if (this.modalHighlights) {
      this.modalHighlights.innerHTML = p.highlights.map(h => `<li class="timeline-point">${h}</li>`).join('');
    }

    if (this.modalCode) {
      this.modalCode.textContent = p.codeSnippet;
    }

    this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  close() {
    if (!this.backdrop) return;
    this.backdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  copyCode() {
    const code = this.modalCode ? this.modalCode.textContent : '';
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        if (this.copyCodeBtn) {
          const original = this.copyCodeBtn.textContent;
          this.copyCodeBtn.textContent = 'COPIED TO CLIPBOARD ✓';
          setTimeout(() => {
            if (this.copyCodeBtn) this.copyCodeBtn.textContent = original;
          }, 2000);
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.projectModal = new ProjectModalController();
});
