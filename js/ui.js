/* Screens, modals, HUD — Chromebook-friendly big buttons */
var NG = window.NG = window.NG || {};

NG.UI = {
  save: null,
  qWorld: 0,
  qIndex: 0,
  qChoices: [],
  tried: {},
  loginMode: "new",
  gradeRequired: false,
  gradeFromPause: false,

  $: function (id) { return document.getElementById(id); },

  show: function (id) {
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) screens[i].classList.add("hidden");
    var play = id === "screen-play" || id === "play";
    this.$("topbar").classList.toggle("hidden", !play);
    this.$("stage-wrap").classList.toggle("hidden", !play);
    this.$("touch-ui").classList.toggle("hidden", !play);
    if (!play) {
      var el = this.$(id);
      if (el) el.classList.remove("hidden");
    }
    if (play) {
      NG.Game.resize();
      NG.Game.startLoop();
    }
  },

  boot: function () {
    var self = this;
    NG.Audio.muted = NG.Save.getMute();
    NG.Audio.volume = NG.Save.getVol();
    NG.Speech.init();
    this.syncMuteBtn();
    this.syncAutoRead();
    if (this.$("vol-music")) this.$("vol-music").value = String(Math.round(NG.Audio.volume * 100));

    this.$("btn-start").onclick = function () {
      NG.Audio.unlock(); NG.Audio.click(); NG.Audio.startBgm("hub");
      self.openName("new");
    };
    this.$("btn-howto").onclick = function () { NG.Audio.click(); self.$("modal-howto").classList.remove("hidden"); };
    this.$("btn-howto-close").onclick = function () {
      NG.Audio.click();
      self.$("modal-howto").classList.add("hidden");
      self.maybeUnfreeze();
    };
    this.$("tab-new").onclick = function () { self.setLoginMode("new"); };
    this.$("tab-return").onclick = function () { self.setLoginMode("return"); };
    this.$("btn-name-go").onclick = function () { self.submitLogin(); };
    this.$("btn-name-back").onclick = function () { NG.Audio.click(); self.show("screen-title"); };
    this.$("player-pin").addEventListener("keydown", function (e) {
      if (e.key === "Enter") self.submitLogin();
    });
    this.$("player-pin2").addEventListener("keydown", function (e) {
      if (e.key === "Enter") self.submitLogin();
    });
    this.$("player-name").addEventListener("keydown", function (e) {
      if (e.key === "Enter") self.submitLogin();
    });
    this.$("show-pins").onchange = function () {
      var t = this.checked ? "text" : "password";
      self.$("player-pin").type = t;
      self.$("player-pin2").type = t;
    };
    this.$("btn-import").onclick = function () {
      self.$("modal-save").classList.remove("hidden");
      self.$("save-code-out").textContent = "Log in first to see your code.";
      self.$("save-code-in").focus();
    };
    this.$("btn-save-close").onclick = function () { self.$("modal-save").classList.add("hidden"); self.maybeUnfreeze(); };
    this.$("btn-copy-code").onclick = function () { self.copyCode(); };
    this.$("btn-load-code").onclick = function () { self.loadCode(); };
    this.$("btn-change-pin").onclick = function () { self.changePin(); };
    this.$("btn-pause").onclick = function () { self.togglePause(); };
    this.$("btn-resume").onclick = function () { self.togglePause(); };
    this.$("btn-pause-hub").onclick = function () { self.pauseToHub(); };
    this.$("btn-pause-save").onclick = function () { self.openSaveModal(); };
    this.$("btn-pause-howto").onclick = function () {
      self.$("modal-pause").classList.add("hidden");
      self.$("modal-howto").classList.remove("hidden");
    };
    this.$("btn-pause-hero").onclick = function () {
      self.$("modal-pause").classList.add("hidden");
      self.openHeroPicker(false);
    };
    if (this.$("btn-pause-grade")) {
      this.$("btn-pause-grade").onclick = function () {
        self.$("modal-pause").classList.add("hidden");
        self.openGradePicker(false);
      };
    }
    var gradeBtns = document.querySelectorAll(".grade-pick");
    for (var gi = 0; gi < gradeBtns.length; gi++) {
      gradeBtns[gi].onclick = (function (btn) {
        return function () { self.pickGrade(parseInt(btn.getAttribute("data-grade"), 10)); };
      })(gradeBtns[gi]);
    }
    if (this.$("btn-grade-cancel")) {
      this.$("btn-grade-cancel").onclick = function () {
        NG.Audio.click();
        self.$("screen-grade").classList.add("hidden");
        if (self.gradeFromPause) {
          self.gradeFromPause = false;
          self.show("screen-play");
          self.maybeUnfreeze();
        } else {
          self.show("screen-title");
        }
      };
    }
    this.$("btn-hero-cancel").onclick = function () {
      self.$("modal-hero").classList.add("hidden");
      self.maybeUnfreeze();
    };
    this.$("btn-redo-ok").onclick = function () { self.confirmRedo(); };
    this.$("btn-mute").onclick = function () { self.toggleMute(); };
    this.$("btn-mute-pause").onclick = function () { self.toggleMute(); };
    this.$("btn-save-top").onclick = function () { self.openSaveModal(); };
    this.$("btn-hub").onclick = function () { self.confirmHub(); };
    this.$("btn-q-later").onclick = function () { self.closeQuestion(true); };
    this.$("btn-q-try").onclick = function () { self.resetTry(); };
    this.$("btn-q-next").onclick = function () { self.afterCorrect(); };
    this.$("btn-badge-ok").onclick = function () { self.closeBadge(); };
    this.$("btn-worldwin-ok").onclick = function () { self.closeWorldWin(); };
    this.$("btn-cert-print").onclick = function () { window.print(); };
    this.$("btn-cert-hub").onclick = function () {
      self.$("modal-cert").classList.add("hidden");
      NG.Game.frozen = false;
      self.show("screen-play");
      NG.Game.enterHub(self.save);
      self.refreshHud();
    };
    this.$("btn-new-from-title").onclick = function () { NG.Audio.click(); self.openName("return"); };
    this.$("btn-listen").onclick = function () { self.listenQuestion(true); };
    this.$("btn-listen-stop").onclick = function () { self.stopListen(); };
    this.$("q-autoread").onchange = function () {
      NG.Save.setAutoRead(this.checked);
    };
    this.$("vol-music").oninput = function () {
      NG.Audio.unlock();
      NG.Audio.setVolume(parseInt(this.value, 10) / 100);
      if (NG.Audio.volume > 0 && NG.Audio.muted) {
        NG.Audio.setMute(false);
        self.syncMuteBtn();
      }
    };

    this.bindDpad();
    var unstick = this.$("btn-unstick");
    if (unstick) {
      unstick.onclick = function () {
        NG.Audio.unlock();
        NG.Audio.click();
        NG.Game.forceUnstick();
      };
    }
    window.addEventListener("keydown", function (e) {
      if (self.$("modal-question").classList.contains("hidden")) return;
      if (e.key >= "1" && e.key <= "4") {
        var idx = parseInt(e.key, 10) - 1;
        var btns = self.$("q-choices").querySelectorAll(".choice");
        if (btns[idx] && !btns[idx].disabled) self.pick(idx);
      }
      if (e.key === "Enter" && !self.$("btn-q-next").classList.contains("hidden")) self.afterCorrect();
    });

    var last = NG.Save.lastName();
    if (last && NG.Save.load(last)) {
      this.$("btn-continue").classList.remove("hidden");
      this.$("btn-continue").textContent = "Continue as " + last;
      this.$("btn-continue").onclick = function () {
        NG.Audio.unlock(); NG.Audio.click(); NG.Audio.startBgm("hub");
        self.openName("return");
        self.$("player-name").value = last;
        self.$("player-pin").focus();
      };
    }
  },

  setLoginMode: function (mode) {
    this.loginMode = mode === "return" ? "return" : "new";
    var isNew = this.loginMode === "new";
    this.$("tab-new").classList.toggle("on", isNew);
    this.$("tab-return").classList.toggle("on", !isNew);
    this.$("login-title").textContent = isNew ? "Create your Guardian" : "Welcome back";
    this.$("login-blurb").textContent = isNew
      ? "Pick a classroom nickname (not your full real name) and a short password so you can come back later."
      : "Type the same nickname and password you used before. Progress loads on this computer.";
    this.$("pin-confirm-wrap").classList.toggle("hidden", !isNew);
    this.$("btn-name-go").textContent = isNew ? "Let’s Go!" : "Continue";
    this.$("name-error").textContent = "";
    this.refreshPlayerChips();
  },

  refreshPlayerChips: function () {
    var list = this.$("saved-players");
    list.innerHTML = "";
    if (this.loginMode !== "return") return;
    var names = NG.Save.listNames();
    if (!names.length) return;
    var p = document.createElement("p");
    p.className = "picker-label";
    p.textContent = "Tap your name, then type your password";
    list.appendChild(p);
    var self = this;
    names.forEach(function (n) {
      var s = NG.Save.all()[n];
      if (!s) return;
      var b = document.createElement("button");
      b.className = "btn player-chip";
      b.type = "button";
      NG.Save.ensureExtras(s);
      var gLabel = NG.normalizeGrade(s.grade) ? ("G" + s.grade + " · ") : "";
      b.textContent = s.name + " · " + gLabel + NG.Save.totalBadges(s) + "/49 badges";
      b.onclick = function () {
        NG.Audio.click();
        self.$("player-name").value = s.name;
        self.$("player-pin").focus();
      };
      list.appendChild(b);
    });
  },

  openName: function (mode) {
    this.show("screen-name");
    this.setLoginMode(mode || "new");
    this.$("player-pin").value = "";
    this.$("player-pin2").value = "";
    if (mode !== "return") this.$("player-name").value = "";
    this.$("player-name").focus();
  },

  submitLogin: function () {
    var name = this.$("player-name").value;
    var pin = this.$("player-pin").value;
    var pin2 = this.$("player-pin2").value;
    this.$("name-error").textContent = "";
    NG.Audio.unlock();
    var res;
    if (this.loginMode === "new") {
      res = NG.Save.register(name, pin, pin2);
    } else {
      res = NG.Save.login(name, pin);
    }
    if (!res.ok) {
      this.$("name-error").textContent = res.error;
      NG.Audio.wrong();
      return;
    }
    NG.Audio.click();
    NG.Audio.startBgm("hub");
    NG.Save.ensureExtras(res.save);
    if (res.migrated) {
      NG.Game && NG.Game.showToast && NG.Game.showToast("Password saved for next time.");
    }
    this.pendingSave = res.save;
    if (!NG.normalizeGrade(res.save.grade)) {
      this.openGradePicker(true);
      return;
    }
    if (this.loginMode === "new" || !res.save.hero) {
      this.openHeroPicker(true);
      return;
    }
    this.pendingSave = null;
    this.beginGame(res.save);
  },

  openGradePicker: function (required) {
    this.gradeRequired = !!required;
    this.gradeFromPause = !required;
    var cancel = this.$("btn-grade-cancel");
    if (cancel) cancel.classList.toggle("hidden", this.gradeRequired);
    if (this.$("grade-error")) this.$("grade-error").textContent = "";
    var current = NG.normalizeGrade((this.pendingSave || this.save || {}).grade);
    var picks = document.querySelectorAll(".grade-pick");
    for (var i = 0; i < picks.length; i++) {
      var g = parseInt(picks[i].getAttribute("data-grade"), 10);
      picks[i].classList.toggle("selected", g === current);
    }
    this.show("screen-grade");
    NG.Game.frozen = true;
  },

  pickGrade: function (grade) {
    var save = this.pendingSave || this.save;
    if (!save) return;
    var res = NG.Save.setGrade(save, grade);
    if (!res.ok) {
      if (this.$("grade-error")) this.$("grade-error").textContent = res.error;
      NG.Audio.wrong();
      return;
    }
    NG.Audio.click();
    save.grade = res.grade;
    if (this.pendingSave) this.pendingSave.grade = res.grade;
    if (this.save) this.save.grade = res.grade;
    if (NG.Game && NG.Game.save) NG.Game.save.grade = res.grade;

    if (this.gradeFromPause) {
      this.gradeFromPause = false;
      this.$("screen-grade").classList.add("hidden");
      this.show("screen-play");
      this.refreshHud();
      NG.Game.frozen = false;
      NG.Game.showToast((NG.GRADE_LABELS[res.grade] || ("Grade " + res.grade)) + " questions ready!");
      return;
    }

    // Required after login
    if (!save.hero) {
      this.$("screen-grade").classList.add("hidden");
      this.openHeroPicker(true);
      return;
    }
    this.$("screen-grade").classList.add("hidden");
    var s = this.pendingSave;
    this.pendingSave = null;
    this.beginGame(s || save);
  },

  openHeroPicker: function (required) {
    this.heroRequired = !!required;
    this.$("btn-hero-cancel").classList.toggle("hidden", this.heroRequired);
    var grid = this.$("hero-grid");
    grid.innerHTML = "";
    var self = this;
    var current = (this.pendingSave || this.save || {}).hero;
    NG.HEROES.forEach(function (h) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "hero-pick" + (current === h.id ? " selected" : "");
      var c = document.createElement("canvas");
      c.width = 112; c.height = 112;
      b.appendChild(c);
      var nm = document.createElement("strong");
      nm.textContent = h.name;
      b.appendChild(nm);
      var tag = document.createElement("small");
      tag.textContent = h.tag;
      b.appendChild(tag);
      b.onclick = function () { self.pickHero(h.id); };
      grid.appendChild(b);
      var ctx = c.getContext("2d");
      NG.drawHero(ctx, 56, 74, h.id, 2, 0, 0.4, false);
    });
    this.$("modal-hero").classList.remove("hidden");
    NG.Game.frozen = true;
  },

  pickHero: function (id) {
    var save = this.pendingSave || this.save;
    if (!save) return;
    NG.Save.setHero(save, id);
    this.$("modal-hero").classList.add("hidden");
    NG.Audio.click();
    if (this.pendingSave) {
      var s = this.pendingSave;
      this.pendingSave = null;
      this.beginGame(s);
    } else {
      NG.Game.frozen = false;
      NG.Game.showToast(NG.heroById(id).name + " is ready!");
    }
  },

  beginGame: function (save) {
    this.save = save;
    NG.Save.persist(save);
    this.show("screen-play");
    NG.Game.enterHub(save);
    this.refreshHud();
  },

  enterWorld: function (id) {
    this.show("screen-play");
    NG.Game.enterWorld(id);
    this.refreshHud();
  },

  returnHub: function (msg) {
    NG.Game.enterHub(this.save);
    this.refreshHud();
    if (msg) NG.Game.showToast(msg);
  },

  confirmHub: function () {
    if (NG.Game.mode === "hub") return;
    NG.Game.frozen = true;
    if (window.confirm("Return to the World Hub? Progress in this world is saved.")) {
      NG.Audio.click();
      this.returnHub("Back at the hub. Your badges are saved.");
    }
    NG.Game.frozen = false;
  },

  togglePause: function () {
    var m = this.$("modal-pause");
    if (!m) return;
    if (this.$("stage-wrap").classList.contains("hidden")) return;
    if (this.$("modal-question") && !this.$("modal-question").classList.contains("hidden")) return;
    var open = m.classList.contains("hidden");
    m.classList.toggle("hidden", !open);
    NG.Game.frozen = open;
    if (open) NG.Audio.click();
  },

  pauseToHub: function () {
    this.$("modal-pause").classList.add("hidden");
    NG.Game.frozen = false;
    this.returnHub("Paused at the hub.");
  },

  toggleMute: function () {
    NG.Audio.unlock();
    NG.Audio.setMute(!NG.Audio.muted);
    this.syncMuteBtn();
  },

  syncMuteBtn: function () {
    var on = NG.Audio.muted;
    var label = on ? "Music off" : "Music on";
    ["btn-mute", "btn-mute-pause"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) {
        b.textContent = on ? "🔇" : "🎵";
        b.setAttribute("aria-label", label);
        b.title = label;
      }
    });
  },

  syncAutoRead: function () {
    var box = this.$("q-autoread");
    if (box) box.checked = NG.Save.getAutoRead();
  },

  hideBlockingModals: function () {
    var blocking = ["modal-question", "modal-pause", "modal-save", "modal-howto", "modal-badge", "modal-worldwin", "modal-cert", "modal-hero", "modal-redo"];
    for (var i = 0; i < blocking.length; i++) {
      var el = document.getElementById(blocking[i]);
      if (el) el.classList.add("hidden");
    }
    this.stopListen && this.stopListen();
  },

  shouldBeFrozen: function () {
    if (!this.$("stage-wrap") || this.$("stage-wrap").classList.contains("hidden")) return false;
    var blocking = ["modal-question", "modal-pause", "modal-save", "modal-howto", "modal-badge", "modal-worldwin", "modal-cert", "modal-hero", "modal-redo"];
    return blocking.some(function (id) {
      var el = document.getElementById(id);
      return el && !el.classList.contains("hidden");
    });
  },

  maybeUnfreeze: function () {
    if (!this.shouldBeFrozen()) {
      NG.Game.frozen = false;
      NG.Game.keys = {};
      NG.Game.pad = { x: 0, y: 0 };
    }
  },

  openSaveModal: function () {
    this.$("modal-pause").classList.add("hidden");
    this.$("modal-save").classList.remove("hidden");
    if (this.save) this.$("save-code-out").textContent = NG.Save.prettyBackup(this.save);
    else this.$("save-code-out").textContent = "Log in first to see your code.";
    this.$("save-msg").textContent = "";
    this.$("pin-old").value = "";
    this.$("pin-new").value = "";
    this.$("pin-new2").value = "";
    NG.Game.frozen = true;
  },

  copyCode: function () {
    if (!this.save) return;
    var code = NG.Save.prettyBackup(this.save);
    this.$("save-code-out").textContent = code;
    try {
      navigator.clipboard.writeText(code.replace("-", ""));
      this.$("save-msg").textContent = "Copied! 10 characters. Keep nickname + password too.";
    } catch (e) {
      this.$("save-msg").textContent = "Select the code and press Ctrl+C.";
    }
    NG.Audio.click();
  },

  loadCode: function () {
    var code = this.$("save-code-in").value;
    if (!this.save) {
      this.$("save-msg").textContent = "Log in (or create a player) first, then load the backup onto that name.";
      NG.Audio.wrong();
      return;
    }
    var res = NG.Save.applyBackupTo(this.save, code);
    if (!res.ok) {
      this.$("save-msg").textContent = res.error;
      NG.Audio.wrong();
      return;
    }
    this.save = res.save;
    this.$("modal-save").classList.add("hidden");
    NG.Audio.correct();
    this.beginGame(this.save);
    NG.Game.showToast("Backup loaded. Welcome back, " + this.save.name + "!");
  },

  changePin: function () {
    var res = NG.Save.changePin(this.save, this.$("pin-old").value, this.$("pin-new").value, this.$("pin-new2").value);
    this.$("save-msg").textContent = res.ok ? "Password updated." : res.error;
    if (res.ok) {
      NG.Audio.correct();
      this.$("pin-old").value = "";
      this.$("pin-new").value = "";
      this.$("pin-new2").value = "";
    } else NG.Audio.wrong();
  },

  refreshHud: function () {
    if (!this.save) return;
    this.$("hud-name").textContent = this.save.name;
    NG.Save.ensureExtras(this.save);
    var gEl = this.$("hud-grade");
    if (gEl) {
      var g = NG.normalizeGrade(this.save.grade);
      gEl.textContent = g ? (NG.GRADE_LABELS[g] || ("Grade " + g)) : "Grade —";
    }
    var wdone = NG.Save.worldsDone(this.save);
    this.$("hud-worlds").textContent = "Worlds " + wdone + "/7";
    var slots = this.$("badge-slots");
    slots.innerHTML = "";
    var inWorld = NG.Game.mode === "world";
    this.$("hud-world").textContent = inWorld
      ? NG.WORLDS[NG.Game.worldId].name
      : "World Hub";
    this.$("btn-hub").classList.toggle("hidden", !inWorld);
    var hearts = this.$("hearts");
    if (hearts) {
      hearts.classList.toggle("hidden", !inWorld);
      if (inWorld) {
        NG.Save.ensureExtras(this.save);
        var left = NG.Save.heartsLeft(this.save, NG.Game.worldId);
        hearts.innerHTML = "<span class='lbl'>Shields</span>";
        for (var h = 0; h < 3; h++) {
          var sp = document.createElement("span");
          sp.className = "h" + (h < left ? " on" : "");
          sp.textContent = '♥';
          hearts.appendChild(sp);
        }
      }
    }
    var i;
    for (i = 0; i < 7; i++) {
      var d = document.createElement("div");
      d.className = "badge-slot";
      var filled = inWorld ? this.save.badges[NG.Game.worldId][i] : this.save.complete[i];
      if (filled) d.classList.add("filled");
      if (!inWorld && i >= this.save.unlocked && !this.save.complete[i]) d.classList.add("locked");
      d.title = inWorld
        ? (NG.WORLDS[NG.Game.worldId].badgeNames[i] || "Badge")
        : NG.WORLDS[i].medal;
      d.textContent = filled ? "★" : String(i + 1);
      slots.appendChild(d);
    }
    var n = inWorld ? NG.Save.worldBadgeCount(this.save, NG.Game.worldId) : NG.Save.totalBadges(this.save);
    this.$("hud-count").textContent = n + "/" + (inWorld ? 7 : 49);
  },

  listenQuestion: function (force) {
    if (NG.Audio.muted) {
      if (force) NG.Game.showToast("Sound is muted. Tap 🎵 (or Pause → turn music/sound on) to hear questions.");
      return;
    }
    if (!NG.Speech.available()) {
      NG.Game.showToast("This browser can’t read aloud. Try Chrome.");
      return;
    }
    var self = this;
    var prompt = this.$("q-prompt").textContent;
    this.$("btn-listen").classList.add("hidden");
    this.$("btn-listen-stop").classList.remove("hidden");
    NG.Speech.speakQuestion(prompt, this.qChoices, function () {
      self.$("btn-listen").classList.remove("hidden");
      self.$("btn-listen-stop").classList.add("hidden");
    });
  },

  stopListen: function () {
    NG.Speech.stop();
    this.$("btn-listen").classList.remove("hidden");
    this.$("btn-listen-stop").classList.add("hidden");
  },

  openQuestion: function (world, index) {
    this.qWorld = world;
    this.qIndex = index;
    this.tried = {};
    var bank = NG.questionsFor(this.save && this.save.grade);
    var list = bank.filter(function (q) { return q.world === world; });
    var q = list[index];
    if (!q) return;
    NG.Game.frozen = true;
    this.qChoices = q.choices.slice();
    for (var i = this.qChoices.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = this.qChoices[i];
      this.qChoices[i] = this.qChoices[j];
      this.qChoices[j] = tmp;
    }
    var g = NG.normalizeGrade(this.save && this.save.grade) || 4;
    this.$("q-kicker").textContent = NG.WORLDS[world].name + " · " + (NG.GRADE_LABELS[g] || ("Grade " + g)) + " · Challenge " + (index + 1) + " of 7";
    this.$("q-prompt").textContent = q.prompt;
    this.$("q-feedback").className = "q-feedback hidden";
    this.$("q-feedback").textContent = "";
    this.$("btn-q-try").classList.add("hidden");
    this.$("btn-q-next").classList.add("hidden");
    this.$("btn-q-later").classList.remove("hidden");
    this.$("btn-listen").classList.remove("hidden");
    this.$("btn-listen-stop").classList.add("hidden");
    this.syncAutoRead();
    this.renderChoices();
    this.$("modal-question").classList.remove("hidden");
    if (NG.Save.getAutoRead()) this.listenQuestion(false);
  },

  renderChoices: function () {
    var box = this.$("q-choices");
    box.innerHTML = "";
    var letters = "ABCD";
    var self = this;
    this.qChoices.forEach(function (c, i) {
      var b = document.createElement("button");
      b.className = "choice";
      if (self.tried[i]) b.classList.add("wrong");
      b.disabled = !!self.tried[i];
      b.innerHTML = "<span class='letter'>" + letters[i] + "</span><span class='ctext'></span>";
      b.querySelector(".ctext").textContent = c.text;
      b.onclick = function () { self.pick(i); };
      box.appendChild(b);
    });
  },

  pick: function (i) {
    var c = this.qChoices[i];
    var qlist = NG.questionsFor(this.save && this.save.grade).filter(function (q) { return q.world === this.qWorld; }.bind(this));
    var q = qlist[this.qIndex];
    var fb = this.$("q-feedback");
    this.stopListen();
    if (c.correct) {
      NG.Audio.correct();
      var btns = this.$("q-choices").querySelectorAll(".choice");
      btns[i].classList.add("right");
      for (var k = 0; k < btns.length; k++) btns[k].disabled = true;
      fb.className = "q-feedback good";
      fb.textContent = "★ " + q.celebrate;
      this.$("btn-q-try").classList.add("hidden");
      this.$("btn-q-later").classList.add("hidden");
      this.$("btn-q-next").classList.remove("hidden");
    } else {
      NG.Audio.wrong();
      this.tried[i] = true;
      var nWrong = NG.Save.recordWrong(this.save, this.qWorld);
      this.save = NG.Save.load(this.save.name) || this.save;
      NG.Game.save = this.save;
      this.refreshHud();
      fb.className = "q-feedback bad";
      fb.textContent = "Not quite. " + (c.why || "Try another answer.");
      if (nWrong >= 3) {
        var btns = this.$("q-choices").querySelectorAll(".choice");
        for (var k = 0; k < btns.length; k++) btns[k].disabled = true;
        this.$("btn-q-try").classList.add("hidden");
        this.$("btn-q-later").classList.add("hidden");
        this.$("btn-q-next").classList.add("hidden");
        this._redoWorld = this.qWorld;
        setTimeout(function () { NG.UI.startRedo(); }, 900);
      } else {
        this.$("btn-q-try").classList.remove("hidden");
        this.renderChoices();
      }
      if (NG.Save.getAutoRead() && !NG.Audio.muted) {
        NG.Speech.speakFeedback("Not quite. " + (c.why || "Try another answer."));
      }
    }
  },

  resetTry: function () {
    this.$("q-feedback").className = "q-feedback hidden";
    this.$("btn-q-try").classList.add("hidden");
    this.stopListen();
    this.renderChoices();
  },

  startRedo: function () {
    this.stopListen();
    this.$("modal-question").classList.add("hidden");
    var w = NG.WORLDS[this._redoWorld];
    this.$("redo-title").textContent = "Let’s try " + w.name + " again";
    this.$("redo-blurb").textContent = "Three mix-ups on this map — totally okay! This world’s badges reset so you can practice. Your other worlds stay saved.";
    this.$("modal-redo").classList.remove("hidden");
    NG.Game.frozen = true;
  },

  confirmRedo: function () {
    var w = this._redoWorld;
    NG.Save.resetWorld(this.save, w);
    this.save = NG.Save.load(this.save.name) || this.save;
    NG.Game.save = this.save;
    this.$("modal-redo").classList.add("hidden");
    NG.Game.frozen = false;
    NG.Audio.click();
    this.show("screen-play");
    NG.Game.enterWorld(w);
    this.refreshHud();
    NG.Game.showToast("Fresh start. You’ve got 3 shields again!");
  },

  closeQuestion: function (later) {
    this.stopListen();
    this.$("modal-question").classList.add("hidden");
    NG.Game.overlap = "";
    // Nudge off the shrine tile so movement never feels locked on the trigger
    if (NG.Game && NG.Game.player) {
      NG.Game.player.y += 20;
    }
    this.maybeUnfreeze();
    if (later) NG.Game.showToast("Shrine is waiting whenever you’re ready.");
  },

  afterCorrect: function () {
    this.stopListen();
    this.$("modal-question").classList.add("hidden");
    var world = this.qWorld;
    var index = this.qIndex;
    var justFinished = NG.Save.earnBadge(this.save, world, index);
    this.save = NG.Save.load(this.save.name) || this.save;
    NG.Game.save = this.save;
    NG.Audio.badge();
    NG.Game.burst(NG.Game.player.x, NG.Game.player.y, NG.THEMES[world].accent, 22);
    this.refreshHud();

    var name = NG.WORLDS[world].badgeNames[index];
    this.$("badge-title").textContent = "You earned a badge!";
    this.$("badge-name").textContent = name;
    this.$("badge-art").style.setProperty("--c", NG.GATE_COLORS[world]);
    this.$("badge-art").textContent = "★";
    this.$("badge-sub").textContent = NG.WORLDS[world].name + " · " + NG.Save.worldBadgeCount(this.save, world) + " / 7";
    this.$("modal-badge").classList.remove("hidden");
    NG.Game.frozen = true;
    this._justFinished = justFinished;
    this._finWorld = world;
  },

  closeBadge: function () {
    this.$("modal-badge").classList.add("hidden");
    NG.Game.overlap = "";
    if (this._justFinished) {
      this._justFinished = false;
      NG.Audio.fanfare();
      NG.Game.confetti(NG.Game.player.x, NG.Game.player.y);
      this.$("ww-title").textContent = NG.WORLDS[this._finWorld].name + " complete!";
      this.$("ww-medal").textContent = NG.WORLDS[this._finWorld].medal;
      this.$("ww-blurb").textContent = NG.Save.allDone(this.save)
        ? "Every world is done. The Hall of Guardians is open in the hub!"
        : "The exit portal is glowing. Walk into it — or tap Continue to return to the hub.";
      this.$("modal-worldwin").classList.remove("hidden");
      NG.Game.frozen = true;
      this.refreshHud();
    } else {
      this.maybeUnfreeze();
    }
  },

  closeWorldWin: function () {
    this.$("modal-worldwin").classList.add("hidden");
    if (NG.Save.allDone(this.save)) {
      this.showCertificate();
      return;
    }
    this.maybeUnfreeze();
    this.returnHub("World cleared! New gates may be waiting.");
  },

  showCertificate: function () {
    NG.Game.frozen = true;
    var s = this.save;
    this.$("cert-name").textContent = s.name;
    var cg = NG.normalizeGrade(s.grade);
    var blurb = this.$("cert-blurb");
    if (blurb) {
      blurb.innerHTML = "is a <strong>Net Guardian</strong> (" + (cg ? (NG.GRADE_LABELS[cg] || ("Grade " + cg)) : "Grades 3–5") + ") who completed all 7 worlds and 49 safety challenges in Badge Quest.";
    }
    this.$("cert-date").textContent = new Date().toLocaleDateString(undefined, {
      year: "numeric", month: "long", day: "numeric"
    });
    var row = this.$("cert-medals");
    row.innerHTML = "";
    for (var i = 0; i < 7; i++) {
      var d = document.createElement("div");
      d.className = "cert-medal";
      d.innerHTML = "<span>★</span><small></small>";
      d.querySelector("small").textContent = NG.WORLDS[i].name;
      row.appendChild(d);
    }
    this.$("modal-cert").classList.remove("hidden");
    NG.Audio.fanfare();
  },

  bindDpad: function () {
    var self = this;
    var map = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    function wire(el, dir) {
      if (!el) return;
      var v = map[dir];
      function on(e) { e.preventDefault(); el.classList.add("held"); NG.Game.setPad(v[0], v[1]); }
      function off(e) { e.preventDefault(); el.classList.remove("held"); NG.Game.setPad(0, 0); }
      el.addEventListener("pointerdown", on);
      el.addEventListener("pointerup", off);
      el.addEventListener("pointerleave", off);
      el.addEventListener("pointercancel", off);
    }
    wire(this.$("pad-up"), "up");
    wire(this.$("pad-down"), "down");
    wire(this.$("pad-left"), "left");
    wire(this.$("pad-right"), "right");
    window.addEventListener("blur", function () { NG.Game.setPad(0, 0); });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  NG.Game.boot(document.getElementById("game"));
  NG.UI.boot();
});
