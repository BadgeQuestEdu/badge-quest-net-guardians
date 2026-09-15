# Badge Quest: Net Guardians

A browser-based internet-safety adventure for **grades 3–5** (fun enough for older kids). Players explore Zelda-style maps, walk into glowing challenge shrines, and earn **49 safety badges** across **7 worlds**.

Built for Teacher **J. Schwartz**. No school accounts, no ads, no data sent to a server.

## Worlds (7 × 7 questions)

1. **Privacy Meadows** — Personal information  
2. **Kindness Kingdom** — Cyberbullying  
3. **Chat Castle** — Online friends, strangers, gaming & chatting  
4. **Secret Fortress** — Passwords  
5. **Footprint Forest** — Digital footprint  
6. **Truth Tower** — Real vs fake (AI)  
7. **Help Harbor** — Asking for help  

Each wrong answer has a friendly explanation and a retry. Correct answers celebrate and award a badge. Completing a world unlocks the next gate. All 7 worlds unlock a printable **Net Guardian certificate**.

## How to open (easiest)

1. Download or copy the whole folder `badge-quest-internet-safety` (or unzip `badge-quest-internet-safety.zip`).
2. Double-click **`index.html`**.
3. It should open in **Chrome** (recommended on Chromebooks). Firefox and Edge work too.

That’s it. After the first load, it **works offline**.

If a school computer blocks `file://` pages, use a tiny local server from the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## How to share with a class

**Do not** rely on the Google Drive *preview* window. Preview often blocks games and will not keep saves.

Good options:

- **Google Drive download:** Upload the zip. Students download, unzip, and open `index.html`.
- **Google Classroom:** Attach the zip, or attach a hosted HTTPS link.
- **Simple static host:** Drag the folder onto [Netlify Drop](https://app.netlify.com/drop), Cloudflare Pages, or GitHub Pages.
- **Shared Chromebook:** Bookmark the file or URL. Each student uses their own nickname + password.

## Login (name + password)

Kids do **not** need a long save code anymore.

1. **New player** — classroom nickname (not a real full name) + a **password of 4–6 letters or numbers** (example: `blue7`). Type it twice.
2. **Returning player** — same nickname + same password. Progress resumes on **that computer**.
3. Several students can share one Chromebook. **Switch Player** → Returning player → tap a name → type that kid’s password.
4. Wrong password shows an error; it will not open someone else’s badges.
5. Passwords are **not stored as plain text**. The game stores a simple hash with the nickname.
6. Logged-in players can **change password** from Pause → **Password / backup**.
7. Older saves from the first version (name only) will ask the student to **choose a password** the next time they return.

Remind students: this password is a class PIN, not an email password, and they should not use a parent’s real password.

### Short backup code (optional)

Only needed to move progress to a **different** computer:

- Pause → **Password / backup** shows a **10-character** code (no confusing `0 / O / 1 / I`).
- Example shape: `H4K7M-P9Q2W`
- On the new computer: create or log into the same nickname, then paste the code under **Load a backup code**.

The long `NG1*...` codes are gone.

Clearing browser data / Guest mode wipes local profiles. The backup code still restores badges if they wrote it down.


## Grade levels (3 / 4 / 5)

After login, students **choose Grade 3, 4, or 5**. The seven maps stay the same; **shrine questions come from that grade’s bank** (49 items each).

| Grade | Emphasis |
|-------|----------|
| **3** | Personal information basics, kindness/cyberbullying basics, trusted adults, simple password secrecy, strangers online (don’t meet), asking for help — shorter stems, concrete scenarios |
| **4** | Bridge mix: Grade 3 foundations plus stronger passwords, chatting/gaming manners, intro digital footprint |
| **5** | Digital footprint & reputation, stronger passwords / 2FA in kid terms, real vs fake & phishing-style tricks, privacy-settings thinking, reporting/blocking, nuanced bystander choices |

Grade is saved on the player profile and shown on the HUD (e.g. **Grade 5**). Returning players keep their grade. Change anytime in **Pause → Change grade** (badges and maps are kept; new shrines use the new bank).

## Listen / read-aloud

On every challenge card:

- **🔊 Listen** reads the question and the A–B–C–D choices using the Chromebook’s built-in **Web Speech** voices (no internet after the page is loaded).
- **Stop** cancels reading.
- **Auto-read questions** (off by default) starts reading when a shrine opens so it does not surprise a quiet class.
- The game picks the **smoothest English voice** it can find (Google, Samantha, Karen, Daniel, Enhanced/Premium/Neural, Microsoft Aria/Jenny, and similar).
- Reading is a little slower than default so it is easier to follow.

If Chrome says there are no voices, check Chromebook **Settings → Accessibility / Text-to-speech**. Chrome works best.

## Music and mute

- Original, looping adventure music (Web Audio — not from Mario/Zelda or other copyrighted games).
- **Hub** is calmer; **in-world** is a bit more upbeat.
- Top-bar **🎵** (or the **M** key) is **music/sound mute**. Pause also has a **music volume** slider.
- While muted: music and sound effects stop, auto-read will not start, and Listen asks you to unmute. Turn volume down (not mute) if you want a quiet room but still need Listen.
- While a question is read aloud, music ducks quietly in the background.

Headphones help in a lab.

## Characters

After creating a nickname, kids pick a **grade** (3/4/5), then one of **10** silly guardians (or if an older save has no hero/grade yet, those screens appear). The choice is saved on their profile. They can change it later in **Pause → Change character**. Returning players keep the same hero.

## Three-wrong restart (per world)

Each world has **3 shields**. Every **incorrect answer tap** costs one shield (not “failed the question after retries” — each wrong choice counts).

- **0–2 wrongs:** keep going. The explanation still appears; they can pick another answer.
- **3rd wrong in that world:** a friendly “practice round” message appears. **Only that world’s badges reset**, the exit portal locks again, and they restart at the spawn of **that same map** with 3 shields. Other worlds are untouched.
- Finishing a world (7 badges) clears that world’s wrong-count.

The HUD shows **Shields ♥♥♥** while inside a world.

## Classroom tips

- **15–25 minutes** per world is a comfortable sitting.
- Movement: arrows, WASD, on-screen D-pad, or tap the map.
- Certificate: print when all 7 worlds are complete. There is a teacher signature line.
- Questions are multiple-choice / best-response, **banded by the grade the student picks** (3, 4, or 5).

## Files

```
badge-quest-internet-safety/
  index.html          ← open this
  README.md
  css/style.css
  js/questions.js     ← 49 items × grades 3, 4, 5
  js/maps.js
  js/heroes.js        ← 10 character sprites
  js/save.js          ← name + PIN + backup codes
  js/audio.js         ← music & sound effects
  js/speech.js        ← Listen / read-aloud
  js/game.js
  js/ui.js
  assets/favicon.svg
```

Static HTML/CSS/JS only. No build step, no npm install.


## Resources used (pedagogy)

Question **themes** (not proprietary quiz wording) are aligned with public elementary digital-citizenship guidance:

1. **Common Sense Education — Digital Citizenship** (elementary grade bands): privacy & security, relationships & communication, cyberbullying / digital drama, news & media literacy, digital footprint & identity.  
   https://www.commonsense.org/education/digital-citizenship

2. **FBI Safe Online Surfing (SOS)** — public topic map for grades 3–5: personal information, cyberbullying, passwords, social/gaming safety, downloads/malware awareness, online manners.  
   https://sos.fbi.gov/

Badge Quest uses **original classroom wording**. Do not treat it as an official Common Sense or FBI SOS exam.

## Privacy note

The game never phones home. Nicknames, hashed passwords, and badges stay in the student’s browser unless they copy a backup code. Please remind students not to use last names, emails, or student IDs as nicknames.
