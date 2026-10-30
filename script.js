/**
 * Animated Login Form — Dynamic Interactive Logic
 * Features:
 *  - Mutually Exclusive Video & HTML Form Display (100% Zero Text Duplication)
 *  - Native Video Animation Synchronization with Frame-Accurate Hand-off
 *  - Web Audio API Sound Synthesizer (Zero External Audio Dependencies)
 *  - Interactive Character Reactions (Looking, Eye-covering Privacy, Peeking)
 *  - Show/Hide Password Toggle with Instant Visual State
 *  - Physics Confetti Particle Engine for Celebration
 *  - Replay and Skip Intro Controls
 *  - Single-line Sleek Powered Badge & Organized Typography
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const video = document.getElementById('introVideo');
  const videoLayer = document.getElementById('videoLayer');
  const pageTitle = document.querySelector('.page-title');
  const interactiveForm = document.getElementById('interactiveForm');
  const poweredBadge = document.querySelector('.powered-badge');
  const speechBubble = document.getElementById('speechBubble');
  const privacyReaction = document.getElementById('privacyReaction');
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const togglePwdBtn = document.getElementById('togglePwdBtn');
  const eyeIcon = document.getElementById('eyeIcon');
  const submitBtn = document.getElementById('submitBtn');
  const replayBtn = document.getElementById('replayBtn');
  const soundBtn = document.getElementById('soundBtn');
  const skipBtn = document.getElementById('skipBtn');
  const confettiCanvas = document.getElementById('confettiCanvas');

  // State
  let soundEnabled = true;
  let isVideoPlaying = false;
  let speechTimeout = null;
  let audioCtx = null;

  // Initialize Web Audio API on first user interaction
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesized Sound Effects
  const sounds = {
    footstep: () => {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    },

    pushFriction: (duration = 2.4) => {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(260, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + duration - 0.3);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + duration);
    },

    settleThud: () => {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    },

    keyClick: () => {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    },

    errorBuzz: () => {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      [0, 0.1].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.08);
      });
    },

    successFanfare: () => {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const startTime = ctx.currentTime + idx * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    }
  };

  // Helper to show character speech bubble
  function say(text, duration = 3000) {
    if (speechTimeout) clearTimeout(speechTimeout);
    speechBubble.textContent = text;
    speechBubble.classList.add('visible');
    speechTimeout = setTimeout(() => {
      speechBubble.classList.remove('visible');
    }, duration);
  }

  // Settle animation into clean interactive form state (Zero duplication)
  function settleIntoForm() {
    isVideoPlaying = false;
    
    // Hide video layer completely
    if (videoLayer) videoLayer.classList.remove('playing');
    video.pause();

    // Show HTML text and form cleanly over stage_clean_base.jpg
    if (pageTitle) pageTitle.classList.remove('hidden-during-video');
    if (interactiveForm) interactiveForm.classList.remove('hidden-during-video');
    if (poweredBadge) poweredBadge.classList.remove('hidden-during-video');

    sounds.settleThud();
    say('Welcome Back! Ready when you are 👋', 3200);
  }

  // Play Walk & Push Intro Animation
  function playIntroAnimation() {
    isVideoPlaying = true;
    privacyReaction.classList.remove('show');
    speechBubble.classList.remove('visible');
    submitBtn.classList.remove('loading', 'success');
    submitBtn.querySelector('.btn-text').textContent = 'Log In';

    // Hide HTML elements during video playback so NO double text can ever occur
    if (pageTitle) pageTitle.classList.add('hidden-during-video');
    if (interactiveForm) interactiveForm.classList.add('hidden-during-video');
    if (poweredBadge) poweredBadge.classList.add('hidden-during-video');

    // Show video layer
    if (videoLayer) videoLayer.classList.add('playing');
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          scheduleIntroAudio();
        })
        .catch((err) => {
          console.warn('Autoplay restricted:', err);
          settleIntoForm();
        });
    }
  }

  // Schedule Audio Synced with Video Timestamps
  function scheduleIntroAudio() {
    if (!soundEnabled) return;
    const stepTimes = [300, 700, 1100, 1500, 1900];
    stepTimes.forEach((ms) => {
      setTimeout(() => {
        if (isVideoPlaying && !video.paused) sounds.footstep();
      }, ms);
    });

    setTimeout(() => {
      if (isVideoPlaying && !video.paused) sounds.pushFriction(2.5);
    }, 2400);
  }

  // Monitor Video Time to Trigger Hand-off at 5.0s
  video.addEventListener('timeupdate', () => {
    if (isVideoPlaying && video.currentTime >= 5.0) {
      settleIntoForm();
    }
  });

  video.addEventListener('ended', () => {
    settleIntoForm();
  });

  // Replay Button
  replayBtn.addEventListener('click', () => {
    getAudioContext();
    playIntroAnimation();
  });

  // Skip Intro Button
  skipBtn.addEventListener('click', () => {
    getAudioContext();
    settleIntoForm();
    emailInput.focus();
  });

  // Sound Toggle Button
  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    getAudioContext();
    soundBtn.classList.toggle('active', soundEnabled);
    soundBtn.innerHTML = soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    say(soundEnabled ? 'Audio enabled! 🔊' : 'Audio muted 🔇', 1800);
  });

  // Input Typing Sound & Character Reaction on Email Focus
  emailInput.addEventListener('focus', () => {
    privacyReaction.classList.remove('show');
    say('Ready when you are! Type your email 📬', 2500);
  });

  emailInput.addEventListener('input', () => {
    sounds.keyClick();
    if (emailInput.classList.contains('error')) {
      emailInput.classList.remove('error');
    }
  });

  // Password Focus: Privacy Shield Reaction!
  passwordInput.addEventListener('focus', () => {
    privacyReaction.classList.add('show');
    say("I'm looking away! Your password is safe 🙈", 2500);
  });

  passwordInput.addEventListener('blur', () => {
    privacyReaction.classList.remove('show');
  });

  passwordInput.addEventListener('input', () => {
    sounds.keyClick();
    if (passwordInput.classList.contains('error')) {
      passwordInput.classList.remove('error');
    }
  });

  // Toggle Show / Hide Password
  togglePwdBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    if (isPassword) {
      passwordInput.setAttribute('type', 'text');
      eyeIcon.innerHTML = `
        <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;
      say("Peeking mode! 👀 Make sure nobody's watching!", 2500);
    } else {
      passwordInput.setAttribute('type', 'password');
      eyeIcon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    }
    sounds.keyClick();
  });

  // Form Submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getAudioContext();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;
    if (!email || !email.includes('@')) {
      emailInput.classList.add('error');
      hasError = true;
    }
    if (!password || password.length < 3) {
      passwordInput.classList.add('error');
      hasError = true;
    }

    if (hasError) {
      sounds.errorBuzz();
      say('Oops! Please enter a valid email & password ❌', 3000);
      return;
    }

    // Submit Simulation
    submitBtn.classList.add('loading');
    say('Verifying credentials... ⏳', 2000);

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      submitBtn.querySelector('.btn-text').textContent = '✓ Welcome!';
      sounds.successFanfare();
      say('Access Granted! Welcome back! 🎉', 4000);
      triggerConfetti();
    }, 1200);
  });

  // Confetti Physics Engine
  function triggerConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    const width = (confettiCanvas.width = confettiCanvas.offsetWidth);
    const height = (confettiCanvas.height = confettiCanvas.offsetHeight);

    const colors = ['#ffffff', '#012031', '#10b981', '#fbbf24', '#f59e0b', '#ef4444'];
    const particles = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: width * 0.5,
        y: height * 0.65,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.85) * 14,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.35,
        opacity: 1
      });
    }

    let frameCount = 0;
    function renderConfetti() {
      ctx.clearRect(0, 0, width, height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rSpeed;
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
          ctx.restore();
        }
      });

      if (alive && frameCount < 180) {
        frameCount++;
        requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }

    requestAnimationFrame(renderConfetti);
  }

  // Initial presentation is clean resting state (Zero duplication)
  settleIntoForm();
});
