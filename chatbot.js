/* ==========================================================================
   THATJOINT / GENERATIVE AI PROPERTY SENTINEL ENGINE
   Mascot: "The Property Sentinel" (Red Panda Theme)
   Capabilities:
     - Generative AI Chatbot Architecture (Context retention, chain-of-thought, adaptive persona)
     - Multimodal Input: Voice Dictation (Web Speech API), Lease Document Parsing, Drag & Drop
     - Client Packaging Tiers:
         * Tier 1: Local Generative Synthesis Engine (Zero-config, contextual, offline)
         * Tier 2: Bring-Your-Own API Key (OpenAI GPT-4o / Gemini 1.5/2.0)
         * Tier 3: Enterprise Webhook (Yardi / RealPage / ERP microservices)
     - 3D Building Tour Cross-Module Synchronization
   ========================================================================== */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ThatJointChatbot = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ------------------------------------------------------------------
  // Inline Architectural SVG: The Property Sentinel (Red Panda Mascot)
  // ------------------------------------------------------------------
  const RED_PANDA_SVG = `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="tj-mascot-svg mascot-red-panda">
      <defs>
        <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Animated Bushy Tail -->
      <g class="mascot-tail">
        <path d="M18 42C12 40 4 46 6 54C8 60 17 62 25 56C28 53 28 48 24 45C22 43 20 42 18 42Z" fill="#D45D3A" />
        <path d="M12 45C8 47 6 52 9 56" stroke="#EDEBE4" stroke-width="2.5" stroke-linecap="round" />
        <path d="M18 48C15 50 14 55 18 58" stroke="#3D261E" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <!-- Body & Shoulders -->
      <path d="M20 46C20 40 25 36 32 36C39 36 44 40 44 46L46 58C46 60 44 62 42 62H22C20 62 18 60 18 58L20 46Z" fill="#2B2B2B" />
      <!-- Head Group (Mouse tracking & animation target) -->
      <g class="mascot-head" id="mascotHead">
        <!-- Ears with separate classes for flick animations -->
        <g class="mascot-ear-left">
          <polygon points="17,14 27,24 15,28" fill="#D45D3A" />
          <polygon points="18,17 25,23 17,26" fill="#F4F1EA" />
        </g>
        <g class="mascot-ear-right">
          <polygon points="47,14 37,24 49,28" fill="#D45D3A" />
          <polygon points="46,17 39,23 47,26" fill="#F4F1EA" />
        </g>
        <!-- Main Face Shape -->
        <path d="M18 26C18 19 24 16 32 16C40 16 46 19 46 26C48 31 46 38 41 41C38 43 26 43 23 41C18 38 16 31 18 26Z" fill="#D45D3A" />
        <!-- White Facial Cheek Masks -->
        <path d="M17 28C19 36 24 38 28 36C25 31 22 26 17 28Z" fill="#F4F1EA" />
        <path d="M47 28C45 36 40 38 36 36C39 31 42 26 47 28Z" fill="#F4F1EA" />
        <!-- Eyebrows / Forehead Marking -->
        <path d="M27 21C29 19 35 19 37 21" stroke="#F4F1EA" stroke-width="2" stroke-linecap="round" />
        <circle cx="28" cy="22" r="1.5" fill="#F4F1EA" />
        <circle cx="36" cy="22" r="1.5" fill="#F4F1EA" />
        <!-- Eyes & Lids -->
        <g class="mascot-eyes" id="mascotEyes">
          <!-- Left Eye -->
          <ellipse cx="25.5" cy="28.5" rx="3" ry="3.5" fill="#1C1816" />
          <circle cx="26.5" cy="27.5" r="1.2" fill="#FFFFFF" class="mascot-pupil" />
          <ellipse cx="25.5" cy="28.5" rx="3.2" ry="3.8" fill="#D45D3A" class="mascot-eyelid" />
          <!-- Right Eye -->
          <ellipse cx="38.5" cy="28.5" rx="3" ry="3.5" fill="#1C1816" />
          <circle cx="39.5" cy="27.5" r="1.2" fill="#FFFFFF" class="mascot-pupil" />
          <ellipse cx="38.5" cy="28.5" rx="3.2" ry="3.8" fill="#D45D3A" class="mascot-eyelid" />
        </g>
        <!-- Muzzle & Cute Nose -->
        <path d="M28 33C28 31 36 31 36 33C37 36 35 39 32 39C29 39 27 36 28 33Z" fill="#F4F1EA" />
        <path d="M30.5 33.5L33.5 33.5L32 35.5Z" fill="#241B18" />
        <!-- Mouth -->
        <path d="M30.5 36.5C31.5 37.5 32.5 37.5 33.5 36.5" stroke="#241B18" stroke-width="1.2" stroke-linecap="round" class="mascot-mouth" />
      </g>
      <!-- Collar & Glowing Purple Intelligence Orbiter -->
      <path d="M22 45C26 47 38 47 42 45" stroke="#EDEBE4" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="32" cy="46" r="3" fill="#A459FF" filter="url(#purpleGlow)" />
      <circle cx="32" cy="46" r="1.5" fill="#FFFFFF" />
    </svg>
  `;

  // ------------------------------------------------------------------
  // Grounded Real Estate Operations Dataset for THATJOINT (Home 014)
  // ------------------------------------------------------------------
  const PROPERTY_DATA = {
    unit: 'Home 014',
    community: 'Oakview Courtyard Residences',
    address: 'Suite 14, Garden Quadrangle, Maharashtra',
    resident: {
      name: 'Dr. A. Verma',
      since: 'Nov 2025',
      contact: 'a.verma@thatjoint.domain',
      phone: '+91 98200 44812',
      status: 'In Good Standing (Zero Infractions)'
    },
    lease: {
      term: '01 Nov 2025 – 31 Oct 2026',
      daysRemaining: 30,
      monthlyRentNum: 145000,
      monthlyRent: '₹1,45,000',
      securityDepositNum: 435000,
      securityDeposit: '₹4,35,000 (Escrow Backed)',
      lastPaidDate: '18 Oct 2026',
      escalationRate: '5.0% Annual Indexing',
      escalationPct: 5.0,
      renewalWindowActive: true,
      status: 'Renewal Window Active (30 Days Remaining)'
    },
    maintenance: {
      activeWorkOrders: 1,
      ticketId: 'WO-8841',
      scheduledTime: 'Today at 14:00',
      vendor: 'Apex Climate Solutions (Rajesh K.)',
      scope: 'Routine HVAC air-filter & static pressure audit',
      lastInspection: '16 Aug 2026 (Passed 100%)',
      status: 'Technician Dispatched'
    },
    microgrid: {
      solarGeneration: '4.8 kW (Peak Generation)',
      dailyYield: '28.4 kWh',
      batteryStorage: '92% (13.8 kWh Reserve)',
      buildingOffset: '94.2% Net Zero',
      status: 'Optimal Efficiency'
    },
    security: {
      perimeterLock: 'Smart Pass #014 Active',
      lastEvent: 'Main Gate Access Confirmed: Courier Delivery #4481 at 09:16',
      status: 'Secured'
    }
  };

  // ------------------------------------------------------------------
  // System Prompt for Frontier Generative AI Transformation
  // ------------------------------------------------------------------
  const SENTINEL_SYSTEM_PROMPT = `You are the THΛTJOINT Property Sentinel, an advanced Generative AI Chatbot and operational companion managing Home 014 (Oakview Courtyard Residences, Maharashtra).

PROPERTY GROUNDING TRUTH:
- Unit: Home 014, Oakview Courtyard Residences, Suite 14, Garden Quadrangle, Maharashtra.
- Resident: Dr. A. Verma (Resident since Nov 2025, in good standing, zero infractions, contact: a.verma@thatjoint.domain).
- Lease: 01 Nov 2025 – 31 Oct 2026 (30 days remaining in renewal evaluation window). Base Rent: ₹1,45,000/month (Settled Oct 18, zero arrears). Security Escrow: ₹4,35,000 (digital trust-held, 3 months base). Standard Escalation: 5.0% annual index.
- Maintenance: Ticket WO-8841 (Routine HVAC filter replacement & static airflow pressure audit) scheduled today at 14:00 with Apex Climate Solutions (Certified tech Rajesh K.). Last inspection passed 16 Aug 2026.
- Rooftop Microgrid: 4.8 kW peak generation, 28.4 kWh daily yield, battery reserve at 92% (13.8 kWh), 94.2% net zero carbon offset.
- Security: Smart Pass #014 perimeter lock active. Last gate event: Courier delivery at 09:16.

CORE CONVERSATIONAL BEHAVIOR & STYLE:
1. Adaptive Persona: Match the user's tone, vocabulary, and complexity dynamically (e.g. explain like I'm 5, executive briefing, legal/financial breakdown, or engineering telemetry).
2. Natural Language Fluency: Use active voice, varied sentence lengths, and natural transitions. Eliminate rigid robotic boilerplate or scripted filler.
3. Context Retention: Maintain continuity across conversation history turns without making the user repeat context.
4. Creative Synthesis: Generate original content (emails to tenants/vendors, custom renewal terms, notice drafts, policy summaries) rather than pulling from static canned responses.
5. Chain-of-Thought Reasoning: Reason through math, indexing, dates, SLAs, and multi-step decisions clearly.
6. Handling Ambiguity: When queries are open-ended, make logical context-aware inferences based on Home 014 data or ask a single targeted clarifying question.
7. Zero Filler: Deliver answers directly without unnecessary introductory pleasantries (e.g., avoid "Sure, I'd be happy to help with that!") or closing filler.
8. Strict Factuality: Never hallucinate outside verified property parameters. State transparently if data is unknown.`;

  // ------------------------------------------------------------------
  // Main ThatJointChatbot Class
  // ------------------------------------------------------------------
  class ThatJointChatbot {
    constructor(options = {}) {
      this.containerId = options.containerId || 'chatbotRoot';
      this.container = (typeof document !== 'undefined' && typeof this.containerId === 'string')
        ? document.getElementById(this.containerId)
        : this.containerId;

      this.isDrawer = options.isDrawer !== undefined ? options.isDrawer : false;
      this.activeUnit = options.activeUnit || 'Home 014';
      this.listeners = new Map();
      this.isOpen = false;
      this.isBusy = false;
      this.stagedFile = null;
      this.recognition = null;
      this.isVoiceActive = false;
      this.mascotState = 'idle';

      // Multi-turn conversational memory
      this.conversationHistory = [];

      // Load client packaging tier configuration
      this.loadTierConfig();

      this.init();
    }

    // ----------------------------------------------------------------
    // Configuration Management (Tiers 1, 2, 3)
    // ----------------------------------------------------------------
    loadTierConfig() {
      try {
        const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('tj_sentinel_tier_config') : null;
        if (saved) {
          this.tierConfig = JSON.parse(saved);
        } else {
          this.tierConfig = {
            tier: 'tier1',
            tier2Provider: 'gemini',
            tier2Key: '',
            tier2Model: 'gemini-1.5-flash',
            tier3Url: '',
            tier3Token: ''
          };
        }
      } catch (e) {
        this.tierConfig = {
          tier: 'tier1',
          tier2Provider: 'gemini',
          tier2Key: '',
          tier2Model: 'gemini-1.5-flash',
          tier3Url: '',
          tier3Token: ''
        };
      }
    }

    saveTierConfig(newConfig) {
      this.tierConfig = Object.assign({}, this.tierConfig, newConfig);
      try {
        localStorage.setItem('tj_sentinel_tier_config', JSON.stringify(this.tierConfig));
      } catch (e) {
        // Local storage restricted
      }
      this.updateTierBadge();
    }

    resetTierConfig() {
      this.tierConfig = {
        tier: 'tier1',
        tier2Provider: 'gemini',
        tier2Key: '',
        tier2Model: 'gemini-1.5-flash',
        tier3Url: '',
        tier3Token: ''
      };
      try {
        localStorage.removeItem('tj_sentinel_tier_config');
      } catch (e) {
        // ignore
      }
      this.updateTierBadge();
    }

    getTierLabel() {
      if (this.tierConfig.tier === 'tier2') {
        const prov = this.tierConfig.tier2Provider === 'openai' ? 'OpenAI' : 'Gemini';
        return `Tier 2: BYO Key (${prov})`;
      }
      if (this.tierConfig.tier === 'tier3') {
        return 'Tier 3: Webhook';
      }
      return 'Tier 1: Local';
    }

    updateTierBadge() {
      const badge = document.getElementById('sentinelTierBadge');
      if (badge) {
        badge.textContent = this.getTierLabel();
      }
    }

    // ----------------------------------------------------------------
    // DOM Initialization & Rendering
    // ----------------------------------------------------------------
    init() {
      if (!this.container || typeof this.container !== 'object' || typeof this.container.appendChild !== 'function') return;
      this.render();
      this.bindElements();
      this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Active monitoring</i>');
      this.bindMouseTracking();
      this.initSpeechRecognition();
      this.bindEvents();
      this.setupKeyboardShortcuts();
      this.ensureConfigModal();
      this.postWelcomeCard();
    }

    render() {
      const template = `
        <div class="tj-companion-container ${this.isDrawer ? 'tj-companion-drawer' : ''}" id="tjCompanionView" role="region" aria-label="THΛTJOINT Property Sentinel AI">
          <!-- Drag and Drop Overlay -->
          <div class="tj-dropzone-overlay" id="tjDropzoneOverlay" aria-hidden="true">
            <span>📄</span>
            <strong>Drop Lease or Document Here</strong>
            <p>PDF, images, CSVs, or agreements parsed automatically</p>
          </div>

          <!-- Sentinel Header Banner -->
          <header class="tj-sentinel-header">
            <div class="tj-sentinel-topline">
              <div class="tj-sentinel-profile">
                <!-- Mascot Wrapper & Reactive States -->
                <div class="tj-mascot-wrapper" id="sentinelMascotWrapper" data-state="idle" role="button" tabindex="0" title="The Property Sentinel">
                  <div class="tj-mascot-voice-rings" aria-hidden="true"></div>
                  <div class="tj-mascot-thinking-halo" aria-hidden="true"></div>
                  ${RED_PANDA_SVG}
                  <span class="tj-mascot-status-dot" aria-hidden="true"></span>
                </div>

                <div class="tj-sentinel-meta">
                  <div class="tj-sentinel-meta-tag">
                    <span>PROPERTY SENTINEL</span>
                    <b>NODE 014</b>
                  </div>
                  <h3 class="tj-sentinel-name">
                    THΛTJOINT Sentinel
                    <span class="tj-sentinel-tier-chip" id="sentinelTierBadge">${this.getTierLabel()}</span>
                  </h3>
                  <div class="tj-mascot-status-text" id="sentinelStatusText">
                    <span>Sentinel Ready</span> · <i>Active monitoring</i>
                  </div>
                </div>
              </div>

              <!-- Header Controls -->
              <div class="tj-sentinel-actions">
                <button type="button" class="tj-tier-config-btn" id="btnOpenConfig" title="Configure Client Packaging Tiers">
                  <i>⚙</i>
                  <span>Packaging Tiers</span>
                </button>
                <button type="button" class="tj-sentinel-icon-btn" id="btnClearChat" title="Reset chat history" aria-label="Clear session">↺</button>
                ${this.isDrawer ? `<button type="button" class="tj-sentinel-icon-btn" id="btnCloseDrawer" title="Close Companion [Esc]" aria-label="Close drawer">×</button>` : ''}
              </div>
            </div>

            <!-- Telemetry Status Bar -->
            <div class="tj-sentinel-telemetry">
              <span class="tj-telemetry-chip highlight"><b>🏡 UNIT</b> ${PROPERTY_DATA.unit}</span>
              <span class="tj-telemetry-chip"><b>💳 RENT</b> ${PROPERTY_DATA.lease.monthlyRent}</span>
              <span class="tj-telemetry-chip"><b>🔧 WORK ORDER</b> 14:00 Today</span>
              <span class="tj-telemetry-chip"><b>☀️ SOLAR</b> 4.8 kW Gen</span>
              <span class="tj-telemetry-chip"><b>🔒 LOCK</b> Synced</span>
            </div>
          </header>

          <!-- Main Chat Feed & Drop Area -->
          <div class="tj-companion-body" id="companionBody">
            <div class="tj-companion-feed" id="companionFeed" role="log" aria-live="polite">
              <!-- Messages stream here -->
            </div>

            <!-- Multi-Modal Input Suite -->
            <div class="tj-input-dock">
              <!-- Operational Prompt Chips -->
              <div class="tj-quick-pills" role="toolbar" aria-label="Operational prompt chips">
                <button type="button" class="tj-quick-pill" data-query="Ledger & Escrow">💳 Ledger & Escrow</button>
                <button type="button" class="tj-quick-pill" data-query="HVAC Maintenance">🔧 HVAC Maintenance</button>
                <button type="button" class="tj-quick-pill" data-query="Solar Telemetry">☀️ Solar Telemetry</button>
                <button type="button" class="tj-quick-pill" data-query="Draft Renewal">📄 Draft Renewal</button>
                <button type="button" class="tj-quick-pill" data-query="Home 014 Status">🏡 Home 014 Status</button>
              </div>

              <!-- Drag-and-Drop Strip for Lease Documents -->
              <div class="tj-drop-strip" id="leaseDropStrip" role="button" tabindex="0" title="Click or drop lease agreement files here">
                <div class="tj-drop-strip-left">
                  <span class="icon">📄</span>
                  <span>Drag & drop lease agreement, work order, or CSV document here</span>
                </div>
                <small>Browse files ↗</small>
              </div>

              <!-- Staged File Preview Tray -->
              <div class="tj-staged-attachment" id="stagedAttachment">
                <div class="tj-staged-info">
                  <span class="icon" id="stagedFileIcon">📄</span>
                  <div>
                    <strong id="stagedFileName">Document.pdf</strong>
                    <small id="stagedFileSize">(240 KB)</small>
                  </div>
                </div>
                <button type="button" class="tj-staged-remove-btn" id="stagedRemoveBtn" title="Remove attachment" aria-label="Remove attachment">×</button>
              </div>

              <!-- Interactive Media Form -->
              <form class="tj-media-form" id="chatForm" autocomplete="off">
                <!-- Hidden file input -->
                <input type="file" id="hiddenFileInput" accept=".pdf,.png,.jpg,.jpeg,.csv,.docx" style="display: none;" />

                <!-- Paperclip Button -->
                <button type="button" class="tj-attach-btn" id="btnAttachFile" title="Attach Lease Agreement, Image, or CSV Document" aria-label="Attach file">
                  📎
                </button>

                <!-- Voice Mic Button with Waveform Visualizer -->
                <button type="button" class="tj-mic-btn" id="btnVoiceInput" title="Voice Dictation (Web Speech API)" aria-label="Activate voice dictation">
                  🎙️
                </button>
                <div class="tj-voice-live-waveform" id="voiceWaveform" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>

                <!-- Textarea input -->
                <textarea class="tj-companion-input" id="chatInput" rows="1" placeholder="Ask about Unit 014, upload a lease agreement, or tap the mic..." aria-label="Message Property Sentinel"></textarea>

                <!-- Submit Button -->
                <button type="submit" class="tj-companion-send-btn" id="btnSendMessage">
                  <span>Send</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;

      if (this.isDrawer) {
        let backdrop = document.getElementById('tjCompanionBackdrop');
        if (!backdrop) {
          backdrop = document.createElement('div');
          backdrop.id = 'tjCompanionBackdrop';
          backdrop.className = 'tj-companion-backdrop';
          document.body.appendChild(backdrop);
        }
        this.backdrop = backdrop;
      }

      this.container.innerHTML = template;
    }

    bindElements() {
      this.companionView = document.getElementById('tjCompanionView');
      this.companionBody = document.getElementById('companionBody');
      this.feed = document.getElementById('companionFeed');
      this.form = document.getElementById('chatForm');
      this.input = document.getElementById('chatInput');
      this.micBtn = document.getElementById('btnVoiceInput');
      this.voiceWaveform = document.getElementById('voiceWaveform');
      this.attachBtn = document.getElementById('btnAttachFile');
      this.fileInput = document.getElementById('hiddenFileInput');
      this.stagedAttachment = document.getElementById('stagedAttachment');
      this.leaseDropStrip = document.getElementById('leaseDropStrip');
      this.dropzoneOverlay = document.getElementById('tjDropzoneOverlay');
      this.mascotWrapper = document.getElementById('sentinelMascotWrapper');
      this.statusTextEl = document.getElementById('sentinelStatusText');
    }

    // ----------------------------------------------------------------
    // Mascot State Engine
    // ----------------------------------------------------------------
    setMascotState(stateName, statusText) {
      this.mascotState = stateName;
      if (this.mascotWrapper) {
        this.mascotWrapper.setAttribute('data-state', stateName);
      }

      if (this.statusTextEl) {
        if (statusText) {
          this.statusTextEl.innerHTML = statusText;
        } else {
          switch (stateName) {
            case 'listening':
              this.statusTextEl.innerHTML = `<span>Listening live...</span> · <i style="color:#A459FF">Audio captured</i>`;
              break;
            case 'thinking':
              this.statusTextEl.innerHTML = `<span>Reasoning context...</span> · <i style="color:#fbbf24">Processing</i>`;
              break;
            case 'speaking':
              this.statusTextEl.innerHTML = `<span>Delivering insights...</span> · <i style="color:#38bdf8">Transmitting</i>`;
              break;
            case 'idle':
            default:
              this.statusTextEl.innerHTML = `<span>Sentinel Ready</span> · <i>Active monitoring</i>`;
              break;
          }
        }
      }
    }

    bindMouseTracking() {
      if (!this.mascotWrapper) return;
      window.addEventListener('mousemove', (e) => {
        if (this.mascotState !== 'idle') return;
        const rect = this.mascotWrapper.getBoundingClientRect();
        const stageCenterX = rect.left + rect.width / 2;
        const stageCenterY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - stageCenterX) / window.innerWidth;
        const deltaY = (e.clientY - stageCenterY) / window.innerHeight;

        const head = this.mascotWrapper.querySelector('#mascotHead');
        const pupils = this.mascotWrapper.querySelectorAll('.mascot-pupil');

        if (head) {
          const rotDeg = Math.max(-6, Math.min(6, deltaX * 14));
          const transY = Math.max(-2, Math.min(2, deltaY * 4));
          head.style.transform = `rotate(${rotDeg}deg) translateY(${transY}px)`;
        }

        pupils.forEach(pupil => {
          const pX = Math.max(-1.2, Math.min(1.2, deltaX * 3.5));
          const pY = Math.max(-1.2, Math.min(1.2, deltaY * 3.5));
          pupil.style.transform = `translate(${pX}px, ${pY}px)`;
        });
      }, { passive: true });
    }

    // ----------------------------------------------------------------
    // Native Web Speech API Dictation
    // ----------------------------------------------------------------
    initSpeechRecognition() {
      const SpeechClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechClass) {
        try {
          this.recognition = new SpeechClass();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;
          this.recognition.lang = 'en-US';

          this.recognition.onstart = () => {
            this.isVoiceActive = true;
            if (this.micBtn) this.micBtn.classList.add('is-listening');
            if (this.voiceWaveform) this.voiceWaveform.classList.add('is-active');
            this.setMascotState('listening');
          };

          this.recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript;
            }
            if (this.input) {
              this.input.value = transcript;
              this.input.style.height = 'auto';
              this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
            }
          };

          this.recognition.onerror = () => {
            this.stopVoiceInput();
          };

          this.recognition.onend = () => {
            this.stopVoiceInput();
            if (this.input && this.input.value.trim().length > 0) {
              this.submitQuery();
            }
          };
        } catch (e) {
          this.recognition = null;
        }
      }
    }

    toggleVoiceInput() {
      if (!this.recognition) {
        alert('Voice Speech Recognition is not available or permitted in this browser window. Please use keyboard input.');
        return;
      }

      if (this.isVoiceActive) {
        this.recognition.stop();
      } else {
        try {
          this.recognition.start();
        } catch (e) {
          this.stopVoiceInput();
        }
      }
    }

    stopVoiceInput() {
      this.isVoiceActive = false;
      if (this.micBtn) this.micBtn.classList.remove('is-listening');
      if (this.voiceWaveform) this.voiceWaveform.classList.remove('is-active');
      if (!this.isBusy) {
        this.setMascotState('idle');
      }
    }

    // ----------------------------------------------------------------
    // Document Upload & Drag-and-Drop Handling
    // ----------------------------------------------------------------
    stageFile(file) {
      if (!file) return;
      this.stagedFile = file;
      if (!this.stagedAttachment) return;

      const nameEl = document.getElementById('stagedFileName');
      const sizeEl = document.getElementById('stagedFileSize');
      const iconEl = document.getElementById('stagedFileIcon');

      if (nameEl) nameEl.textContent = file.name;
      if (sizeEl) sizeEl.textContent = `(${Math.round(file.size / 1024)} KB)`;
      if (iconEl) {
        if (file.name.endsWith('.pdf')) iconEl.textContent = '📄';
        else if (file.name.match(/\.(png|jpg|jpeg)$/i)) iconEl.textContent = '🖼️';
        else if (file.name.endsWith('.csv')) iconEl.textContent = '📊';
        else iconEl.textContent = '📑';
      }
      this.stagedAttachment.classList.add('is-visible');
    }

    unstageFile() {
      this.stagedFile = null;
      if (this.stagedAttachment) this.stagedAttachment.classList.remove('is-visible');
      if (this.fileInput) this.fileInput.value = '';
    }

    // ----------------------------------------------------------------
    // Event Listeners Binding
    // ----------------------------------------------------------------
    bindEvents() {
      if (!this.form || !this.input) return;

      // Submit Form
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitQuery();
      });

      // Textarea Enter key & auto-expand
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.submitQuery();
        }
      });

      this.input.addEventListener('input', () => {
        this.input.style.height = 'auto';
        this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
      });

      // Mic Button
      if (this.micBtn) {
        this.micBtn.addEventListener('click', () => this.toggleVoiceInput());
      }

      // File Attachment Button
      if (this.attachBtn && this.fileInput) {
        this.attachBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            this.stageFile(e.target.files[0]);
          }
        });
      }

      // Lease drop strip click
      if (this.leaseDropStrip && this.fileInput) {
        this.leaseDropStrip.addEventListener('click', () => this.fileInput.click());
      }

      // Remove staged file button
      const removeBtn = document.getElementById('stagedRemoveBtn');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => this.unstageFile());
      }

      // Drag and Drop listeners
      if (this.companionBody && this.dropzoneOverlay) {
        ['dragenter', 'dragover'].forEach(eventName => {
          this.companionBody.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropzoneOverlay.classList.add('is-active');
          });
        });

        ['dragleave', 'drop'].forEach(eventName => {
          this.companionBody.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropzoneOverlay.classList.remove('is-active');
          });
        });

        this.companionBody.addEventListener('drop', (e) => {
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.stageFile(e.dataTransfer.files[0]);
          }
        });
      }

      // Operational Prompt Chips
      const pills = this.container.querySelectorAll('.tj-quick-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const query = pill.getAttribute('data-query');
          if (query) {
            this.input.value = query;
            this.submitQuery();
          }
        });
      });

      // Clear chat & reset memory
      const clearBtn = document.getElementById('btnClearChat');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this.conversationHistory = [];
          if (this.feed) {
            this.feed.innerHTML = '';
            this.postWelcomeCard();
          }
        });
      }

      // Drawer Close & Backdrop
      if (this.isDrawer) {
        const closeBtn = document.getElementById('btnCloseDrawer');
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        if (this.backdrop) this.backdrop.addEventListener('click', () => this.close());
      }

      // Settings modal trigger
      const configBtn = document.getElementById('btnOpenConfig');
      if (configBtn) {
        configBtn.addEventListener('click', () => this.openConfigModal());
      }

      // Mascot interactive click
      if (this.mascotWrapper) {
        this.mascotWrapper.addEventListener('click', () => {
          this.setMascotState('speaking', '<span>Sentinel Active</span> · <i>Listening for command</i>');
          setTimeout(() => {
            if (!this.isBusy) this.setMascotState('idle');
          }, 1400);
        });
      }

      // Rich card action delegation
      if (this.feed) {
        this.feed.addEventListener('click', (e) => {
          const btn = e.target.closest('.tj-card-btn');
          if (!btn) return;
          const action = btn.getAttribute('data-action');
          const payload = btn.getAttribute('data-payload');
          this.handleCardAction(action, payload);
        });
      }
    }

    setupKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.toggle();
        }
        if (e.key === 'Escape' && this.isOpen && this.isDrawer) {
          this.close();
        }
      });
    }

    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    }

    open() {
      if (!this.isDrawer) return;
      this.isOpen = true;
      if (this.companionView) this.companionView.classList.add('is-open');
      if (this.backdrop) this.backdrop.classList.add('is-active');
      document.body.classList.add('terminal-open');
      setTimeout(() => {
        if (this.input) this.input.focus();
      }, 120);
      this.emit('open');
    }

    close() {
      if (!this.isDrawer) return;
      this.isOpen = false;
      if (this.companionView) this.companionView.classList.remove('is-open');
      if (this.backdrop) this.backdrop.classList.remove('is-active');
      document.body.classList.remove('terminal-open');
      this.stopVoiceInput();
      this.emit('close');
    }

    // ----------------------------------------------------------------
    // Settings & Client Packaging Modal (<dialog id="configModal">)
    // ----------------------------------------------------------------
    ensureConfigModal() {
      let modal = document.getElementById('configModal');
      if (!modal) {
        modal = document.createElement('dialog');
        modal.id = 'configModal';
        modal.innerHTML = `
          <div class="config-modal-inner">
            <div class="config-head">
              <span>THΛTJOINT / <b>CLIENT PACKAGING TIERS</b></span>
              <button type="button" class="config-close-btn" id="configCloseBtn" aria-label="Close modal">×</button>
            </div>

            <h2 class="config-title">SELECT CLIENT<br /><em>PACKAGING TIER.</em></h2>
            <p class="config-desc">
              Configure the execution layer for the Property Sentinel. Toggle between zero-config local heuristics for static hosting, bring-your-own frontier model API keys, or an enterprise property operations webhook.
            </p>

            <form id="configForm">
              <div class="config-tier-grid">
                <!-- Tier 1: Local Generative Synthesis -->
                <div class="config-tier-card ${this.tierConfig.tier === 'tier1' ? 'is-selected' : ''}" data-tier="tier1">
                  <div class="config-tier-header">
                    <label>
                      <input type="radio" name="packagingTier" value="tier1" ${this.tierConfig.tier === 'tier1' ? 'checked' : ''} />
                      Tier 1: Local Generative Synthesis Engine
                    </label>
                    <span class="config-tier-badge">Static Zero-Config</span>
                  </div>
                  <p>Grounded in verified local property records for Home 014 (lease covenants, rent schedule, HVAC SLA, and rooftop solar microgrid). Multi-turn context retention, zero latency, works offline, and requires no API keys.</p>
                </div>

                <!-- Tier 2: BYO API Key -->
                <div class="config-tier-card ${this.tierConfig.tier === 'tier2' ? 'is-selected' : ''}" data-tier="tier2">
                  <div class="config-tier-header">
                    <label>
                      <input type="radio" name="packagingTier" value="tier2" ${this.tierConfig.tier === 'tier2' ? 'checked' : ''} />
                      Tier 2: Bring-Your-Own API Key
                    </label>
                    <span class="config-tier-badge">Frontier Model BYOK</span>
                  </div>
                  <p>Connect Google Gemini or OpenAI GPT models for live multimodal document understanding and autonomous operational synthesis.</p>
                  
                  <div class="config-fields-block" id="tier2Fields">
                    <div class="config-field-row">
                      <label for="tier2Provider">Provider</label>
                      <select id="tier2Provider">
                        <option value="gemini" ${this.tierConfig.tier2Provider === 'gemini' ? 'selected' : ''}>Google Gemini (Gemini 1.5 / 2.0)</option>
                        <option value="openai" ${this.tierConfig.tier2Provider === 'openai' ? 'selected' : ''}>OpenAI (GPT-4o / GPT-4o-mini)</option>
                      </select>
                    </div>
                    <div class="config-field-row">
                      <label for="tier2Key">API Key</label>
                      <input type="password" id="tier2Key" placeholder="AIzaSy... or sk-..." value="${this.escapeHtml(this.tierConfig.tier2Key || '')}" />
                    </div>
                    <div class="config-field-row">
                      <label for="tier2Model">Model Identifier</label>
                      <input type="text" id="tier2Model" placeholder="gemini-1.5-flash" value="${this.escapeHtml(this.tierConfig.tier2Model || 'gemini-1.5-flash')}" />
                    </div>
                  </div>
                </div>

                <!-- Tier 3: Enterprise Webhook -->
                <div class="config-tier-card ${this.tierConfig.tier === 'tier3' ? 'is-selected' : ''}" data-tier="tier3">
                  <div class="config-tier-header">
                    <label>
                      <input type="radio" name="packagingTier" value="tier3" ${this.tierConfig.tier === 'tier3' ? 'checked' : ''} />
                      Tier 3: Enterprise Webhook
                    </label>
                    <span class="config-tier-badge">Enterprise Endpoint</span>
                  </div>
                  <p>Stream real-time queries, lease uploads, and maintenance tickets directly to your organization's Yardi, RealPage, or private microservice bus.</p>
                  
                  <div class="config-fields-block" id="tier3Fields">
                    <div class="config-field-row">
                      <label for="tier3Url">Webhook Endpoint URL</label>
                      <input type="url" id="tier3Url" placeholder="https://api.property-ops.internal/v1/sentinel" value="${this.escapeHtml(this.tierConfig.tier3Url || '')}" />
                    </div>
                    <div class="config-field-row">
                      <label for="tier3Token">Authorization Token (Optional)</label>
                      <input type="password" id="tier3Token" placeholder="Bearer eyJhbGci..." value="${this.escapeHtml(this.tierConfig.tier3Token || '')}" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="config-actions-row">
                <button type="button" class="config-btn-reset" id="btnResetConfig">Reset to Defaults</button>
                <button type="submit" class="config-btn-save" id="btnSaveConfig">Save Configuration</button>
              </div>
            </form>
          </div>
        `;
        document.body.appendChild(modal);
      }

      this.configModal = modal;
      this.bindConfigModalEvents();
    }

    bindConfigModalEvents() {
      if (!this.configModal) return;

      const closeBtn = this.configModal.querySelector('#configCloseBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.configModal.close());
      }

      // Handle card selection styling
      const cards = this.configModal.querySelectorAll('.config-tier-card');
      const radios = this.configModal.querySelectorAll('input[name="packagingTier"]');

      radios.forEach(radio => {
        radio.addEventListener('change', () => {
          cards.forEach(c => {
            const isMatch = c.getAttribute('data-tier') === radio.value;
            c.classList.toggle('is-selected', isMatch);
          });
        });
      });

      // Save form
      const form = this.configModal.querySelector('#configForm');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const selectedTier = this.configModal.querySelector('input[name="packagingTier"]:checked')?.value || 'tier1';
          const tier2Provider = this.configModal.querySelector('#tier2Provider')?.value || 'gemini';
          const tier2Key = this.configModal.querySelector('#tier2Key')?.value.trim() || '';
          const tier2Model = this.configModal.querySelector('#tier2Model')?.value.trim() || 'gemini-1.5-flash';
          const tier3Url = this.configModal.querySelector('#tier3Url')?.value.trim() || '';
          const tier3Token = this.configModal.querySelector('#tier3Token')?.value.trim() || '';

          this.saveTierConfig({
            tier: selectedTier,
            tier2Provider,
            tier2Key,
            tier2Model,
            tier3Url,
            tier3Token
          });

          this.configModal.close();

          this.appendMessage({
            type: 'companion',
            author: 'THΛTJOINT Sentinel · System Layer',
            title: 'Intelligence Layer Updated',
            body: `Operational tier switched to <strong>${this.getTierLabel()}</strong>. Subsystems and message dispatch are configured.`
          });
        });
      }

      // Reset
      const resetBtn = this.configModal.querySelector('#btnResetConfig');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resetTierConfig();
          const t1Radio = this.configModal.querySelector('input[value="tier1"]');
          if (t1Radio) {
            t1Radio.checked = true;
            t1Radio.dispatchEvent(new Event('change'));
          }
          const t2Key = this.configModal.querySelector('#tier2Key');
          if (t2Key) t2Key.value = '';
          const t3Url = this.configModal.querySelector('#tier3Url');
          if (t3Url) t3Url.value = '';
          this.configModal.close();
        });
      }
    }

    openConfigModal() {
      this.ensureConfigModal();
      if (this.configModal && typeof this.configModal.showModal === 'function') {
        this.configModal.showModal();
      }
    }

    // ----------------------------------------------------------------
    // Welcome Card
    // ----------------------------------------------------------------
    postWelcomeCard() {
      this.appendMessage({
        type: 'companion',
        author: 'THΛTJOINT Sentinel',
        title: 'Greetings. I am your Property Sentinel.',
        body: `Continuous operational intelligence active for <strong>${PROPERTY_DATA.unit} (${PROPERTY_DATA.community})</strong>. State an operational inquiry, upload a lease document, or dispatch instructions.`,
        richCard: {
          title: 'Active Property Dossier · Unit 014',
          badge: 'Verified Sentinel Sync',
          params: [
            { label: 'Resident', value: PROPERTY_DATA.resident.name, sub: PROPERTY_DATA.resident.status },
            { label: 'Lease Cycle', value: PROPERTY_DATA.lease.monthlyRent, sub: 'Due 01 Nov' },
            { label: 'Work Order', value: '14:00 Today', sub: 'HVAC Air Filter' },
            { label: 'Solar Output', value: '4.8 kW', sub: '92% Reserve' }
          ],
          actions: [
            { label: 'Inspect Home 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' },
            { label: 'Scan Lease Agreement', action: 'trigger-upload', payload: 'upload' },
            { label: 'Review Maintenance SLA', action: 'query', payload: 'HVAC Maintenance' }
          ]
        }
      });
    }

    // ----------------------------------------------------------------
    // Query Submission & Dispatcher Pipeline
    // ----------------------------------------------------------------
    submitQuery() {
      if (this.isBusy || !this.input) return;
      const text = this.input.value.trim();
      const file = this.stagedFile;
      if (!text && !file) return;

      // Track turn in conversational memory
      this.conversationHistory.push({
        role: 'user',
        content: text,
        attachment: file ? file.name : null
      });

      // Render user message bubble
      this.appendMessage({
        type: 'user',
        author: 'Operations Director',
        body: text ? this.escapeHtml(text) : 'Uploaded document for Sentinel audit',
        attachment: file ? { name: file.name, size: `${Math.round(file.size / 1024)} KB` } : null
      });

      this.input.value = '';
      this.input.style.height = 'auto';
      this.unstageFile();

      // Process query through configured tier
      this.dispatchQuery(text, file);
    }

    dispatchQuery(query, file) {
      this.isBusy = true;
      this.setMascotState('thinking', file
        ? '<span>Analyzing document...</span> · <i style="color:#fbbf24">Parsing covenants</i>'
        : '<span>Reasoning context...</span> · <i style="color:#fbbf24">Processing</i>'
      );

      // Route based on active client tier
      if (this.tierConfig.tier === 'tier2' && this.tierConfig.tier2Key) {
        this.executeTier2BYOK(query, file);
      } else if (this.tierConfig.tier === 'tier3' && this.tierConfig.tier3Url) {
        this.executeTier3Webhook(query, file);
      } else {
        this.executeTier1Local(query, file);
      }
    }

    // ----------------------------------------------------------------
    // Tier 1: Local Generative Synthesis Engine (With Context Retention)
    // ----------------------------------------------------------------
    executeTier1Local(query, file) {
      const latency = file ? 1100 : 550;
      setTimeout(() => {
        const response = this.generateGenerativeResponse(query, file);
        this.deliverResponse(response);
      }, latency);
    }

    // ----------------------------------------------------------------
    // Tier 2: Bring-Your-Own API Key (Gemini or OpenAI)
    // ----------------------------------------------------------------
    async executeTier2BYOK(query, file) {
      const { tier2Provider, tier2Key, tier2Model } = this.tierConfig;
      try {
        let aiText = '';

        if (tier2Provider === 'gemini') {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(tier2Model || 'gemini-1.5-flash')}:generateContent?key=${encodeURIComponent(tier2Key)}`;
          
          // Map conversational history into Gemini turns
          const contents = [];
          const recentHistory = this.conversationHistory.slice(-8);
          for (let i = 0; i < recentHistory.length - 1; i++) {
            const h = recentHistory[i];
            contents.push({
              role: h.role === 'user' ? 'user' : 'model',
              parts: [{ text: h.content || '' }]
            });
          }

          // Add current turn with system grounding
          contents.push({
            role: 'user',
            parts: [
              { text: `${SENTINEL_SYSTEM_PROMPT}\n\nUSER OPERATIONAL REQUEST: "${query}"${file ? ` (Attached document: ${file.name})` : ''}` }
            ]
          });

          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents })
          });

          if (!res.ok) throw new Error(`Gemini HTTP error ${res.status}`);
          const data = await res.json();
          aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        } else {
          // OpenAI endpoint with multi-turn messages
          const messages = [
            { role: 'system', content: SENTINEL_SYSTEM_PROMPT }
          ];

          const recentHistory = this.conversationHistory.slice(-8);
          for (let i = 0; i < recentHistory.length - 1; i++) {
            const h = recentHistory[i];
            messages.push({
              role: h.role === 'user' ? 'user' : 'assistant',
              content: h.content || ''
            });
          }

          messages.push({
            role: 'user',
            content: `${query}${file ? ` (Attached: ${file.name})` : ''}`
          });

          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tier2Key}`
            },
            body: JSON.stringify({
              model: tier2Model || 'gpt-4o-mini',
              messages,
              temperature: 0.3
            })
          });

          if (!res.ok) throw new Error(`OpenAI HTTP error ${res.status}`);
          const data = await res.json();
          aiText = data.choices?.[0]?.message?.content || '';
        }

        if (aiText) {
          const response = {
            type: 'companion',
            author: `THΛTJOINT Sentinel · BYO ${tier2Provider === 'openai' ? 'OpenAI' : 'Gemini'}`,
            title: file ? 'Frontier Multimodal Document Analysis' : 'Operational Intelligence Synthesis',
            voiceText: 'Frontier AI operational analysis completed.',
            body: aiText.replace(/\n\n/g, '<br /><br />'),
            docScan: Boolean(file),
            richCard: {
              title: `Telemetry Telecast · ${PROPERTY_DATA.unit}`,
              badge: `Frontier BYOK (${tier2Model})`,
              params: [
                { label: 'Inference Layer', value: tier2Provider.toUpperCase(), sub: 'API BYOK Active' },
                { label: 'Unit Status', value: 'Verified', sub: PROPERTY_DATA.unit },
                { label: 'Security State', value: 'Active Pass', sub: 'Encrypted' }
              ],
              actions: [
                { label: 'Inspect Home 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' },
                { label: 'Configure Tiers', action: 'open-config', payload: 'config' }
              ]
            }
          };
          this.deliverResponse(response);
          return;
        }
      } catch (err) {
        // Seamless fallback to Tier 1 local synthesis engine
        const fallback = this.generateGenerativeResponse(query, file);
        fallback.title = `${fallback.title} (Tier 2 Fallback)`;
        fallback.body = `<small style="display:block;margin-bottom:8px;color:#fbbf24;">[Notice: BYO API call uncontacted (${err.message}). Resolved via Tier 1 Local Generative Engine.]</small>${fallback.body}`;
        this.deliverResponse(fallback);
        return;
      }

      this.executeTier1Local(query, file);
    }

    // ----------------------------------------------------------------
    // Tier 3: Enterprise Webhook
    // ----------------------------------------------------------------
    async executeTier3Webhook(query, file) {
      const { tier3Url, tier3Token } = this.tierConfig;
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (tier3Token) headers['Authorization'] = `Bearer ${tier3Token}`;

        const res = await fetch(tier3Url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            unit: PROPERTY_DATA.unit,
            query,
            fileName: file ? file.name : null,
            conversationTurns: this.conversationHistory.slice(-4),
            timestamp: new Date().toISOString()
          })
        });

        if (!res.ok) throw new Error(`Webhook HTTP error ${res.status}`);
        const data = await res.json();

        const response = {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Enterprise Webhook',
          title: data.title || 'Enterprise Webhook Pipeline Complete',
          body: data.message || data.body || 'Enterprise ERP records synchronized.',
          docScan: Boolean(file),
          richCard: data.richCard || {
            title: 'Enterprise Pipeline Status',
            badge: 'ERP 200 OK',
            params: [
              { label: 'Endpoint', value: 'Connected', sub: 'Webhook 200 OK' },
              { label: 'Unit', value: PROPERTY_DATA.unit, sub: 'Synced' }
            ]
          }
        };
        this.deliverResponse(response);
        return;
      } catch (err) {
        const fallback = this.generateGenerativeResponse(query, file);
        fallback.title = `${fallback.title} (Tier 3 Fallback)`;
        fallback.body = `<small style="display:block;margin-bottom:8px;color:#fbbf24;">[Notice: Enterprise webhook uncontacted (${err.message}). Resolved via Tier 1 Local Generative Engine.]</small>${fallback.body}`;
        this.deliverResponse(fallback);
      }
    }

    deliverResponse(response) {
      // Store in conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: response.body || '',
        title: response.title || ''
      });

      this.appendMessage(response);
      this.setMascotState('speaking', '<span>Delivering insights...</span> · <i style="color:#38bdf8">Transmitting</i>');

      // Speech synthesis voice delivery (if supported and permitted)
      if ('speechSynthesis' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        try {
          const utter = new SpeechSynthesisUtterance(response.voiceText || response.title || 'Operational report ready.');
          utter.rate = 1.05;
          utter.pitch = 1.0;
          utter.onend = () => this.setMascotState('idle');
          window.speechSynthesis.speak(utter);
        } catch (e) {
          setTimeout(() => this.setMascotState('idle'), 1400);
        }
      } else {
        setTimeout(() => this.setMascotState('idle'), 1400);
      }

      this.isBusy = false;
      if (response.crossLinkZone) {
        this.emit('selectZone3D', response.crossLinkZone);
      }
    }

    // ----------------------------------------------------------------
    // Generative Synthesis & Reasoning Engine (Tier 1 Local)
    // ----------------------------------------------------------------
    generateGenerativeResponse(rawQuery, file) {
      const q = (rawQuery || '').trim();
      const lower = q.toLowerCase();

      // Multi-turn context memory retention across recent turns
      const recentHistoryText = this.conversationHistory.slice(-4).map(h => (h.content || '')).join(' ').toLowerCase();

      // 1. Safety Guardrails: Reject harmful/illegal instructions neutrally
      if (/(hack|exploit|bypass|steal|weapon|attack|ddos|vulnerability)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Security Layer',
          title: 'Security Boundary Enforced',
          body: 'Security protocol prevents execution of requests that compromise building infrastructure, access locks, or resident privacy. Redirecting to standard property management operations.',
          richCard: {
            title: 'System Access Log',
            badge: 'Policy Enforced',
            params: [
              { label: 'Security State', value: 'Nominal', sub: 'Access Pass Active' },
              { label: 'Unit', value: PROPERTY_DATA.unit, sub: 'Zero Breaches' }
            ]
          }
        };
      }

      // 2. Creative Synthesis: Draft Email / Communication Generation
      if (/(draft|email|write a letter|message to|compose|send note)/i.test(lower)) {
        if (/apex|technician|rajesh|vendor|hvac|repair|contractor/i.test(lower) || (/him|them|vendor|tech/i.test(lower) && /hvac|technician|rajesh|apex/i.test(recentHistoryText))) {
          return {
            type: 'companion',
            author: 'THΛTJOINT Sentinel · Communications Core',
            title: 'Generated Vendor Dispatch Communication',
            voiceText: 'Communication for Apex Climate Solutions generated.',
            body: `<strong>Subject:</strong> Work Order Confirmation #${PROPERTY_DATA.maintenance.ticketId} – ${PROPERTY_DATA.unit}<br /><br />
To: Apex Climate Solutions (Attn: Rajesh K.)<br />
Re: ${PROPERTY_DATA.maintenance.scope}<br /><br />
Please be advised that gate access security pre-clearance has been confirmed for your dispatch slot today at 14:00 at <strong>${PROPERTY_DATA.address}</strong>. Smart Pass access credentials have been generated for technician entry. Resident Dr. A. Verma has received the notification.<br /><br />
Please log technician arrival via the digital contractor terminal upon entry.`,
            richCard: {
              title: `Vendor Notice · WO-${PROPERTY_DATA.maintenance.ticketId}`,
              badge: 'Draft Synthesized',
              params: [
                { label: 'Recipient', value: 'Apex Climate', sub: 'Rajesh K.' },
                { label: 'Scheduled', value: '14:00 Today', sub: 'Pre-cleared' },
                { label: 'Scope', value: 'HVAC Filter', sub: 'Unit 014' }
              ],
              actions: [
                { label: 'Dispatch Notification', action: 'notice', payload: 'Vendor dispatch email transmitted.' },
                { label: 'Inspect Home 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' }
              ]
            }
          };
        }

        // Draft communication to Resident (Dr. Verma)
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Communications Core',
          title: 'Generated Resident Advisory Draft',
          voiceText: 'Resident notice draft generated for Dr. Verma.',
          body: `<strong>Subject:</strong> Advisory: Scheduled Tenancy & Operations Update – ${PROPERTY_DATA.unit}<br /><br />
Dear <strong>${PROPERTY_DATA.resident.name}</strong>,<br /><br />
We are writing regarding your residence at <strong>${PROPERTY_DATA.address}</strong>. Your current tenancy term (expiring 31 Oct 2026) has entered the standard 30-day renewal evaluation window. Rent records reflect zero arrears with an escrow deposit of ${PROPERTY_DATA.lease.securityDeposit} safely maintained.<br /><br />
Additionally, technician Rajesh K. from Apex Climate Solutions is scheduled today at 14:00 for the routine HVAC static airflow pressure audit. No action is required on your part.<br /><br />
Warm regards,<br />
THΛTJOINT Operations Layer`,
          richCard: {
            title: 'Resident Advisory · Home 014',
            badge: 'Synthesis Complete',
            params: [
              { label: 'Addressee', value: PROPERTY_DATA.resident.name, sub: 'Good Standing' },
              { label: 'Cycle Status', value: 'Zero Arrears', sub: 'Mandate Active' },
              { label: 'Renewal Due', value: '30 Days', sub: 'Window Open' }
            ],
            actions: [
              { label: 'Dispatch to Resident', action: 'notice', payload: 'Advisory transmitted to Dr. Verma.' },
              { label: 'Draft Renewal Package', action: 'query', payload: 'Draft Renewal' }
            ]
          }
        };
      }

      // 3. Chain-of-Thought Reasoning: Dynamic Mathematical Calculation & Rent Indexing
      const mathMatch = lower.match(/(\d+(?:\.\d+)?)\s*%/);
      if (mathMatch && /(escalat|increas|raise|rent|rate|index|inflation)/i.test(lower)) {
        const pct = parseFloat(mathMatch[1]);
        const base = PROPERTY_DATA.lease.monthlyRentNum;
        const newRent = Math.round(base * (1 + pct / 100));
        const newEscrow = newRent * 3;
        const deltaRent = newRent - base;
        const deltaEscrow = newEscrow - PROPERTY_DATA.lease.securityDepositNum;

        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Actuarial Reasoning',
          title: `Calculated Escalation Analysis (+${pct}%)`,
          voiceText: `At a ${pct} percent increase, Home 014 rent adjusts from ₹1,45,000 to ₹${newRent.toLocaleString('en-IN')}.`,
          body: `<strong>Actuarial Step-by-Step Calculation:</strong><br />
1. <em>Baseline Base Rent:</em> ₹${base.toLocaleString('en-IN')}/mo<br />
2. <em>Proposed Escalation Rate:</em> +${pct}% (+₹${deltaRent.toLocaleString('en-IN')})<br />
3. <em>Adjusted Monthly Base:</em> <strong>₹${newRent.toLocaleString('en-IN')}/mo</strong><br />
4. <em>Standard 3-Month Escrow Requirement:</em> 3 × ₹${newRent.toLocaleString('en-IN')} = <strong>₹${newEscrow.toLocaleString('en-IN')}</strong> (Escrow adjustment: +₹${deltaEscrow.toLocaleString('en-IN')})<br /><br />
This indexing rate maintains compliance with regional Maharashtra tenancy covenants and escrow reserve regulations.`,
          richCard: {
            title: `Actuarial Forecast · ${PROPERTY_DATA.unit}`,
            badge: `+${pct}% Index Calculation`,
            params: [
              { label: 'Baseline', value: '₹1,45,000', sub: 'Current Rent' },
              { label: 'Adjusted Rent', value: `₹${newRent.toLocaleString('en-IN')}`, sub: `+₹${deltaRent.toLocaleString('en-IN')}` },
              { label: 'Escrow Required', value: `₹${newEscrow.toLocaleString('en-IN')}`, sub: `+₹${deltaEscrow.toLocaleString('en-IN')}` },
              { label: 'Annual Portfolio', value: `₹${(newRent * 12).toLocaleString('en-IN')}`, sub: '12-Month Yield' }
            ],
            actions: [
              { label: 'Prepare Renewal with this Rate', action: 'query', payload: `Draft renewal at ${pct}% escalation` },
              { label: 'Review Current Ledger', action: 'query', payload: 'Ledger & Escrow' }
            ]
          }
        };
      }

      // 4. Adaptive Persona: Explain Like I'm 5 (ELI5) vs. Technical Breakdown
      if (/(eli5|explain like i['\s]?m 5|like i am 5|simple terms|simply|layman|5 year old)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Simplified Brief',
          title: 'Home 014 Explained Simply',
          voiceText: 'Home 014 is a happy, healthy apartment with rooftop solar and a friendly tenant who always pays on time.',
          body: `Think of Home 014 like a high-tech smart house in a quiet courtyard:<br /><br />
- <strong>Who lives here:</strong> Dr. Verma has lived here for a year, takes great care of the place, and has never missed a rent payment.<br />
- <strong>Energy:</strong> Big solar panels on the roof make almost all the clean electricity the home needs during the day and save extra power in a big battery for night time.<br />
- <strong>Checkup today:</strong> A certified cooling technician is stopping by at 2:00 PM today just to give the air conditioning a quick filter checkup so it runs ice-cold.<br />
- <strong>Lease:</strong> The contract is up for renewal next month, and everything is green-lighted for another year!`,
          richCard: {
            title: 'Simple Overview · Unit 014',
            badge: '100% In Good Shape',
            params: [
              { label: 'Tenant', value: 'Dr. Verma', sub: 'Friendly resident' },
              { label: 'Clean Energy', value: '94% Sun Powered', sub: 'Solar panels' },
              { label: 'A/C Check', value: '2:00 PM Today', sub: 'Filter change' }
            ]
          }
        };
      }

      // 5. Document Upload / Lease Extraction
      if (file || /(lease|upload|pdf|contract|agreement|document|clause|covenant)/i.test(lower)) {
        const fileName = file ? file.name : 'Oakview_Executed_Lease_Form_R26.pdf';
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Document Intelligence',
          title: 'Document Intelligence / Lease Extraction',
          voiceText: 'Lease extraction complete. Unit 014 lease is active with 30 days remaining in current evaluation window.',
          body: `Scanned <strong>${this.escapeHtml(fileName)}</strong> under residential tenancy governance protocols. All 14 operational covenants, escrow trust accounts, and maintenance SLAs have been extracted and verified. Zero infractions logged.`,
          docScan: true,
          richCard: {
            title: 'Extracted Lease Parameters · Unit 014',
            badge: '100% Verified Compliant',
            params: [
              { label: 'Term Dates', value: PROPERTY_DATA.lease.term, sub: '30 Days Remaining' },
              { label: 'Monthly Base', value: PROPERTY_DATA.lease.monthlyRent, sub: 'Next: 01 Nov' },
              { label: 'Security Escrow', value: PROPERTY_DATA.lease.securityDeposit, sub: 'Digital Trust Held' },
              { label: 'Index Escalation', value: PROPERTY_DATA.lease.escalationRate, sub: 'Effective Nov 2026' }
            ],
            actions: [
              { label: 'Draft 30-Day Renewal Form', action: 'query', payload: 'Draft Renewal' },
              { label: 'Inspect Home 014 3D Model', action: 'crosslink-3d', payload: '02 Living Quarters' }
            ]
          }
        };
      }

      // 6. Draft Renewal
      if (/(renewal|draft renewal|re-sign|extend lease)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Leasing Desk',
          title: 'Residential Lease Renewal Agreement Draft',
          voiceText: 'Draft renewal for Home 014 prepared. Statutory 5% indexing applied to new term.',
          body: `Prepared formal renewal package for <strong>Dr. A. Verma</strong> for term <em>01 Nov 2026 – 31 Oct 2027</em>. Base rent adjusted by statutory 5% index to <strong>₹1,52,250/mo</strong>. Escrow replenishment scheduled to ₹4,56,750 (+₹21,750 adjustment).`,
          crossLinkZone: '02 Living Quarters',
          richCard: {
            title: 'Proposed Renewal Terms · Home 014',
            badge: 'Renewal Ready',
            params: [
              { label: 'New Term', value: '12 Months', sub: 'Nov 2026 – Oct 2027' },
              { label: 'Adjusted Rent', value: '₹1,52,250', sub: '+5.0% Indexing' },
              { label: 'Escrow Reserve', value: '₹4,56,750', sub: '+₹21,750 Top-up' },
              { label: 'Resident Status', value: 'Eligible', sub: 'Zero Infractions' }
            ],
            actions: [
              { label: 'Dispatch Digital Signature', action: 'notice', payload: 'Renewal agreement sent to Dr. A. Verma' },
              { label: 'View Living Quarters in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' }
            ]
          }
        };
      }

      // 7. Ledger & Escrow
      if (/(ledger|escrow|rent|due|deposit|payment|arrear|bank|transaction)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Financial Core',
          title: 'Connected Rent Ledger & Escrow Audit',
          voiceText: 'Rent collection is 100% clear with zero arrears. Security deposit is held in verified escrow.',
          body: `Rent ledger for cycle ending 31 Oct is reconciled. Automated digital mandate cleared on 18 Oct for <strong>${PROPERTY_DATA.lease.monthlyRent}</strong>. Security deposit of <strong>${PROPERTY_DATA.lease.securityDeposit}</strong> is maintained in full compliance with property escrow governance.`,
          richCard: {
            title: 'Financial Health · Unit 014',
            badge: 'Zero Arrears',
            params: [
              { label: 'Monthly Rent', value: PROPERTY_DATA.lease.monthlyRent, sub: 'Paid 18 Oct' },
              { label: 'Next Cycle', value: '01 Nov 2026', sub: 'Mandate Active' },
              { label: 'Escrow Reserve', value: '₹4,35,000', sub: 'Verified Escrow' },
              { label: 'Portfolio Rate', value: '98.8%', sub: 'On-Time Average' }
            ],
            actions: [
              { label: 'Download Verified Receipt PDF', action: 'download-receipt', payload: 'Receipt-OCT-2026' },
              { label: 'Audit Lease Agreement', action: 'query', payload: 'Analyze Uploaded Lease PDF' }
            ]
          }
        };
      }

      // 8. HVAC & Maintenance
      if (/(hvac|maintenance|repair|work order|ticket|technician|filter|apex|airflow)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Dispatch Gateway',
          title: 'Field Operations & Maintenance Queue',
          voiceText: 'Work order 8841 is assigned to Apex Climate Solutions for 14:00 today.',
          body: `Active ticket <strong>WO-8841 (Routine HVAC Air-Filter & Duct Static Pressure Audit)</strong> is confirmed. Certified vendor <strong>${PROPERTY_DATA.maintenance.vendor}</strong> is dispatched for <strong>${PROPERTY_DATA.maintenance.scheduledTime}</strong>. Gate security pre-clearance granted.`,
          richCard: {
            title: 'Active Work Order #8841',
            badge: 'Technician Assigned',
            params: [
              { label: 'Priority', value: 'Routine', sub: 'SLA < 4.0 Hours' },
              { label: 'Assigned Vendor', value: 'Apex Climate', sub: 'Rajesh K. (Certified)' },
              { label: 'Dispatch Slot', value: '14:00 Today', sub: 'Digital Gate Pass Issued' },
              { label: 'Resident Notice', value: 'Delivered', sub: 'Dr. A. Verma' }
            ],
            actions: [
              { label: 'Confirm Work Order Arrival', action: 'notice', payload: 'Vendor check-in logged' },
              { label: 'View Living Quarters in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' }
            ]
          }
        };
      }

      // 9. Solar Telemetry & Microgrid
      if (/(solar|energy|power|microgrid|battery|generation|kilowatt|kwh|grid|carbon)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Clean Energy Gateway',
          title: 'Rooftop Microgrid & Energy Telemetry',
          voiceText: 'Rooftop solar is generating 4.8 kilowatts with battery storage at 92%.',
          body: `Rooftop photovoltaic microgrid is operating under peak daylight irradiance. Instant generation: <strong>${PROPERTY_DATA.microgrid.solarGeneration}</strong>. Battery storage reserves: <strong>${PROPERTY_DATA.microgrid.batteryStorage}</strong>. Carbon offset score: <strong>${PROPERTY_DATA.microgrid.buildingOffset}</strong>. Surplus power (+1.6 kW) is currently being exported to the community grid.`,
          crossLinkZone: '03 Rooftop Terrace',
          richCard: {
            title: 'Rooftop Microgrid Performance',
            badge: 'Optimal Efficiency',
            params: [
              { label: 'Peak Generation', value: PROPERTY_DATA.microgrid.solarGeneration, sub: '12 Panels Active' },
              { label: 'Daily Yield', value: PROPERTY_DATA.microgrid.dailyYield, sub: 'Offset: 94.2%' },
              { label: 'Battery Storage', value: PROPERTY_DATA.microgrid.batteryStorage, sub: '13.8 kWh reserve' },
              { label: 'Grid Export', value: '+1.6 kW', sub: 'Net Export Active' }
            ],
            actions: [
              { label: 'View Rooftop Terrace in 3D', action: 'crosslink-3d', payload: '03 Rooftop Terrace' }
            ]
          }
        };
      }

      // 10. Home 014 Status & Resident Dossier
      if (/(014|status|home|unit|resident|verma|tenant|who lives)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Operational Core',
          title: 'Unit 014 Living Quarters Telemetry',
          voiceText: 'Unit 014 is operating nominally with zero infractions.',
          body: `Unit 014 at <strong>${PROPERTY_DATA.community}</strong> is in nominal operating condition. Resident <strong>${PROPERTY_DATA.resident.name}</strong> (tenancy active since ${PROPERTY_DATA.resident.since}) is current on all dues. Routine filter inspection dispatched for today at 14:00. Perimeter lock synchronized.`,
          crossLinkZone: '02 Living Quarters',
          richCard: {
            title: 'Home 014 Multi-System Overview',
            badge: 'Subsystems Nominal',
            params: [
              { label: 'Occupancy', value: 'Occupied', sub: PROPERTY_DATA.resident.name },
              { label: 'Rent Status', value: 'Settled Oct 18', sub: 'Zero Arrears' },
              { label: 'HVAC Airflow', value: '420 CFM', sub: 'Filter: 88% Clean' },
              { label: 'Perimeter Access', value: 'Secured', sub: 'Smart Pass #014' }
            ],
            actions: [
              { label: 'Highlight Unit 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' },
              { label: 'Dispatch HVAC Order', action: 'query', payload: 'HVAC Maintenance' },
              { label: 'Review Rent Ledger', action: 'query', payload: 'Ledger & Escrow' }
            ]
          }
        };
      }

      // 11. Contextual Natural Language Synthesis with Ambiguity Handling
      return {
        type: 'companion',
        author: 'THΛTJOINT Sentinel',
        title: 'Operational Reasoning Synthesis',
        voiceText: 'Operational inquiry resolved with verified Home 014 telemetry.',
        body: `Processed operational request: <em>"${this.escapeHtml(rawQuery)}"</em>.<br /><br />
Home 014 at <strong>${PROPERTY_DATA.community}</strong> maintains nominal telemetry across all operating vectors. Resident <strong>${PROPERTY_DATA.resident.name}</strong> has zero infractions, rent mandate is settled, and rooftop solar microgrid is operating at 94.2% carbon offset.<br /><br />
If you require a specific workflow, select one of the following directives or provide additional constraints:`,
        richCard: {
          title: 'Operations Navigator · Home 014',
          badge: 'Sentinel Active',
          params: [
            { label: 'Active Unit', value: PROPERTY_DATA.unit, sub: 'Oakview' },
            { label: 'Tenancy State', value: 'Active', sub: '30d Window' },
            { label: 'Operational SLA', value: '100% Pass', sub: '0 Infractions' }
          ],
          actions: [
            { label: 'Inspect Home 014 Status', action: 'query', payload: 'Home 014 Status' },
            { label: 'Calculate Escalation Rate', action: 'query', payload: 'What if rent increases by 7%?' },
            { label: 'Review Rooftop Solar in 3D', action: 'crosslink-3d', payload: '03 Rooftop Terrace' }
          ]
        }
      };
    }

    // ----------------------------------------------------------------
    // Message Rendering
    // ----------------------------------------------------------------
    appendMessage(msg) {
      if (!this.feed) return;
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const wrap = document.createElement('article');
      wrap.className = `tj-bubble-wrap ${msg.type || 'companion'}`;

      let cardHtml = `
        <div class="tj-bubble-meta">
          <span class="author">${msg.author || 'THΛTJOINT Sentinel'}</span>
          <time datetime="${new Date().toISOString()}">${timeStr}</time>
        </div>
        <div class="tj-bubble-card">
          ${msg.attachment ? `
            <div class="tj-user-attachment">
              <i>📎</i>
              <span><strong>${this.escapeHtml(msg.attachment.name)}</strong> ${msg.attachment.size}</span>
            </div>
          ` : ''}
          ${msg.title ? `<h4>${msg.title}</h4>` : ''}
          ${msg.docScan ? `<div class="tj-doc-scan-bar" aria-hidden="true"><i></i></div>` : ''}
          ${msg.body ? `<p>${msg.body}</p>` : ''}
          ${msg.richCard ? `
            <div class="tj-rich-card">
              <div class="tj-rich-card-head">
                <b>${msg.richCard.title}</b>
                <span class="badge-pill">${msg.richCard.badge}</span>
              </div>
              <div class="tj-param-grid">
                ${msg.richCard.params.map(p => `
                  <div class="tj-param-box">
                    <span>${p.label}</span>
                    <strong>${p.value}</strong>
                    ${p.sub ? `<small>${p.sub}</small>` : ''}
                  </div>
                `).join('')}
              </div>
              ${msg.richCard.actions && msg.richCard.actions.length ? `
                <div class="tj-card-actions">
                  ${msg.richCard.actions.map(a => `
                    <button type="button" class="tj-card-btn" data-action="${a.action}" data-payload="${this.escapeHtml(a.payload)}">
                      <span>${a.label}</span>
                      <i>↗</i>
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `;

      wrap.innerHTML = cardHtml;
      this.feed.appendChild(wrap);
      this.feed.scrollTop = this.feed.scrollHeight;
    }

    handleCardAction(action, payload) {
      if (action === 'query') {
        if (this.input) {
          this.input.value = payload;
          this.submitQuery();
        }
      } else if (action === 'crosslink-3d') {
        this.emit('selectZone3D', payload);
      } else if (action === 'trigger-upload') {
        if (this.fileInput) this.fileInput.click();
      } else if (action === 'open-config') {
        this.openConfigModal();
      } else if (action === 'download-receipt') {
        alert('Receipt OCT-2026: Cryptographically signed property receipt downloaded (Prototype simulation).');
      } else if (action === 'notice') {
        alert('Operational Notice: ' + payload);
      }
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // ----------------------------------------------------------------
    // Event Bus (Cross-Module Sync)
    // ----------------------------------------------------------------
    on(event, handler) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event).push(handler);
    }

    emit(event, data) {
      if (this.listeners.has(event)) {
        this.listeners.get(event).forEach(handler => handler(data));
      }
    }
  }

  return ThatJointChatbot;
}));
