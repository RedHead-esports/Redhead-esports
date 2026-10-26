import React, { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import logoImg from "./logo.jpg";
import rulebook from "./rulebook.jpg";

/* ====== SETTINGS ====== */
const OWNER_WA = "916206549468";
const OWNER_EMAIL = "777mrsevou@gmail.com"; // sirf is Gmail se Admin Panel khulega
const SUPABASE_URL = "https://exkhfrwhxbbjqbauthlx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4a2hmcndoeGJianFiYXV0aGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MTk3MzQsImV4cCI6MjEwODQ5NTczNH0.4a4TnxnNLP6COxGHkqraBZD7K-GClxfPfkG-48XKqdg";
const MAX = 8;
const MAX_PER = 20; // ek ID se ek din me max requests (spam se bachne ke liye)     // ek din me teams
const DAYS = 5;    // kitne din aage tak registration (aaj se shuru)
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ====== LANGUAGES ====== */
const T = {
en:{aTT:"Teams",aTD:"Draw",aTS:"Schedule",aTR:"Results",aTC:"Day control",needDraw:"Do the draw first (Draw tab).",prizeL:"Prize money",drawStat:"Confirmed teams",nMatch:"Match",matchH:"Today's Matches",matchN:"Match",winOf:"Winner of",stNext:"NEXT",stUp:"Upcoming",stDn:"Done",noSched:"Match schedule will appear here once the admin announces the draw.",gapNote:"15–20 min break between matches.",schedH:"Match Schedule",startL:"First match starts at",gapL:"Gap between matches (min)",pairH:"Round 1 pairings (you decide)",manualBtn:"Manual order (no shuffle)",cfmSwap:"Changing pairings will clear winners. Continue?",reqNote:"Your registration is a request. The admin decides how many of your teams are accepted. A team is confirmed only after approval and payment.",maxTeams:"Request limit reached (20). Please contact admin on WhatsApp.",myCnt:"Your teams",editB:"Edit",cancelEdit:"Cancel edit",rbH:"Rulebook",regClosed:"Registration for today closed at 6:00 PM. Pick another day.",nHome:"Home",nDash:"Dashboard",nHist:"History",nRules:"Rules",nAdmin:"Admin",dashH:"Dashboard",stDone:"Tournaments",stTeams:"Teams played",stPrize:"Prize paid",upH:"Upcoming Days",myH:"My Registrations",noMine:"You have not registered yet.",histH:"Tournament History",noHist:"No tournaments yet. Results appear here after the draw.",inProg:"In progress",details:"View bracket",hide:"Hide",rulesH:"Rules",admDays:"Select Day",admOnly:"Admin only. Login with the owner Google account.",postersH:"Posters",soon:"Poster coming soon",optLogin:"Login is optional",regd:"Registered ✓",tdy:"Today",fullTag:"FULL",mDay:"Match day:",daysH:"Pick Match Day",canH:"Match Cancelled",canMsg:"Registration is closed for this day.",drawH:"Match Draw",rndTag:"🎲 Random draw",drawWait:"The draw will appear here once all 8 teams are confirmed.",rnd1:"Round 1",rnd2:"Semi Final",rnd3:"Final",tbd:"TBD",win:"Winner",champ:"Champion",runner:"Runner-up",drawBtn:"🎲 Draw Teams (Random)",redrawBtn:"🎲 Draw Again",resetDraw:"Reset draw",drawNeed:"Draw unlocks when 8 teams are confirmed.",shuf:"Shuffling…",cancelH:"Cancel / Reopen this day",notePh:"Reason (everyone will see this)",cancelBtn:"Cancel this day's match",reopenBtn:"Reopen this day",cfmRedraw:"Draw again? Current winners will be cleared.",cfmCancel:"Cancel this day's match? Everyone will see it.",cfmReset:"Reset the draw?",admH:"Admin Panel",aReg:"Registered",aConf:"Confirmed",aCol:"Collected",aCopy:"Copy confirmed list",copied:"Copied ✓",game:"FREE FIRE",sub:"Daily Free Fire Tournament",owner:"Owner",daily:"Every Night · 8:00 PM",teams:"Teams",every:"Everyday",left:"Slots left",today:"Today's match:",
 prizeH:"Entry & Prize Pool",entry:"Entry / Team",p1:"1st Prize",p2:"2nd Prize",fmtH:"Match Format",
 r1:"<b>Round 1:</b> 8 teams play 4 matches (4 vs 4) → 4 teams advance.",r2:"<b>Semi Final:</b> 4 teams play 2 matches (2 vs 2) → 2 teams advance.",r3:"<b>Final:</b> the last 2 teams fight for the title.",
 live:"Daily matches. Streamed LIVE on YouTube — occasionally I may not be able to go live.",
 regH:"Register",loginTxt:"Sign in with your Google account to register your team.",loginBtn:"Continue with Google",logout:"Logout",
 fTeam:"Team Name",fIgn:"Leader's Free Fire Name (IGN)",fUid:"Free Fire UID",fMob:"Mobile Number (WhatsApp)",regBtn:"Send Registration Request",upd:"Update Details",
 payH:"Payment",payTxt:"Entry fee ₹234. Tap the button to message us on WhatsApp — payment details will be shared there. Your slot is confirmed after payment.",payBtn:"Message on WhatsApp",
 pend:"Payment pending",paid:"Payment confirmed ✓",paidS:"Confirmed ✓",pendS:"Pending",listH:"Confirmed Teams",none:"No confirmed teams yet.",
 full:"All 8 slots for this day are full. Pick another day!",bad:"Please fill all details correctly (UID: numbers only).",ok:"Registered! WhatsApp is opening — just press Send.",
 as:"Signed in as",adm:"Admin",mark:"Confirm ✓",unm:"Unconfirm",delq:"Remove this team?",err:"Something went wrong: ",
 needLogin:"Login is not available here yet.",wa:"Hi Redhead eSports! I registered for the 8 PM Free Fire tournament.\nDate: {d}\nTeam: {t}\nIGN: {i}\nUID: {u}\nMobile: {m}\nEntry ₹234 – please share payment details."},
hi:{aTT:"टीमें",aTD:"ड्रॉ",aTS:"शेड्यूल",aTR:"नतीजे",aTC:"दिन कंट्रोल",needDraw:"पहले ड्रॉ करें (ड्रॉ टैब में)।",prizeL:"इनाम राशि",drawStat:"कन्फर्म टीमें",nMatch:"मैच",matchH:"आज के मैच",matchN:"मैच",winOf:"विजेता:",stNext:"अगला",stUp:"आने वाला",stDn:"खत्म",noSched:"एडमिन के ड्रॉ घोषित करते ही मैच का शेड्यूल यहाँ दिखेगा।",gapNote:"हर मैच के बीच 15–20 मिनट का ब्रेक।",schedH:"मैच शेड्यूल",startL:"पहला मैच शुरू होगा",gapL:"मैचों के बीच गैप (मिनट)",pairH:"राउंड 1 की जोड़ियाँ (आप तय करें)",manualBtn:"मैनुअल क्रम (बिना शफल)",cfmSwap:"जोड़ियाँ बदलने पर विजेता हट जाएँगे। जारी रखें?",reqNote:"आपका रजिस्ट्रेशन एक रिक्वेस्ट है। आपकी कितनी टीमें लेनी हैं, यह एडमिन तय करेगा। भुगतान और अप्रूवल के बाद ही टीम कन्फर्म होगी।",maxTeams:"रिक्वेस्ट की सीमा (20) पूरी हो गई। एडमिन को WhatsApp करें।",myCnt:"आपकी टीमें",editB:"बदलें",cancelEdit:"बदलाव रद्द करें",rbH:"नियम पुस्तिका",regClosed:"आज का रजिस्ट्रेशन शाम 6 बजे बंद हो गया। कोई और दिन चुनें।",nHome:"होम",nDash:"डैशबोर्ड",nHist:"हिस्ट्री",nRules:"नियम",nAdmin:"एडमिन",dashH:"डैशबोर्ड",stDone:"टूर्नामेंट",stTeams:"टीमें खेलीं",stPrize:"इनाम बँटा",upH:"आने वाले दिन",myH:"मेरे रजिस्ट्रेशन",noMine:"आपने अभी रजिस्टर नहीं किया है।",histH:"टूर्नामेंट हिस्ट्री",noHist:"अभी कोई टूर्नामेंट नहीं। ड्रॉ के बाद नतीजे यहाँ दिखेंगे।",inProg:"जारी है",details:"ब्रैकेट देखें",hide:"छुपाएँ",rulesH:"नियम",admDays:"दिन चुनें",admOnly:"सिर्फ़ एडमिन के लिए। ओनर के Google अकाउंट से लॉगिन करें।",postersH:"पोस्टर",soon:"पोस्टर जल्द आएगा",optLogin:"लॉगिन ज़रूरी नहीं है",regd:"रजिस्टर हो चुका ✓",tdy:"आज",fullTag:"फुल",mDay:"मैच का दिन:",daysH:"मैच का दिन चुनें",canH:"मैच कैंसिल",canMsg:"इस दिन के लिए रजिस्ट्रेशन बंद है।",drawH:"मैच ड्रॉ",rndTag:"🎲 रैंडम ड्रॉ",drawWait:"8 टीमें कन्फर्म होते ही ड्रॉ यहाँ दिखेगा।",rnd1:"राउंड 1",rnd2:"सेमी फाइनल",rnd3:"फाइनल",tbd:"तय नहीं",win:"विजेता",champ:"चैंपियन",runner:"उपविजेता",drawBtn:"🎲 टीमों का ड्रॉ (रैंडम)",redrawBtn:"🎲 दोबारा ड्रॉ",resetDraw:"ड्रॉ रीसेट",drawNeed:"8 टीमें कन्फर्म होने पर ड्रॉ खुलेगा।",shuf:"टीमें मिक्स हो रही हैं…",cancelH:"इस दिन को कैंसिल / दोबारा खोलें",notePh:"कारण (सबको दिखेगा)",cancelBtn:"इस दिन का मैच कैंसिल करें",reopenBtn:"इस दिन को दोबारा खोलें",cfmRedraw:"दोबारा ड्रॉ करें? मौजूदा विजेता हट जाएँगे।",cfmCancel:"इस दिन का मैच कैंसिल करें? सबको दिखेगा।",cfmReset:"ड्रॉ रीसेट करें?",admH:"एडमिन पैनल",aReg:"रजिस्टर्ड",aConf:"कन्फर्म",aCol:"कलेक्शन",aCopy:"कन्फर्म लिस्ट कॉपी करें",copied:"कॉपी हो गया ✓",game:"फ्री फायर",sub:"डेली फ्री फायर टूर्नामेंट",owner:"ओनर",daily:"रोज़ रात · 8:00 बजे",teams:"टीमें",every:"रोज़",left:"खाली स्लॉट",today:"आज का मैच:",
 prizeH:"एंट्री और इनाम",entry:"एंट्री / टीम",p1:"पहला इनाम",p2:"दूसरा इनाम",fmtH:"मैच का फॉर्मेट",
 r1:"<b>राउंड 1:</b> 8 टीमें 4 मैच खेलेंगी (4 vs 4) → 4 टीमें आगे बढ़ेंगी।",r2:"<b>सेमी फाइनल:</b> 4 टीमें 2 मैच खेलेंगी (2 vs 2) → 2 टीमें आगे बढ़ेंगी।",r3:"<b>फाइनल:</b> आखिरी 2 टीमें खिताब के लिए भिड़ेंगी।",
 live:"मैच रोज़ होंगे। YouTube पर LIVE दिखाया जाएगा — कभी-कभी लाइव नहीं कर पाऊँगा।",
 regH:"रजिस्टर करें",loginTxt:"अपनी टीम रजिस्टर करने के लिए Google अकाउंट से लॉगिन करें।",loginBtn:"Google से जारी रखें",logout:"लॉगआउट",
 fTeam:"टीम का नाम",fIgn:"लीडर का फ्री फायर नाम (IGN)",fUid:"फ्री फायर UID",fMob:"मोबाइल नंबर (WhatsApp)",regBtn:"रजिस्ट्रेशन रिक्वेस्ट भेजें",upd:"डिटेल अपडेट करें",
 payH:"पेमेंट",payTxt:"एंट्री फीस ₹234। नीचे बटन दबाकर WhatsApp पर मैसेज करें, पेमेंट की जानकारी वहीं मिलेगी। पेमेंट के बाद आपका स्लॉट पक्का होगा।",payBtn:"WhatsApp पर मैसेज करें",
 pend:"पेमेंट बाकी है",paid:"पेमेंट कन्फर्म ✓",paidS:"कन्फर्म ✓",pendS:"बाकी",listH:"कन्फर्म टीमें",none:"अभी कोई टीम कन्फर्म नहीं हुई।",
 full:"इस दिन के सभी 8 स्लॉट भर चुके हैं। कोई और दिन चुनें!",bad:"कृपया सारी जानकारी सही भरें (UID में सिर्फ़ नंबर)।",ok:"रजिस्टर हो गया! WhatsApp खुल रहा है — बस Send दबाएँ।",
 as:"लॉगिन:",adm:"एडमिन",mark:"कन्फर्म करें ✓",unm:"अनकन्फर्म",delq:"यह टीम हटाएँ?",err:"कुछ गड़बड़ हुई: ",
 needLogin:"यहाँ अभी लॉगिन उपलब्ध नहीं है।",wa:"नमस्ते Redhead eSports! मैंने रात 8 बजे के Free Fire टूर्नामेंट के लिए रजिस्टर किया है।\nतारीख: {d}\nटीम: {t}\nIGN: {i}\nUID: {u}\nमोबाइल: {m}\nएंट्री ₹234 – कृपया पेमेंट की जानकारी भेजें।"},
hl:{aTT:"Teams",aTD:"Draw",aTS:"Schedule",aTR:"Results",aTC:"Day control",needDraw:"Pehle draw karo (Draw tab me).",prizeL:"Prize money",drawStat:"Confirmed teams",nMatch:"Match",matchH:"Aaj ke Matches",matchN:"Match",winOf:"Winner of",stNext:"NEXT",stUp:"Upcoming",stDn:"Done",noSched:"Admin draw announce karega to match schedule yahan dikhega.",gapNote:"Har match ke beech 15–20 min ka gap.",schedH:"Match Schedule",startL:"Pehla match shuru hoga",gapL:"Matches ke beech gap (min)",pairH:"Round 1 ki jodiyan (aap decide karo)",manualBtn:"Manual order (bina shuffle)",cfmSwap:"Jodiyan badalne par winners hat jayenge. Continue?",reqNote:"Aapka registration ek request hai. Aapki kitni teams leni hain ye admin decide karega. Payment aur approval ke baad hi team confirm hogi.",maxTeams:"Request limit (20) poori ho gayi. Admin ko WhatsApp karo.",myCnt:"Aapki teams",editB:"Edit",cancelEdit:"Edit cancel karo",rbH:"Rulebook",regClosed:"Aaj ka registration shaam 6 baje band ho gaya. Dusra din chuno.",nHome:"Home",nDash:"Dashboard",nHist:"History",nRules:"Rules",nAdmin:"Admin",dashH:"Dashboard",stDone:"Tournaments",stTeams:"Teams khelin",stPrize:"Prize baanta",upH:"Aane wale Din",myH:"Mere Registrations",noMine:"Aapne abhi register nahi kiya hai.",histH:"Tournament History",noHist:"Abhi koi tournament nahi. Draw ke baad results yahan dikhenge.",inProg:"Chal raha hai",details:"Bracket dekho",hide:"Chhupao",rulesH:"Rules",admDays:"Din Chuno",admOnly:"Sirf Admin ke liye. Owner ke Google account se login karo.",postersH:"Posters",soon:"Poster jald aayega",optLogin:"Login zaroori nahi hai",regd:"Register ho chuka ✓",tdy:"Aaj",fullTag:"FULL",mDay:"Match ka din:",daysH:"Match Day Chuno",canH:"Match Cancel",canMsg:"Is din ke liye registration band hai.",drawH:"Match Draw",rndTag:"🎲 Random draw",drawWait:"8 teams confirm hote hi draw yahan dikhega.",rnd1:"Round 1",rnd2:"Semi Final",rnd3:"Final",tbd:"TBD",win:"Winner",champ:"Champion",runner:"Runner-up",drawBtn:"🎲 Teams Draw (Random)",redrawBtn:"🎲 Dobara Draw",resetDraw:"Draw Reset",drawNeed:"8 teams confirm hone par draw khulega.",shuf:"Teams mix ho rahi hain…",cancelH:"Is din ko Cancel / Dobara Kholo",notePh:"Reason (sabko dikhega)",cancelBtn:"Is din ka match Cancel karo",reopenBtn:"Is din ko dobara kholo",cfmRedraw:"Dobara draw karein? Abhi ke winners hat jayenge.",cfmCancel:"Is din ka match cancel karein? Sabko dikhega.",cfmReset:"Draw reset karein?",admH:"Admin Panel",aReg:"Registered",aConf:"Confirmed",aCol:"Collection",aCopy:"Confirmed list copy karo",copied:"Copy ho gaya ✓",game:"FREE FIRE",sub:"Daily Free Fire Tournament",owner:"Owner",daily:"Roz Raat · 8:00 PM",teams:"Teams",every:"Everyday",left:"Slots bache",today:"Aaj ka match:",
 prizeH:"Entry aur Prize",entry:"Entry / Team",p1:"1st Prize",p2:"2nd Prize",fmtH:"Match Format",
 r1:"<b>Round 1:</b> 8 teams 4 match khelengi (4 vs 4) → 4 teams aage.",r2:"<b>Semi Final:</b> 4 teams 2 match khelengi (2 vs 2) → 2 teams aage.",r3:"<b>Final:</b> aakhri 2 teams title ke liye ladengi.",
 live:"Daily match hoga. YouTube pe LIVE aaunga — kabhi kabhi live nahi kar paaunga.",
 regH:"Register Karo",loginTxt:"Team register karne ke liye apne Google account se login karo.",loginBtn:"Google se Login",logout:"Logout",
 fTeam:"Team ka Naam",fIgn:"Leader ka Free Fire Name (IGN)",fUid:"Free Fire UID",fMob:"Mobile Number (WhatsApp)",regBtn:"Registration Request Bhejo",upd:"Details Update Karo",
 payH:"Payment",payTxt:"Entry fee ₹234. Niche button dabake WhatsApp pe message bhejo, payment details wahin milengi. Payment ke baad slot pakka hoga.",payBtn:"WhatsApp pe Message Bhejo",
 pend:"Payment pending",paid:"Payment confirm ✓",paidS:"Confirmed ✓",pendS:"Pending",listH:"Confirmed Teams",none:"Abhi koi team confirm nahi hui.",
 full:"Is din ke saare 8 slots full hain. Dusra din chuno!",bad:"Saari details sahi bharo (UID me sirf numbers).",ok:"Register ho gaya! WhatsApp khul raha hai — bas Send dabao.",
 as:"Login:",adm:"Admin",mark:"Confirm ✓",unm:"Unconfirm",delq:"Ye team hata dein?",err:"Kuch gadbad hui: ",
 needLogin:"Yahan abhi login available nahi hai.",wa:"Hi Redhead eSports! Maine 8 PM Free Fire tournament ke liye register kiya hai.\nDate: {d}\nTeam: {t}\nIGN: {i}\nUID: {u}\nMobile: {m}\nEntry ₹234 – payment details bhejiye."}
};

const loc = { en: "en-IN", hi: "hi-IN", hl: "en-IN" };
const pad = (n) => String(n).padStart(2, "0");
const keyOf = (off) => { const d = new Date(); d.setDate(d.getDate() + off); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
const dateOf = (k) => { const p = k.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); };

/* ====== RANDOM DRAW ====== */
function shuffle(a) {
  const r = a.slice(), buf = new Uint32Array(r.length);
  crypto.getRandomValues(buf);
  for (let i = r.length - 1; i > 0; i--) { const j = buf[i] % (i + 1); const x = r[i]; r[i] = r[j]; r[j] = x; }
  return r;
}
function build(draw) {
  const s = draw.seed, w = draw.w || {};
  const win = (m) => (m.w === 0 ? m.a : m.w === 1 ? m.b : null);
  const R = [[], [], []];
  for (let i = 0; i < 4; i++) R[0].push({ a: s[2 * i], b: s[2 * i + 1], w: w["0-" + i] });
  for (let i = 0; i < 2; i++) R[1].push({ a: win(R[0][2 * i]), b: win(R[0][2 * i + 1]), w: w["1-" + i] });
  R[2].push({ a: win(R[1][0]), b: win(R[1][1]), w: w["2-0"] });
  return R;
}

function matchList(draw) {
  const R = build(draw), out = [];
  R[0].forEach((m, i) => out.push({ ...m, no: i + 1, r: "rnd1" }));
  R[1].forEach((m, i) => out.push({ ...m, no: 5 + i, r: "rnd2", sa: 2 * i + 1, sb: 2 * i + 2 }));
  out.push({ ...R[2][0], no: 7, r: "rnd3", sa: 5, sb: 6 });
  return out;
}
function fmtTime(draw, n, lc) {
  const p = (draw.start || "20:00").split(":").map(Number), tot = p[0] * 60 + p[1] + n * (draw.gap || 20);
  return new Date(2000, 0, 1, Math.floor(tot / 60) % 24, tot % 60).toLocaleTimeString(lc, { hour: "numeric", minute: "2-digit" });
}

/* ====== SFX (browser khud banata hai, audio file nahi chahiye) ====== */
const snd = { muted: false, ac: null };
function tone(f, d, type, v, at) {
  if (snd.muted) return;
  try {
    snd.ac = snd.ac || new (window.AudioContext || window.webkitAudioContext)();
    const ac = snd.ac, o = ac.createOscillator(), g = ac.createGain(), s = ac.currentTime + (at || 0);
    o.type = type || "sine"; o.frequency.value = f;
    g.gain.setValueAtTime(v || 0.08, s); g.gain.exponentialRampToValueAtTime(0.0001, s + d);
    o.connect(g); g.connect(ac.destination); o.start(s); o.stop(s + d);
  } catch (e) {}
}
const sfx = {
  click: () => tone(520, 0.07, "square", 0.03),
  ok: () => { tone(523, 0.12, "triangle", 0.1, 0); tone(659, 0.12, "triangle", 0.1, 0.12); tone(784, 0.3, "triangle", 0.1, 0.24); },
  err: () => tone(180, 0.28, "sawtooth", 0.07),
};


const RULES = {
  en: [
    ["Registration", "Registration must be completed before 6:00 PM (with payment)."],
    ["Teams", "The match will be between 8 teams, with 4 players per team."],
    ["Map", "Map will be “Classic Squad Bermuda”."],
    ["Rounds", "The match will be of 9 rounds."],
    ["Headshot", "The match will be One Tap Headshot only."],
    ["Weapons", "Only Desert Eagle and M1887 will be allowed."],
    ["Fair Play", "Cheater / Hacker are not allowed. If caught, the entire team will be banned and the entry fee will not be refunded."],
  ],
  hi: [
    ["रजिस्ट्रेशन", "रजिस्ट्रेशन शाम 6 बजे से पहले करना होगा (भुगतान के साथ)।"],
    ["टीमें", "मैच 8 टीम के बीच होगा, प्रत्येक टीम में 4 खिलाड़ी होंगे।"],
    ["मैप", "मैप “क्लासिक स्क्वाड बरमूडा” होगा।"],
    ["राउंड", "मैच 9 राउंड का होगा।"],
    ["हेडशॉट", "मैच वनटेप हेडशॉट का होगा।"],
    ["हथियार", "गन सिर्फ Desert Eagle और M1887 रहेंगे।"],
    ["फेयर प्ले", "चीटर / हैकर की अनुमति नहीं है, पकड़े जाने पर पूरी टीम बैन कर दी जाएगी, पैसे भी वापस नहीं होंगे।"],
  ],
  hl: [
    ["Registration", "Registration shaam 6 baje se pehle karna hoga (payment ke saath)."],
    ["Teams", "Match 8 teams ke beech hoga, har team me 4 players honge."],
    ["Map", "Map “Classic Squad Bermuda” hoga."],
    ["Rounds", "Match 9 rounds ka hoga."],
    ["Headshot", "Match One Tap Headshot ka hoga."],
    ["Weapons", "Gun sirf Desert Eagle aur M1887 rahenge."],
    ["Fair Play", "Cheater / Hacker ki permission nahi hai. Pakde jaane par poori team BAN hogi aur paise bhi wapas nahi honge."],
  ],
};

/* ====== POSTERS: repo me poster1.jpg, poster2.jpg ... daalo, apne aap dikh jayenge ====== */
const posterMods = import.meta.glob("./poster*.{jpg,jpeg,png,webp}", { eager: true, query: "?url", import: "default" });
const POSTERS = Object.keys(posterMods).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map((k) => posterMods[k]);

function Posters({ t }) {
  const ref = useRef(null);
  const [big, setBig] = useState(null);
  const items = POSTERS.length ? POSTERS : Array.from({ length: 6 }, () => null);
  useEffect(() => {
    const el = ref.current;
    if (!el || items.length < 2) return;
    const iv = setInterval(() => {
      const step = el.firstChild.offsetWidth + 10;
      const end = el.scrollLeft + step >= el.scrollWidth - el.clientWidth - 5;
      el.scrollTo({ left: end ? 0 : el.scrollLeft + step, behavior: "smooth" });
    }, 4000);
    return () => clearInterval(iv);
  }, [items.length]);
  return (
    <section className="sec"><h2>{t("postersH")}</h2>
      <div className="posters" ref={ref}>
        {items.map((src, i) => src
          ? <img key={i} src={src} alt={"Poster " + (i + 1)} loading="lazy" onClick={() => setBig(src)} />
          : <div key={i} className="ph"><b>#{i + 1}</b><span>{t("soon")}</span></div>)}
      </div>
      {big && <div className="lb" onClick={() => setBig(null)}><img src={big} alt="" /></div>}
    </section>
  );
}

/* ====== BRACKET UI ====== */
function Tm({ x, win, lose, canPick, onPick, t }) {
  return (
    <div className={"tm" + (win ? " w" : "") + (lose ? " l" : "")}>
      <span>{x ? x.team : t("tbd")}{x && <small className="mu"> {x.ign}</small>}</span>
      <span>{win && "🏆 "}{canPick && <button className="sm" onClick={onPick}>{win ? "✓" : t("win")}</button>}</span>
    </div>
  );
}
function Podium({ champ, run, t }) {
  return (
    <div className="podium">
      <div className="pd first">
        <div className="pdi">🏆</div>
        <small>{t("champ")}</small>
        <h3>{champ.team}</h3>
        <span className="mu">{champ.ign}</span>
        <div className="mlabel">{t("prizeL")}</div>
        <div className="money">₹950</div>
      </div>
      {run && (
        <div className="pd second">
          <div className="pdi">🥈</div>
          <small>{t("runner")}</small>
          <h3>{run.team}</h3>
          <span className="mu">{run.ign}</span>
          <div className="mlabel">{t("prizeL")}</div>
          <div className="money">₹600</div>
        </div>
      )}
    </div>
  );
}
function Bracket({ R, t, isA, pick, pod = true }) {
  const titles = ["rnd1", "rnd2", "rnd3"];
  const fin = R[2][0];
  const champ = fin.w === 0 ? fin.a : fin.w === 1 ? fin.b : null;
  const run = fin.w === 0 ? fin.b : fin.w === 1 ? fin.a : null;
  return (
    <>
      {R.map((round, r) => (
        <div key={r}>
          <div className="rt">{t(titles[r])}</div>
          {round.map((m, i) => {
            const can = isA && m.a && m.b;
            return (
              <div className="mt" key={i}>
                <Tm x={m.a} t={t} win={m.w === 0} lose={m.w === 1} canPick={can} onPick={() => pick(r, i, 0)} />
                <div className="vs" />
                <Tm x={m.b} t={t} win={m.w === 1} lose={m.w === 0} canPick={can} onPick={() => pick(r, i, 1)} />
              </div>
            );
          })}
        </div>
      ))}
      {champ && pod && <Podium champ={champ} run={run} t={t} />}
    </>
  );
}

export default function App() {
  const [L, setL] = useState(() => { try { return localStorage.getItem("lang") || "en"; } catch (e) { return "en"; } });
  const [muted, setMuted] = useState(() => { try { return localStorage.getItem("mute") === "1"; } catch (e) { return false; } });
  const [user, setUser] = useState(null);
  const [rows, setRows] = useState([]);
  const [dayStates, setDayStates] = useState({});
  const [sel, setSel] = useState(0);
  const [f, setF] = useState({ team: "", ign: "", uid: "", mob: "" });
  const [reg, setReg] = useState({ txt: "", cls: "" });
  const [loginMsg, setLoginMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState("");
  const [shuf, setShuf] = useState(null);
  const tx = useRef(null);
  const PAGES = ["home", "match", "dash", "hist", "rules", "admin"];
  const [page, setPage] = useState(() => { const h = window.location.hash.slice(1); return PAGES.includes(h) ? h : "home"; });
  const [aSel, setASel] = useState(2);
  const [hist, setHist] = useState([]);
  const [openH, setOpenH] = useState(null);
  const go = (p) => { setPage(p); try { window.history.replaceState(null, "", "#" + p); } catch (e) {} window.scrollTo(0, 0); };
  const [gid] = useState(() => {
    const mk = () => "g_" + ((window.crypto && crypto.randomUUID) ? crypto.randomUUID().replace(/-/g, "").slice(0, 16) : Math.random().toString(16).slice(2, 18));
    try { let g = localStorage.getItem("gid"); if (!g) { g = mk(); localStorage.setItem("gid", g); } return g; } catch (e) { return mk(); }
  });
  const t = (k) => (T[L] || T.en)[k];
  const H = ({ k }) => <span dangerouslySetInnerHTML={{ __html: t(k) }} />;

  snd.muted = muted;
  useEffect(() => { document.documentElement.lang = L === "hi" ? "hi" : "en"; }, [L]);
  useEffect(() => {
    const h = (e) => { if (e.target.closest && e.target.closest("button,.lk a") && e.target.id !== "snd") sfx.click(); };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  /* login state */
  useEffect(() => {
    const fn = (s) => {
      const u = s && s.user;
      setUser(u ? { id: u.id, name: (u.user_metadata && u.user_metadata.full_name) || "", email: u.email, isOwner: u.email === OWNER_EMAIL } : null);
    };
    sb.auth.getSession().then((r) => fn(r.data.session));
    const { data } = sb.auth.onAuthStateChange((_e, s) => fn(s));
    return () => data.subscription.unsubscribe();
  }, []);

  /* teams + day settings (live) */
  const load = useCallback(async () => {
    const t0 = keyOf(-2);
    const [a, b, h] = await Promise.all([
      sb.from("teams").select("*").gte("date", t0),
      sb.from("day_state").select("*").gte("date", t0),
      sb.from("day_state").select("*").not("draw", "is", null).order("date", { ascending: false }).limit(40),
    ]);
    if (!h.error) setHist(h.data);
    if (a.error) setLoginMsg("Error: " + a.error.message); else setRows(a.data);
    if (!b.error) { const m = {}; b.data.forEach((x) => { m[x.date] = x; }); setDayStates(m); }
  }, []);
  useEffect(() => {
    load();
    const ch = sb.channel("live")
      .on("postgres_changes", { event: "*", schema: "public", table: "teams" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "day_state" }, load)
      .subscribe();
    const iv = setInterval(load, 20000);
    return () => { sb.removeChannel(ch); clearInterval(iv); };
  }, [load]);

  const tds = dayStates[keyOf(0)] || {}, tdraw = tds.draw || null, tcancel = !!tds.cancelled;
  const ml = tdraw ? matchList(tdraw) : [];
  const nextNo = (ml.find((m) => !(m.w === 0 || m.w === 1) && m.a && m.b) || {}).no;

  /* selected day */
  const days = Array.from({ length: DAYS }, (_, i) => keyOf(i));
  const aKeys = Array.from({ length: DAYS + 2 }, (_, i) => keyOf(i - 2));
  const D = page === "admin" ? aKeys[aSel] : days[Math.min(sel, DAYS - 1)];
  const ds = dayStates[D] || {};
  const cancelled = !!ds.cancelled;
  const draw = ds.draw || null;
  const teams = rows.filter((x) => x.date === D).sort((a, b) => (a.at || 0) - (b.at || 0));
  const conf = teams.filter((x) => x.paid);
  const myKey = (user ? user.id : gid) + "_" + D;
  const myTeams = teams.filter((x) => x.id === myKey || x.id.startsWith(myKey + "_"));
  const [editId, setEditId] = useState(null);
  const [aTab, setATab] = useState("teams");
  const adml = draw ? matchList(draw) : [];
  const full = conf.length >= MAX;
  const REG_CLOSE_HOUR = 18; // aaj ka registration shaam 6 baje band (band na karna ho to 24 likho)
  const late = D === keyOf(0) && new Date().getHours() >= REG_CLOSE_HOUR;
  const closed = full || cancelled || late;
  const isA = !!(user && user.isOwner);
  const dLong = dateOf(D).toLocaleDateString(loc[L], { weekday: "long", day: "numeric", month: "long" });
  const dShort = dateOf(D).toLocaleDateString(loc[L], { weekday: "short", day: "numeric", month: "short" });

  useEffect(() => { setEditId(null); }, [D]);
  useEffect(() => { setReg({ txt: "", cls: "" }); }, [D]);
  useEffect(() => { setNote(ds.note || ""); }, [D, ds.note]);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const say = (txt, cls) => setReg({ txt, cls });

  function openWA(x) {
    const r = x && x.team ? x : null;
    const dd = r ? dateOf(r.date).toLocaleDateString(loc[L], { weekday: "short", day: "numeric", month: "short" }) : dShort;
    const msg = t("wa").replace("{d}", dd).replace("{t}", (r && r.team) || f.team.trim() || "").replace("{i}", (r && r.ign) || f.ign.trim() || "")
      .replace("{u}", f.uid.trim() || "-").replace("{m}", f.mob.trim() || "-");
    const url = "https://wa.me/" + OWNER_WA + "?text=" + encodeURIComponent(msg);
    const w = window.open(url, "_blank");
    if (!w) { try { window.location.href = url; } catch (e) {} }
  }

  async function register() {
    if (closed) { say(cancelled ? t("canMsg") : late ? t("regClosed") : t("full"), "er"); return; }
    const team = f.team.trim(), ign = f.ign.trim(), uid = f.uid.trim(), mob = f.mob.replace(/\D/g, "");
    if (!team || !ign || !/^\d{6,14}$/.test(uid) || mob.length < 10 || mob.length > 13) { say(t("bad"), "er"); sfx.err(); return; }
    const ed = editId && user ? myTeams.find((x) => x.id === editId) : null;
    if (!ed && myTeams.length >= MAX_PER) { say(t("maxTeams"), "er"); sfx.err(); return; }
    let n = 1; while (myTeams.some((x) => x.id === myKey + "_" + n)) n++;
    const row = { id: ed ? ed.id : myKey + "_" + n, team, ign, date: D, paid: ed ? !!ed.paid : false, at: ed ? ed.at : Date.now() };
    const r = user ? await sb.from("teams").upsert(row) : await sb.from("teams").insert(row);
    if (r.error) { say(t("err") + r.error.message, "er"); return; }
    say(t("ok"), "go"); sfx.ok(); load(); openWA({ team, ign, date: D }); setEditId(null); setF((p) => ({ ...p, team: "", ign: "" }));
  }

  async function login() {
    const r = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
    if (r.error) setLoginMsg(t("err") + r.error.message);
  }

  /* ---- admin actions ---- */
  async function setPaid(id, paid) { const r = await sb.from("teams").update({ paid }).eq("id", id); if (r.error) alert(t("err") + r.error.message); else load(); }
  async function remove(id) { if (!window.confirm(t("delq"))) return; const r = await sb.from("teams").delete().eq("id", id); if (r.error) alert(t("err") + r.error.message); else load(); }
  async function copyList() {
    const txt = "Redhead eSports - " + dLong + "\n" + conf.map((x, i) => (i + 1) + ". " + x.team + " (" + x.ign + ")").join("\n");
    try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (e) { window.prompt("Copy:", txt); }
  }
  async function saveState(patch) {
    const cur = dayStates[D] || {};
    const row = { date: D, cancelled: !!cur.cancelled, note: cur.note || "", draw: cur.draw || null, ...patch, updated_at: new Date().toISOString() };
    const r = await sb.from("day_state").upsert(row);
    if (r.error) { alert(t("err") + r.error.message); return false; }
    load(); return true;
  }
  async function doDraw() {
    if (conf.length !== MAX || cancelled) return;
    if (draw && !window.confirm(t("cfmRedraw"))) return;
    const names = conf.map((x) => x.team);
    const seed = shuffle(conf.map((x) => ({ id: x.id, team: x.team, ign: x.ign })));
    await new Promise((res) => { let n = 0; const iv = setInterval(() => { setShuf(shuffle(names)); if (++n >= 22) { clearInterval(iv); res(); } }, 80); });
    setShuf(null);
    if (await saveState({ draw: { seed, w: {}, at: Date.now(), start: (draw && draw.start) || "20:00", gap: (draw && draw.gap) || 20 } })) sfx.ok();
  }
  async function doManual() {
    if (conf.length !== MAX || cancelled) return;
    if (draw && !window.confirm(t("cfmRedraw"))) return;
    await saveState({ draw: { seed: conf.map((x) => ({ id: x.id, team: x.team, ign: x.ign })), w: {}, at: Date.now(), start: (draw && draw.start) || "20:00", gap: (draw && draw.gap) || 20 } });
  }
  async function swapSeed(slot, id) {
    const seed = draw.seed.slice(), j = seed.findIndex((x) => x.id === id);
    if (j < 0 || j === slot) return;
    if (Object.keys(draw.w || {}).length && !window.confirm(t("cfmSwap"))) return;
    const tmp = seed[slot]; seed[slot] = seed[j]; seed[j] = tmp;
    await saveState({ draw: { ...draw, seed, w: {} } });
  }
  async function resetDraw() { if (window.confirm(t("cfmReset"))) await saveState({ draw: null }); }
  async function pick(r, i, side) {
    const w = { ...(draw.w || {}) };
    if (w[r + "-" + i] === side) delete w[r + "-" + i]; else w[r + "-" + i] = side;
    let ri = i;
    for (let rr = r + 1; rr < 3; rr++) { ri = Math.floor(ri / 2); delete w[rr + "-" + ri]; }
    await saveState({ draw: { ...draw, w } });
  }
  async function toggleCancel() {
    if (!cancelled) { if (!window.confirm(t("cfmCancel"))) return; await saveState({ cancelled: true, note: note.trim() }); }
    else await saveState({ cancelled: false, note: "" });
  }

  const pickLang = (l) => { setL(l); try { localStorage.setItem("lang", l); } catch (e) {} };
  const toggleMute = () => { const m = !muted; setMuted(m); try { localStorage.setItem("mute", m ? "1" : "0"); } catch (e) {} };

  /* swipe between days */
  const onTS = (e) => { tx.current = [e.touches[0].clientX, e.touches[0].clientY]; };
  const onTE = (e) => {
    if (!tx.current) return;
    const dx = e.changedTouches[0].clientX - tx.current[0], dy = e.changedTouches[0].clientY - tx.current[1];
    tx.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 2) setSel((s) => Math.max(0, Math.min(DAYS - 1, s + (dx < 0 ? 1 : -1))));
  };

  const R = draw ? build(draw) : null;
  const done = hist.filter((x) => { const f2 = build(x.draw)[2][0]; return f2.w === 0 || f2.w === 1; });
  const mineRows = rows.filter((x) => x.id.startsWith((user ? user.id : gid) + "_")).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <header><div className="hb">
        <div className="br"><div className="lg"><img alt="Redhead eSports" src={logoImg} /></div><span>REDHEAD <b>eSPORTS</b></span></div>
        <div className="lang">
          {[["en", "English"], ["hi", "हिन्दी"], ["hl", "Hinglish"]].map(([l, n]) => <button key={l} className={L === l ? "on" : ""} onClick={() => pickLang(l)}>{n}</button>)}
          <button id="snd" aria-label="Sound" onClick={toggleMute}>{muted ? "🔇" : "🔊"}</button>
        </div>
      </div></header>

      <main>
        {page === "home" && (
          <>
        <section className="hero">
          <img className="hlogo" alt="Red Head eSports logo" src={logoImg} />
          <div className="mu" style={{ color: "#cfcfd8" }}>{t("game")}</div>
          <h1>REDHEAD <span>eSPORTS</span></h1>
          <p>{t("sub")}</p>
          <p className="mu" style={{ color: "#a9a9b6" }}>{t("owner")}: Rhx Andy</p>
          <span className="chip">{t("daily")}</span>
        </section>

        <section className="sec"><h2>{t("daysH")}</h2>
          <div className="days">
            {days.map((k, i) => {
              const dt = dateOf(k), st = dayStates[k], n = rows.filter((x) => x.date === k && x.paid).length;
              return (
                <button key={k} className={"day" + (i === sel ? " on" : "") + (st && st.cancelled ? " cx" : "")} onClick={() => setSel(i)}>
                  <small>{i === 0 ? t("tdy") : dt.toLocaleDateString(loc[L], { weekday: "short" })}</small>
                  <b>{dt.getDate()}</b>
                  <em>{st && st.cancelled ? "✕" : n >= MAX ? t("fullTag") : n + "/" + MAX}</em>
                </button>
              );
            })}
          </div>
        </section>

        <div key={D} className="slide" onTouchStart={onTS} onTouchEnd={onTE}>
          <section className="sec"><div className="card">
            <div className="g3">
              <div><b>8</b><small>{t("teams")}</small></div>
              <div><b>8 PM</b><small>{dShort}</small></div>
              <div><b>{Math.max(0, MAX - conf.length)}</b><small>{t("left")}</small></div>
            </div>
            <div className="bar"><i style={{ width: Math.min(100, conf.length / MAX * 100) + "%" }} /></div>
            <div className="mu" style={{ marginTop: 10 }}>{t("mDay")} <b>{dLong} · 8:00 PM</b></div>
          </div></section>

          {cancelled && (
            <div className="bn">⚠ {t("canH")}{ds.note && <small>{ds.note}</small>}<small>{t("canMsg")}</small></div>
          )}

          <section className="sec"><h2>{t("regH")}</h2>
            <div className="card">
              {user ? (
                <div className="row" style={{ paddingTop: 0 }}>
                  <span className="mu">{t("as")} {user.name || user.email || "Player"}{isA ? " · " + t("adm") : ""}</span>
                  <button className="sm" onClick={() => sb.auth.signOut()}>{t("logout")}</button>
                </div>
              ) : (
                <div className="row" style={{ paddingTop: 0 }}>
                  <span className="mu">{t("optLogin")}</span>
                  <button className="sm" id="loginBtn" onClick={login}>{t("loginBtn")}</button>
                </div>
              )}
              {loginMsg && <div className="msg er">{loginMsg}</div>}
              <label>{t("fTeam")}</label><input value={f.team} onChange={set("team")} maxLength={30} autoComplete="off" />
              <label>{t("fIgn")}</label><input value={f.ign} onChange={set("ign")} maxLength={30} autoComplete="off" />
              <label>{t("fUid")}</label><input value={f.uid} onChange={set("uid")} inputMode="numeric" maxLength={14} autoComplete="off" />
              <label>{t("fMob")}</label><input value={f.mob} onChange={set("mob")} inputMode="tel" maxLength={15} autoComplete="tel" placeholder="98XXXXXXXX" />
              <div className="mu" style={{ marginTop: 10 }}>{t("myCnt")}: {myTeams.length}</div>
              <div className="mu" style={{ marginTop: 6, fontSize: 13 }}>{t("reqNote")}</div>
              <button className="btn" disabled={closed} onClick={register}>{editId && user ? t("upd") : t("regBtn")} · {dShort}</button>
              {editId && <button className="btn gh" onClick={() => { setEditId(null); setF((p) => ({ ...p, team: "", ign: "" })); }}>{t("cancelEdit")}</button>}
              <div className={"msg " + (closed ? "er" : reg.cls)}>{cancelled ? t("canMsg") : late ? t("regClosed") : full ? t("full") : reg.txt}</div>
            </div>
          </section>

          {myTeams.length > 0 && (
            <section className="sec"><h2>{t("payH")}</h2><div className="card">
              <p className="mu" style={{ margin: 0 }}>{t("payTxt")}</p>
              {myTeams.map((x) => (
                <div className="row" key={x.id}>
                  <span><b>{x.team}</b> <span className="mu">{x.ign}</span></span>
                  <span>
                    <span className={"pill" + (x.paid ? " ok" : "")}>{x.paid ? t("paidS") : t("pendS")}</span>
                    {!x.paid && <button className="sm" onClick={() => openWA(x)}>WhatsApp</button>}
                    {user && !x.paid && <button className="sm" onClick={() => { setEditId(x.id); setF((p) => ({ ...p, team: x.team, ign: x.ign })); }}>{t("editB")}</button>}
                  </span>
                </div>
              ))}
            </div></section>
          )}

          <section className="sec"><h2>{t("listH")}</h2><div className="card">
            {conf.length ? conf.map((x, i) => (
              <div className="row" key={x.id}><span>{i + 1}. <b>{x.team}</b> <span className="mu">{x.ign}</span></span><span className="pill ok">{t("paidS")}</span></div>
            )) : <div className="mu">{t("none")}</div>}
          </div></section>

          {!cancelled && (
            <section className="sec"><h2>{t("drawH")}</h2><div className="card">
              {R ? (
                <>
                  <div className="mu" style={{ marginBottom: 4 }}>{t("rndTag")} · {new Date(draw.at).toLocaleTimeString(loc[L], { hour: "2-digit", minute: "2-digit" })}</div>
                  <Bracket R={R} t={t} isA={false} pick={pick} />
                </>
              ) : <div className="mu">{t("drawWait")}</div>}
            </div></section>
          )}

        </div>

          <Posters t={t} />
        <section className="sec"><h2>{t("prizeH")}</h2><div className="card"><div className="g3">
          <div><b>₹234</b><small>{t("entry")}</small></div>
          <div className="gd"><b>₹950</b><small>{t("p1")}</small></div>
          <div className="gd"><b>₹600</b><small>{t("p2")}</small></div>
        </div></div></section>

        <section className="sec"><h2>{t("fmtH")}</h2><div className="card">
          <ol className="steps"><li><H k="r1" /></li><li><H k="r2" /></li><li><H k="r3" /></li></ol>
          <p className="mu" style={{ margin: "12px 0 0" }}>{t("live")}</p>
          <div className="lk"><a href="https://youtube.com/@rhx_andy" target="_blank" rel="noopener noreferrer">▶ YouTube</a><a href="https://www.instagram.com/rhxesports_" target="_blank" rel="noopener noreferrer">◎ Instagram</a></div>
        </div></section>

          </>
        )}
        {page === "match" && (
          <>
          <section className="sec"><h2>{t("matchH")}</h2>
            {tcancel && <div className="bn">⚠ {t("canH")}{tds.note && <small>{tds.note}</small>}</div>}
            {!tcancel && (tdraw ? (
              <>
                <div className="mu" style={{ marginBottom: 10 }}>{dateOf(keyOf(0)).toLocaleDateString(loc[L], { weekday: "long", day: "numeric", month: "long" })} · {t("gapNote")}</div>
                {ml.map((m) => {
                  const done = m.w === 0 || m.w === 1, st = done ? "stDn" : m.no === nextNo ? "stNext" : "stUp";
                  const nm = (x, src) => (x ? x.team : t("winOf") + " " + t("matchN") + " " + src);
                  return (
                    <div className="mt" key={m.no} style={{ marginBottom: 10 }}>
                      <div className="row" style={{ padding: "8px 12px" }}>
                        <b>{t("matchN")} {m.no} · {t(m.r)}</b>
                        <span><span className="mu">🕗 {fmtTime(tdraw, m.no - 1, loc[L])}</span> <span className={"pill" + (st === "stNext" ? " ok" : "")}>{t(st)}</span></span>
                      </div>
                      <div className={"tm" + (m.w === 0 ? " w" : "") + (m.w === 1 ? " l" : "")}><span>{nm(m.a, m.sa)}</span><span>{m.w === 0 && "🏆"}</span></div>
                      <div className="vs" />
                      <div className={"tm" + (m.w === 1 ? " w" : "") + (m.w === 0 ? " l" : "")}><span>{nm(m.b, m.sb)}</span><span>{m.w === 1 && "🏆"}</span></div>
                    </div>
                  );
                })}
                {ml[6] && (ml[6].w === 0 || ml[6].w === 1) && <Podium champ={ml[6].w === 0 ? ml[6].a : ml[6].b} run={ml[6].w === 0 ? ml[6].b : ml[6].a} t={t} />}
              </>
            ) : <div className="card mu">{t("noSched")}</div>)}
          </section>
          </>
        )}
        {page === "dash" && (
          <>
          <section className="sec"><h2>{t("dashH")}</h2><div className="card"><div className="g3">
            <div><b>{done.length}</b><small>{t("stDone")}</small></div>
            <div><b>{done.length * 8}</b><small>{t("stTeams")}</small></div>
            <div className="gd"><b>₹{done.length * 1550}</b><small>{t("stPrize")}</small></div>
          </div></div></section>
          <section className="sec"><h2>{t("upH")}</h2><div className="card">
            {days.map((k) => { const st = dayStates[k], n = rows.filter((x) => x.date === k && x.paid).length; return (
              <div className="row" key={k}><span>{dateOf(k).toLocaleDateString(loc[L], { weekday: "long", day: "numeric", month: "short" })}</span>
                <span className={"pill" + (st && st.cancelled ? "" : " ok")}>{st && st.cancelled ? t("canH") : n >= MAX ? t("fullTag") : n + "/" + MAX}</span></div>); })}
          </div></section>
          <section className="sec"><h2>{t("myH")}</h2><div className="card">
            {mineRows.length ? mineRows.map((x) => (
              <div className="row" key={x.id}><span>{dateOf(x.date).toLocaleDateString(loc[L], { day: "numeric", month: "short" })} · <b>{x.team}</b></span>
                <span><span className={"pill" + (x.paid ? " ok" : "")}>{x.paid ? t("paidS") : t("pendS")}</span>{!x.paid && <button className="sm" onClick={() => openWA(x)}>WhatsApp</button>}</span></div>
            )) : <div className="mu">{t("noMine")}</div>}
          </div></section>
          </>
        )}
        {page === "hist" && (
          <>
          <section className="sec"><h2>{t("histH")}</h2>
            {hist.length ? hist.map((x) => {
              const HR = build(x.draw), fin = HR[2][0], ch = fin.w === 0 ? fin.a : fin.w === 1 ? fin.b : null, ru = fin.w === 0 ? fin.b : fin.w === 1 ? fin.a : null, open = openH === x.date;
              return (
                <div className="card" key={x.date} style={{ marginBottom: 10 }}>
                  <div className="row" style={{ paddingTop: 0 }}><b>{dateOf(x.date).toLocaleDateString(loc[L], { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</b><span className={"pill" + (ch ? " ok" : "")}>{ch ? "✓" : t("inProg")}</span></div>
                  {ch && <Podium champ={ch} run={ru} t={t} />}
                  <button className="btn gh" onClick={() => setOpenH(open ? null : x.date)}>{open ? t("hide") : t("details")}</button>
                  {open && <Bracket R={HR} t={t} isA={false} pick={pick} pod={false} />}
                </div>);
            }) : <div className="card mu">{t("noHist")}</div>}
          </section>
          </>
        )}
        {page === "rules" && (
          <>
          <section className="sec"><h2>{t("rulesH")}</h2><div className="card">
            {(RULES[L] || RULES.en).map((r, i) => (<div className="rule" key={i}><span className="rn">{i + 1}</span><div><b>{r[0]}</b><p className="mu" style={{ margin: "2px 0 0" }}>{r[1]}</p></div></div>))}
          </div></section>
          <section className="sec"><h2>{t("rbH")}</h2><a href={rulebook} target="_blank" rel="noopener noreferrer"><img className="rbimg" src={rulebook} alt="Rulebook" /></a></section>
          </>
        )}
        {page === "admin" && (
          <>
          {isA ? (
            <>
              <section className="sec"><h2>{t("admDays")}</h2><div className="days">
                {aKeys.map((k, i) => { const dt = dateOf(k), st = dayStates[k], n = rows.filter((x) => x.date === k && x.paid).length; return (
                  <button key={k} className={"day" + (i === aSel ? " on" : "") + (st && st.cancelled ? " cx" : "")} onClick={() => setASel(i)}>
                    <small>{dt.toLocaleDateString(loc[L], { weekday: "short" })}</small><b>{dt.getDate()}</b><em>{st && st.cancelled ? "✕" : n + "/" + MAX}</em>
                  </button>); })}
              </div></section>
              <div key={D} className="slide">
                <div className="atabs">
                  {[["teams", "👥", "aTT"], ["draw", "🎲", "aTD"], ["sched", "📅", "aTS"], ["res", "🏆", "aTR"], ["day", "⚙", "aTC"]].map((x) => (
                    <button key={x[0]} className={"atab" + (aTab === x[0] ? " on" : "")} onClick={() => setATab(x[0])}><span>{x[1]}</span> {t(x[2])}</button>
                  ))}
                </div>
                <section className="sec"><h2>{t("admH")} · {dShort}</h2><div className="card">
                  {aTab === "teams" && (
                    <>
                      <div className="g3">
                        <div><b>{teams.length}</b><small>{t("aReg")}</small></div>
                        <div><b>{conf.length}</b><small>{t("aConf")}</small></div>
                        <div className="gd"><b>₹{conf.length * 234}</b><small>{t("aCol")}</small></div>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        {teams.length ? teams.map((x, i) => (
                          <div className="row" key={x.id}>
                            <span>{i + 1}. <b>{x.team}</b> <span className="mu">{x.ign}</span></span>
                            <span>
                              <span className={"pill" + (x.paid ? " ok" : "")}>{x.paid ? t("paidS") : t("pendS")}</span>
                              <button className="sm" onClick={() => setPaid(x.id, !x.paid)}>{x.paid ? t("unm") : t("mark")}</button>
                              <button className="sm" onClick={() => remove(x.id)}>✕</button>
                            </span>
                          </div>
                        )) : <div className="mu">{t("none")}</div>}
                      </div>
                      <button className="btn gh" onClick={copyList}>{copied ? t("copied") : t("aCopy")}</button>
                    </>
                  )}
                  {aTab === "draw" && (
                    <>
                      <div className="g3"><div><b>{conf.length}/{MAX}</b><small>{t("drawStat")}</small></div></div>
                      {shuf ? (
                        <div className="shuf"><b>{t("shuf")}</b><div>{shuf.map((n, i) => <span key={i}>{n}</span>)}</div></div>
                      ) : (
                        <>
                          <button className="btn" disabled={conf.length !== MAX || cancelled} onClick={doDraw}>{draw ? t("redrawBtn") : t("drawBtn")}</button>
                          <button className="btn gh" disabled={conf.length !== MAX || cancelled} onClick={doManual}>{t("manualBtn")}</button>
                          {draw && <button className="btn dg" onClick={resetDraw}>{t("resetDraw")}</button>}
                          {conf.length !== MAX && <div className="mu" style={{ marginTop: 8 }}>{t("drawNeed")}</div>}
                        </>
                      )}
                    </>
                  )}
                  {aTab === "sched" && (draw ? (
                    <>
                      <label style={{ marginTop: 0 }}>{t("startL")}</label>
                      <input type="time" value={draw.start || "20:00"} onChange={(e) => saveState({ draw: { ...draw, start: e.target.value } })} />
                      <label>{t("gapL")}</label>
                      <select value={draw.gap || 20} onChange={(e) => saveState({ draw: { ...draw, gap: Number(e.target.value) } })}>{[10, 15, 20, 25, 30].map((g) => <option key={g} value={g}>{g}</option>)}</select>
                      <label>{t("pairH")}</label>
                      {[0, 1, 2, 3].map((i) => (
                        <div className="pair" key={i}>
                          <select value={draw.seed[2 * i].id} onChange={(e) => swapSeed(2 * i, e.target.value)}>{draw.seed.map((x) => <option key={x.id} value={x.id}>{x.team}</option>)}</select>
                          <b>VS</b>
                          <select value={draw.seed[2 * i + 1].id} onChange={(e) => swapSeed(2 * i + 1, e.target.value)}>{draw.seed.map((x) => <option key={x.id} value={x.id}>{x.team}</option>)}</select>
                        </div>
                      ))}
                      <label>{t("matchH")}</label>
                      {adml.map((m) => (
                        <div className="row" key={m.no}>
                          <span><b>{m.no}.</b> {m.a ? m.a.team : "—"} <b className="vsx">VS</b> {m.b ? m.b.team : "—"}</span>
                          <span className="mu">🕗 {fmtTime(draw, m.no - 1, loc[L])}</span>
                        </div>
                      ))}
                    </>
                  ) : <div className="mu">{t("needDraw")}</div>)}
                  {aTab === "res" && (R ? <Bracket R={R} t={t} isA={true} pick={pick} /> : <div className="mu">{t("needDraw")}</div>)}
                  {aTab === "day" && (
                    <>
                      <label style={{ marginTop: 0 }}>{t("cancelH")}</label>
                      <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={120} placeholder={t("notePh")} disabled={cancelled} />
                      <button className={"btn " + (cancelled ? "gh" : "dg")} onClick={toggleCancel}>{cancelled ? t("reopenBtn") : t("cancelBtn")}</button>
                    </>
                  )}
                </div></section>
              </div>
            </>
          ) : (
            <section className="sec"><div className="card"><p className="mu" style={{ margin: 0 }}>{t("admOnly")}</p><button className="btn" onClick={login}>{t("loginBtn")}</button></div></section>
          )}
          </>
        )}

        <footer>© Redhead eSports · Rhx Andy<br />
          <a href="https://youtube.com/@rhx_andy" target="_blank" rel="noopener noreferrer">YouTube</a> · <a href="https://www.instagram.com/rhxesports_" target="_blank" rel="noopener noreferrer">Instagram</a>
        </footer>
      </main>
      <nav className="nav">
        {[["home", "🏠", "nHome"], ["match", "🎮", "nMatch"], ["dash", "📊", "nDash"], ["hist", "🏆", "nHist"], ["rules", "📜", "nRules"]].concat(isA ? [["admin", "🛡", "nAdmin"]] : []).map((x) => (
          <button key={x[0]} className={page === x[0] ? "on" : ""} onClick={() => go(x[0])}><span>{x[1]}</span><small>{t(x[2])}</small></button>
        ))}
      </nav>
    </>
  );
}
