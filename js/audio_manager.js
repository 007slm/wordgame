/**
 * 单词消消乐 - 音频与语音引擎
 * 1. Web Audio API 原生程序合成音效 (100% 离线、零外部资源依赖、超低延迟)
 * 2. Web Speech API 英文真人/自然语音发音朗读
 */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.speechEnabled = true;
    this.speechRate = 0.85; // 稍慢语速，适合儿童听清并跟读
    this.preferredVoice = null;

    this.currentAudio = null;

    // 延迟初始化 AudioContext (响应移动端用户首次触摸)
    this.initAudioContext();
    this.initSpeechVoices();
  }

  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  ensureContextRunning() {
    if (!this.ctx) {
      this.initAudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initSpeechVoices() {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // 优先查找自然、高品质英语语音 (如 Google, Natural, Samantha, Daniel)
        this.preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira')))
          || voices.find(v => v.lang.startsWith('en')) || null;
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  // 朗读英文单词 (真人高品质发音优先，极其自然动听；离线自动降级到 Web Speech)
  speakWord(word) {
    if (!this.speechEnabled || !word) return;
    const cleanWord = word.trim().toLowerCase();

    // 停止当前播放的音频
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    // 方案一：高品质真人纯正美音音频流 (有道纯真人发音，声音温暖自然，极适合儿童)
    try {
      const audioUrl = `https://dict.youdao.com/dictvoice?type=2&audio=${encodeURIComponent(cleanWord)}`;
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // 若网络受限或离线，自动无缝降级到本地合成发音
          this.fallbackSpeechSynthesis(cleanWord);
        });
      }
    } catch (e) {
      this.fallbackSpeechSynthesis(cleanWord);
    }
  }

  // 本地 Web Speech 兜底发音
  fallbackSpeechSynthesis(word) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = this.speechRate;
      utterance.pitch = 1.05;
      if (this.preferredVoice) {
        utterance.voice = this.preferredVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  // 播放清脆泡泡点击音效 (Tap / Bubble Pop)
  playTap() {
    if (!this.soundEnabled || !this.ctx) return;
    this.ensureContextRunning();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(860, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  // 播放配对成功和弦 (Match Success Chime)
  playMatch() {
    if (!this.soundEnabled || !this.ctx) return;
    this.ensureContextRunning();

    try {
      const now = this.ctx.currentTime;
      // 欢快的 C大调 双和弦 (E5 -> G5)
      const freqs = [659.25, 783.99, 1046.50];

      freqs.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + index * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch (e) {}
  }

  // 连击连消音效 (Combo Fanfare，音调随着连击数递增)
  playCombo(comboCount = 1) {
    if (!this.soundEnabled || !this.ctx) return;
    this.ensureContextRunning();

    try {
      const now = this.ctx.currentTime;
      const baseFreq = 440 * Math.pow(1.08, Math.min(comboCount, 10)); // 随连击攀升
      const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch (e) {}
  }

  // 错误轻柔弹簧音 (Wrong Boing，柔和不挫伤孩子积极性)
  playWrong() {
    if (!this.soundEnabled || !this.ctx) return;
    this.ensureContextRunning();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // 通关胜利号角 (Victory Fanfare)
  playVictory() {
    if (!this.soundEnabled || !this.ctx) return;
    this.ensureContextRunning();

    try {
      const now = this.ctx.currentTime;
      // 辉煌和弦：C5, G4, C5, E5, G5
      const notes = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 659.25, d: 0.12, t: 0.12 },
        { f: 783.99, d: 0.12, t: 0.24 },
        { f: 1046.50, d: 0.45, t: 0.36 }
      ];

      notes.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + note.t;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, startTime);

        gain.gain.setValueAtTime(0.22, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.d + 0.05);
      });
    } catch (e) {}
  }

  // 道具触发与通用UI音
  playPowerup() {
    if (!this.soundEnabled || !this.ctx) return;
    this.ensureContextRunning();

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.22);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    } catch (e) {}
  }
}

if (typeof window !== 'undefined') {
  window.AudioManager = AudioManager;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioManager;
}
