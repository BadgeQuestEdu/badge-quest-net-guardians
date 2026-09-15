/* Ten goofy, very different Net Guardians — larger 2.5D canvas sprites */
var NG = window.NG = window.NG || {};

NG.HEROES = [
  { id: "blob", name: "Sir Blobsalot", tag: "Jiggle first, ask questions later." },
  { id: "cat", name: "Cool Cat", tag: "Safety is the new sunglasses." },
  { id: "broc", name: "Broccolock", tag: "Eat your greens. Guard your screens." },
  { id: "toast", name: "Captain Toast", tag: "Buttered. Caped. Unstoppable." },
  { id: "sockbot", name: "Sockbot 3000", tag: "Beep-boop. Please match my socks." },
  { id: "boo", name: "Shy Boo", tag: "Boo? …maybe later." },
  { id: "pine", name: "Disco Pine", tag: "Stay safe AND funky." },
  { id: "noodle", name: "Noodle Knight", tag: "All pasta, no problem." },
  { id: "pickle", name: "Pickle Pilot", tag: "Dill with it." },
  { id: "taco", name: "Taco-dactyl", tag: "Crunchy wings, kind clicks." }
];

NG.heroById = function (id) {
  for (var i = 0; i < NG.HEROES.length; i++) if (NG.HEROES[i].id === id) return NG.HEROES[i];
  return NG.HEROES[0];
};

NG.drawHero = function (ctx, x, y, heroId, dir, frame, time, walking) {
  var bob = walking ? Math.sin(frame * 2.2) * 2.6 : Math.sin(time * 3) * 1.2;
  var leg = walking ? Math.sin(frame * 2.2) * 4.2 : 0;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1.36, 1.36);
  ctx.translate(0, bob);
  ctx.fillStyle = "rgba(0,0,0,0.26)";
  ctx.beginPath(); ctx.ellipse(0, 17, 13, 4.6, 0, 0, 6.3); ctx.fill();
  var ex = dir === 1 ? 2.2 : dir === 3 ? -2.2 : 0;
  var ey = dir === 2 ? 1.2 : dir === 0 ? -1.2 : 0;
  var fn = NG._heroDraw[heroId] || NG._heroDraw.blob;
  fn(ctx, dir, leg, time, ex, ey, walking);
  ctx.restore();
};

NG._eyes = function (ctx, y, ex, ey, iris) {
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.ellipse(-4.4 + ex, y + ey, 3.1, 3.4, 0, 0, 6.3); ctx.fill();
  ctx.beginPath(); ctx.ellipse(4.4 + ex, y + ey, 3.1, 3.4, 0, 0, 6.3); ctx.fill();
  ctx.fillStyle = iris || "#1a1a28";
  ctx.beginPath(); ctx.arc(-4.2 + ex, y + ey, 1.7, 0, 6.3); ctx.fill();
  ctx.beginPath(); ctx.arc(4.6 + ex, y + ey, 1.7, 0, 6.3); ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(-5 + ex, y - 0.8 + ey, 0.8, 0, 6.3); ctx.fill();
  ctx.beginPath(); ctx.arc(3.8 + ex, y - 0.8 + ey, 0.8, 0, 6.3); ctx.fill();
};

NG._legs = function (ctx, color, leg, y) {
  y = y == null ? 10 : y;
  ctx.fillStyle = color;
  ctx.fillRect(-7, y, 5.5, 8 + (leg > 0 ? leg : 0));
  ctx.fillRect(1.5, y, 5.5, 8 + (leg < 0 ? -leg : 0));
};

NG._smile = function (ctx, y, color) {
  ctx.strokeStyle = color || "#1b4";
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.beginPath(); ctx.arc(0, y, 4.2, 0.2, Math.PI - 0.2); ctx.stroke();
};

NG._heroDraw = {
  blob: function (ctx, dir, leg, t, ex, ey) {
    var jiggle = 1 + Math.sin(t * 5) * 0.04;
    ctx.fillStyle = "#2a88b0";
    ctx.beginPath(); ctx.ellipse(0, 5, 15 * jiggle, 13, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#5ad0ff";
    ctx.beginPath(); ctx.ellipse(0, 2, 14.5 * jiggle, 13, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.beginPath(); ctx.ellipse(-5, -2, 5, 4, -0.4, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#e8c84a";
    ctx.beginPath(); ctx.arc(0, -11, 9, Math.PI, 0); ctx.fill();
    ctx.fillRect(-9, -12, 18, 5);
    ctx.fillStyle = "#c9a227";
    ctx.fillRect(-2.5, -20, 5, 9);
    ctx.fillStyle = "#ffe566";
    ctx.beginPath(); ctx.arc(0, -21, 3.2, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#d8dce4";
    ctx.fillRect(11, -2, 3.5, 16);
    ctx.fillStyle = "#f4d35e";
    ctx.beginPath(); ctx.moveTo(14, 14); ctx.lineTo(22, 7); ctx.lineTo(14, 9); ctx.fill();
    NG._eyes(ctx, -1, ex, ey);
    NG._smile(ctx, 5, "#146");
  },
  cat: function (ctx, dir, leg, t, ex, ey) {
    NG._legs(ctx, "#e76f51", leg, 9);
    ctx.fillStyle = "#f4a261";
    ctx.beginPath(); ctx.ellipse(0, 2, 13.5, 11, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#e76f51";
    ctx.beginPath(); ctx.moveTo(-11, -6); ctx.lineTo(-7, -18); ctx.lineTo(-2, -6); ctx.fill();
    ctx.beginPath(); ctx.moveTo(11, -6); ctx.lineTo(7, -18); ctx.lineTo(2, -6); ctx.fill();
    ctx.fillStyle = "#ffb4a2";
    ctx.beginPath(); ctx.moveTo(-8, -8); ctx.lineTo(-7, -14); ctx.lineTo(-4, -8); ctx.fill();
    ctx.beginPath(); ctx.moveTo(8, -8); ctx.lineTo(7, -14); ctx.lineTo(4, -8); ctx.fill();
    ctx.fillStyle = "#111";
    ctx.fillRect(-11.5, -9, 23, 6);
    ctx.fillStyle = "#3a2a1a";
    ctx.fillRect(-11.5, -4, 23, 1.5);
    ctx.fillStyle = "#fff";
    ctx.fillRect(-9, -8, 7, 3.2); ctx.fillRect(2, -8, 7, 3.2);
    ctx.fillStyle = "#ff8fab";
    ctx.beginPath(); ctx.arc(0, 3, 2.4, 0, 6.3); ctx.fill();
    ctx.strokeStyle = "#111"; ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(2, 4); ctx.lineTo(13, 1);
    ctx.moveTo(2, 5); ctx.lineTo(13, 7);
    ctx.moveTo(-2, 4); ctx.lineTo(-13, 1);
    ctx.moveTo(-2, 5); ctx.lineTo(-13, 7);
    ctx.stroke();
    var tail = Math.sin(t * 4 + (leg || 0)) * 6;
    ctx.strokeStyle = "#e76f51"; ctx.lineWidth = 3.2; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(12, 8); ctx.quadraticCurveTo(18, 2 + tail, 16, -6 + tail * 0.3); ctx.stroke();
  },
  broc: function (ctx, dir, leg, t, ex, ey) {
    NG._legs(ctx, "#6a994e", leg, 10);
    ctx.fillStyle = "#6a994e";
    ctx.fillRect(-5, 4, 10, 10);
    ctx.fillStyle = "#1d4a28";
    ctx.beginPath(); ctx.arc(-7, -3, 9, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(7, -3, 9, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(0, -11, 10, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#386641";
    ctx.beginPath(); ctx.arc(-6, -4, 7.5, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(6, -4, 7.5, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(0, -10, 8.5, 0, 6.3); ctx.fill();
    ctx.fillStyle = "rgba(180,255,160,0.25)";
    ctx.beginPath(); ctx.arc(-4, -12, 4, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#5a189a";
    ctx.beginPath(); ctx.moveTo(-12, -12); ctx.lineTo(0, -26); ctx.lineTo(12, -12); ctx.fill();
    ctx.fillStyle = "#7b2cbf";
    ctx.beginPath(); ctx.moveTo(-9, -13); ctx.lineTo(0, -23); ctx.lineTo(9, -13); ctx.fill();
    ctx.fillStyle = "#ffd166";
    ctx.beginPath(); ctx.arc(0, -21, 3.2, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#bc4749";
    ctx.fillRect(9, 0, 4, 18);
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(11, -2, 4.2, 0, 6.3); ctx.fill();
    NG._eyes(ctx, -1, ex, ey, "#143");
  },
  toast: function (ctx, dir, leg, t, ex, ey, walking) {
    var flap = walking ? Math.sin(t * 10) * 3 : Math.sin(t * 2) * 1.5;
    ctx.fillStyle = "#9b2226";
    ctx.beginPath();
    if (dir === 1) { ctx.moveTo(-3, -6); ctx.lineTo(-20 - flap, 4); ctx.lineTo(-3, 12); }
    else if (dir === 3) { ctx.moveTo(3, -6); ctx.lineTo(20 + flap, 4); ctx.lineTo(3, 12); }
    else { ctx.moveTo(-12, -2); ctx.lineTo(0, 18 + flap * 0.4); ctx.lineTo(12, -2); }
    ctx.fill();
    ctx.fillStyle = "#c9184a";
    ctx.beginPath();
    if (dir === 1) { ctx.moveTo(-3, -4); ctx.lineTo(-16 - flap, 5); ctx.lineTo(-3, 10); }
    else if (dir === 3) { ctx.moveTo(3, -4); ctx.lineTo(16 + flap, 5); ctx.lineTo(3, 10); }
    else { ctx.moveTo(-10, 0); ctx.lineTo(0, 16); ctx.lineTo(10, 0); }
    ctx.fill();
    ctx.fillStyle = "#c9a227";
    ctx.fillRect(-13, -13, 26, 24);
    ctx.fillStyle = "#e9c46a";
    ctx.fillRect(-12, -12, 24, 22);
    ctx.fillStyle = "#f4d35e";
    ctx.fillRect(-9, -9, 18, 16);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillRect(-7, -7, 8, 5);
    NG._eyes(ctx, -4, ex, ey);
    NG._smile(ctx, 2, "#9b2226");
    ctx.fillStyle = "#6a994e";
    ctx.fillRect(-3.5, 12, 7, 6 + Math.abs(leg));
  },
  sockbot: function (ctx, dir, leg, t, ex, ey) {
    ctx.fillStyle = "#ff6b6b";
    ctx.fillRect(-10, 11, 8, 7 + (leg > 0 ? leg : 0));
    ctx.fillStyle = "#4cc9f0";
    ctx.fillRect(2, 11, 8, 7 + (leg < 0 ? -leg : 0));
    ctx.fillStyle = "#fff";
    ctx.fillRect(-10, 15 + (leg > 0 ? leg : 0), 8, 2);
    ctx.fillRect(2, 15 + (leg < 0 ? -leg : 0), 8, 2);
    ctx.fillStyle = "#8d959d";
    ctx.fillRect(-12, -3, 24, 16);
    ctx.fillStyle = "#adb5bd";
    ctx.fillRect(-11, -4, 22, 16);
    ctx.fillStyle = "#cfd4da";
    ctx.fillRect(-9, -17, 18, 15);
    ctx.fillStyle = "#dee2e6";
    ctx.fillRect(-8, -16, 16, 14);
    ctx.fillStyle = "#ffd166";
    ctx.fillRect(-6.5, -12, 5.5, 5.5); ctx.fillRect(1, -12, 5.5, 5.5);
    ctx.fillStyle = "#111";
    ctx.fillRect(-5.2 + ex, -11 + ey, 3.2, 3.2); ctx.fillRect(2.2 + ex, -11 + ey, 3.2, 3.2);
    ctx.fillStyle = "#e63946";
    ctx.fillRect(-4, -1.5, 8, 3.5);
    var blink = (Math.sin(t * 8) > 0.7) ? "#7dffb3" : "#e63946";
    ctx.fillStyle = blink;
    ctx.beginPath(); ctx.arc(10, -8, 2.2, 0, 6.3); ctx.fill();
    ctx.strokeStyle = "#6c757d"; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.arc(0, -18, 6, Math.PI, 0); ctx.stroke();
    ctx.fillStyle = "#adb5bd";
    ctx.beginPath(); ctx.arc(0, -24, 2.4, 0, 6.3); ctx.fill();
  },
  boo: function (ctx, dir, leg, t, ex, ey) {
    ctx.globalAlpha = 0.93;
    ctx.fillStyle = "#dfe4ea";
    ctx.beginPath(); ctx.arc(0, 0, 14.5, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#f8f9fa";
    ctx.beginPath(); ctx.arc(0, -2, 14, Math.PI, 0); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-14, -2);
    ctx.quadraticCurveTo(-12, 18, -7, 11);
    ctx.quadraticCurveTo(0, 20, 7, 11);
    ctx.quadraticCurveTo(12, 18, 14, -2);
    ctx.fill();
    ctx.fillStyle = "#2d6a4f";
    ctx.beginPath(); ctx.ellipse(9, 1, 8, 11, 0.35, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#52b788";
    ctx.beginPath(); ctx.ellipse(8, 0, 4, 6, 0.35, 0, 6.3); ctx.fill();
    NG._eyes(ctx, -5, ex, ey);
    ctx.fillStyle = "#ffb4d0";
    ctx.beginPath(); ctx.arc(-6, 2, 2.6, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(6, 2, 2.6, 0, 6.3); ctx.fill();
    ctx.strokeStyle = "#c77dff"; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(0, 3, 3, 0.15, Math.PI - 0.15); ctx.stroke();
    ctx.globalAlpha = 1;
  },
  pine: function (ctx, dir, leg, t, ex, ey) {
    NG._legs(ctx, "#1d6b62", leg, 12);
    ctx.fillStyle = "#1d6b62";
    ctx.beginPath(); ctx.moveTo(0, 16); ctx.lineTo(-14, -8); ctx.lineTo(14, -8); ctx.fill();
    ctx.fillStyle = "#2a9d8f";
    ctx.beginPath(); ctx.moveTo(0, 14); ctx.lineTo(-12, -6); ctx.lineTo(12, -6); ctx.fill();
    var i;
    for (i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 ? "#ffd166" : "#ff006e";
      ctx.fillRect(-8 + (i % 3) * 6, -4 + Math.floor(i / 3) * 6, 4.2, 4.2);
    }
    ctx.fillStyle = "#5a189a";
    ctx.beginPath(); ctx.arc(0, -12, 11, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#7b2cbf";
    ctx.beginPath(); ctx.arc(0, -13, 10, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#ff006e";
    ctx.beginPath(); ctx.arc(-5.5, -15, 4.4, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(5.5, -15, 4.4, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#111";
    ctx.fillRect(-12, -11, 24, 4.5);
    ctx.fillStyle = "#fff";
    ctx.fillRect(-9, -10, 7, 2.4); ctx.fillRect(2, -10, 7, 2.4);
    ctx.fillStyle = "#ffd166";
    ctx.fillRect(-18, 2, 5.5, 9); ctx.fillRect(12.5, 2, 5.5, 9);
    ctx.strokeStyle = "#ffd166"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 2, 5, 0.2, Math.PI - 0.2); ctx.stroke();
  },
  noodle: function (ctx, dir, leg, t, ex, ey) {
    ctx.strokeStyle = "#c9a227"; ctx.lineWidth = 3.6; ctx.lineCap = "round";
    var wiggle = Math.sin(t * 6) * 2;
    ctx.beginPath(); ctx.moveTo(-8, -8); ctx.bezierCurveTo(-14, 4 + wiggle, 0, 8, -6, 16 + (leg > 0 ? leg : 0)); ctx.stroke();
    ctx.strokeStyle = "#e9c46a";
    ctx.beginPath(); ctx.moveTo(0, -10); ctx.bezierCurveTo(8, 0, -4, 10, 2, 16 + Math.abs(leg) * 0.4); ctx.stroke();
    ctx.strokeStyle = "#d4a017";
    ctx.beginPath(); ctx.moveTo(8, -8); ctx.bezierCurveTo(14, 6 - wiggle, 4, 8, 8, 16 + (leg < 0 ? -leg : 0)); ctx.stroke();
    ctx.fillStyle = "#8d959d";
    ctx.beginPath(); ctx.ellipse(0, -10, 13, 8, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#adb5bd";
    ctx.beginPath(); ctx.ellipse(0, -11, 12.5, 7.2, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#6c757d";
    ctx.fillRect(-12, -11, 24, 3.5);
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(-5.5, -6, 4.4, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(5.5, -6, 4.4, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#111";
    ctx.beginPath(); ctx.arc(-5.2 + ex, -6 + ey, 1.8, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(5.8 + ex, -6 + ey, 1.8, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#bc4749";
    ctx.beginPath(); ctx.arc(12, 6, 6, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 8px Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("●", 12, 9);
    NG._smile(ctx, 0, "#bc4749");
  },
  pickle: function (ctx, dir, leg, t, ex, ey) {
    ctx.fillStyle = "#386641";
    ctx.beginPath(); ctx.ellipse(1, 4, 8.5, 16.5, 0.05, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#6a994e";
    ctx.beginPath(); ctx.ellipse(0, 2, 8.2, 16.5, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#a7c957";
    ctx.fillRect(-3.5, -6, 2.4, 9); ctx.fillRect(2, 0, 2.4, 7);
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.ellipse(-5.5, -8, 5.5, 4.4, -0.4, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.ellipse(5.5, -8, 5.5, 4.4, 0.4, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#73d2de";
    ctx.beginPath(); ctx.ellipse(-5.5, -8, 4.6, 3.6, -0.4, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.ellipse(5.5, -8, 4.6, 3.6, 0.4, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#111";
    ctx.beginPath(); ctx.arc(-3.4 + ex, -4 + ey, 1.5, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(3.4 + ex, -4 + ey, 1.5, 0, 6.3); ctx.fill();
    ctx.fillStyle = "#ffd166";
    ctx.fillRect(-2.4, -22, 4.8, 9);
    ctx.beginPath(); ctx.ellipse(0, -24, 8, 3.4, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = "#cfd4da"; ctx.lineWidth = 2;
    var spin = t * 10;
    ctx.beginPath();
    ctx.moveTo(-7 * Math.cos(spin), -28 + -3 * Math.sin(spin));
    ctx.lineTo(7 * Math.cos(spin), -28 + 3 * Math.sin(spin));
    ctx.stroke();
    ctx.fillStyle = "#6a994e";
    ctx.fillRect(-4, 16, 3.5, 4 + (leg > 0 ? leg * 0.4 : 0));
    ctx.fillRect(1, 16, 3.5, 4 + (leg < 0 ? -leg * 0.4 : 0));
  },
  taco: function (ctx, dir, leg, t, ex, ey, walking) {
    var flap = walking ? Math.sin(t * 12) * 5 : Math.sin(t * 3) * 2;
    ctx.fillStyle = "#f4f1e8";
    ctx.beginPath();
    ctx.moveTo(-12, 2); ctx.quadraticCurveTo(-22, -6 - flap, -8, -8); ctx.quadraticCurveTo(-4, 0, -12, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(12, 2); ctx.quadraticCurveTo(22, -6 + flap, 8, -8); ctx.quadraticCurveTo(4, 0, 12, 2);
    ctx.fill();
    ctx.fillStyle = "#d08c46";
    ctx.beginPath(); ctx.arc(0, 5, 15, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#f4a261";
    ctx.beginPath(); ctx.arc(0, 4, 14.5, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#e9c46a";
    ctx.beginPath(); ctx.arc(0, 4, 11.5, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#2a9d8f";
    ctx.fillRect(-9, -2, 18, 4.5);
    ctx.fillStyle = "#e76f51";
    ctx.fillRect(-7, 2, 14, 3.5);
    ctx.fillStyle = "#a4161a";
    ctx.beginPath(); ctx.arc(0, -13, 9, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#c1121f";
    ctx.beginPath(); ctx.arc(0, -12, 8.5, Math.PI, 0); ctx.fill();
    ctx.fillRect(-8.5, -12, 17, 4);
    NG._eyes(ctx, -2, ex, ey);
    NG._smile(ctx, 5, "#6a4c2a");
    ctx.fillStyle = "#e76f51";
    ctx.fillRect(-2, 14, 2, 4 + Math.abs(leg) * 0.3);
  }
};
