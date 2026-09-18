/* Profiles: classroom name + PIN. Backup codes are short (10 chars). */
var NG = window.NG = window.NG || {};

NG.Save = {
  KEY: "ng_saves_v2",
  KEY_OLD: "ng_saves_v1",
  LAST: "ng_last_v2",
  MUTE: "ng_mute_v1",
  VOL: "ng_vol_v1",
  AUTOREAD: "ng_autoread_v1",
  ABC: "23456789ABCDEFGHJKLMNPQRSTUVWXYZ",

  blank: function (name) {
    var badges = [];
    for (var w = 0; w < 7; w++) badges.push([0, 0, 0, 0, 0, 0, 0]);
    return {
      v: 2,
      name: this.sanitizeName(name),
      pinHash: "",
      unlocked: 1,
      complete: [0, 0, 0, 0, 0, 0, 0],
      badges: badges,
      wrongs: [0, 0, 0, 0, 0, 0, 0],
      hero: "",
      grade: 0,
      resume: null,
      ts: Date.now()
    };
  },

  sanitizeName: function (name) {
    var s = String(name || "")
      .replace(/[^\w\s\-']/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 16);
    return s || "";
  },

  sanitizePin: function (pin) {
    return String(pin || "").replace(/[^a-zA-Z0-9]/g, "").slice(0, 6);
  },

  validPin: function (pin) {
    var p = this.sanitizePin(pin);
    return p.length >= 4 && p.length <= 6;
  },

  hashPin: function (name, pin) {
    var s = this.sanitizeName(name).toLowerCase() + "#" + this.sanitizePin(pin).toLowerCase() + "#ng-guardian";
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
  },

  migrate: function () {
    var data = {};
    try {
      data = JSON.parse(localStorage.getItem(this.KEY) || "{}");
    } catch (e) {
      data = {};
    }
    if (data && Object.keys(data).length) return data;
    try {
      var old = JSON.parse(localStorage.getItem(this.KEY_OLD) || "{}");
      var k;
      for (k in old) {
        if (!old[k] || !old[k].name) continue;
        old[k].v = 2;
        old[k].pinHash = old[k].pinHash || "";
        data[this.sanitizeName(old[k].name).toLowerCase()] = old[k];
      }
      if (Object.keys(data).length) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
      }
    } catch (e2) {}
    return data;
  },

  all: function () {
    return this.migrate();
  },

  listNames: function () {
    var data = this.all();
    return Object.keys(data).sort(function (a, b) {
      return (data[b].ts || 0) - (data[a].ts || 0);
    });
  },

  load: function (name) {
    var data = this.all();
    var key = this.sanitizeName(name).toLowerCase();
    return data[key] || null;
  },

  persist: function (save) {
    if (!save) return;
    this.ensureExtras(save);
    save.ts = Date.now();
    save.name = this.sanitizeName(save.name);
    save.v = 2;
    var data = this.all();
    data[save.name.toLowerCase()] = save;
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
      localStorage.setItem(this.LAST, save.name);
    } catch (e) {}
  },

  lastName: function () {
    try {
      return localStorage.getItem(this.LAST) || localStorage.getItem("ng_last_v1") || "";
    } catch (e) {
      return "";
    }
  },

  getMute: function () {
    try { return localStorage.getItem(this.MUTE) === "1"; } catch (e) { return false; }
  },
  setMute: function (on) {
    try { localStorage.setItem(this.MUTE, on ? "1" : "0"); } catch (e) {}
  },
  getVol: function () {
    try {
      var n = parseFloat(localStorage.getItem(this.VOL));
      return isNaN(n) ? 0.7 : Math.max(0, Math.min(1, n));
    } catch (e) { return 0.7; }
  },
  setVol: function (v) {
    try { localStorage.setItem(this.VOL, String(v)); } catch (e) {}
  },
  getAutoRead: function () {
    try { return localStorage.getItem(this.AUTOREAD) === "1"; } catch (e) { return false; }
  },
  setAutoRead: function (on) {
    try { localStorage.setItem(this.AUTOREAD, on ? "1" : "0"); } catch (e) {}
  },

  worldBadgeCount: function (save, world) {
    var n = 0;
    var row = save.badges[world] || [];
    for (var i = 0; i < 7; i++) if (row[i]) n++;
    return n;
  },
  totalBadges: function (save) {
    var n = 0, w;
    for (w = 0; w < 7; w++) n += this.worldBadgeCount(save, w);
    return n;
  },
  worldsDone: function (save) {
    var n = 0, w;
    for (w = 0; w < 7; w++) if (save.complete[w]) n++;
    return n;
  },
  allDone: function (save) {
    return this.worldsDone(save) >= 7;
  },

  syncUnlock: function (save) {
    var w;
    for (w = 0; w < 7; w++) {
      save.complete[w] = this.worldBadgeCount(save, w) >= 7 ? 1 : 0;
    }
    save.unlocked = 1;
    for (w = 0; w < 7; w++) {
      if (save.complete[w]) save.unlocked = Math.min(7, w + 2);
      else break;
    }
    if (save.complete[6]) save.unlocked = 7;
  },

  ensureExtras: function (save) {
    if (!save.wrongs || save.wrongs.length !== 7) save.wrongs = [0, 0, 0, 0, 0, 0, 0];
    if (typeof save.hero !== "string") save.hero = save.hero || "";
    save.grade = NG.normalizeGrade ? NG.normalizeGrade(save.grade) : (save.grade === 3 || save.grade === 4 || save.grade === 5 ? save.grade : 0);
    if (save.resume != null && typeof save.resume === "object") {
      var r = save.resume;
      var mode = r.mode === "world" ? "world" : "hub";
      var wid = typeof r.worldId === "number" ? r.worldId : 0;
      if (mode === "world" && (wid < 0 || wid > 6)) {
        mode = "hub";
        wid = 0;
      }
      save.resume = {
        mode: mode,
        worldId: mode === "world" ? wid : (typeof r.worldId === "number" ? r.worldId : 0),
        x: typeof r.x === "number" ? r.x : 0,
        y: typeof r.y === "number" ? r.y : 0
      };
    } else {
      save.resume = null;
    }
    return save;
  },

  writeResumeFromGame: function (save, game) {
    if (!save || !game || !game.player) return;
    var mode = game.mode === "world" ? "world" : "hub";
    var worldId = typeof game.worldId === "number" ? game.worldId : 0;
    if (mode === "world" && (worldId < 0 || worldId > 6)) {
      mode = "hub";
      worldId = 0;
    }
    save.resume = {
      mode: mode,
      worldId: mode === "world" ? worldId : (typeof game.worldId === "number" ? game.worldId : 0),
      x: game.player.x,
      y: game.player.y
    };
  },

  captureResume: function (save, game) {
    if (!save) return;
    this.ensureExtras(save);
    if (game && game.player) this.writeResumeFromGame(save, game);
    this.persist(save);
  },

  clearResume: function (save) {
    if (!save) return;
    save.resume = null;
    this.persist(save);
  },

  setGrade: function (save, grade) {
    var g = NG.normalizeGrade ? NG.normalizeGrade(grade) : 0;
    if (!g) return { ok: false, error: "Pick grade 3, 4, or 5." };
    save.grade = g;
    this.persist(save);
    return { ok: true, grade: g };
  },

  heartsLeft: function (save, world) {
    this.ensureExtras(save);
    return Math.max(0, 3 - (save.wrongs[world] || 0));
  },

  recordWrong: function (save, world) {
    this.ensureExtras(save);
    save.wrongs[world] = (save.wrongs[world] || 0) + 1;
    if (typeof NG !== "undefined" && NG.Game && NG.Game.player) {
      this.writeResumeFromGame(save, NG.Game);
    }
    this.persist(save);
    return save.wrongs[world];
  },

  resetWorld: function (save, world) {
    this.ensureExtras(save);
    save.badges[world] = [0, 0, 0, 0, 0, 0, 0];
    save.complete[world] = 0;
    save.wrongs[world] = 0;
    this.syncUnlock(save);
    this.persist(save);
  },

  setHero: function (save, heroId) {
    save.hero = heroId;
    this.persist(save);
  },

  earnBadge: function (save, world, index) {
    this.ensureExtras(save);
    save.badges[world][index] = 1;
    this.syncUnlock(save);
    if (save.complete[world]) save.wrongs[world] = 0;
    if (typeof NG !== "undefined" && NG.Game && NG.Game.player) {
      this.writeResumeFromGame(save, NG.Game);
    }
    this.persist(save);
    return save.complete[world] === 1;
  },

  register: function (name, pin, pin2) {
    name = this.sanitizeName(name);
    if (!name) return { ok: false, error: "Type a classroom nickname (not your real full name)." };
    if (!this.validPin(pin)) return { ok: false, error: "Password must be 4–6 letters or numbers." };
    if (this.sanitizePin(pin) !== this.sanitizePin(pin2 || pin)) {
      return { ok: false, error: "Those passwords don’t match. Type the same one twice." };
    }
    if (this.load(name)) {
      return { ok: false, error: "That nickname is already taken on this computer. Tap Returning player." };
    }
    var save = this.blank(name);
    save.pinHash = this.hashPin(name, pin);
    this.persist(save);
    return { ok: true, save: save };
  },

  login: function (name, pin) {
    name = this.sanitizeName(name);
    if (!name) return { ok: false, error: "Type your classroom nickname." };
    if (!this.validPin(pin)) return { ok: false, error: "Password must be 4–6 letters or numbers." };
    var save = this.load(name);
    if (!save) return { ok: false, error: "No player with that name. Tap New player to start." };
    if (!save.pinHash) {
      save.pinHash = this.hashPin(name, pin);
      this.persist(save);
      return { ok: true, save: save, migrated: true };
    }
    if (save.pinHash !== this.hashPin(name, pin)) {
      return { ok: false, error: "Wrong password. Try again, or ask a teacher." };
    }
    return { ok: true, save: save };
  },

  changePin: function (save, oldPin, newPin, newPin2) {
    if (!save) return { ok: false, error: "Not logged in." };
    if (save.pinHash && save.pinHash !== this.hashPin(save.name, oldPin)) {
      return { ok: false, error: "Current password is wrong." };
    }
    if (!this.validPin(newPin)) return { ok: false, error: "New password must be 4–6 letters or numbers." };
    if (this.sanitizePin(newPin) !== this.sanitizePin(newPin2 || newPin)) {
      return { ok: false, error: "New passwords don’t match." };
    }
    save.pinHash = this.hashPin(save.name, newPin);
    this.persist(save);
    return { ok: true };
  },

  needsPin: function (save) {
    return !save || !save.pinHash;
  },

  packBits: function (save) {
    var bits = [];
    var w, b, p = 0;
    for (w = 0; w < 7; w++) {
      for (b = 0; b < 7; b++) {
        var v = save.badges[w][b] ? 1 : 0;
        bits.push(v);
        p ^= v;
      }
    }
    bits.push(p);
    return bits;
  },

  encodeBackup: function (save) {
    var bits = this.packBits(save);
    while (bits.length % 5 !== 0) bits.push(0);
    var out = "";
    for (var i = 0; i < bits.length; i += 5) {
      var n = (bits[i] << 4) | (bits[i + 1] << 3) | (bits[i + 2] << 2) | (bits[i + 3] << 1) | bits[i + 4];
      out += this.ABC.charAt(n);
    }
    return out.slice(0, 10);
  },

  decodeBackup: function (code) {
    var raw = String(code || "").toUpperCase().replace(/[^23456789ABCDEFGHJKLMNPQRSTUVWXYZ]/g, "");
    if (raw.length !== 10) {
      return { ok: false, error: "Backup codes are 10 letters/numbers (no 0, O, 1, or I)." };
    }
    var bits = [];
    for (var i = 0; i < raw.length; i++) {
      var n = this.ABC.indexOf(raw.charAt(i));
      if (n < 0) return { ok: false, error: "That code has a letter we don’t use. Try again." };
      bits.push((n >> 4) & 1);
      bits.push((n >> 3) & 1);
      bits.push((n >> 2) & 1);
      bits.push((n >> 1) & 1);
      bits.push(n & 1);
    }
    var p = 0;
    for (i = 0; i < 49; i++) p ^= bits[i];
    if (p !== bits[49]) {
      return { ok: false, error: "That code doesn’t check out. Double-check it." };
    }
    var save = this.blank("Guardian");
    var idx = 0, w, b;
    for (w = 0; w < 7; w++) {
      for (b = 0; b < 7; b++) save.badges[w][b] = bits[idx++] ? 1 : 0;
    }
    this.syncUnlock(save);
    return { ok: true, save: save, pretty: raw.slice(0, 5) + "-" + raw.slice(5) };
  },

  prettyBackup: function (save) {
    var c = this.encodeBackup(save);
    return c.slice(0, 5) + "-" + c.slice(5);
  },

  applyBackupTo: function (save, code) {
    var res = this.decodeBackup(code);
    if (!res.ok) return res;
    save.badges = res.save.badges;
    save.complete = res.save.complete;
    save.unlocked = res.save.unlocked;
    this.persist(save);
    return { ok: true, save: save };
  },

  encode: function (save) { return this.encodeBackup(save); },
  decode: function (code) { return this.decodeBackup(code); }
};
