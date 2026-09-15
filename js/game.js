/* Badge Quest: Net Guardians — canvas world, player, particles, camera */
var NG = window.NG = window.NG || {};

NG.THEMES = [
  { floor: "#6ecf72", alt: "#5fbf66", path: "#d9c27e", wall: "#3f7c38", wall2: "#2e5c2a", accent: "#ffe566", water: "#3aa0d8", water2: "#7fd0f0", deco: "#247a32", sky0: "#8fd9ff", sky1: "#d4f7c8", shrine: "#7dffb3", name: "#1d5c28" },
  { floor: "#f5b6d0", alt: "#eea4c4", path: "#fbe0ee", wall: "#c45b8a", wall2: "#8e3360", accent: "#ffd1e8", water: "#e88ab8", water2: "#ffc3de", deco: "#e06b9f", sky0: "#ffd2ea", sky1: "#ffeef7", shrine: "#ff8ec8", name: "#8e3360" },
  { floor: "#8fb4e8", alt: "#7aa3dc", path: "#c9d9f2", wall: "#3d5a92", wall2: "#2a3f6c", accent: "#ffd36a", water: "#4c86d1", water2: "#9ec6ff", deco: "#5b7ec0", sky0: "#b7d4ff", sky1: "#e8f1ff", shrine: "#9ad4ff", name: "#2a3f6c" },
  { floor: "#8a8f9e", alt: "#7b8090", path: "#c4b48a", wall: "#4a4f5c", wall2: "#2f333d", accent: "#f0c14a", water: "#5b6d8a", water2: "#90a4c0", deco: "#d1a33a", sky0: "#6d7380", sky1: "#c5b48a", shrine: "#ffe08a", name: "#2f333d" },
  { floor: "#4f8f4a", alt: "#427a3e", path: "#8b6a3a", wall: "#2d5a28", wall2: "#1c3b1a", accent: "#c4e38a", water: "#2e6e8a", water2: "#6db3cc", deco: "#1f6b28", sky0: "#87c4ff", sky1: "#b7e39a", shrine: "#b6ff7a", name: "#1c3b1a" },
  { floor: "#4b4e9a", alt: "#40438a", path: "#6b6ed0", wall: "#2b1f66", wall2: "#1a1444", accent: "#7dfff0", water: "#3a3dcc", water2: "#8a8cff", deco: "#7dfff0", sky0: "#1a1444", sky1: "#4b4e9a", shrine: "#7dfff0", name: "#e8ffff" },
  { floor: "#e8d2a8", alt: "#d9c296", path: "#c4a878", wall: "#3d8a88", wall2: "#246663", accent: "#7dffd6", water: "#2f8fbe", water2: "#7fd4f2", deco: "#2a7a78", sky0: "#9ee7ff", sky1: "#ffe7b8", shrine: "#7dffe6", name: "#164e4c" }
];

NG.HUB_THEME = {
  floor: "#79c96a", alt: "#6bb85e", path: "#d7c07a", wall: "#3e7a36", wall2: "#2d5a28",
  accent: "#ffe566", water: "#3aa0d8", water2: "#7fd0f0", deco: "#247a32",
  sky0: "#8fd9ff", sky1: "#c8f7b8", shrine: "#ffe566", name: "#1d5c28"
};

NG.GATE_COLORS = ["#3f7c38", "#c45b8a", "#3d5a92", "#d1a33a", "#2d5a28", "#4b4e9a", "#2a7a78"];

NG.clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
NG.lerp = function (a, b, t) { return a + (b - a) * t; };
NG.rand = function (a, b) { return a + Math.random() * (b - a); };
NG.hash2 = function (x, y) {
  var n = ((x | 0) * 73856093) ^ ((y | 0) * 19349663);
  n = (n << 13) ^ n;
  n = (n * (n * n * 15731 + 789221) + 1376312589) | 0;
  return ((n >>> 0) % 10000) / 10000;
};
NG.mixHex = function (hex, amt) {
  if (!hex || hex[0] !== "#" || hex.length < 7) return hex;
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  if (amt > 0) {
    r = r + (255 - r) * amt; g = g + (255 - g) * amt; b = b + (255 - b) * amt;
  } else {
    r *= (1 + amt); g *= (1 + amt); b *= (1 + amt);
  }
  r = NG.clamp(r | 0, 0, 255); g = NG.clamp(g | 0, 0, 255); b = NG.clamp(b | 0, 0, 255);
  return "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

NG.Game = {
  canvas: null,
  ctx: null,
  save: null,
  mode: "hub",
  worldId: 0,
  map: null,
  player: { x: 0, y: 0, vx: 0, vy: 0, dir: 2, frame: 0, walking: false },
  keys: {},
  pad: { x: 0, y: 0 },
  target: null,
  particles: [],
  time: 0,
  lastTs: 0,
  frozen: false,
  overlap: "",
  banner: "",
  bannerT: 0,
  toast: "",
  toastT: 0,
  running: false,
  dpr: 1,

  boot: function (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.bindInput();
    this.resize();
    var self = this;
    window.addEventListener("resize", function () { self.resize(); });
  },

  resize: function () {
    var wrap = document.getElementById("stage-wrap");
    if (!wrap || !this.canvas) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    var w = Math.max(320, wrap.clientWidth);
    var h = Math.max(240, wrap.clientHeight);
    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cssW = w;
    this.cssH = h;
  },

  bindInput: function () {
    var self = this;
    function typingTarget(el) {
      if (!el || !el.tagName) return false;
      var t = el.tagName.toLowerCase();
      return t === "input" || t === "textarea" || t === "select" || el.isContentEditable;
    }
    window.addEventListener("keydown", function (e) {
      if (typingTarget(e.target)) return;
      var k = e.key.toLowerCase();
      if (k === "escape" && typeof NG.UI !== "undefined") {
        NG.UI.togglePause();
        return;
      }
      if (self.frozen) return;
      self.keys[k] = true;
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].indexOf(k) >= 0) e.preventDefault();
      if (k === "m") NG.UI.toggleMute();
    });
    window.addEventListener("keyup", function (e) {
      self.keys[e.key.toLowerCase()] = false;
    });
    window.addEventListener("blur", function () {
      self.keys = {};
      self.pad = { x: 0, y: 0 };
    });
    this.canvas.addEventListener("pointerdown", function (e) {
      if (self.frozen) return;
      var rect = self.canvas.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var my = e.clientY - rect.top;
      var v = self.viewParams();
      self.target = { x: (mx - v.ox) / v.scale, y: (my - v.oy) / v.scale };
    });
  },

  setPad: function (x, y) {
    this.pad.x = x;
    this.pad.y = y;
    if (x || y) this.target = null;
  },

  forceUnstick: function () {
    this.frozen = false;
    this.keys = {};
    this.pad = { x: 0, y: 0 };
    this.target = null;
    this.overlap = "";
    if (typeof NG.UI !== "undefined" && NG.UI.hideBlockingModals) NG.UI.hideBlockingModals();
    this.showToast("Unstuck! Use arrows, WASD, or the D-pad.");
  },

  enterHub: function (save) {
    this.save = save;
    this.mode = "hub";
    this.worldId = -1;
    this.map = NG.parseMap(NG.HUB_MAP);
    this.placePlayer(this.map.spawn.x, this.map.spawn.y);
    this.frozen = false;
    this.overlap = "";
    this.showBanner("World Hub", "Walk or tap a numbered gate to enter a world");
    this.burst(this.player.x, this.player.y, NG.HUB_THEME.accent, 12);
    if (NG.Audio && NG.Audio.setMood) NG.Audio.setMood("hub");
  },

  enterWorld: function (id) {
    this.worldId = id;
    this.mode = "world";
    this.map = NG.parseMap(NG.WORLD_MAPS[id]);
    this.placePlayer(this.map.spawn.x, this.map.spawn.y);
    this.frozen = false;
    this.overlap = "";
    var w = NG.WORLDS[id];
    this.showBanner(w.name, w.theme + " — 7 shrines · only 2 wrongs allowed!");
    this.burst(this.player.x, this.player.y, NG.THEMES[id].shrine, 16);
    if (NG.Audio && NG.Audio.setMood) NG.Audio.setMood("world");
  },

  placePlayer: function (tx, ty) {
    this.player.x = (tx + 0.5) * NG.TILE;
    this.player.y = (ty + 0.5) * NG.TILE;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.dir = 0;
    this.target = null;
  },

  showBanner: function (title, sub) {
    this.banner = title;
    this.bannerSub = sub;
    this.bannerT = 2.6;
    var el = document.getElementById("world-banner");
    if (el) {
      el.innerHTML = "<strong>" + this.esc(title) + "</strong><span>" + this.esc(sub) + "</span>";
      el.classList.add("show");
      var self = this;
      clearTimeout(this._bt);
      this._bt = setTimeout(function () { el.classList.remove("show"); }, 2600);
    }
  },

  showToast: function (msg) {
    this.toast = msg;
    this.toastT = 2.2;
    var el = document.getElementById("toast");
    if (el) {
      el.textContent = msg;
      el.classList.add("show");
      clearTimeout(this._tt);
      this._tt = setTimeout(function () { el.classList.remove("show"); }, 2200);
    }
  },

  esc: function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  },

  theme: function () {
    return this.mode === "hub" ? NG.HUB_THEME : NG.THEMES[this.worldId];
  },

  viewParams: function () {
    var vw = this.cssW || 800;
    var vh = this.cssH || 480;
    var mapW = this.map.w * NG.TILE;
    var mapH = this.map.h * NG.TILE;
    var scale = Math.min(vw / mapW, vh / mapH);
    if (scale > 2.1) scale = 2.1;
    if (scale < 0.7) scale = 0.7;
    var ox = (vw - mapW * scale) / 2;
    var oy = (vh - mapH * scale) / 2;
    this.view = { vw: vw, vh: vh, scale: scale, ox: ox, oy: oy, mapW: mapW, mapH: mapH };
    return this.view;
  },

  camera: function () {
    var mapW = this.map.w * NG.TILE;
    var mapH = this.map.h * NG.TILE;
    return { cx: 0, cy: 0, vw: mapW, vh: mapH, mapW: mapW, mapH: mapH };
  },

  tileAt: function (px, py) {
    var tx = Math.floor(px / NG.TILE);
    var ty = Math.floor(py / NG.TILE);
    if (!this.map || ty < 0 || tx < 0 || ty >= this.map.h || tx >= this.map.w) return "#";
    return this.map.tiles[ty][tx];
  },

  blocked: function (px, py) {
    var hw = 11, hh = 8;
    var pts = [
      [px - hw, py - hh], [px + hw, py - hh],
      [px - hw, py + hh], [px + hw, py + hh]
    ];
    for (var i = 0; i < pts.length; i++) {
      if (NG.isSolid(this.tileAt(pts[i][0], pts[i][1]))) return true;
    }
    return false;
  },

  loop: function (ts) {
    if (!this.running) return;
    var self = this;
    try {
      if (!this.lastTs) this.lastTs = ts;
      var dt = Math.min(0.05, (ts - this.lastTs) / 1000);
      this.lastTs = ts;
      this.time += dt;
      // Live modal check — sticky frozen flag alone must never trap kids
      var block = (typeof NG.UI !== "undefined" && NG.UI.shouldBeFrozen) ? NG.UI.shouldBeFrozen() : this.frozen;
      this.frozen = !!block;
      if (!block) this.update(dt);
      this.draw();
    } catch (err) {
      console.error("Badge Quest frame error", err);
      this.frozen = false;
      this.keys = {};
      this.pad = { x: 0, y: 0 };
      this.target = null;
      try { this.showToast("Glitch fixed — try moving again!"); } catch (e2) {}
    }
    requestAnimationFrame(function (t) { self.loop(t); });
  },

  startLoop: function () {
    if (this.running) return;
    this.running = true;
    this.lastTs = 0;
    var self = this;
    requestAnimationFrame(function (t) { self.loop(t); });
  },

  update: function (dt) {
    var ix = 0, iy = 0;
    if (this.keys.arrowleft || this.keys.a) ix -= 1;
    if (this.keys.arrowright || this.keys.d) ix += 1;
    if (this.keys.arrowup || this.keys.w) iy -= 1;
    if (this.keys.arrowdown || this.keys.s) iy += 1;
    ix += this.pad.x;
    iy += this.pad.y;
    if (ix || iy) this.target = null;

    var speed = 168;
    if (this.target) {
      var dx = this.target.x - this.player.x;
      var dy = this.target.y - this.player.y;
      var dist = Math.hypot(dx, dy);
      if (dist < 8) this.target = null;
      else {
        ix = dx / dist;
        iy = dy / dist;
      }
    }

    var len = Math.hypot(ix, iy);
    if (len > 1) { ix /= len; iy /= len; }

    this.player.walking = len > 0.05;
    if (this.player.walking) {
      if (Math.abs(ix) > Math.abs(iy)) this.player.dir = ix > 0 ? 1 : 3;
      else this.player.dir = iy > 0 ? 2 : 0;
      this.player.frame += dt * 8;
      if (Math.floor(this.time * 6) !== Math.floor((this.time - dt) * 6)) { try { NG.Audio.step(); } catch (e) {} }
    }

    var nx = this.player.x + ix * speed * dt;
    var ny = this.player.y + iy * speed * dt;
    if (!this.blocked(nx, this.player.y)) this.player.x = nx;
    else this.target = null;
    if (!this.blocked(this.player.x, ny)) this.player.y = ny;
    else this.target = null;

    this.player.x = NG.clamp(this.player.x, NG.TILE * 0.4, (this.map.w - 0.4) * NG.TILE);
    this.player.y = NG.clamp(this.player.y, NG.TILE * 0.4, (this.map.h - 0.4) * NG.TILE);

    this.updateParticles(dt);
    this.ambient();
    this.checkTriggers();
  },

  ambient: function () {
    var th = this.theme();
    if (Math.random() < 0.28) {
      this.particles.push({
        x: this.player.x + NG.rand(-240, 240),
        y: this.player.y + NG.rand(-160, 160),
        vx: NG.rand(-10, 10), vy: NG.rand(-22, -8),
        life: 1.4, max: 1.4, size: NG.rand(1.6, 3.4),
        color: th.accent, kind: "spark"
      });
    }
    if (this.mode === "world" && this.map && this.map.shrines && Math.random() < 0.45) {
      var s = this.map.shrines[(Math.random() * this.map.shrines.length) | 0];
      var T = NG.TILE;
      this.particles.push({
        x: (s.x + 0.5) * T + NG.rand(-8, 8),
        y: (s.y + 0.35) * T + NG.rand(-18, 4),
        vx: NG.rand(-6, 6), vy: NG.rand(-28, -10),
        life: 0.9, max: 0.9, size: NG.rand(2, 4),
        color: th.shrine, kind: "spark"
      });
    }
  },

  burst: function (x, y, color, n) {
    n = n || 22;
    for (var i = 0; i < n; i++) {
      var a = (Math.PI * 2 * i) / n + NG.rand(-0.2, 0.2);
      var s = NG.rand(50, 170);
      this.particles.push({
        x: x, y: y,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        life: NG.rand(0.45, 1.0), max: 1.0,
        size: NG.rand(3, 7), color: color, kind: "burst"
      });
    }
  },

  confetti: function (x, y) {
    var colors = ["#ffd166", "#ef476f", "#06d6a0", "#118ab2", "#fff", "#c77dff", "#ff8fab"];
    for (var i = 0; i < 48; i++) {
      this.particles.push({
        x: x, y: y,
        vx: NG.rand(-180, 180), vy: NG.rand(-260, -50),
        life: NG.rand(0.9, 1.6), max: 1.6,
        size: NG.rand(4, 9), color: colors[i % colors.length], kind: "confetti",
        rot: Math.random() * 6
      });
    }
  },

  updateParticles: function (dt) {
    var next = [];
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.kind === "confetti") { p.vy += 280 * dt; p.rot = (p.rot || 0) + dt * 8; }
      if (p.kind === "burst") p.vy += 40 * dt;
      if (p.life > 0) next.push(p);
    }
    this.particles = next.length > 200 ? next.slice(-200) : next;
  },
  checkTriggers: function () {
    var tx = Math.floor(this.player.x / NG.TILE);
    var ty = Math.floor(this.player.y / NG.TILE);
    var ch = this.tileAt(this.player.x, this.player.y);
    var id = ch + ":" + tx + ":" + ty;
    if (id === this.overlap) return;
    if ("1234567*PX".indexOf(ch) < 0 && ch !== "P") {
      this.overlap = "";
      return;
    }
    this.overlap = id;

    if (this.mode === "hub") {
      if (ch >= "1" && ch <= "7") {
        var wid = ch.charCodeAt(0) - 49;
        if (wid < this.save.unlocked) {
          NG.Audio.portal();
          NG.UI.enterWorld(wid);
        } else {
          this.showToast("Complete the earlier worlds to unlock this gate!");
          NG.Audio.wrong();
        }
      } else if (ch === "X") {
        if (NG.Save.allDone(this.save)) {
          NG.Audio.fanfare();
          NG.UI.showCertificate();
        } else {
          this.showToast("Finish all 7 worlds to open the Hall of Guardians.");
        }
      }
      return;
    }

    if (ch === "*") {
      var shrine = null;
      for (var i = 0; i < this.map.shrines.length; i++) {
        if (this.map.shrines[i].x === tx && this.map.shrines[i].y === ty) shrine = this.map.shrines[i];
      }
      if (!shrine) return;
      var badges = this.save && this.save.badges && this.save.badges[this.worldId];
      if (badges && badges[shrine.index]) {
        this.showToast("You already earned this badge. Nice work!");
        return;
      }
      if (NG.UI && NG.UI.openQuestion) NG.UI.openQuestion(this.worldId, shrine.index);
    } else if (ch === "P") {
      if (NG.Save.worldBadgeCount(this.save, this.worldId) >= 7) {
        NG.Audio.portal();
        this.burst(this.player.x, this.player.y, "#ffe566", 24);
        NG.UI.returnHub("Portal home! " + NG.WORLDS[this.worldId].medal + " secured.");
      } else {
        var left = 7 - NG.Save.worldBadgeCount(this.save, this.worldId);
        this.showToast(left + " more badge" + (left === 1 ? "" : "s") + " to open the portal.");
      }
    }
  },

  draw: function () {
    var ctx = this.ctx;
    if (!ctx || !this.map) return;
    var v = this.viewParams();
    var cam = this.camera();
    var th = this.theme();
    var g = ctx.createLinearGradient(0, 0, 0, v.vh);
    g.addColorStop(0, th.sky0);
    g.addColorStop(0.55, th.sky1 || th.sky0);
    g.addColorStop(1, th.floor);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, v.vw, v.vh);

    /* Slow sky haze — cheap parallax blobs */
    ctx.save();
    ctx.globalAlpha = 0.12;
    var i;
    for (i = 0; i < 4; i++) {
      var cx = ((this.time * (8 + i * 3) + i * 180) % (v.vw + 160)) - 80;
      var cy = 28 + i * 18 + Math.sin(this.time * 0.4 + i) * 6;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(cx, cy, 54 + i * 10, 14 + i * 2, 0, 0, 6.3);
      ctx.fill();
    }
    ctx.restore();

    ctx.fillStyle = th.wall2;
    ctx.fillRect(v.ox - 8, v.oy - 8, v.mapW * v.scale + 16, v.mapH * v.scale + 22);
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.fillRect(v.ox - 4, v.oy + v.mapH * v.scale + 2, v.mapW * v.scale + 8, 10);

    ctx.save();
    ctx.translate(v.ox, v.oy);
    ctx.scale(v.scale, v.scale);
    this.drawTiles(ctx, th, cam);
    this.drawWalls(ctx, th, cam);
    this.drawSorted(ctx, th);
    this.drawParticles(ctx);
    ctx.restore();

    this.drawVignette(ctx, v);
  },

  drawVignette: function (ctx, v) {
    var grd = ctx.createRadialGradient(v.vw * 0.5, v.vh * 0.48, Math.min(v.vw, v.vh) * 0.38, v.vw * 0.5, v.vh * 0.5, Math.max(v.vw, v.vh) * 0.72);
    grd.addColorStop(0, "rgba(0,0,0,0)");
    grd.addColorStop(1, "rgba(6,8,18,0.38)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, v.vw, v.vh);
  },

  drawTiles: function (ctx, th, cam) {
    var T = NG.TILE;
    var x0 = Math.max(0, Math.floor(cam.cx / T) - 1);
    var y0 = Math.max(0, Math.floor(cam.cy / T) - 1);
    var x1 = Math.min(this.map.w, Math.ceil((cam.cx + cam.vw) / T) + 1);
    var y1 = Math.min(this.map.h, Math.ceil((cam.cy + cam.vh) / T) + 1);
    var x, y, ch, px, py, h;
    var t = this.time;
    for (y = y0; y < y1; y++) {
      for (x = x0; x < x1; x++) {
        ch = this.map.tiles[y][x];
        px = x * T; py = y * T;
        if (ch === "#") {
          /* Ground under wall so south faces have a floor color behind them */
          ctx.fillStyle = (x + y) % 2 === 0 ? th.floor : th.alt;
          ctx.fillRect(px, py, T, T);
          continue;
        }
        if (ch === "~") {
          this.drawWaterTile(ctx, px, py, T, th, t, x, y);
          continue;
        }
        ctx.fillStyle = (x + y) % 2 === 0 ? th.floor : th.alt;
        ctx.fillRect(px, py, T, T);
        /* Faux isometric bevel */
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + T, py);
        ctx.lineTo(px, py + T);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(0,0,0,0.06)";
        ctx.fillRect(px, py + T - 3, T, 3);

        if (ch === "," || ch === "=" || (ch === "@" && this.mode === "hub")) {
          this.drawPathTile(ctx, px, py, T, th, x, y, ch === "=");
        } else if (ch === ".") {
          this.drawGrassTufts(ctx, px, py, T, th, x, y);
        }
      }
    }
  },

  drawGrassTufts: function (ctx, px, py, T, th, x, y) {
    var h = NG.hash2(x, y);
    if (h < 0.38) return;
    ctx.fillStyle = NG.mixHex(th.deco, 0.08);
    var n = 1 + ((h * 10) | 0) % 3;
    var i;
    for (i = 0; i < n; i++) {
      var hx = NG.hash2(x + i * 3, y + 7);
      var hy = NG.hash2(x + 11, y + i * 5);
      var gx = px + 6 + hx * (T - 14);
      var gy = py + 10 + hy * (T - 16);
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx - 2.4, gy - 5 - hx * 3);
      ctx.lineTo(gx + 2.4, gy - 4 - hy * 3);
      ctx.closePath();
      ctx.fill();
    }
    if (h > 0.82) {
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.fillRect(px + 10 + h * 12, py + 8, 2.5, 2.5);
    }
  },

  drawPathTile: function (ctx, px, py, T, th, x, y, bridge) {
    ctx.fillStyle = th.path;
    ctx.fillRect(px + 3, py + 3, T - 6, T - 6);
    ctx.fillStyle = NG.mixHex(th.path, 0.18);
    ctx.fillRect(px + 3, py + 3, T - 6, 4);
    ctx.fillStyle = NG.mixHex(th.path, -0.16);
    ctx.fillRect(px + 3, py + T - 8, T - 6, 5);
    var wear = NG.hash2(x * 2, y * 3);
    ctx.fillStyle = "rgba(90,60,20,0.18)";
    ctx.beginPath(); ctx.ellipse(px + 10 + wear * 16, py + 14 + wear * 10, 5, 2.4, 0, 0, 6.3); ctx.fill();
    if (NG.hash2(x + 4, y) > 0.45) {
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(px + 8, py + 18, 3, 2);
    }
    if (bridge) {
      ctx.strokeStyle = "rgba(80,50,20,0.42)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px + 5, py + 12); ctx.lineTo(px + T - 5, py + 12);
      ctx.moveTo(px + 5, py + 22); ctx.lineTo(px + T - 5, py + 22);
      ctx.moveTo(px + 5, py + 32); ctx.lineTo(px + T - 5, py + 32);
      ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(px, py + T - 4, T, 6);
    }
  },

  drawWaterTile: function (ctx, px, py, T, th, t, x, y) {
    ctx.fillStyle = NG.mixHex(th.water, -0.12);
    ctx.fillRect(px, py, T, T);
    ctx.fillStyle = th.water;
    ctx.fillRect(px, py, T, T - 4);
    ctx.strokeStyle = th.water2;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.55;
    var wav = Math.sin(t * 2.2 + x * 0.7 + y * 0.9) * 3;
    ctx.beginPath();
    ctx.moveTo(px, py + 14 + wav);
    ctx.quadraticCurveTo(px + 20, py + 8 + wav, px + T, py + 16 + wav);
    ctx.stroke();
    ctx.globalAlpha = 0.35;
    var wav2 = Math.sin(t * 1.7 + x * 0.4 + y) * 2.5;
    ctx.beginPath();
    ctx.moveTo(px, py + 26 + wav2);
    ctx.quadraticCurveTo(px + 18, py + 22 + wav2, px + T, py + 28 + wav2);
    ctx.stroke();
    ctx.globalAlpha = 0.45 + Math.sin(t * 5 + x + y) * 0.2;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(px + 12 + Math.sin(t + y) * 6, py + 10, 5, 2, 0, 0, 6.3);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(px, py, T, 4);
  },

  drawWalls: function (ctx, th, cam) {
    var T = NG.TILE;
    var x0 = Math.max(0, Math.floor(cam.cx / T) - 1);
    var y0 = Math.max(0, Math.floor(cam.cy / T) - 1);
    var x1 = Math.min(this.map.w, Math.ceil((cam.cx + cam.vw) / T) + 1);
    var y1 = Math.min(this.map.h, Math.ceil((cam.cy + cam.vh) / T) + 2);
    var x, y, ch, px, py, below, left, right;
    var topH = 10;
    var faceH = 12;
    for (y = y0; y < y1; y++) {
      for (x = x0; x < x1; x++) {
        if (y >= this.map.h || x >= this.map.w) continue;
        ch = this.map.tiles[y][x];
        if (ch !== "#") continue;
        px = x * T; py = y * T;
        below = (y + 1 < this.map.h) ? this.map.tiles[y + 1][x] : "#";
        left = (x > 0) ? this.map.tiles[y][x - 1] : "#";
        right = (x + 1 < this.map.w) ? this.map.tiles[y][x + 1] : "#";

        if (below !== "#") {
          ctx.fillStyle = NG.mixHex(th.wall2, -0.08);
          ctx.fillRect(px, py + T - 2, T, faceH);
          ctx.fillStyle = th.wall2;
          ctx.fillRect(px + 1, py + T - 2, T - 2, faceH - 2);
          ctx.fillStyle = "rgba(0,0,0,0.18)";
          ctx.fillRect(px, py + T + faceH - 4, T, 3);
        }

        ctx.fillStyle = th.wall;
        ctx.fillRect(px, py - topH, T, T + 2);
        ctx.fillStyle = NG.mixHex(th.wall, 0.16);
        ctx.fillRect(px + 2, py - topH + 2, T - 4, 6);
        ctx.fillStyle = "rgba(255,255,255,0.14)";
        ctx.fillRect(px + 5, py - topH + 3, T - 14, 3);
        if (left !== "#") {
          ctx.fillStyle = "rgba(255,255,255,0.12)";
          ctx.fillRect(px, py - topH, 4, T + 2);
        }
        if (right !== "#") {
          ctx.fillStyle = "rgba(0,0,0,0.16)";
          ctx.fillRect(px + T - 3, py - topH, 3, T + 2);
        }
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fillRect(px, py + T - 8, T, 6);
      }
    }
  },

  drawSorted: function (ctx, th) {
    var items = [];
    var T = NG.TILE;
    var x, y, ch;
    for (y = 0; y < this.map.h; y++) {
      for (x = 0; x < this.map.w; x++) {
        ch = this.map.tiles[y][x];
        if ("TCH+F1234567*PXR".indexOf(ch) >= 0) {
          items.push({ x: x, y: y, ch: ch, sy: y * T + T });
        }
      }
    }
    items.push({ ch: "@hero", sy: this.player.y + 18, hx: this.player.x, hy: this.player.y });
    items.sort(function (a, b) { return a.sy - b.sy; });
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (it.ch === "@hero") this.drawHero(ctx, it.hx, it.hy);
      else this.drawProp(ctx, it.x, it.y, it.ch, th);
    }
  },

  drawProp: function (ctx, tx, ty, ch, th) {
    var T = NG.TILE;
    var px = tx * T + T / 2;
    var py = ty * T + T / 2;
    if (ch === "T") this.drawTree(ctx, px, py, th);
    else if (ch === "C") this.drawCrystal(ctx, px, py, th);
    else if (ch === "H") this.drawHeart(ctx, px, py);
    else if (ch === "+") this.drawLantern(ctx, px, py);
    else if (ch === "F") this.drawFountain(ctx, px, py, th);
    else if (ch === "R") this.drawRock(ctx, px, py);
    else if (ch === "*") this.drawShrine(ctx, px, py, tx, ty, th);
    else if (ch === "P") this.drawPortal(ctx, px, py, th);
    else if (ch === "X") this.drawCertDoor(ctx, px, py);
    else if (ch >= "1" && ch <= "7") this.drawGate(ctx, px, py, ch.charCodeAt(0) - 49);
  },

  groundShadow: function (ctx, x, y, rx, ry, a) {
    ctx.fillStyle = "rgba(0,0,0," + (a == null ? 0.22 : a) + ")";
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.3); ctx.fill();
  },

  drawTree: function (ctx, x, y, th) {
    this.groundShadow(ctx, x, y + 18, 16, 6, 0.22);
    ctx.fillStyle = "#5a3218";
    ctx.fillRect(x - 5, y - 2, 10, 20);
    ctx.fillStyle = "#7a4a24";
    ctx.fillRect(x - 4, y - 2, 4, 20);
    var i, cols = [NG.mixHex(th.deco, -0.12), th.deco, NG.mixHex(th.deco, 0.12)];
    ctx.fillStyle = cols[0];
    ctx.beginPath(); ctx.arc(x - 2, y - 12, 16, 0, 6.3); ctx.fill();
    ctx.fillStyle = cols[1];
    ctx.beginPath(); ctx.arc(x + 8, y - 16, 13, 0, 6.3); ctx.fill();
    ctx.fillStyle = cols[2];
    ctx.beginPath(); ctx.arc(x - 10, y - 8, 11, 0, 6.3); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    ctx.beginPath(); ctx.arc(x - 6, y - 18, 5, 0, 6.3); ctx.fill();
  },

  drawCrystal: function (ctx, x, y, th) {
    ctx.save();
    ctx.translate(x, y + 4);
    var bob = Math.sin(this.time * 3 + x) * 2.4;
    this.groundShadow(ctx, 0, 14, 11, 4, 0.22);
    ctx.translate(0, bob);
    ctx.fillStyle = th.accent;
    ctx.globalAlpha = 0.32;
    ctx.beginPath(); ctx.ellipse(0, 12, 12, 5, 0, 0, 6.3); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(0, -18); ctx.lineTo(11, 6); ctx.lineTo(0, 14); ctx.lineTo(-11, 6);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = NG.mixHex(th.accent, 0.45);
    ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(5, 2); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.55;
    ctx.beginPath(); ctx.moveTo(-2, -10); ctx.lineTo(2, 0); ctx.lineTo(-1, 2); ctx.closePath(); ctx.fill();
    ctx.restore();
  },

  drawHeart: function (ctx, x, y) {
    this.groundShadow(ctx, x, y + 14, 12, 5, 0.2);
    ctx.save();
    ctx.translate(x, y + Math.sin(this.time * 2.4 + x) * 1.5);
    ctx.fillStyle = "#c44575";
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.bezierCurveTo(-20, -2, -12, -18, 0, -7);
    ctx.bezierCurveTo(12, -18, 20, -2, 0, 12);
    ctx.fill();
    ctx.fillStyle = "#e85a8c";
    ctx.beginPath();
    ctx.moveTo(0, 9);
    ctx.bezierCurveTo(-16, -2, -10, -14, 0, -5);
    ctx.bezierCurveTo(10, -14, 16, -2, 0, 9);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath(); ctx.arc(-4, -4, 3.4, 0, 6.3); ctx.fill();
    ctx.restore();
  },

  drawLantern: function (ctx, x, y) {
    this.groundShadow(ctx, x, y + 16, 8, 4, 0.2);
    ctx.fillStyle = "#3a2a1a";
    ctx.fillRect(x - 2.5, y - 6, 5, 22);
    var glow = 0.4 + Math.sin(this.time * 4) * 0.22;
    ctx.fillStyle = "rgba(255,210,80," + glow + ")";
    ctx.beginPath(); ctx.arc(x, y - 14, 12, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#ffe566";
    ctx.beginPath(); ctx.arc(x, y - 14, 5, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#fff6c2";
    ctx.beginPath(); ctx.arc(x - 1.5, y - 16, 2, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#5a3a1a";
    ctx.fillRect(x - 6, y - 20, 12, 4);
  },

  drawFountain: function (ctx, x, y, th) {
    this.groundShadow(ctx, x, y + 16, 20, 7, 0.2);
    ctx.fillStyle = "#7a8490";
    ctx.beginPath(); ctx.ellipse(x, y + 10, 24, 11, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#cfd6de";
    ctx.beginPath(); ctx.ellipse(x, y + 7, 22, 9, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = th.water;
    ctx.beginPath(); ctx.ellipse(x, y + 6, 15, 6, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = th.water2;
    var jet = Math.abs(Math.sin(this.time * 3.2));
    ctx.globalAlpha = 0.8;
    ctx.beginPath(); ctx.arc(x, y - 10 - jet * 8, 4.5, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(x - 6, y - 2 - jet * 3, 3, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 6, y - 2 - jet * 3, 3, 0, 6.3); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#cfd6de";
    ctx.fillRect(x - 3.5, y - 8, 7, 14);
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.35;
    ctx.fillRect(x - 2, y - 7, 2, 12);
    ctx.globalAlpha = 1;
  },

  drawRock: function (ctx, x, y) {
    this.groundShadow(ctx, x, y + 12, 16, 6, 0.22);
    ctx.fillStyle = "#5e646e";
    ctx.beginPath(); ctx.ellipse(x + 1, y + 7, 15, 9, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#7a7f88";
    ctx.beginPath(); ctx.ellipse(x, y + 4, 14, 10, -0.15, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#b0b6c0";
    ctx.beginPath(); ctx.ellipse(x - 5, y + 1, 7, 4.5, -0.3, 0, 6.3); ctx.fill();
  },

  shrineDone: function (tx, ty) {
    if (this.mode !== "world") return false;
    for (var i = 0; i < this.map.shrines.length; i++) {
      if (this.map.shrines[i].x === tx && this.map.shrines[i].y === ty) {
        return !!this.save.badges[this.worldId][this.map.shrines[i].index];
      }
    }
    return false;
  },

  drawShrine: function (ctx, x, y, tx, ty, th) {
    var done = this.shrineDone(tx, ty);
    var pulse = 0.5 + Math.sin(this.time * 4 + x) * 0.5;
    ctx.save();
    ctx.translate(x, y);
    this.groundShadow(ctx, 0, 16, 16, 6, 0.22);

    /* Light beam */
    var beam = ctx.createLinearGradient(0, -52, 0, 8);
    beam.addColorStop(0, "rgba(255,255,255,0)");
    beam.addColorStop(0.45, done ? "rgba(255,225,80,0.16)" : "rgba(180,255,230,0.12)");
    beam.addColorStop(1, done ? "rgba(255,209,102,0.38)" : "rgba(125,255,179,0.28)");
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(-7, 8); ctx.lineTo(-16, -52); ctx.lineTo(16, -52); ctx.lineTo(7, 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = done ? "rgba(255,225,80,0.4)" : th.shrine;
    ctx.globalAlpha = done ? 0.75 : 0.28 + pulse * 0.4;
    ctx.beginPath(); ctx.arc(0, 8, 20, 0, 6.3); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#d9cba6";
    ctx.fillRect(-13, 2, 26, 10);
    ctx.fillStyle = "#efe6c8";
    ctx.beginPath(); ctx.ellipse(0, 4, 16, 7, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#c4b48a";
    ctx.fillRect(-16, 10, 6, 8); ctx.fillRect(10, 10, 6, 8);

    ctx.fillStyle = done ? "#ffd166" : th.accent;
    var bob = Math.sin(this.time * 3 + x * 0.1) * 3;
    ctx.save();
    ctx.translate(0, bob - 10);
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(9, 0);
    ctx.lineTo(0, 10);
    ctx.lineTo(-9, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.65;
    ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(3.5, -1); ctx.lineTo(0, 2); ctx.closePath(); ctx.fill();
    if (done) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#2d6a4f";
      ctx.font = "bold 15px Trebuchet MS, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("★", 0, 4);
    }
    ctx.restore();
    ctx.restore();
  },

  drawPortal: function (ctx, x, y, th) {
    var open = this.mode === "world" && NG.Save.worldBadgeCount(this.save, this.worldId) >= 7;
    ctx.save();
    ctx.translate(x, y);
    this.groundShadow(ctx, 0, 20, 18, 7, 0.28);
    var t = this.time;
    ctx.fillStyle = open ? "#d4b45a" : "#5a6270";
    ctx.beginPath(); ctx.ellipse(0, 18, 16, 6, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#3a331f";
    ctx.fillRect(-18, 4, 8, 14); ctx.fillRect(10, 4, 8, 14);
    ctx.fillStyle = open ? "#f0c14a" : "#8a909a";
    ctx.fillRect(-18, 0, 8, 6); ctx.fillRect(10, 0, 8, 6);

    for (var i = 4; i >= 0; i--) {
      ctx.strokeStyle = open ? "#7dfff0" : "#9aa3b0";
      ctx.globalAlpha = open ? 0.28 + i * 0.12 : 0.35;
      ctx.lineWidth = open ? 3.2 : 2.4;
      ctx.beginPath();
      ctx.ellipse(0, -2, 7 + i * 3.6, 13 + i * 2.2, t * (open ? 1.5 : 0.35) + i * 0.4, 0, 6.3);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    var grd = ctx.createRadialGradient(0, -6, 1, 0, 0, 16);
    grd.addColorStop(0, open ? "#fff" : "#cfd6de");
    grd.addColorStop(0.45, open ? th.accent : "#8a93a6");
    grd.addColorStop(1, open ? "#1b5a5a" : "#4a5160");
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.ellipse(0, -2, 9, 16, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#1b2340";
    ctx.font = "bold 12px Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(open ? "GO" : "7★", 0, 2);
    ctx.restore();
  },

  drawGate: function (ctx, x, y, id) {
    var unlocked = this.save && id < this.save.unlocked;
    var done = this.save && this.save.complete[id];
    var col = NG.GATE_COLORS[id];
    ctx.save();
    ctx.translate(x, y);
    this.groundShadow(ctx, 0, 20, 22, 6, 0.24);
    ctx.globalAlpha = unlocked ? 1 : 0.62;
    /* Pillars */
    ctx.fillStyle = NG.mixHex(col, -0.25);
    ctx.fillRect(-20, -6, 10, 26);
    ctx.fillRect(10, -6, 10, 26);
    ctx.fillStyle = col;
    ctx.fillRect(-19, -18, 8, 16);
    ctx.fillRect(11, -18, 8, 16);
    ctx.fillStyle = NG.mixHex(col, 0.2);
    ctx.fillRect(-18, -20, 6, 6);
    ctx.fillRect(12, -20, 6, 6);
    /* Roof */
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(-24, -16); ctx.lineTo(0, -32); ctx.lineTo(24, -16);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = NG.mixHex(col, 0.28);
    ctx.beginPath();
    ctx.moveTo(-16, -18); ctx.lineTo(0, -28); ctx.lineTo(16, -18);
    ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = unlocked ? "#fff6d8" : "#d0d4dc";
    ctx.fillRect(-10, 0, 20, 18);
    ctx.fillStyle = NG.mixHex(col, 0.4);
    ctx.fillRect(-10, 0, 20, 4);
    ctx.fillStyle = "#12182c";
    ctx.font = "bold 16px Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(done ? "★" : String(id + 1), 0, 15);
    if (!unlocked) {
      ctx.fillStyle = "rgba(20,24,40,0.52)";
      ctx.fillRect(-10, 0, 20, 18);
      ctx.strokeStyle = "#ffe566";
      ctx.fillStyle = "#ffe566";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 6, 4, Math.PI, 0); ctx.stroke();
      ctx.fillRect(-5, 6, 10, 8);
    }
    ctx.restore();
  },

  drawCertDoor: function (ctx, x, y) {
    var open = this.save && NG.Save.allDone(this.save);
    ctx.save();
    ctx.translate(x, y);
    this.groundShadow(ctx, 0, 18, 18, 6, 0.24);
    ctx.fillStyle = open ? "#c9a227" : "#4a4028";
    ctx.fillRect(-18, -8, 8, 26); ctx.fillRect(10, -8, 8, 26);
    ctx.fillStyle = open ? "#f0c14a" : "#6a5d3a";
    ctx.fillRect(-16, -24, 32, 40);
    ctx.fillStyle = open ? "#fff3bf" : "#3a331f";
    ctx.fillRect(-10, -10, 20, 26);
    ctx.fillStyle = open ? "#fff" : "#ccc";
    ctx.font = "bold 16px Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(open ? "★" : "?", 0, 8);
    if (open) {
      ctx.globalAlpha = 0.4 + Math.sin(this.time * 4) * 0.2;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.strokeRect(-18, -26, 36, 44);
    }
    ctx.restore();
  },

  drawHero: function (ctx, x, y) {
    var id = (this.save && this.save.hero) || "blob";
    NG.drawHero(ctx, x, y, id, this.player.dir, this.player.frame, this.time, this.player.walking);
  },

  drawParticles: function (ctx) {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      var a = Math.max(0, p.life / p.max);
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      if (p.kind === "confetti") {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot || 0);
        ctx.fillRect(-p.size * 0.5, -p.size * 0.3, p.size, p.size * 0.6);
        ctx.restore();
      } else if (p.kind === "spark") {
        ctx.globalAlpha = a * 0.55;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 2.1, 0, 6.3); ctx.fill();
        ctx.globalAlpha = a;
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.55, 0, 6.3); ctx.fill();
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 6.3); ctx.fill();
      } else {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 6.3); ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = a * 0.45;
        ctx.beginPath(); ctx.arc(p.x - 1, p.y - 1, p.size * 0.35, 0, 6.3); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }
};
