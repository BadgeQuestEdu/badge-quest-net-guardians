/* Question read-aloud via Web Speech API — Chromebook-friendly, no backend */
var NG = window.NG = window.NG || {};

NG.Speech = {
  voice: null,
  speaking: false,
  ready: false,
  _onEnd: null,
  _queueTimer: null,
  _queueToken: 0,

  init: function () {
    var self = this;
    if (!window.speechSynthesis) return;
    function pick() { self.pickVoice(); }
    pick();
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", pick);
    }
    this.ready = true;
  },

  pickVoice: function () {
    if (!window.speechSynthesis) return null;
    var voices = window.speechSynthesis.getVoices() || [];
    var best = null, bestScore = -1;
    for (var i = 0; i < voices.length; i++) {
      var sc = this.scoreVoice(voices[i]);
      if (sc > bestScore) { bestScore = sc; best = voices[i]; }
    }
    this.voice = best;
    return best;
  },

  scoreVoice: function (v) {
    var n = ((v && v.name) || "") + " " + ((v && v.lang) || "");
    n = n.toLowerCase();
    var lang = ((v && v.lang) || "").toLowerCase();
    var s = 0;
    if (/^en/.test(lang) || /english/.test(n) || /en[-_]/.test(n)) s += 12;
    else return -1;
    if (/google/.test(n)) s += 55;
    if (/samantha|karen|moira|tessa|fiona|serena|susan|hazel|victoria|karen/.test(n)) s += 42;
    if (/microsoft aria|microsoft jenny|microsoft guy|microsoft sona|microsoft ana/.test(n)) s += 48;
    if (/enhanced|premium|neural|natural|online \(natural\)|natural$/.test(n)) s += 32;
    if (/daniel|alex|tom|david|james|fred/.test(n)) s += 22;
    if (/zira|mark|david desktop/.test(n)) s += 18;
    if (/chrome os|chromebook/.test(n)) s += 20;
    if (/female|woman|girl/.test(n)) s += 6;
    if (/en-us|en_us|en-gb|en_gb|en-au|en_au/.test(n)) s += 8;
    if (/compact|eloquence|espeak|robot/.test(n)) s -= 20;
    if (v.localService) s += 4;
    if (v.default) s += 2;
    return s;
  },

  available: function () {
    return !!(window.speechSynthesis && (this.voice || (window.speechSynthesis.getVoices() || []).length));
  },

  stop: function () {
    this.speaking = false;
    this._queueToken++;
    if (this._queueTimer) {
      clearTimeout(this._queueTimer);
      this._queueTimer = null;
    }
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
    if (NG.Audio && NG.Audio.duck) NG.Audio.duck(false);
    if (this._onEnd) { var fn = this._onEnd; this._onEnd = null; fn(); }
  },

  _utter: function (text, onEnd) {
    var self = this;
    if (!window.speechSynthesis || !text) {
      if (onEnd) onEnd();
      return;
    }
    if (!this.voice) this.pickVoice();
    var u = new SpeechSynthesisUtterance(text);
    if (this.voice) u.voice = this.voice;
    u.lang = (this.voice && this.voice.lang) || "en-US";
    u.rate = 0.88;
    u.pitch = 1.02;
    u.volume = 1;
    u.onend = function () { if (onEnd) onEnd(); };
    u.onerror = function () { if (onEnd) onEnd(); };
    try { window.speechSynthesis.resume(); } catch (e) {}
    window.speechSynthesis.speak(u);
  },

  /** Speak a list of lines with a pause between each (great for A/B/C/D choices). */
  speakSequence: function (parts, onEnd, gapMs) {
    var self = this;
    this.stop();
    if (!window.speechSynthesis || !parts || !parts.length) {
      if (onEnd) onEnd();
      return;
    }
    gapMs = typeof gapMs === "number" ? gapMs : 750;
    var token = this._queueToken;
    this.speaking = true;
    this._onEnd = onEnd;
    if (NG.Audio && NG.Audio.duck) NG.Audio.duck(true);

    var i = 0;
    function finish() {
      if (token !== self._queueToken) return;
      self.speaking = false;
      if (NG.Audio && NG.Audio.duck) NG.Audio.duck(false);
      var fn = self._onEnd;
      self._onEnd = null;
      if (fn) fn();
    }
    function next() {
      if (token !== self._queueToken) return;
      if (i >= parts.length) {
        finish();
        return;
      }
      var line = parts[i++];
      self._utter(line, function () {
        if (token !== self._queueToken) return;
        if (i >= parts.length) {
          finish();
          return;
        }
        self._queueTimer = setTimeout(function () {
          self._queueTimer = null;
          next();
        }, gapMs);
      });
    }
    next();
  },

  speak: function (text, onEnd) {
    this.speakSequence([text], onEnd, 0);
  },

  speakQuestion: function (prompt, choices, onEnd) {
    var parts = ["Question.", String(prompt || "")];
    var letters = ["A", "B", "C", "D"];
    if (choices && choices.length) {
      parts.push("Here are the choices.");
      for (var i = 0; i < choices.length; i++) {
        var t = choices[i] && choices[i].text != null ? choices[i].text : String(choices[i] || "");
        parts.push("Choice " + letters[i] + ". " + t);
      }
    }
    // Longer gap between choices so kids can follow A / B / C / D
    this.speakSequence(parts, onEnd, 850);
  },

  speakFeedback: function (text) {
    this.speak(text);
  }
};
