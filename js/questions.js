/* Badge Quest: Net Guardians — grade-banded questions (7 worlds × 7 × grades 3–5) */
/* Themes align with Common Sense Education Digital Citizenship + FBI Safe Online Surfing topic areas (original wording). */
var NG = window.NG = window.NG || {};

NG.WORLDS = [
  {
    id: 0,
    name: "Privacy Meadows",
    theme: "Personal Information",
    medal: "Shield of Secrets",
    blurb: "Keep your private info private. Names, schools, addresses, and photos can tell strangers too much.",
    badgeNames: ["Share Smart", "School Secret", "Info Detective", "Pop-up Protector", "Photo Fence", "Name Guard", "Privacy Pro"]
  },
  {
    id: 1,
    name: "Kindness Kingdom",
    theme: "Cyberbullying",
    medal: "Heart of Kindness",
    blurb: "Words on a screen can still hurt. Be kind, don't pile on, and get help if someone is being mean.",
    badgeNames: ["Upstander", "Block & Tell", "Joke Check", "Rumor Stopper", "Respect Badge", "Prank Pause", "Make It Right"]
  },
  {
    id: 2,
    name: "Chat Castle",
    theme: "Online Friends, Strangers, Gaming & Chatting",
    medal: "Wise Chat Medal",
    blurb: "People online may not be who they say they are. Use game tools, keep chats kind, and never meet up alone.",
    badgeNames: ["Meet-Up Guard", "Number Lock", "Skin Scam Spotter", "Voice Chat Pro", "Leave Button", "Stranger Smart", "Mute Master"]
  },
  {
    id: 3,
    name: "Secret Fortress",
    theme: "Passwords",
    medal: "Key of Strength",
    blurb: "A strong, secret password is like a lock on your stuff. Don't share it — not even with friends.",
    badgeNames: ["Strong Lock", "Secret Keeper", "Fake Prize Finder", "Unique Key", "Sign-Out Star", "Safe List", "Extra Lock"]
  },
  {
    id: 4,
    name: "Footprint Forest",
    theme: "Digital Footprint",
    medal: "Thoughtful Pawprint",
    blurb: "What you post can last a long time. Pause and ask: would I be okay if a teacher or grandparent saw this?",
    badgeNames: ["Trail Tracker", "Screenshot Sage", "Ask First", "Future You", "Proud Poster", "No-Spread", "Pause Power"]
  },
  {
    id: 5,
    name: "Truth Tower",
    theme: "Real vs Fake (AI)",
    medal: "Truth Lens",
    blurb: "Pictures, videos, and chatbots can look real even when they are made up. Check before you believe or share.",
    badgeNames: ["Picture Pro", "Video Check", "Bot Brain", "Click Trap", "Deepfake Detective", "News Nose", "Kindness Filter"]
  },
  {
    id: 6,
    name: "Help Harbor",
    theme: "Asking for Help",
    medal: "Help Signal",
    blurb: "You never have to solve online problems alone. Trusted adults want to keep you safe — tell them early.",
    badgeNames: ["Trusted Adult", "Brave Ask", "Oops Tell", "Friend Backup", "School Help", "Keep Asking", "Guardian Gold"]
  }
];

NG.GRADES = [3, 4, 5];
NG.GRADE_LABELS = { 3: "Grade 3", 4: "Grade 4", 5: "Grade 5" };
NG.GRADE_BLURBS = {
  3: "Shorter questions about private info, kindness, passwords, strangers, and asking adults for help.",
  4: "A bridge year: privacy, kindness, chatting/gaming, stronger passwords, footprint basics, and real vs fake.",
  5: "Deeper challenges: privacy settings, footprint & reputation, 2FA/phishing, AI media, reporting, and bystander choices."
};

NG.normalizeGrade = function (g) {
  var n = parseInt(g, 10);
  return (n === 3 || n === 4 || n === 5) ? n : 0;
};

NG.questionsFor = function (grade) {
  var g = NG.normalizeGrade(grade) || 4;
  return (NG.QUESTIONS_BY_GRADE && NG.QUESTIONS_BY_GRADE[g]) || NG.QUESTIONS_BY_GRADE[4];
};

/* Grade 4 bank = original mid-level set */
NG.QUESTIONS_BY_GRADE = {};
NG.QUESTIONS_BY_GRADE[4] = [
  /* ===== World 0: Personal Information ===== */
  {
    world: 0,
    prompt: "Which of these is okay to share on a public game profile?",
    choices: [
      { text: "Your favorite color or favorite animal", correct: true },
      { text: "Your home address", why: "An address can help a stranger find where you live. Keep it private." },
      { text: "The name of your school and your grade", why: "School + grade can help someone figure out where you are during the day." },
      { text: "Your full real name and birthday", why: "Full name and birthday are personal. Use a nickname in games instead." }
    ],
    celebrate: "Yes! Fun favorites are fine. Real-life details stay off public profiles."
  },
  {
    world: 0,
    prompt: "A player in chat asks, “What school do you go to?” What should you do?",
    choices: [
      { text: "Say you don’t share that, and tell a trusted adult", correct: true },
      { text: "Tell them so you might meet up after school", why: "Never help a stranger find you in real life. School names are private." },
      { text: "Make up a fake school and keep chatting about it", why: "A fake answer still keeps a risky conversation going. It’s better to stop and tell an adult." },
      { text: "Ask their school first, then share yours", why: "Trading personal info doesn’t make it safe. Keep school names private." }
    ],
    celebrate: "Perfect. You don’t owe anyone your school — and telling an adult is smart."
  },
  {
    world: 0,
    prompt: "Which set is personal information?",
    choices: [
      { text: "Your birthday, street address, and phone number", correct: true },
      { text: "That you like soccer and pizza", why: "Likes and hobbies are usually okay. Address and phone number are not." },
      { text: "That your favorite animal is a dog", why: "A favorite animal isn’t private the way a phone number or address is." },
      { text: "A drawing of a dragon you made", why: "Your art is fine to share (with adult rules). Personal facts like your address are not." }
    ],
    celebrate: "You spotted it. Birthday, address, and phone number are private."
  },
  {
    world: 0,
    prompt: "A pop-up says, “Type your parent’s credit card for FREE coins!” You should…",
    choices: [
      { text: "Close it and tell a trusted adult", correct: true },
      { text: "Enter the numbers quickly before it disappears", why: "That’s a trick. Real rewards don’t need a credit card in a random pop-up." },
      { text: "Ask a friend to type their card instead", why: "That still gives away money info and could get someone in trouble. Close it and tell an adult." },
      { text: "Type fake numbers to see what happens", why: "Don’t play with pop-ups like that. Close them and get an adult." }
    ],
    celebrate: "Great catch! Pop-ups that ask for money info are tricks. Adults can help."
  },
  {
    world: 0,
    prompt: "Why is it risky to post a photo of your house with the number showing?",
    choices: [
      { text: "Someone could figure out where you live", correct: true },
      { text: "Photos use up too many game coins", why: "The real risk isn’t coins — it’s that a house number can reveal your location." },
      { text: "Houses are boring so nobody should post them", why: "It’s not about boring. It’s about keeping your real-life location private." },
      { text: "Teachers automatically delete house photos", why: "Teachers can’t catch every photo. You are the first line of privacy." }
    ],
    celebrate: "Right. Photos can leak your location. Think before you post."
  },
  {
    world: 0,
    prompt: "A teammate asks for your last name to “add you as family” on a game. You should…",
    choices: [
      { text: "Keep last names private and stick to in-game nicknames", correct: true },
      { text: "Give it so you can play together more", why: "You can play together without sharing your real last name. Nicknames are enough." },
      { text: "Share first and last name so it looks official", why: "Real full names help strangers identify you. Games don’t need that." },
      { text: "Post it in public chat so the whole team sees", why: "Public chat is the worst place for a real name. Keep it private." }
    ],
    celebrate: "Yes. In-game names are for games. Real last names stay private."
  },
  {
    world: 0,
    prompt: "What’s the best rule for sharing personal information?",
    choices: [
      { text: "Only share with people you know in real life — and with a trusted adult’s okay", correct: true },
      { text: "Share if the person seems nice in chat", why: "Nice words are easy to fake. Kind chat doesn’t make someone safe." },
      { text: "Share after you’ve talked for three messages", why: "Time online doesn’t turn a stranger into a real-life friend." },
      { text: "Share if they share their info first", why: "They might be faking their info. Don’t trade yours." }
    ],
    celebrate: "That’s a Net Guardian rule: real life + a trusted adult’s okay."
  },

  /* ===== World 1: Cyberbullying ===== */
  {
    world: 1,
    prompt: "A classmate posts a mean joke about another kid. What should you do?",
    choices: [
      { text: "Don’t join in. Be kind to the kid, and tell a trusted adult", correct: true },
      { text: "Add a laughing emoji so you fit in", why: "Piling on — even with an emoji — can make the hurt bigger. That’s not kindness." },
      { text: "Share it with more people so everyone sees the joke", why: "Spreading it is helping the bullying. Don’t pass hurt along." },
      { text: "Ignore it forever and never tell anyone", why: "You don’t have to argue in the comments, but telling an adult can stop it from continuing." }
    ],
    celebrate: "That’s an upstander move. Kindness + telling an adult helps everyone."
  },
  {
    world: 1,
    prompt: "Someone keeps sending you mean messages. What’s a smart first step?",
    choices: [
      { text: "Save/screenshot the messages, block or report, and tell a trusted adult", correct: true },
      { text: "Send even meaner messages back", why: "Fighting back with meanness usually makes it worse — and you might get in trouble too." },
      { text: "Delete your whole account without telling anyone", why: "You shouldn’t have to disappear. Get help first so an adult can protect you." },
      { text: "Pretend you like it so they stop", why: "You shouldn’t have to fake a smile. Blocking and telling an adult is braver and safer." }
    ],
    celebrate: "Yes: save the proof, block/report, and tell an adult. That’s the power trio."
  },
  {
    world: 1,
    prompt: "Is it still cyberbullying if someone says “it’s just a joke”?",
    choices: [
      { text: "Yes — if it hurts or targets someone, it’s not okay", correct: true },
      { text: "No. Jokes never count as bullying", why: "If the joke hurts, it’s not harmless. How it feels matters." },
      { text: "Only if they typed in ALL CAPS", why: "Bullying isn’t about caps lock. It’s about harm and targeting." },
      { text: "Only if it happens on a school night", why: "Hurtful messages are a problem any day of the week." }
    ],
    celebrate: "Exactly. “Just a joke” doesn’t make hurt okay."
  },
  {
    world: 1,
    prompt: "You see a rumor about a friend in a group chat. What should you do?",
    choices: [
      { text: "Don’t spread it. Tell a trusted adult if it could hurt someone", correct: true },
      { text: "Forward it so your friend “knows what’s out there” by seeing more copies", why: "Forwarding makes the rumor travel. That usually causes more harm." },
      { text: "Add extra details to make the story clearer", why: "Adding details is spreading it. Don’t feed a rumor." },
      { text: "Screenshot it and post it on another app", why: "Moving a rumor to a new app is still spreading it." }
    ],
    celebrate: "Rumor stopper! You broke the chain instead of passing it on."
  },
  {
    world: 1,
    prompt: "Being kind online means…",
    choices: [
      { text: "Treating people with respect, even when you disagree", correct: true },
      { text: "Only being nice to your real-life friends", why: "Kindness isn’t just for friends. Classmates and other players deserve respect too." },
      { text: "Never talking to anyone", why: "You can chat! Just keep it respectful." },
      { text: "Winning every argument in the comments", why: "Winning an argument isn’t the goal. Respect is." }
    ],
    celebrate: "Respect even when you disagree — that’s Kingdom energy."
  },
  {
    world: 1,
    prompt: "A friend asks you to help “prank” someone with fake mean comments. You should…",
    choices: [
      { text: "Say no. Pranks that hurt are bullying", correct: true },
      { text: "Help, because pranks are always funny", why: "If the “prank” is mean comments, it can really hurt. That’s bullying, not comedy." },
      { text: "Do it from a fake username so you won’t get caught", why: "Hiding your name doesn’t make it okay. It still hurts the other person." },
      { text: "Post just one mean comment so it’s “not that bad”", why: "One mean comment still counts. A kind friend says no." }
    ],
    celebrate: "Saying no is loyal AND kind. That’s a true friend."
  },
  {
    world: 1,
    prompt: "You were mean in a chat and you feel sorry. A good next step is…",
    choices: [
      { text: "Apologize, stop, and ask an adult how to make it right", correct: true },
      { text: "Ignore it and hope they forget", why: "The other person might not forget. Owning it is braver." },
      { text: "Make a new account and pretend it wasn’t you", why: "A new account doesn’t fix hurt. An honest apology does more." },
      { text: "Blame someone else for making you do it", why: "Your words are your responsibility. Take the brave step and apologize." }
    ],
    celebrate: "That’s growth. Sorry + stop + adult help can repair a lot."
  },

  /* ===== World 2: Online Friends / Strangers / Gaming ===== */
  {
    world: 2,
    prompt: "Someone you only know online wants to meet at the park. You should…",
    choices: [
      { text: "Don’t go. Tell a trusted adult right away", correct: true },
      { text: "Go, but bring a friend instead of an adult", why: "Kids can’t keep each other safe from an adult stranger. Always tell a trusted adult." },
      { text: "Go if they seem nice and have a friendly profile picture", why: "Pictures and nice words can be fake. Never meet online-only people on your own." },
      { text: "Meet in a crowded place by yourself", why: "A crowd doesn’t make a stranger safe. Skip the meetup and tell an adult." }
    ],
    celebrate: "That’s the #1 safety move. Online-only people stay online unless an adult is in charge."
  },
  {
    world: 2,
    prompt: "A gamer you’ve never met in real life asks for your phone number. You should…",
    choices: [
      { text: "Keep it private. Use the game’s chat only, with your family’s rules", correct: true },
      { text: "Give it so you can squad up faster", why: "Phone numbers are personal. You can play without sharing it." },
      { text: "Give a parent’s number instead", why: "Don’t give family numbers to online strangers either. Tell an adult about the ask." },
      { text: "Trade numbers — yours for theirs", why: "Trading doesn’t make it safe. They may not be who they claim." }
    ],
    celebrate: "Phone numbers stay off game chat. Guardian approved!"
  },
  {
    world: 2,
    prompt: "A stranger says, “I’ll give you rare skins if you log in on this website.” This is…",
    choices: [
      { text: "A trick/scam. Don’t click. Tell a trusted adult", correct: true },
      { text: "A nice gift from a generous player", why: "Free rare stuff from a stranger is a classic trap. Don’t click mystery links." },
      { text: "Safe if the skins in the picture look real", why: "Pictures are easy to fake. Real games don’t give rare skins through random websites." },
      { text: "Okay if other players say they did it", why: "Other players might be part of the trick, or already got fooled. Still don’t click." }
    ],
    celebrate: "Scam spotted! Mystery websites + “free rare stuff” = walk away."
  },
  {
    world: 2,
    prompt: "What’s a smart rule for voice chat in games?",
    choices: [
      { text: "Only with people a trusted adult has approved — and know how to mute or leave", correct: true },
      { text: "Talk with anyone; voice chat is always safe", why: "You can’t see who is really on the other mic. Stick to adult-approved people." },
      { text: "Always say your real name when you join", why: "Use your game name, not your real name." },
      { text: "Leave your mic on even if you feel uncomfortable", why: "If you feel uneasy, mute, leave, and tell an adult. You can step away." }
    ],
    celebrate: "Approved people + mute/leave skills = Chat Castle champion."
  },
  {
    world: 2,
    prompt: "If a chat makes you uncomfortable, you should…",
    choices: [
      { text: "Leave or block, and tell a trusted adult. You don’t owe anyone a chat", correct: true },
      { text: "Stay so you don’t seem rude", why: "Your safety is more important than being “polite” to a stranger." },
      { text: "Argue until they apologize", why: "You don’t have to win a fight. Leaving is allowed and smart." },
      { text: "Share the chat with lots of classmates for fun", why: "Spreading uncomfortable chats can spread harm. Tell an adult instead." }
    ],
    celebrate: "Leave. Block. Tell. You always have an exit."
  },
  {
    world: 2,
    prompt: "“We’ve been friends online for months, so they aren’t a stranger.” True or false?",
    choices: [
      { text: "False — you still haven’t met in real life with a trusted adult", correct: true },
      { text: "True — months of chat means you fully know them", why: "People can pretend for a long time. Time online ≠ a real-life friend." },
      { text: "True if they sent a photo of their face", why: "Photos can be stolen or fake. A picture doesn’t prove who they are." },
      { text: "True if they know your favorite game", why: "Anyone can learn your favorite game from chatting. That doesn’t make them safe." }
    ],
    celebrate: "Yep. Online-only is still a stranger until a trusted adult is involved."
  },
  {
    world: 2,
    prompt: "During a game, someone uses mean or creepy words in chat. You should…",
    choices: [
      { text: "Mute and report, and tell an adult if it keeps happening or feels scary", correct: true },
      { text: "Yell even louder back", why: "Yelling back can get you in trouble and rarely stops the other person." },
      { text: "Give them your friends list so they “have more people to talk to”", why: "Don’t connect a mean stranger to more kids. Cut them off instead." },
      { text: "Keep playing no matter what so they don’t think they won", why: "Walking away isn’t losing. Protecting yourself is winning." }
    ],
    celebrate: "Mute, report, tell. Tools exist for a reason — use them!"
  },

  /* ===== World 3: Passwords ===== */
  {
    world: 3,
    prompt: "Which password is the strongest?",
    choices: [
      { text: "9!BlueRocket-Maple", correct: true },
      { text: "password123", why: "That’s one of the first guesses a trickster tries. Too common!" },
      { text: "dog", why: "Short, real words are easy to guess — especially pet names." },
      { text: "12345678", why: "Number patterns are super weak. Mix words, numbers, and symbols instead." }
    ],
    celebrate: "Long, mixed, and not a simple word — that’s a fortress password!"
  },
  {
    world: 3,
    prompt: "Should you share your password with your best friend?",
    choices: [
      { text: "No. Passwords are for you (and a parent/guardian if needed)", correct: true },
      { text: "Yes. Best friends share everything", why: "Even great friends shouldn’t have your password. Accounts are not group property." },
      { text: "Yes, if they pinky-promise not to tell", why: "Promises can break, and accounts can get messed up. Keep the password to yourself." },
      { text: "Yes for games, no for email", why: "Game accounts matter too. Someone with your password can pretend to be you." }
    ],
    celebrate: "Secret Keeper badge unlocked. Even besties don’t get the password."
  },
  {
    world: 3,
    prompt: "A random pop-up says, “Type your password to win a prize!” You should…",
    choices: [
      { text: "Close it. Real sites don’t ask that way — tell an adult", correct: true },
      { text: "Type it so you don’t miss the prize", why: "That’s a phishing trick trying to steal the password. No prize is worth that." },
      { text: "Type a slightly different password to test it", why: "Don’t type passwords into surprise pop-ups at all." },
      { text: "Ask the pop-up if it’s a real website", why: "The pop-up won’t tell the truth. Close it and get a human adult." }
    ],
    celebrate: "Fake prize finder! Pop-ups don’t get your password."
  },
  {
    world: 3,
    prompt: "Why use different passwords for different accounts?",
    choices: [
      { text: "If one password is stolen, the others stay safer", correct: true },
      { text: "Because typing is more fun that way", why: "It’s not about fun typing. It’s so one leak doesn’t open every door." },
      { text: "Teachers give extra credit for it", why: "Nice idea, but the real reason is security: one stolen password shouldn’t unlock everything." },
      { text: "Passwords expire every hour", why: "They don’t expire every hour. Unique passwords still matter." }
    ],
    celebrate: "One key per door. That’s how fortresses stay shut."
  },
  {
    world: 3,
    prompt: "You typed your password on a shared classroom Chromebook. When you’re done you should…",
    choices: [
      { text: "Sign out so the next person can’t use your account", correct: true },
      { text: "Leave it logged in so it’s faster after lunch", why: "The next student (or anyone walking by) could get into your stuff." },
      { text: "Write the password on a sticky note on the screen", why: "That’s like leaving the key on the door. Don’t write it where others can see." },
      { text: "Let the next kid keep using your login", why: "Then their actions look like yours. Always sign out on shared computers." }
    ],
    celebrate: "Sign-out star! Shared computers need a clean handoff."
  },
  {
    world: 3,
    prompt: "A smart way to remember passwords (with a parent) is…",
    choices: [
      { text: "A password manager or a list a parent keeps in a safe place — not a note on your desk", correct: true },
      { text: "Use the exact same short word on every site", why: "Easy to remember, easy to break — and one leak opens all accounts." },
      { text: "Use your birthday and your street number", why: "Those are facts people can learn. Don’t build passwords from personal info." },
      { text: "Use the word password so you can’t forget", why: "That’s the easiest guess in the world. Pick something unique instead." }
    ],
    celebrate: "Safe storage with a parent beats sticky notes and “password”."
  },
  {
    world: 3,
    prompt: "An extra code sent to a parent’s phone or email when you log in is…",
    choices: [
      { text: "An extra lock that helps keep the account safer", correct: true },
      { text: "A sign the game is broken", why: "It’s working as designed! That extra code is a good lock, not a bug." },
      { text: "Proof you typed the password wrong", why: "You might have typed it right. The extra code is a second check on purpose." },
      { text: "Something you should turn off to save time", why: "That extra step is worth the few seconds. It stops lots of break-ins." }
    ],
    celebrate: "Two locks are better than one. Extra codes are a feature, not a fail."
  },

  /* ===== World 4: Digital Footprint ===== */
  {
    world: 4,
    prompt: "A digital footprint is…",
    choices: [
      { text: "The trail of posts, photos, comments, and accounts you leave online", correct: true },
      { text: "Mud you track onto a keyboard", why: "Close! It’s a trail — but a trail of your online activity, not dirt." },
      { text: "Only the emails you send at school", why: "Emails are part of it, but so are posts, photos, comments, and usernames." },
      { text: "Your shoe size saved in a video game", why: "Fun idea — but it means the marks you leave across the internet." }
    ],
    celebrate: "You found the trail. Posts and comments can stick around."
  },
  {
    world: 4,
    prompt: "You post an angry comment, then delete it. What might still be true?",
    choices: [
      { text: "Someone may have screenshotted it — think before you post", correct: true },
      { text: "It’s gone forever from everyone’s devices", why: "Delete helps, but screenshots and copies can remain. Pause first." },
      { text: "The internet forgets in five minutes", why: "The internet has a long memory. Five minutes is not a clean slate." },
      { text: "Only your closest friends could have seen it", why: "Even a small audience can screenshot and share further." }
    ],
    celebrate: "Screenshot sage. Delete is not a time machine — pause first."
  },
  {
    world: 4,
    prompt: "Before posting a photo of a friend, you should…",
    choices: [
      { text: "Ask them (and a trusted adult if needed) if it’s okay", correct: true },
      { text: "Post first and ask later", why: "Once it’s out, you can’t fully pull it back. Ask before you post." },
      { text: "Post it but crop out their shoes so they won’t notice", why: "They might still be recognizable. Respect means asking." },
      { text: "Tag their house so people know who it is", why: "That’s extra personal info. Don’t add locations or tags without permission." }
    ],
    celebrate: "Ask first. Friends’ photos are their story too."
  },
  {
    world: 4,
    prompt: "Future you (middle school, teams, maybe jobs) might see…",
    choices: [
      { text: "Public posts and photos you share now", correct: true },
      { text: "Nothing, because the internet resets every summer", why: "There’s no yearly reset button. Old public posts can linger." },
      { text: "Only your private messages, never public posts", why: "Public posts are the easiest for future people to find." },
      { text: "Only official schoolwork", why: "Schoolwork might be saved, but so can jokes, photos, and comments you posted." }
    ],
    celebrate: "Future-you is watching. Post things you’d still be proud of."
  },
  {
    world: 4,
    prompt: "A kind digital footprint looks like…",
    choices: [
      { text: "Helpful comments, work you’re proud of, and respect for others", correct: true },
      { text: "Mean memes that get lots of laughs", why: "Laughs at someone else’s expense can follow you — and them." },
      { text: "Copying other people’s art and calling it yours", why: "That’s not respectful, and it becomes part of your trail too." },
      { text: "Comment battles you “won”", why: "Old arguments can look worse later. Kind beats clap-backs." }
    ],
    celebrate: "Proud, helpful, respectful — that’s a footprint to keep."
  },
  {
    world: 4,
    prompt: "Posting a group-chat screenshot of someone in an embarrassing moment is…",
    choices: [
      { text: "Not okay — it can spread hurt and become part of their footprint (and yours)", correct: true },
      { text: "Fine if what happened is true", why: "True can still be unkind. Don’t broadcast someone’s embarrassing moment." },
      { text: "Okay if you scribble out the name a little", why: "People often still recognize them. Don’t post it." },
      { text: "Required, because the internet should know everything", why: "The internet doesn’t need every private moment. Pause and protect people." }
    ],
    celebrate: "You didn’t spread it. That’s how kind footprints are made."
  },
  {
    world: 4,
    prompt: "What’s the best posting habit?",
    choices: [
      { text: "Pause: Would I be okay if a teacher or grandparent saw this?", correct: true },
      { text: "Post everything the second you think of it", why: "Fast posts are the ones people regret. Take a beat." },
      { text: "Only post at night so fewer people notice", why: "Night doesn’t hide a public post. The pause test works at any hour." },
      { text: "Use ALL CAPS so everyone takes you seriously", why: "Caps don’t make a post wiser. Kind and thoughtful does." }
    ],
    celebrate: "Pause power! The grandparent/teacher test is a classic for a reason."
  },

  /* ===== World 5: Real vs Fake (AI) ===== */
  {
    world: 5,
    prompt: "A picture of a cat riding a unicorn looks super real. It might be…",
    choices: [
      { text: "AI-generated or edited — don’t believe pictures just because they look real", correct: true },
      { text: "Always a real photo, because cameras don’t lie", why: "Cameras can be edited, and AI can invent photos that never happened." },
      { text: "Proof that unicorns exist", why: "As cool as that would be… a picture isn’t proof anymore." },
      { text: "Automatically true if it appears in a “news” post", why: "Fake images get dressed up as news all the time. Check first." }
    ],
    celebrate: "Picture pro! Real-looking ≠ real. Ask before you believe."
  },
  {
    world: 5,
    prompt: "A video shows a famous person saying something wild. You should…",
    choices: [
      { text: "Check with a trusted adult and reliable sources before believing or sharing", correct: true },
      { text: "Share it immediately so you’re first", why: "First to share can also mean first to spread a fake. Pause." },
      { text: "Believe it if lots of kids are sharing it", why: "Lots of shares can mean it’s popular — not that it’s true." },
      { text: "Believe it if the comments all agree", why: "Comments can be wrong together. Check real sources instead." }
    ],
    celebrate: "Check, then chat. Viral isn’t the same as verified."
  },
  {
    world: 5,
    prompt: "A chatbot gives you homework answers. You should remember…",
    choices: [
      { text: "Bots can be wrong. Do your own thinking and follow your teacher’s rules", correct: true },
      { text: "Copy the answers as your own work", why: "That’s not honest, and the bot might be incorrect anyway." },
      { text: "Trust it 100% because computers don’t make mistakes", why: "Chatbots invent things sometimes. They are not answer keys." },
      { text: "Ask it to write in your “voice” so no one knows", why: "Hiding it doesn’t make it your work. Follow classroom rules." }
    ],
    celebrate: "Bot brain: helpful sometimes, perfect never. You are the thinker."
  },
  {
    world: 5,
    prompt: "A message says, “Your favorite YouTuber will visit your school — click for tickets!” This is likely…",
    choices: [
      { text: "A trick to get clicks or info. Check with a trusted adult", correct: true },
      { text: "A true surprise your school forgot to mention", why: "If it were real, your school would tell families — not a random clicky message." },
      { text: "Safe because it’s exciting", why: "Exciting is how tricks get clicks. Excitement is a yellow flag." },
      { text: "Real if it uses the YouTuber’s picture", why: "Anyone can copy a picture. Pictures don’t prove a visit." }
    ],
    celebrate: "Click trap spotted. Excitement + mystery link = ask an adult."
  },
  {
    world: 5,
    prompt: "A deepfake is…",
    choices: [
      { text: "AI-made audio or video that can make someone appear to say or do things they didn’t", correct: true },
      { text: "A very tired person", why: "Ha — “deep sleepy” would be funny, but deepfake means a fake video or voice." },
      { text: "A video about scuba diving", why: "Not that kind of deep. It means a realistic fake made with AI." },
      { text: "A type of extra-long password", why: "Good passwords are great, but that’s not what deepfake means." }
    ],
    celebrate: "Detective mode: if it can look/sound real, it might still be fake."
  },
  {
    world: 5,
    prompt: "How can you check if a “news” story is real?",
    choices: [
      { text: "Ask a trusted adult and look on known news sites. Beware of strange links", correct: true },
      { text: "If it has ALL CAPS, it must be urgent and true", why: "ALL CAPS is a trick to get big feelings, not a truth stamp." },
      { text: "If a friend forwarded it, it’s already checked", why: "Friends can get fooled too. Be a second checker." },
      { text: "If it has lots of emojis, it’s kid-safe and true", why: "Emojis make things feel friendly. They don’t make facts." }
    ],
    celebrate: "News nose working! Adults + known sites beat all-caps forwards."
  },
  {
    world: 5,
    prompt: "An AI tool made an unkind picture of a classmate. You should…",
    choices: [
      { text: "Not share it. Delete it and tell a trusted adult — fake or not, it can hurt", correct: true },
      { text: "Share it as a joke because “it’s not even real”", why: "Fake pictures can still embarrass and hurt. Not-real isn’t a free pass." },
      { text: "Only send it in a private message", why: "Private still spreads hurt, and it can be screenshotted." },
      { text: "Print it and bring it to school", why: "That’s spreading it offline too. Don’t. Tell an adult instead." }
    ],
    celebrate: "Kindness filter on. Fake media can still cause real hurt."
  },

  /* ===== World 6: Asking for Help ===== */
  {
    world: 6,
    prompt: "Who is a trusted adult you could tell about an online problem?",
    choices: [
      { text: "A parent, guardian, teacher, counselor, or another adult you know in real life", correct: true },
      { text: "A random gamer who offered to “help” in chat", why: "Online strangers are not your safety team. Pick a real-life adult you know." },
      { text: "Anyone with a green checkmark by their name", why: "Checkmarks can be copied or meaningless. Trust real-life adults." },
      { text: "A pop-up window that says “Click here for help”", why: "That’s often a trick. Walk over (or call) a human you know." }
    ],
    celebrate: "Real-life helpers: parents, teachers, counselors. That’s your crew."
  },
  {
    world: 6,
    prompt: "You feel scared after a message. Asking for help is…",
    choices: [
      { text: "Brave and the right move — adults want to keep you safe", correct: true },
      { text: "Tattling, and you might get in trouble just for using a device", why: "Safety first. Trusted adults care more about protecting you than about “tattling.”" },
      { text: "Only for little kids", why: "Guardians of every age ask for help. That’s how teams work." },
      { text: "A last resort after you try to handle it ten times alone", why: "You don’t have to wait. Early help is easier help." }
    ],
    celebrate: "Brave ask. Scared + tell an adult is a winning combo."
  },
  {
    world: 6,
    prompt: "You clicked a bad link by accident. You should…",
    choices: [
      { text: "Tell a trusted adult right away — faster help, less harm", correct: true },
      { text: "Hide it so you don’t get in trouble", why: "Hiding it can let a problem grow. Adults can help more when they know now." },
      { text: "Click more links to try to “undo” it", why: "Extra clicks can make it worse. Stop and get an adult." },
      { text: "Restart the computer 20 times and never mention it", why: "Restart might help a little, but an adult still needs to know." }
    ],
    celebrate: "Oops + tell is perfect. Accidents happen; silence makes them messier."
  },
  {
    world: 6,
    prompt: "A friend shows you something online that feels wrong. You should…",
    choices: [
      { text: "Encourage them to tell a trusted adult — and you can tell one too", correct: true },
      { text: "Promise to keep it a secret no matter what", why: "Safety secrets shouldn’t stay secret. Telling a trusted adult is helping, not snitching." },
      { text: "Laugh so they don’t feel awkward", why: "Laughing can make them feel more alone. Take it seriously." },
      { text: "Comment on it so the website knows you saw it", why: "Don’t engage. Get a trusted adult involved instead." }
    ],
    celebrate: "Friend backup! Two kids plus one adult is a strong team."
  },
  {
    world: 6,
    prompt: "A school counselor or teacher can help with…",
    choices: [
      { text: "Online problems, bullying, and scary messages — that’s part of keeping students safe", correct: true },
      { text: "Only math worksheets", why: "They help with a lot more than math. Online worries are allowed." },
      { text: "Only lost lunchboxes", why: "Lunchboxes yes — and also feelings, bullying, and internet problems." },
      { text: "Only problems a parent already emailed about", why: "You can go to them first. You don’t need a parent email to ask for help at school." }
    ],
    celebrate: "School helpers are on the safety team. Use them!"
  },
  {
    world: 6,
    prompt: "If the adult you told doesn’t understand at first, you should…",
    choices: [
      { text: "Tell another trusted adult — keep asking until someone helps", correct: true },
      { text: "Give up so you don’t bother anyone", why: "You’re not a bother. If the first adult misses it, try the next one." },
      { text: "Handle it alone from now on", why: "Alone is how little problems become big ones. Keep asking." },
      { text: "Post about it publicly so strangers can advise you", why: "Public posts can bring more strangers. Stick to trusted real-life adults." }
    ],
    celebrate: "Keep asking. The right helper is out there."
  },
  {
    world: 6,
    prompt: "The most important Net Guardian rule is…",
    choices: [
      { text: "You don’t have to handle online problems alone — pause, protect your info, and ask for help", correct: true },
      { text: "Never use the internet, ever", why: "The internet can be great for learning and play. The goal is using it safely, not quitting forever." },
      { text: "Always be the first to comment", why: "Speed isn’t safety. Pause is more powerful than posting first." },
      { text: "Win every game so nobody can bully you", why: "Winning doesn’t stop unkind people. Tools, kindness, and adults do." }
    ],
    celebrate: "Guardian Gold! Pause. Protect. Ask. You’re a Net Guardian."
  }
]
;

NG.QUESTIONS_BY_GRADE[3] = [
  {
    world: 0,
    prompt: "What is okay to put on a game profile?",
    choices: [
      { text: "Your favorite animal or color", correct: true },
      { text: "Your home address", why: "An address tells strangers where you live. Keep it private." },
      { text: "Your school name", why: "School names help strangers find you during the day." },
      { text: "Your full real name and birthday", why: "Use a nickname. Full names and birthdays are private." },
    ],
    celebrate: "Yes! Favorites are fine. Real-life details stay private."
  },
  {
    world: 0,
    prompt: "A player asks, “Where do you live?” What should you do?",
    choices: [
      { text: "Don’t say. Tell a trusted adult.", correct: true },
      { text: "Tell them your street", why: "Never share where you live with someone online." },
      { text: "Tell them your city only", why: "Even a city can be too much. Keep it private and tell an adult." },
      { text: "Ask them first, then share", why: "Trading addresses is still unsafe." },
    ],
    celebrate: "Great. You don’t share where you live — and you tell an adult."
  },
  {
    world: 0,
    prompt: "Which of these is personal information?",
    choices: [
      { text: "Your phone number and home address", correct: true },
      { text: "That you like pizza", why: "Likes are okay. Phone numbers and addresses are private." },
      { text: "Your favorite game", why: "Games you like are fine to share." },
      { text: "A drawing you made", why: "Your art is okay (with family rules). Addresses are not." },
    ],
    celebrate: "You got it. Phone numbers and addresses stay private."
  },
  {
    world: 0,
    prompt: "A pop-up says “Type Mom’s credit card for FREE coins!” You should…",
    choices: [
      { text: "Close it and tell a trusted adult", correct: true },
      { text: "Type the numbers fast", why: "That’s a trick. Never type money info into a pop-up." },
      { text: "Ask a friend to type theirs", why: "That still isn’t safe. Close it and tell an adult." },
      { text: "Type fake numbers for fun", why: "Don’t play with those pop-ups. Close them." },
    ],
    celebrate: "Nice catch! Free-coin pop-ups that want cards are tricks."
  },
  {
    world: 0,
    prompt: "Why shouldn’t you post a photo of your house number?",
    choices: [
      { text: "Someone could find where you live", correct: true },
      { text: "Photos use too many coins", why: "The real problem is location, not coins." },
      { text: "Houses look boring", why: "It’s about safety, not boring." },
      { text: "Teachers delete them all", why: "Teachers can’t catch every photo. You help keep it private." },
    ],
    celebrate: "Right. House numbers can show your location."
  },
  {
    world: 0,
    prompt: "Someone asks for your last name in game chat. You should…",
    choices: [
      { text: "Keep it private. Use your game nickname.", correct: true },
      { text: "Share it so you can be “family” in the game", why: "Games don’t need your real last name." },
      { text: "Post it in public chat", why: "Public chat is a bad place for real names." },
      { text: "Share first and last name", why: "Full real names help strangers know who you are." },
    ],
    celebrate: "Yes. Nicknames for games. Real last names stay private."
  },
  {
    world: 0,
    prompt: "Best rule for personal info?",
    choices: [
      { text: "Only share with people you know in real life — and with an adult’s okay", correct: true },
      { text: "Share if they seem nice", why: "Nice words are easy to fake." },
      { text: "Share after three messages", why: "A few messages don’t make a stranger safe." },
      { text: "Share if they share first", why: "They might be faking. Don’t trade private info." },
    ],
    celebrate: "Net Guardian rule: real life + adult okay."
  },
  {
    world: 1,
    prompt: "Someone posts a mean joke about a kid. What should you do?",
    choices: [
      { text: "Don’t join in. Be kind, and tell a trusted adult", correct: true },
      { text: "Add a laughing emoji", why: "That piles on and can hurt more." },
      { text: "Share it with more people", why: "Spreading it helps the bullying." },
      { text: "Never tell anyone", why: "You can tell an adult so it can stop." },
    ],
    celebrate: "Upstander move! Kindness + telling an adult helps."
  },
  {
    world: 1,
    prompt: "Someone keeps sending mean messages. A smart step is…",
    choices: [
      { text: "Block or report, and tell a trusted adult", correct: true },
      { text: "Send meaner messages back", why: "Fighting back usually makes it worse." },
      { text: "Delete your account and hide", why: "You shouldn’t have to disappear. Get help." },
      { text: "Pretend you like it", why: "You don’t have to fake a smile. Block and tell." },
    ],
    celebrate: "Block, report, tell — that’s the power trio."
  },
  {
    world: 1,
    prompt: "If someone says “it’s just a joke” but it hurts, is it okay?",
    choices: [
      { text: "No — if it hurts, it’s not okay", correct: true },
      { text: "Yes, jokes never count", why: "Hurtful jokes can still be bullying." },
      { text: "Only if they use ALL CAPS", why: "Hurt matters more than caps lock." },
      { text: "Only on school nights", why: "Mean messages are a problem any day." },
    ],
    celebrate: "Exactly. “Just a joke” doesn’t make hurt okay."
  },
  {
    world: 1,
    prompt: "You see a rumor about a friend. You should…",
    choices: [
      { text: "Don’t spread it. Tell an adult if it could hurt someone", correct: true },
      { text: "Forward it so more people know", why: "Forwarding makes the rumor bigger." },
      { text: "Add extra details", why: "That spreads it more." },
      { text: "Post it on another app", why: "Moving a rumor still spreads hurt." },
    ],
    celebrate: "Rumor stopper! You broke the chain."
  },
  {
    world: 1,
    prompt: "Being kind online means…",
    choices: [
      { text: "Treating people with respect", correct: true },
      { text: "Only being nice to best friends", why: "Everyone deserves respect." },
      { text: "Never talking to anyone", why: "You can chat — just be kind." },
      { text: "Winning every argument", why: "Respect matters more than winning." },
    ],
    celebrate: "Respect even when you disagree."
  },
  {
    world: 1,
    prompt: "A friend wants you to help post mean “prank” comments. You should…",
    choices: [
      { text: "Say no. Mean pranks are bullying", correct: true },
      { text: "Help because pranks are funny", why: "If it hurts, it isn’t funny." },
      { text: "Do it from a fake name", why: "Hiding doesn’t make it okay." },
      { text: "Post just one mean comment", why: "One mean comment still counts." },
    ],
    celebrate: "Saying no is loyal and kind."
  },
  {
    world: 1,
    prompt: "You were mean in chat and feel sorry. What next?",
    choices: [
      { text: "Apologize, stop, and ask an adult how to make it right", correct: true },
      { text: "Ignore it and hope they forget", why: "Owning it is braver." },
      { text: "Make a new account", why: "A new account doesn’t fix hurt." },
      { text: "Blame someone else", why: "Your words are your job to fix." },
    ],
    celebrate: "Sorry + stop + adult help. That’s growth."
  },
  {
    world: 2,
    prompt: "Someone you only know online wants to meet at the park. You should…",
    choices: [
      { text: "Don’t go. Tell a trusted adult right away", correct: true },
      { text: "Go with a friend but no adult", why: "Kids can’t keep each other safe from a stranger. Tell an adult." },
      { text: "Go if they seem nice", why: "Nice words can be fake. Don’t meet online-only people alone." },
      { text: "Meet in a busy place by yourself", why: "A crowd doesn’t make a stranger safe." },
    ],
    celebrate: "Best safety move. Tell an adult — don’t go."
  },
  {
    world: 2,
    prompt: "A gamer you never met asks for your phone number. You should…",
    choices: [
      { text: "Keep it private. Use the game chat with family rules", correct: true },
      { text: "Give it so you can play faster", why: "You can play without sharing your number." },
      { text: "Give a parent’s number instead", why: "Don’t give family numbers to strangers either." },
      { text: "Trade numbers", why: "Trading doesn’t make it safe." },
    ],
    celebrate: "Phone numbers stay private. Good call!"
  },
  {
    world: 2,
    prompt: "A stranger says “Free skins if you click this link!” This is…",
    choices: [
      { text: "A trick. Don’t click. Tell an adult", correct: true },
      { text: "A nice gift", why: "Free rare stuff from strangers is often a trap." },
      { text: "Safe if the picture looks real", why: "Pictures are easy to fake." },
      { text: "Okay if friends say they did it", why: "Friends can get tricked too. Still don’t click." },
    ],
    celebrate: "Scam spotted! Mystery links = walk away."
  },
  {
    world: 2,
    prompt: "Voice chat tip:",
    choices: [
      { text: "Only with people a trusted adult says are okay — and know how to mute", correct: true },
      { text: "Talk with anyone", why: "You can’t see who is really talking." },
      { text: "Always say your real name", why: "Use your game name, not your real name." },
      { text: "Never mute, even if you feel weird", why: "Mute and leave if you feel uneasy." },
    ],
    celebrate: "Adult-approved + mute skills. Nice!"
  },
  {
    world: 2,
    prompt: "If chat makes you uncomfortable, you should…",
    choices: [
      { text: "Leave or block, and tell a trusted adult", correct: true },
      { text: "Stay so you don’t seem rude", why: "Your safety matters more than being “polite” to a stranger." },
      { text: "Argue until they say sorry", why: "You don’t have to win. Leaving is smart." },
      { text: "Show the chat to lots of kids for fun", why: "Tell an adult instead of spreading it." },
    ],
    celebrate: "Leave. Block. Tell. You always have an exit."
  },
  {
    world: 2,
    prompt: "Online friends you never met in real life are still…",
    choices: [
      { text: "Strangers until a trusted adult is involved", correct: true },
      { text: "Best friends after one week", why: "Time online doesn’t make someone safe." },
      { text: "Safe if they sent a photo", why: "Photos can be fake or stolen." },
      { text: "Safe if they know your favorite game", why: "Anyone can learn that from chat." },
    ],
    celebrate: "Yep. Online-only still means stranger."
  },
  {
    world: 2,
    prompt: "Someone uses mean words in game chat. You should…",
    choices: [
      { text: "Mute and report. Tell an adult if it feels scary", correct: true },
      { text: "Yell mean words back", why: "Yelling back can get you in trouble too." },
      { text: "Give them your friends list", why: "Don’t connect a mean stranger to more kids." },
      { text: "Keep playing no matter what", why: "Walking away is okay and smart." },
    ],
    celebrate: "Mute, report, tell. Use the tools!"
  },
  {
    world: 3,
    prompt: "Which password is stronger?",
    choices: [
      { text: "Blue7!Rocket", correct: true },
      { text: "password", why: "That’s too easy to guess." },
      { text: "dog", why: "Short real words are weak." },
      { text: "123456", why: "Number patterns are weak." },
    ],
    celebrate: "Longer and mixed is stronger. Great!"
  },
  {
    world: 3,
    prompt: "Should you share your password with your best friend?",
    choices: [
      { text: "No. Passwords stay secret (a parent can help if needed)", correct: true },
      { text: "Yes — best friends share everything", why: "Even best friends shouldn’t have your password." },
      { text: "Yes if they pinky-promise", why: "Promises can break. Keep it secret." },
      { text: "Yes for games only", why: "Game accounts matter too." },
    ],
    celebrate: "Secret Keeper! Passwords aren’t for sharing."
  },
  {
    world: 3,
    prompt: "A pop-up says “Type your password to win!” You should…",
    choices: [
      { text: "Close it and tell an adult", correct: true },
      { text: "Type it for the prize", why: "That’s a trick to steal your password." },
      { text: "Type a wrong password to test", why: "Don’t type passwords into surprise pop-ups." },
      { text: "Ask the pop-up if it’s real", why: "Pop-ups can lie. Ask a real adult." },
    ],
    celebrate: "Fake prize finder! Pop-ups don’t get passwords."
  },
  {
    world: 3,
    prompt: "On a shared classroom Chromebook, when you’re done you should…",
    choices: [
      { text: "Sign out", correct: true },
      { text: "Leave it logged in for later", why: "The next person could use your account." },
      { text: "Write the password on a sticky note", why: "Others could see it." },
      { text: "Let the next kid keep using your login", why: "Then their clicks look like yours." },
    ],
    celebrate: "Sign-out star! Shared computers need a clean handoff."
  },
  {
    world: 3,
    prompt: "Who may help you remember a password?",
    choices: [
      { text: "A parent or guardian — not a sticky note on your desk", correct: true },
      { text: "The whole class", why: "Don’t share with the class." },
      { text: "Anyone in game chat", why: "Online people don’t get your password." },
      { text: "A pop-up that offers to “save it for you”", why: "Be careful. Ask a parent first." },
    ],
    celebrate: "Parents help. Sticky notes on desks are risky."
  },
  {
    world: 3,
    prompt: "A good password is…",
    choices: [
      { text: "Hard for others to guess and kept secret", correct: true },
      { text: "Your first name", why: "Names are easy to guess." },
      { text: "Your birthday only", why: "Birthdays are personal and easy to try." },
      { text: "The word password", why: "That’s the first thing many people try." },
    ],
    celebrate: "Hard to guess + secret = strong."
  },
  {
    world: 3,
    prompt: "If someone asks for your password “to help you,” you should…",
    choices: [
      { text: "Say no and tell a trusted adult", correct: true },
      { text: "Give it so they can fix your account", why: "Real helpers don’t need your password that way. Tell an adult." },
      { text: "Give half of it", why: "Don’t give any of it." },
      { text: "Post it in chat for the team", why: "Never post a password." },
    ],
    celebrate: "No password sharing. Tell an adult."
  },
  {
    world: 4,
    prompt: "A digital footprint is…",
    choices: [
      { text: "The trail of things you post and share online", correct: true },
      { text: "Mud on a keyboard", why: "It’s a trail of online activity, not dirt." },
      { text: "Only school email", why: "Posts, photos, and comments count too." },
      { text: "Your shoe size in a game", why: "It means marks you leave on the internet." },
    ],
    celebrate: "You found the trail!"
  },
  {
    world: 4,
    prompt: "You post something mean, then delete it. What might still be true?",
    choices: [
      { text: "Someone may have saved a screenshot", correct: true },
      { text: "It’s gone from every device forever", why: "Copies can remain. Think before you post." },
      { text: "The internet forgets in five minutes", why: "The internet can remember a long time." },
      { text: "Only teachers can see old posts", why: "Classmates can screenshot too." },
    ],
    celebrate: "Pause before you post. Delete isn’t a time machine."
  },
  {
    world: 4,
    prompt: "Before posting a photo of a friend, you should…",
    choices: [
      { text: "Ask them if it’s okay", correct: true },
      { text: "Post first, ask later", why: "Ask before it goes out." },
      { text: "Crop their shoes so they won’t know", why: "They might still know. Ask first." },
      { text: "Tag their house", why: "Don’t add private location info." },
    ],
    celebrate: "Ask first. Friends’ photos need permission."
  },
  {
    world: 4,
    prompt: "Future teachers or coaches might see…",
    choices: [
      { text: "Public posts and photos you share now", correct: true },
      { text: "Nothing — the internet resets each summer", why: "There’s no yearly reset." },
      { text: "Only private messages", why: "Public posts are easy to find." },
      { text: "Only official grades", why: "Jokes and photos can stick around too." },
    ],
    celebrate: "Post things you’d still be proud of."
  },
  {
    world: 4,
    prompt: "A kind digital footprint looks like…",
    choices: [
      { text: "Helpful, respectful posts you’re proud of", correct: true },
      { text: "Mean memes for laughs", why: "Laughs at someone else can follow you." },
      { text: "Copying art and calling it yours", why: "That’s not respectful." },
      { text: "Winning mean comment fights", why: "Kind beats clap-backs." },
    ],
    celebrate: "Proud and kind — great footprint!"
  },
  {
    world: 4,
    prompt: "Sharing an embarrassing chat screenshot of someone is…",
    choices: [
      { text: "Not okay — it can hurt them", correct: true },
      { text: "Fine if it’s true", why: "True can still be unkind." },
      { text: "Okay if you blur the name a little", why: "People may still know who it is." },
      { text: "Required so everyone knows", why: "Private moments don’t need to go public." },
    ],
    celebrate: "You didn’t spread hurt. Nice."
  },
  {
    world: 4,
    prompt: "Best posting habit?",
    choices: [
      { text: "Pause: Would I be okay if a teacher or grandparent saw this?", correct: true },
      { text: "Post the second you think of it", why: "Fast posts are easy to regret." },
      { text: "Only post at night so no one sees", why: "Night doesn’t hide a public post." },
      { text: "Use ALL CAPS so people listen", why: "Caps don’t make a post wiser." },
    ],
    celebrate: "Pause power! Great habit."
  },
  {
    world: 5,
    prompt: "A silly animal picture looks super real. It might be…",
    choices: [
      { text: "Made by a computer (AI) or edited — don’t believe every picture", correct: true },
      { text: "Always a real photo", why: "Pictures can be edited or made up." },
      { text: "Proof unicorns are real", why: "A picture isn’t proof anymore." },
      { text: "True if it says “news”", why: "Fake pictures get dressed up as news." },
    ],
    celebrate: "Picture pro! Real-looking isn’t always real."
  },
  {
    world: 5,
    prompt: "A video shows a famous person saying something wild. You should…",
    choices: [
      { text: "Ask a trusted adult before believing or sharing", correct: true },
      { text: "Share it first so you’re fastest", why: "Fast shares can spread fakes." },
      { text: "Believe it if lots of kids share it", why: "Popular isn’t the same as true." },
      { text: "Believe it if comments agree", why: "Comments can be wrong together." },
    ],
    celebrate: "Check with an adult. Viral ≠ verified."
  },
  {
    world: 5,
    prompt: "A chatbot gives homework answers. Remember…",
    choices: [
      { text: "Bots can be wrong. Do your own thinking and follow teacher rules", correct: true },
      { text: "Copy the answers as your work", why: "That isn’t honest, and bots make mistakes." },
      { text: "Trust it 100%", why: "Computers can invent wrong answers." },
      { text: "Ask it to hide that you used it", why: "Follow classroom rules instead." },
    ],
    celebrate: "You’re the thinker. Bots aren’t perfect."
  },
  {
    world: 5,
    prompt: "A message says “Click for free tickets to meet a star!” This is likely…",
    choices: [
      { text: "A trick. Check with a trusted adult", correct: true },
      { text: "A real surprise from school", why: "Schools tell families — not random click links." },
      { text: "Safe because it’s exciting", why: "Excitement can be a yellow flag." },
      { text: "Real if it uses a star’s picture", why: "Anyone can copy a picture." },
    ],
    celebrate: "Click trap spotted. Ask an adult."
  },
  {
    world: 5,
    prompt: "“Deepfake” means…",
    choices: [
      { text: "A fake video or voice that looks or sounds real", correct: true },
      { text: "A very tired person", why: "Funny guess — but it means a realistic fake." },
      { text: "A scuba video", why: "Not that kind of deep." },
      { text: "A long password", why: "Good passwords matter, but that’s not a deepfake." },
    ],
    celebrate: "If it looks real, it might still be fake."
  },
  {
    world: 5,
    prompt: "How do you check a “news” story?",
    choices: [
      { text: "Ask a trusted adult and look on known news sites", correct: true },
      { text: "ALL CAPS means it’s true", why: "Caps are for big feelings, not truth." },
      { text: "If a friend sent it, it’s checked", why: "Friends can get fooled too." },
      { text: "Lots of emojis means it’s true", why: "Emojis don’t make facts." },
    ],
    celebrate: "Adults + known sites beat all-caps forwards."
  },
  {
    world: 5,
    prompt: "Someone made an unkind fake picture of a classmate. You should…",
    choices: [
      { text: "Not share it. Tell a trusted adult", correct: true },
      { text: "Share it as a joke because it’s fake", why: "Fake can still hurt." },
      { text: "Only send it privately", why: "Private can still be screenshotted." },
      { text: "Print it for school", why: "Don’t spread it. Tell an adult." },
    ],
    celebrate: "Kindness filter on. Fake can still hurt."
  },
  {
    world: 6,
    prompt: "Who is a trusted adult for online problems?",
    choices: [
      { text: "A parent, guardian, teacher, or counselor you know in real life", correct: true },
      { text: "A random gamer in chat", why: "Online strangers aren’t your safety team." },
      { text: "Anyone with a green checkmark", why: "Checkmarks can be fake." },
      { text: "A pop-up that says Click for help", why: "That’s often a trick. Ask a real adult." },
    ],
    celebrate: "Real-life helpers are your crew."
  },
  {
    world: 6,
    prompt: "You feel scared after a message. Asking for help is…",
    choices: [
      { text: "Brave — adults want to keep you safe", correct: true },
      { text: "Tattling", why: "Safety isn’t tattling. Adults want to protect you." },
      { text: "Only for little kids", why: "Every age can ask for help." },
      { text: "Only after you try alone ten times", why: "You don’t have to wait. Ask early." },
    ],
    celebrate: "Brave ask! Scared + tell an adult is smart."
  },
  {
    world: 6,
    prompt: "You clicked a bad link by accident. You should…",
    choices: [
      { text: "Tell a trusted adult right away", correct: true },
      { text: "Hide it so you don’t get in trouble", why: "Telling sooner helps more." },
      { text: "Click more links to undo it", why: "Stop clicking. Get an adult." },
      { text: "Never mention it", why: "Adults can help if they know." },
    ],
    celebrate: "Oops + tell is perfect."
  },
  {
    world: 6,
    prompt: "A friend shows you something online that feels wrong. You should…",
    choices: [
      { text: "Help them tell a trusted adult — you can tell one too", correct: true },
      { text: "Promise to keep it secret forever", why: "Safety secrets need a trusted adult." },
      { text: "Laugh so they don’t feel weird", why: "Take it seriously." },
      { text: "Comment on the website", why: "Don’t engage. Get an adult." },
    ],
    celebrate: "Friend backup! Kids + adult = strong team."
  },
  {
    world: 6,
    prompt: "Teachers and counselors can help with…",
    choices: [
      { text: "Online problems, bullying, and scary messages", correct: true },
      { text: "Only math", why: "They help with feelings and safety too." },
      { text: "Only lost lunchboxes", why: "Lunchboxes and internet worries both count." },
      { text: "Only if a parent emailed first", why: "You can ask at school first." },
    ],
    celebrate: "School helpers are on your safety team."
  },
  {
    world: 6,
    prompt: "If the first adult doesn’t understand, you should…",
    choices: [
      { text: "Tell another trusted adult until someone helps", correct: true },
      { text: "Give up", why: "You’re not a bother. Try the next adult." },
      { text: "Handle it alone", why: "Keep asking for help." },
      { text: "Post about it for strangers’ advice", why: "Stick to trusted real-life adults." },
    ],
    celebrate: "Keep asking. The right helper is out there."
  },
  {
    world: 6,
    prompt: "Most important Net Guardian rule?",
    choices: [
      { text: "You don’t have to handle online problems alone — pause, protect info, ask for help", correct: true },
      { text: "Never use the internet", why: "Use it safely — you don’t have to quit forever." },
      { text: "Always comment first", why: "Pause beats racing to post." },
      { text: "Win every game so no one is mean", why: "Tools, kindness, and adults help more than winning." },
    ],
    celebrate: "Guardian Gold! Pause. Protect. Ask."
  }
];

NG.QUESTIONS_BY_GRADE[5] = [
  {
    world: 0,
    prompt: "Which public profile detail is usually safest?",
    choices: [
      { text: "A hobby or favorite book (no real-world location clues)", correct: true },
      { text: "Your school mascot plus the town name", why: "Together, those can pinpoint where you go each day." },
      { text: "A selfie in front of your house number", why: "Photos can leak your exact address." },
      { text: "Your full legal name and birth year", why: "Identity details help strangers track or impersonate you." },
    ],
    celebrate: "Hobbies yes. Location and identity details no."
  },
  {
    world: 0,
    prompt: "A “friend of a friend” in a game asks for your class schedule to “meet after school.” Best response?",
    choices: [
      { text: "Refuse, stop the chat about meeting, and tell a trusted adult", correct: true },
      { text: "Share only the days you have sports", why: "Any schedule detail helps someone find you in person." },
      { text: "Share if your classmate says they know them", why: "Secondhand intros online aren’t proof of safety." },
      { text: "Suggest a public place and go alone", why: "Don’t arrange in-person meetups with online contacts without an adult in charge." },
    ],
    celebrate: "Schedules stay private. Adults handle real-life plans."
  },
  {
    world: 0,
    prompt: "Privacy settings are most useful when you…",
    choices: [
      { text: "Review them with a trusted adult and limit who sees posts, friends lists, and location", correct: true },
      { text: "Turn everything to Public so you get more likes", why: "Likes aren’t worth broadcasting personal life to strangers." },
      { text: "Ignore them because defaults are always safest", why: "Defaults vary. Check with an adult." },
      { text: "Only change them after something bad happens", why: "Set them before problems — prevention beats cleanup." },
    ],
    celebrate: "Settings + an adult review = stronger privacy."
  },
  {
    world: 0,
    prompt: "A site asks for your parent’s credit card “to prove you’re not a robot.” You should…",
    choices: [
      { text: "Stop, close it, and get a trusted adult — that’s not a normal robot check", correct: true },
      { text: "Enter the card so you can keep playing", why: "Real CAPTCHA/robot checks don’t need credit cards." },
      { text: "Enter partial numbers to be “safe”", why: "Don’t enter payment info into surprise prompts." },
      { text: "Use a friend’s family card instead", why: "That still risks money and breaks trust." },
    ],
    celebrate: "Payment details aren’t robot checks. Adult time!"
  },
  {
    world: 0,
    prompt: "Why can tagging a location on a photo be risky?",
    choices: [
      { text: "It can show where you were — and patterns of where you go", correct: true },
      { text: "Locations only work indoors", why: "Location tags work many places and can reveal routines." },
      { text: "Tags delete themselves overnight", why: "Location history can stick around." },
      { text: "Only adults can see location tags", why: "Depending on settings, many people might." },
    ],
    celebrate: "Location trails are part of privacy. Think before tagging."
  },
  {
    world: 0,
    prompt: "Someone wants your last name to “verify” a giveaway. Smart move?",
    choices: [
      { text: "Don’t share. Real giveaways don’t need your private identity in random chat — tell an adult", correct: true },
      { text: "Share because giveaways are official", why: "Scammers love fake giveaways." },
      { text: "Share a misspelled version", why: "Don’t play identity games with strangers." },
      { text: "Share in exchange for their last name", why: "Trading private info still isn’t safe." },
    ],
    celebrate: "Identity stays offline unless a trusted adult says otherwise."
  },
  {
    world: 0,
    prompt: "Best personal-info rule for Grade 5?",
    choices: [
      { text: "If it could help someone find, contact, or impersonate you offline, keep it private and ask an adult", correct: true },
      { text: "Share freely on private accounts because private means secret forever", why: "Private accounts can still leak via screenshots and friends-of-friends." },
      { text: "Share if you’ve video-chatted once", why: "A video chat isn’t full real-life trust." },
      { text: "Share school details but never hobbies", why: "Hobbies are usually safer than school/location details." },
    ],
    celebrate: "Find / contact / impersonate test — excellent filter."
  },
  {
    world: 1,
    prompt: "You see classmates piling on a mean meme about a peer. As a bystander you should…",
    choices: [
      { text: "Refuse to share it, support the target privately or publicly if safe, and report it to a trusted adult", correct: true },
      { text: "Add a fire emoji so you stay popular", why: "Reactions can amplify harm." },
      { text: "Share it with a warning caption", why: "Sharing still spreads the hurt." },
      { text: "Wait a week to see if it dies down", why: "Early adult help can stop it sooner." },
    ],
    celebrate: "Upstander recipe: don’t amplify, support, report."
  },
  {
    world: 1,
    prompt: "Persistent mean DMs after you asked them to stop is…",
    choices: [
      { text: "Harassment — document, block/report, and involve a trusted adult", correct: true },
      { text: "Normal teasing you should toughen up about", why: "Repeated unwanted meanness isn’t something you have to absorb." },
      { text: "Only a problem if they use your real name", why: "Harassment counts with nicknames too." },
      { text: "Solved by insulting them once publicly", why: "Escalation can backfire; use tools + adults." },
    ],
    celebrate: "Document → block/report → adult. Solid plan."
  },
  {
    world: 1,
    prompt: "“It’s satire / just a joke” excuses hurtful posts when…",
    choices: [
      { text: "Never automatically — impact and targeting matter more than the poster’s label", correct: true },
      { text: "The poster adds lol", why: "Lol doesn’t erase harm." },
      { text: "It gets many likes", why: "Popularity isn’t kindness." },
      { text: "It happens after school hours", why: "Timing doesn’t cancel bullying." },
    ],
    celebrate: "Impact > excuse. You nailed it."
  },
  {
    world: 1,
    prompt: "A rumor about a classmate is spreading in three group chats. Best action?",
    choices: [
      { text: "Don’t forward it, tell people to stop, and loop in a trusted adult/school helper", correct: true },
      { text: "Forward it so the classmate can “fight back with facts”", why: "Forwarding multiplies the audience." },
      { text: "Add your theory to clarify", why: "Theories feed rumors." },
      { text: "Make a poll about who believes it", why: "Polls spread attention and harm." },
    ],
    celebrate: "Stop the chain + get help."
  },
  {
    world: 1,
    prompt: "Online disagreement becomes disrespect when you…",
    choices: [
      { text: "Attack the person (name-calling, threats, dogpiling) instead of the idea", correct: true },
      { text: "Ask a clarifying question", why: "Questions can be respectful." },
      { text: "Disagree with evidence calmly", why: "Calm disagreement is okay." },
      { text: "Step away to cool down", why: "Taking space is healthy." },
    ],
    celebrate: "Critique ideas, not people."
  },
  {
    world: 1,
    prompt: "A friend wants you to help run a “harmless” fake account to roast someone. You should…",
    choices: [
      { text: "Refuse, explain it’s still bullying/impersonation, and tell an adult if it continues", correct: true },
      { text: "Help but don’t type the meanest lines", why: "Participating still supports harm." },
      { text: "Help if the target “won’t see it”", why: "Screenshots travel." },
      { text: "Create it then delete it later", why: "Harm can happen before delete." },
    ],
    celebrate: "No fake roast accounts. That’s a hard no."
  },
  {
    world: 1,
    prompt: "You contributed to a pile-on and regret it. Strong repair includes…",
    choices: [
      { text: "Sincere apology, stop amplifying, remove what you can, and ask an adult how to make amends", correct: true },
      { text: "Silent unfollow and pretend it wasn’t you", why: "Repair needs ownership." },
      { text: "Blame the group chat vibe", why: "You still chose your clicks." },
      { text: "Post a vague story without naming the harm", why: "Vague posts rarely help the person you hurt." },
    ],
    celebrate: "Own it, stop it, amend it — with adult guidance."
  },
  {
    world: 2,
    prompt: "An online-only contact wants to move the chat to a private app and meet “just to hang.” You should…",
    choices: [
      { text: "Decline, keep chat in approved spaces, and tell a trusted adult about the meetup pressure", correct: true },
      { text: "Move apps but refuse the meetup", why: "Leaving approved spaces can isolate you from family rules and safety tools." },
      { text: "Meet in daylight with another kid only", why: "Adult involvement is required for safety." },
      { text: "Share your live location so friends can track you", why: "Live location can be misused; don’t meet." },
    ],
    celebrate: "Pressure to go private + meetup = tell an adult."
  },
  {
    world: 2,
    prompt: "Someone offers rare game items if you share a login code or password. This is…",
    choices: [
      { text: "An account-theft scam — refuse, report, tell an adult", correct: true },
      { text: "A normal tip from experienced players", why: "Real players don’t need your login secrets." },
      { text: "Safe if they go first with their code", why: "They may send a fake code." },
      { text: "Okay on weekends", why: "Scams don’t take weekends off." },
    ],
    celebrate: "Login secrets never equal loot."
  },
  {
    world: 2,
    prompt: "Voice chat safety upgrade for older kids:",
    choices: [
      { text: "Adult-approved people only, know mute/leave/report, and never share personal details on mic", correct: true },
      { text: "Keep mic open in public lobbies to make friends faster", why: "Open mics in public lobbies increase risk." },
      { text: "Say your real city so teammates “match your timezone”", why: "City info is personal." },
      { text: "Read chat codes aloud from strangers", why: "Those can be social-engineering tricks." },
    ],
    celebrate: "Approved people + mute tools + no personal mic info."
  },
  {
    world: 2,
    prompt: "A teammate you’ve played with for months asks for your phone number “for ranked scrims.” Best choice?",
    choices: [
      { text: "Keep contact inside the game/platform your family approved; ask a parent before any new contact method", correct: true },
      { text: "Share it — months of play means trust", why: "Long online contact still isn’t verified identity." },
      { text: "Share a Google Voice you made alone", why: "New contact channels need adult guidance." },
      { text: "Share a sibling’s number", why: "Don’t hand out family numbers." },
    ],
    celebrate: "Platform + parent rules beat random phone sharing."
  },
  {
    world: 2,
    prompt: "When chat turns creepy or aggressive mid-match, priority order is…",
    choices: [
      { text: "Mute/block/report, leave if needed, then tell a trusted adult — especially if it feels scary or repeats", correct: true },
      { text: "Finish the match first so you don’t lose rank", why: "Safety beats rank." },
      { text: "Argue until they admit fault", why: "You don’t owe a debate." },
      { text: "Dox their username to your class group chat", why: "Don’t spread conflict; use official report tools + adults." },
    ],
    celebrate: "Tools first, then adults. Rank can wait."
  },
  {
    world: 2,
    prompt: "“We’ve video-chatted, so they’re not a stranger.” Critique?",
    choices: [
      { text: "Still incomplete trust — deepfakes, filters, and stolen videos exist; adults should guide any real-life plans", correct: true },
      { text: "True — video proves identity forever", why: "Video can be faked or stolen." },
      { text: "True if they showed a student ID on camera", why: "IDs can be faked or stolen too; adults decide." },
      { text: "True after three successful raids", why: "Game skill ≠ safe identity." },
    ],
    celebrate: "Video ≠ automatic real-life trust."
  },
  {
    world: 2,
    prompt: "Downloading a “free mod menu” a stranger linked is risky mainly because…",
    choices: [
      { text: "It can be malware that steals accounts, passwords, or locks devices — ask an adult; use official sources only", correct: true },
      { text: "Mods always improve graphics safely", why: "Unofficial mods can be dangerous." },
      { text: "School Chromebooks can’t get malware", why: "Don’t assume — still avoid shady downloads." },
      { text: "Antivirus will fix anything afterward", why: "Prevention beats cleanup; don’t install mystery files." },
    ],
    celebrate: "Mystery downloads = malware risk. Official sources only."
  },
  {
    world: 3,
    prompt: "Strongest password strategy?",
    choices: [
      { text: "Long unique passphrase with mixed characters, not based on personal facts, different per important account", correct: true },
      { text: "One clever password reused everywhere", why: "Reuse means one leak opens many doors." },
      { text: "Pet name + birth year", why: "Personal facts are guessable." },
      { text: "Short word with a single ! at the end", why: "Too short and predictable." },
    ],
    celebrate: "Long, unique, non-personal — fortress grade."
  },
  {
    world: 3,
    prompt: "Two-factor / extra login codes (2FA) help because…",
    choices: [
      { text: "A stolen password alone often isn’t enough without the second check", correct: true },
      { text: "They prove the website is broken", why: "Extra codes are a security feature." },
      { text: "They replace the need for strong passwords", why: "You still want both." },
      { text: "You should turn them off to save time", why: "A few seconds beat a break-in." },
    ],
    celebrate: "Password + second factor = layered defense."
  },
  {
    world: 3,
    prompt: "A polished email says your account will close unless you “confirm password here.” You should…",
    choices: [
      { text: "Don’t click. Go to the real site/app yourself or ask an adult — this is classic phishing", correct: true },
      { text: "Click quickly so the account isn’t deleted", why: "Urgency is a phishing tactic." },
      { text: "Reply with the password for verification", why: "Never send passwords by email." },
      { text: "Forward it to classmates to warn them by spreading the link", why: "Forwarding the bait link can endanger others; tell an adult/IT instead." },
    ],
    celebrate: "Phishing radar on. Don’t click — navigate yourself."
  },
  {
    world: 3,
    prompt: "Why unique passwords per account matter more in middle school years?",
    choices: [
      { text: "One breached game or site can cascade into email/school accounts if you reused the same password", correct: true },
      { text: "Teachers require monthly password parties", why: "Nice idea, but cascade risk is the real reason." },
      { text: "Passwords automatically expire hourly", why: "They don’t — uniqueness still matters." },
      { text: "Unique passwords make Chromebooks faster", why: "Speed isn’t the point — isolation of risk is." },
    ],
    celebrate: "Reuse is a cascade risk. Unique keys per door."
  },
  {
    world: 3,
    prompt: "Shared Chromebook hygiene:",
    choices: [
      { text: "Sign out, don’t save passwords on shared profiles, and never leave accounts open", correct: true },
      { text: "Stay signed in for convenience between classes", why: "The next user inherits your access." },
      { text: "Write passwords under the keyboard", why: "Physical notes get found." },
      { text: "Let a friend finish your homework while logged in as you", why: "Their actions become your trail." },
    ],
    celebrate: "Sign out cleanly. Shared device = shared risk."
  },
  {
    world: 3,
    prompt: "With a parent, safer password storage is…",
    choices: [
      { text: "A reputable password manager or a parent-kept secure list — not classroom sticky notes or chat messages", correct: true },
      { text: "Text the password to yourself in a public Discord", why: "Chat logs aren’t a vault." },
      { text: "Use the same short PIN as your game locker", why: "Short PINs are weak for accounts." },
      { text: "Email passwords to a classmate backup buddy", why: "Buddies aren’t password vaults." },
    ],
    celebrate: "Adult-guided secure storage wins."
  },
  {
    world: 3,
    prompt: "Someone claims they’re “support” and needs your password plus the SMS code. You should…",
    choices: [
      { text: "Refuse both, hang up/close chat, and verify through official channels with an adult", correct: true },
      { text: "Give the password but not the SMS code", why: "Don’t give either to inbound “support.”" },
      { text: "Give the SMS code only", why: "Codes are keys — real support won’t DM-ask like that." },
      { text: "Read the code aloud on a voice call they started", why: "Inbound surprise support is a red flag." },
    ],
    celebrate: "Real support doesn’t beg for passwords + codes in random chat."
  },
  {
    world: 4,
    prompt: "Digital footprint includes…",
    choices: [
      { text: "Posts, photos, comments, usernames, and data shared across apps — sometimes longer than you expect", correct: true },
      { text: "Only content you still have in your camera roll", why: "Deleted local files don’t erase every online copy." },
      { text: "Only school LMS uploads", why: "Social and gaming trails count too." },
      { text: "Nothing if you use nicknames", why: "Nicknames still leave patterns and history." },
    ],
    celebrate: "Broad trail awareness — excellent."
  },
  {
    world: 4,
    prompt: "You delete an angry post. Residual risk remains because…",
    choices: [
      { text: "Screenshots, shares, caches, and other people’s copies may persist", correct: true },
      { text: "Platforms legally must erase every copy in 60 seconds", why: "That’s not how the open internet works." },
      { text: "Only verified adults can screenshot", why: "Anyone who saw it might." },
      { text: "Deletion rewrites other people’s memories", why: "Human memory and screenshots aren’t controlled by delete." },
    ],
    celebrate: "Pause > delete-as-time-machine myth."
  },
  {
    world: 4,
    prompt: "Before posting a friend’s photo or story, Grade 5 standard is…",
    choices: [
      { text: "Get their okay (and adult guidance if needed), avoid sensitive context, and skip location tags", correct: true },
      { text: "Post then unmute them if they complain", why: "Consent comes first." },
      { text: "It’s fine on Close Friends lists forever", why: "Even limited lists can leak." },
      { text: "Blur faces halfway so permission isn’t needed", why: "Partial blur isn’t consent." },
    ],
    celebrate: "Consent + context + no location leaks."
  },
  {
    world: 4,
    prompt: "Future scholarships, teams, or jobs might review…",
    choices: [
      { text: "Public posts, comments, and images connected to your name or known usernames", correct: true },
      { text: "Nothing younger than high school", why: "Earlier public content can still surface." },
      { text: "Only official transcripts", why: "Informal public content can appear in searches too." },
      { text: "Private DMs only", why: "Public content is the bigger searchable risk." },
    ],
    celebrate: "Future-you audit: keep the public trail proud."
  },
  {
    world: 4,
    prompt: "A healthy footprint strategy is…",
    choices: [
      { text: "Post thoughtfully, fix mistakes with apologies/removals when possible, and ask adults about anything unsure", correct: true },
      { text: "Never post anything ever", why: "Balance is possible — thoughtful > silent forever for many families." },
      { text: "Post constant drama for engagement", why: "Drama trails age poorly." },
      { text: "Copy viral roast templates", why: "Roasts can become your permanent brand." },
    ],
    celebrate: "Thoughtful > viral. Adults help gray areas."
  },
  {
    world: 4,
    prompt: "Reposting a classmate’s embarrassing moment “for awareness” usually…",
    choices: [
      { text: "Extends harm and adds to both footprints — don’t; support privately and involve adults if serious", correct: true },
      { text: "Helps because the caption criticizes bullying", why: "The media still spreads the embarrassment." },
      { text: "Is required citizen journalism", why: "You’re a kid — escalate to adults, don’t broadcast." },
      { text: "Is fine if you crop the school logo", why: "Cropping logos doesn’t remove the person’s harm." },
    ],
    celebrate: "Don’t rebroadcast harm. Support + adults."
  },
  {
    world: 4,
    prompt: "Best pre-post checklist?",
    choices: [
      { text: "Would I be okay if a teacher, parent, coach, or future me saw this — and does everyone in it consent?", correct: true },
      { text: "Will this get max likes in one hour?", why: "Metrics aren’t ethics." },
      { text: "Can I delete it later if needed?", why: "Delete isn’t reliable erasure." },
      { text: "Do strangers in comments agree with me?", why: "Strangers aren’t your compass." },
    ],
    celebrate: "Consent + future-audience test. Pro move."
  },
  {
    world: 5,
    prompt: "Realistic AI images/videos mean media literacy now requires…",
    choices: [
      { text: "Skepticism, source checks, and adult help before believing or sharing shocking media", correct: true },
      { text: "Trusting anything high-resolution", why: "Resolution isn’t authenticity." },
      { text: "Believing content with wavy “AI tells” only", why: "Some fakes look perfect; some real media looks odd." },
      { text: "Assuming school filters catch every fake", why: "Filters help; your judgment still matters." },
    ],
    celebrate: "Skepticism + sources + adults."
  },
  {
    world: 5,
    prompt: "A viral clip claims a celebrity endorsed a product. You should…",
    choices: [
      { text: "Verify on reputable outlets or official channels; ask an adult before sharing", correct: true },
      { text: "Share with “seems fake but idk” to be first", why: "Hedged shares still spread reach." },
      { text: "Trust engagement metrics", why: "Bots inflate metrics." },
      { text: "Trust a single unfamiliar “news” site with ads everywhere", why: "Look for known reputable sources." },
    ],
    celebrate: "Verify, then maybe share."
  },
  {
    world: 5,
    prompt: "Using a chatbot for schoolwork ethically means…",
    choices: [
      { text: "Follow teacher rules, don’t present bot text as your own thinking, and double-check facts", correct: true },
      { text: "Paste answers secretly", why: "That’s academic dishonesty and error-prone." },
      { text: "Trust every citation a bot invents", why: "Bots can invent sources." },
      { text: "Disable originality because AI is the future", why: "Your learning still matters." },
    ],
    celebrate: "Rules + your brain + fact checks."
  },
  {
    world: 5,
    prompt: "Phishing-ish tricks aimed at kids often use…",
    choices: [
      { text: "Urgency, free prizes, familiar logos, and links that don’t match official sites", correct: true },
      { text: "Only bad spelling forever", why: "Modern phishing can look polished." },
      { text: "Only email, never games or texts", why: "Tricks appear in many channels." },
      { text: "Only targeting adults", why: "Kids get baited with games and celebs too." },
    ],
    celebrate: "Urgency + prizes + sketchy links = pause."
  },
  {
    world: 5,
    prompt: "Deepfakes are dangerous in schools mainly because they can…",
    choices: [
      { text: "Make it look like someone said or did something they didn’t — causing real social harm", correct: true },
      { text: "Only affect Hollywood", why: "Anyone’s face/voice can be misused." },
      { text: "Improve grades automatically", why: "Not a study tool." },
      { text: "Replace the need for passwords", why: "Unrelated — and untrue." },
    ],
    celebrate: "Fake media, real harm. Report, don’t share."
  },
  {
    world: 5,
    prompt: "Spotting shaky “news” includes…",
    choices: [
      { text: "Checking authors/dates, comparing multiple reputable sources, and asking a trusted adult", correct: true },
      { text: "Counting angry comments as proof", why: "Anger isn’t evidence." },
      { text: "Preferring ALL CAPS headlines", why: "Caps chase emotion." },
      { text: "Trusting the first result always", why: "First isn’t always best." },
    ],
    celebrate: "Authors, dates, cross-checks, adults."
  },
  {
    world: 5,
    prompt: "An AI-generated mean image of a classmate appears in a group chat. You should…",
    choices: [
      { text: "Refuse to share, preserve evidence if needed, support the classmate, and tell a trusted adult/school staff", correct: true },
      { text: "Share to warn others by spreading it", why: "Spreading multiplies harm." },
      { text: "Joke that it’s fake so nobody cares", why: "Fake still traumatizes." },
      { text: "Challenge the creator to a public roast battle", why: "Don’t escalate; escalate to adults." },
    ],
    celebrate: "No amplify. Support. Report. Adult help."
  },
  {
    world: 6,
    prompt: "Trusted adults for online issues include…",
    choices: [
      { text: "Parents/guardians, teachers, counselors, and other known real-life adults — not random online “helpers”", correct: true },
      { text: "Verified-looking strangers in DMs", why: "Verification marks can be faked or irrelevant." },
      { text: "Comment sections collectively", why: "Crowds aren’t caregivers." },
      { text: "Pop-up tech support", why: "Often scams." },
    ],
    celebrate: "Real-life safety team only."
  },
  {
    world: 6,
    prompt: "Feeling scared, threatened, or blackmailed online means…",
    choices: [
      { text: "Tell a trusted adult immediately — early help is brave, not overreacting", correct: true },
      { text: "Handle it alone to avoid device restrictions", why: "Safety first; good adults prioritize protection." },
      { text: "Pay or obey so it stops quietly", why: "That often worsens exploitation — get adults/authorities via caregivers." },
      { text: "Post publicly to crowdsource advice", why: "Public posts can attract more harm." },
    ],
    celebrate: "Immediate adult help. Brave and correct."
  },
  {
    world: 6,
    prompt: "After an accidental bad click, best sequence is…",
    choices: [
      { text: "Stop clicking, don’t enter info, tell a trusted adult quickly, and follow their/device-protection steps", correct: true },
      { text: "Hide it until grades post", why: "Delay can increase damage." },
      { text: "Download “cleanup tools” from the same site", why: "That can add malware." },
      { text: "Message the shady site’s chat support alone", why: "Get a real adult first." },
    ],
    celebrate: "Stop → tell → follow adult/tech steps."
  },
  {
    world: 6,
    prompt: "If a friend confides about online sexual pressure or threats, you should…",
    choices: [
      { text: "Take it seriously, don’t spread screenshots casually, and help them tell a trusted adult right away (you can tell one too)", correct: true },
      { text: "Keep the secret to stay loyal", why: "Loyalty includes getting protective help." },
      { text: "Confront the stranger yourself in chat", why: "Don’t engage — involve adults." },
      { text: "Post the chat for vigilante help", why: "That can retraumatize and escalate." },
    ],
    celebrate: "Serious + private + adult escalation."
  },
  {
    world: 6,
    prompt: "School staff can help with digital problems because…",
    choices: [
      { text: "Student safety includes online harassment, scary contacts, and digital drama that affects learning", correct: true },
      { text: "They only handle paper hall passes", why: "Safety remit is broader." },
      { text: "They need a parent email before listening", why: "You can start the conversation at school." },
      { text: "Online issues are never school issues", why: "They often affect school climate and safety." },
    ],
    celebrate: "School helpers are part of Net Guardian backup."
  },
  {
    world: 6,
    prompt: "If the first adult minimizes your concern, next step is…",
    choices: [
      { text: "Tell another trusted adult and keep asking until someone helps document and act", correct: true },
      { text: "Drop it to avoid awkwardness", why: "Persistence protects you." },
      { text: "Only post vague hints online", why: "Hints aren’t a safety plan." },
      { text: "Retaliate in-app so they notice", why: "Retaliation can harm you; adults first." },
    ],
    celebrate: "Keep asking. Right helper exists."
  },
  {
    world: 6,
    prompt: "Core Grade 5 Net Guardian stance?",
    choices: [
      { text: "Pause before sharing, protect personal data and passwords, question viral media, use report/block tools, and involve trusted adults early", correct: true },
      { text: "Never go online", why: "Safe, skilled use beats total avoidance for most learning/play." },
      { text: "Trust your gut only — never tell adults", why: "Gut + adults is stronger." },
      { text: "Collect clout even if content is shady", why: "Clout isn’t character." },
    ],
    celebrate: "Pause. Protect. Verify. Report. Ask. Guardian status: elite."
  }
];

/* Backward-compatible default (grade 4) */
NG.QUESTIONS = NG.QUESTIONS_BY_GRADE[4];
