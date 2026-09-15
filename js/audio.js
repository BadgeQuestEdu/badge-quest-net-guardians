/* Adventure BGM + SFX — original Web Audio composition, no samples */
var NG = window.NG = window.NG || {};

NG.Audio = {
  ctx: null,
  master: null,
  musicGain: null,
  sfxGain: null,
  duckGain: null,
  muted: false,
  volume: 0.7,
  started: false,
  mood: "hub",
  beat: 0,
  nextTime: 0,
  timer: null,
  noise: null,
  ducking: false,
  stepCool: 0,

  unlock: function () {
    if (this.started && this.ctx) {
      if (this.ctx.state === "suspended") this.ctx.resume();
      return;
    }
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.duckGain = this.ctx.createGain();
      this.duckGain.gain.value = 1;
      this.musicGain.connect(this.duckGain);
      this.duckGain.connect(this.master);
      this.sfxGain.connect(this.master);
      this.master.connect(this.ctx.destination);
      this.noise = this.makeNoise();
      this.started = true;
      this.applyGains();
      if (this.ctx.state === "suspended") this.ctx.resume();
    } catch (e) {}
  },

  makeNoise: function () {
    var len = this.ctx.sampleRate * 0.4;
    var buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  },

  applyGains: function () {
    if (!this.master) return;
    var v = this.muted ? 0 : this.volume;
    this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05);
    this.musicGain.gain.value = 0.22;
    this.sfxGain.gain.value = 0.55;
  },

  setMute: function (on) {
    this.muted = !!on;
    NG.Save.setMute(this.muted);
    if (this.ctx) this.applyGains();
    if (this.muted) {
      this.stopBgm();
      if (NG.Speech) NG.Speech.stop();
    } else if (this.started) {
      this.startBgm(this.mood);
    }
  },

  setVolume: function (v) {
    this.volume = Math.max(0, Math.min(1, v));
    NG.Save.setVol(this.volume);
    if (this.ctx) this.applyGains();
  },

  duck: function (on) {
    if (!this.duckGain || !this.ctx) return;
    this.ducking = !!on;
    this.duckGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.duckGain.gain.setTargetAtTime(on ? 0.18 : 1, this.ctx.currentTime, 0.08);
  },

  midi: function (m) {
    return 440 * Math.pow(2, (m - 69) / 12);
  },

  envOsc: function (freq, type, t, dur, peak, dest, slide) {
    if (!this.ctx || this.muted) return;
    var o = this.ctx.createOscillator();
    var g = this.ctx.createGain();
    o.type = type || "triangle";
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(dest || this.sfxGain);
    o.start(t);
    o.stop(t + dur + 0.03);
  },

  hat: function (t, peak) {
    if (!this.ctx || this.muted || !this.noise) return;
    var src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    var f = this.ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = 5000;
    var g = this.ctx.createGain();
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    src.connect(f); f.connect(g); g.connect(this.musicGain);
    src.start(t); src.stop(t + 0.06);
  },

  kick: function (t) {
    this.envOsc(140, "sine", t, 0.16, 0.22, this.musicGain, 45);
  },

  tone: function (freq, dur, type, gain, at) {
    this.envOsc(freq, type || "square", at || (this.ctx && this.ctx.currentTime) || 0, dur, gain || 0.12, this.sfxGain);
  },

  click: function () { this.unlock(); this.tone(880, 0.05, "square", 0.07); },
  step: function () {
    if (!this.ctx || this.muted) return;
    var now = this.ctx.currentTime;
    if (now < this.stepCool) return;
    this.stepCool = now + 0.15;
    this.tone(190, 0.04, "triangle", 0.03);
  },
  correct: function () {
    this.unlock();
    if (!this.ctx || this.muted) return;
    var t = this.ctx.currentTime;
    this.tone(523.25, 0.11, "triangle", 0.1, t);
    this.tone(659.25, 0.11, "triangle", 0.1, t + 0.09);
    this.tone(783.99, 0.22, "triangle", 0.12, t + 0.18);
  },
  wrong: function () { this.unlock(); this.tone(196, 0.16, "triangle", 0.07); },
  badge: function () {
    this.unlock();
    if (!this.ctx || this.muted) return;
    var t = this.ctx.currentTime;
    this.tone(392, 0.09, "triangle", 0.1, t);
    this.tone(523, 0.09, "triangle", 0.1, t + 0.08);
    this.tone(659, 0.09, "triangle", 0.1, t + 0.16);
    this.tone(784, 0.26, "triangle", 0.12, t + 0.26);
  },
  portal: function () {
    this.unlock();
    if (!this.ctx || this.muted) return;
    var t = this.ctx.currentTime;
    for (var i = 0; i < 6; i++) this.tone(320 + i * 70, 0.14, "sawtooth", 0.04, t + i * 0.06);
  },
  fanfare: function () {
    this.unlock();
    if (!this.ctx || this.muted) return;
    var t = this.ctx.currentTime;
    var notes = [392, 523, 659, 784, 1046];
    for (var i = 0; i < notes.length; i++) this.tone(notes[i], 0.26, "triangle", 0.1, t + i * 0.11);
  },

  /* Original 32-step phrases (16ths). Not a licensed game tune. */
  PAT: {
    hub: {
      bpm: 100,
      lead: [67, 0, 71, 0, 74, 0, 71, 0, 69, 0, 67, 0, 62, 0, 67, 0,
             64, 0, 67, 0, 69, 0, 71, 0, 74, 71, 69, 0, 67, 0, 0, 62],
      bass: [43, 43, 0, 43, 38, 38, 0, 43, 36, 36, 0, 38, 43, 0, 38, 43,
             43, 43, 0, 47, 36, 36, 0, 38, 43, 0, 38, 0, 43, 43, 38, 36],
      arp:  [67, 71, 74, 79, 67, 71, 74, 78, 64, 67, 71, 76, 62, 67, 71, 74,
             67, 71, 74, 79, 69, 72, 76, 79, 67, 71, 74, 78, 62, 67, 71, 74]
    },
    world: {
      bpm: 116,
      lead: [72, 0, 76, 79, 84, 0, 79, 76, 74, 0, 72, 67, 69, 72, 76, 0,
             77, 0, 76, 74, 72, 67, 64, 67, 72, 76, 79, 76, 72, 0, 67, 64],
      bass: [36, 36, 48, 36, 41, 41, 53, 41, 43, 43, 55, 43, 36, 48, 43, 41,
             36, 36, 48, 36, 34, 46, 41, 43, 36, 48, 36, 43, 36, 0, 31, 36],
      arp:  [72, 76, 79, 84, 72, 76, 79, 83, 69, 72, 76, 81, 67, 71, 74, 79,
             72, 76, 79, 84, 74, 77, 81, 84, 72, 76, 79, 83, 67, 72, 76, 79]
    }
  },

  setMood: function (mood) {
    if (mood === this.mood && this.timer) return;
    this.mood = mood === "world" ? "world" : "hub";
    if (this.started && !this.muted) this.startBgm(this.mood);
  },

  startBgm: function (mood) {
    this.unlock();
    if (!this.ctx || this.muted) return;
    if (mood) this.mood = mood === "world" ? "world" : "hub";
    this.stopBgm();
    this.beat = 0;
    this.nextTime = this.ctx.currentTime + 0.05;
    var self = this;
    function tick() {
      if (self.muted || !self.ctx) return;
      self.schedule();
      self.timer = setTimeout(tick, 40);
    }
    tick();
  },

  stopBgm: function () {
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
  },

  schedule: function () {
    var pat = this.PAT[this.mood] || this.PAT.hub;
    var six = 60 / pat.bpm / 4;
    var horizon = this.ctx.currentTime + 0.18;
    while (this.nextTime < horizon) {
      var i = this.beat % 32;
      var t = this.nextTime;
      var beat = i % 4;
      if (i % 8 === 0) this.kick(t);
      if (this.mood === "world" && (beat === 2)) this.hat(t, 0.045);
      if (beat === 0 || beat === 2) this.hat(t, this.mood === "hub" ? 0.025 : 0.04);
      var b = pat.bass[i];
      if (b) this.envOsc(this.midi(b), "sine", t, six * 1.6, 0.11, this.musicGain);
      var a = pat.arp[i];
      if (a) this.envOsc(this.midi(a), "triangle", t, six * 0.9, 0.028, this.musicGain);
      var l = pat.lead[i];
      if (l) {
        this.envOsc(this.midi(l), "triangle", t, six * 1.8, 0.07, this.musicGain);
        this.envOsc(this.midi(l) * 2, "sine", t, six * 1.4, 0.018, this.musicGain);
      }
      this.nextTime += six;
      this.beat++;
    }
  }
};
