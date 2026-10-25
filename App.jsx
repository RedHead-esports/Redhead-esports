import React, { useCallback, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

/* ====== SETTINGS ====== */
const OWNER_WA = "916206549468";
const OWNER_EMAIL = "777mrsevou@gmail.com"; // sirf is Gmail se Admin Panel khulega
const LOGO_URL = "";                         // logo ka link (e.g. "/logo.png"), khali = "R" badge
const SUPABASE_URL = "https://exkhfrwhxbbjqbauthlx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4a2hmcndoeGJianFiYXV0aGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MTk3MzQsImV4cCI6MjEwODQ5NTczNH0.4a4TnxnNLP6COxGHkqraBZD7K-GClxfPfkG-48XKqdg";
const MAX = 8;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ====== LANGUAGES ====== */
const T = {
en:{admH:"Admin Panel",aReg:"Registered",aConf:"Confirmed",aCol:"Collected",aCopy:"Copy confirmed list",copied:"Copied ✓",game:"FREE FIRE",sub:"Daily Free Fire Tournament",owner:"Owner",daily:"Every Night · 8:00 PM",teams:"Teams",every:"Everyday",left:"Slots left",today:"Today's match:",
 prizeH:"Entry & Prize Pool",entry:"Entry / Team",p1:"1st Prize",p2:"2nd Prize",fmtH:"Match Format",
 r1:"<b>Round 1:</b> 8 teams play 4 matches (4 vs 4) → 4 teams advance.",r2:"<b>Semi Final:</b> 4 teams play 2 matches (2 vs 2) → 2 teams advance.",r3:"<b>Final:</b> the last 2 teams fight for the title.",
 live:"Daily matches. Streamed LIVE on YouTube — occasionally I may not be able to go live.",
 regH:"Register",loginTxt:"Sign in with your Google account to register your team.",loginBtn:"Continue with Google",logout:"Logout",
 fTeam:"Team Name",fIgn:"Leader's Free Fire Name (IGN)",fUid:"Free Fire UID",fMob:"Mobile Number (WhatsApp)",regBtn:"Register Team",upd:"Update Details",
 payH:"Payment",payTxt:"Entry fee ₹234. Tap the button to message us on WhatsApp — payment details will be shared there. Your slot is confirmed after payment.",payBtn:"Message on WhatsApp",
 pend:"Payment pending",paid:"Payment confirmed ✓",paidS:"Paid ✓",pendS:"Pending",listH:"Today's Confirmed Teams",none:"No confirmed teams yet.",
 full:"All 8 slots for today are full. Try again tomorrow!",bad:"Please fill all details correctly (UID: numbers only).",ok:"Registered! WhatsApp is opening — just press Send.",
 as:"Signed in as",adm:"Admin",mark:"Mark paid",unm:"Unpaid",delq:"Remove this team?",err:"Something went wrong: ",
 needLogin:"Login is not available here yet.",wa:"Hi Redhead eSports! I registered for today's 8 PM Free Fire tournament.\nTeam: {t}\nIGN: {i}\nUID: {u}\nMobile: {m}\nEntry ₹234 – please share payment details."},
hi:{admH:"एडमिन पैनल",aReg:"रजिस्टर्ड",aConf:"कन्फर्म",aCol:"कलेक्शन",aCopy:"कन्फर्म लिस्ट कॉपी करें",copied:"कॉपी हो गया ✓",game:"फ्री फायर",sub:"डेली फ्री फायर टूर्नामेंट",owner:"ओनर",daily:"रोज़ रात · 8:00 बजे",teams:"टीमें",every:"रोज़",left:"खाली स्लॉट",today:"आज का मैच:",
 prizeH:"एंट्री और इनाम",entry:"एंट्री / टीम",p1:"पहला इनाम",p2:"दूसरा इनाम",fmtH:"मैच का फॉर्मेट",
 r1:"<b>राउंड 1:</b> 8 टीमें 4 मैच खेलेंगी (4 vs 4) → 4 टीमें आगे बढ़ेंगी।",r2:"<b>सेमी फाइनल:</b> 4 टीमें 2 मैच खेलेंगी (2 vs 2) → 2 टीमें आगे बढ़ेंगी।",r3:"<b>फाइनल:</b> आखिरी 2 टीमें खिताब के लिए भिड़ेंगी।",
 live:"मैच रोज़ होंगे। YouTube पर LIVE दिखाया जाएगा — कभी-कभी लाइव नहीं कर पाऊँगा।",
 regH:"रजिस्टर करें",loginTxt:"अपनी टीम रजिस्टर करने के लिए Google अकाउंट से लॉगिन करें।",loginBtn:"Google से जारी रखें",logout:"लॉगआउट",
 fTeam:"टीम का नाम",fIgn:"लीडर का फ्री फायर नाम (IGN)",fUid:"फ्री फायर UID",fMob:"मोबाइल नंबर (WhatsApp)",regBtn:"टीम रजिस्टर करें",upd:"डिटेल अपडेट करें",
 payH:"पेमेंट",payTxt:"एंट्री फीस ₹234। नीचे बटन दबाकर WhatsApp पर मैसेज करें, पेमेंट की जानकारी वहीं मिलेगी। पेमेंट के बाद आपका स्लॉट पक्का होगा।",payBtn:"WhatsApp पर मैसेज करें",
 pend:"पेमेंट बाकी है",paid:"पेमेंट कन्फर्म ✓",paidS:"पेड ✓",pendS:"बाकी",listH:"आज की कन्फर्म टीमें",none:"अभी कोई टीम कन्फर्म नहीं हुई।",
 full:"आज के सभी 8 स्लॉट भर चुके हैं। कल फिर कोशिश करें!",bad:"कृपया सारी जानकारी सही भरें (UID में सिर्फ़ नंबर)।",ok:"रजिस्टर हो गया! WhatsApp खुल रहा है — बस Send दबाएँ।",
 as:"लॉगिन:",adm:"एडमिन",mark:"पेड करें",unm:"अनपेड",delq:"यह टीम हटाएँ?",err:"कुछ गड़बड़ हुई: ",
 needLogin:"यहाँ अभी लॉगिन उपलब्ध नहीं है।",wa:"नमस्ते Redhead eSports! मैंने आज रात 8 बजे के Free Fire टूर्नामेंट के लिए रजिस्टर किया है।\nटीम: {t}\nIGN: {i}\nUID: {u}\nमोबाइल: {m}\nएंट्री ₹234 – कृपया पेमेंट की जानकारी भेजें।"},
hl:{admH:"Admin Panel",aReg:"Registered",aConf:"Confirmed",aCol:"Collection",aCopy:"Confirmed list copy karo",copied:"Copy ho gaya ✓",game:"FREE FIRE",sub:"Daily Free Fire Tournament",owner:"Owner",daily:"Roz Raat · 8:00 PM",teams:"Teams",every:"Everyday",left:"Slots bache",today:"Aaj ka match:",
 prizeH:"Entry aur Prize",entry:"Entry / Team",p1:"1st Prize",p2:"2nd Prize",fmtH:"Match Format",
 r1:"<b>Round 1:</b> 8 teams 4 match khelengi (4 vs 4) → 4 teams aage.",r2:"<b>Semi Final:</b> 4 teams 2 match khelengi (2 vs 2) → 2 teams aage.",r3:"<b>Final:</b> aakhri 2 teams title ke liye ladengi.",
 live:"Daily match hoga. YouTube pe LIVE aaunga — kabhi kabhi live nahi kar paaunga.",
 regH:"Register Karo",loginTxt:"Team register karne ke liye apne Google account se login karo.",loginBtn:"Google se Login",logout:"Logout",
 fTeam:"Team ka Naam",fIgn:"Leader ka Free Fire Name (IGN)",fUid:"Free Fire UID",fMob:"Mobile Number (WhatsApp)",regBtn:"Team Register Karo",upd:"Details Update Karo",
 payH:"Payment",payTxt:"Entry fee ₹234. Niche button dabake WhatsApp pe message bhejo, payment details wahin milengi. Payment ke baad slot pakka hoga.",payBtn:"WhatsApp pe Message Bhejo",
 pend:"Payment pending",paid:"Payment confirm ✓",paidS:"Paid ✓",pendS:"Pending",listH:"Aaj ki Confirmed Teams",none:"Abhi koi team confirm nahi hui.",
 full:"Aaj ke saare 8 slots full hain. Kal try karo!",bad:"Saari details sahi bharo (UID me sirf numbers).",ok:"Register ho gaya! WhatsApp khul raha hai — bas Send dabao.",
 as:"Login:",adm:"Admin",mark:"Mark paid",unm:"Unpaid",delq:"Ye team hata dein?",err:"Kuch gadbad hui: ",
 needLogin:"Yahan abhi login available nahi hai.",wa:"Hi Redhead eSports! Maine aaj 8 PM Free Fire tournament ke liye register kiya hai.\nTeam: {t}\nIGN: {i}\nUID: {u}\nMobile: {m}\nEntry ₹234 – payment details bhejiye."}
};

const loc = { en: "en-IN", hi: "hi-IN", hl: "en-IN" };
const dkey = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };

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

export default function App() {
  const [L, setL] = useState(() => { try { return localStorage.getItem("lang") || "en"; } catch (e) { return "en"; } });
  const [muted, setMuted] = useState(() => { try { return localStorage.getItem("mute") === "1"; } catch (e) { return false; } });
  const [user, setUser] = useState(null);
  const [rows, setRows] = useState([]);
  const [f, setF] = useState({ team: "", ign: "", uid: "", mob: "" });
  const [reg, setReg] = useState({ txt: "", cls: "" });
  const [loginMsg, setLoginMsg] = useState("");
  const [copied, setCopied] = useState(false);
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

  /* teams (live) */
  const load = useCallback(async () => {
    const r = await sb.from("teams").select("*").eq("date", dkey());
    if (r.error) setLoginMsg("Error: " + r.error.message); else setRows(r.data);
  }, []);
  useEffect(() => {
    load();
    const ch = sb.channel("teams").on("postgres_changes", { event: "*", schema: "public", table: "teams" }, load).subscribe();
    const iv = setInterval(load, 20000);
    return () => { sb.removeChannel(ch); clearInterval(iv); };
  }, [load]);

  const d = dkey();
  const teams = rows.filter((x) => x.date === d).sort((a, b) => (a.at || 0) - (b.at || 0));
  const conf = teams.filter((x) => x.paid);
  const mine = user ? teams.find((x) => x.id === user.id + "_" + d) || null : null;
  const full = conf.length >= MAX && !mine;
  const isA = !!(user && user.isOwner);

  useEffect(() => { if (mine) setF((p) => (p.team || p.ign ? p : { ...p, team: mine.team, ign: mine.ign })); }, [mine && mine.id]);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const say = (txt, cls) => setReg({ txt, cls });

  function openWA() {
    const msg = t("wa").replace("{t}", f.team.trim() || (mine && mine.team) || "").replace("{i}", f.ign.trim() || (mine && mine.ign) || "")
      .replace("{u}", f.uid.trim() || "-").replace("{m}", f.mob.trim() || "-");
    const url = "https://wa.me/" + OWNER_WA + "?text=" + encodeURIComponent(msg);
    const w = window.open(url, "_blank");
    if (!w) { try { window.location.href = url; } catch (e) {} }
  }

  async function register() {
    const team = f.team.trim(), ign = f.ign.trim(), uid = f.uid.trim(), mob = f.mob.replace(/\D/g, "");
    if (!team || !ign || !/^\d{6,14}$/.test(uid) || mob.length < 10 || mob.length > 13) { say(t("bad"), "er"); sfx.err(); return; }
    const r = await sb.from("teams").upsert({ id: user.id + "_" + d, team, ign, date: d, paid: mine ? !!mine.paid : false, at: mine ? mine.at : Date.now() });
    if (r.error) { say(t("err") + r.error.message, "er"); return; }
    say(t("ok"), "go"); sfx.ok(); load(); openWA();
  }

  async function login() {
    const r = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
    if (r.error) setLoginMsg(t("err") + r.error.message);
  }
  async function setPaid(id, paid) { const r = await sb.from("teams").update({ paid }).eq("id", id); if (r.error) alert(t("err") + r.error.message); else load(); }
  async function remove(id) { if (!window.confirm(t("delq"))) return; const r = await sb.from("teams").delete().eq("id", id); if (r.error) alert(t("err") + r.error.message); else load(); }
  async function copyList() {
    const txt = "Redhead eSports - " + d + "\n" + conf.map((x, i) => (i + 1) + ". " + x.team + " (" + x.ign + ")").join("\n");
    try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (e) { window.prompt("Copy:", txt); }
  }
  const pickLang = (l) => { setL(l); try { localStorage.setItem("lang", l); } catch (e) {} };
  const toggleMute = () => { const m = !muted; setMuted(m); try { localStorage.setItem("mute", m ? "1" : "0"); } catch (e) {} };

  const dateStr = new Date().toLocaleDateString(loc[L], { weekday: "long", day: "numeric", month: "long" }) + " · 8:00 PM";

  return (
    <>
      <header><div className="hb">
        <div className="br"><div className="lg">{LOGO_URL ? <img alt="Redhead eSports" src={LOGO_URL} /> : "R"}</div><span>REDHEAD <b>eSPORTS</b></span></div>
        <div className="lang">
          {[["en", "English"], ["hi", "हिन्दी"], ["hl", "Hinglish"]].map(([l, n]) => <button key={l} className={L === l ? "on" : ""} onClick={() => pickLang(l)}>{n}</button>)}
          <button id="snd" aria-label="Sound" onClick={toggleMute}>{muted ? "🔇" : "🔊"}</button>
        </div>
      </div></header>

      <main>
        <section className="hero">
          <div className="mu" style={{ color: "#cfcfd8" }}>{t("game")}</div>
          <h1>REDHEAD <span>eSPORTS</span></h1>
          <p>{t("sub")}</p>
          <p className="mu" style={{ color: "#a9a9b6" }}>{t("owner")}: Rhx Andy</p>
          <span className="chip">{t("daily")}</span>
        </section>

        <section className="sec"><div className="card">
          <div className="g3">
            <div><b>8</b><small>{t("teams")}</small></div>
            <div><b>8 PM</b><small>{t("every")}</small></div>
            <div><b>{Math.max(0, MAX - conf.length)}</b><small>{t("left")}</small></div>
          </div>
          <div className="bar"><i style={{ width: Math.min(100, conf.length / MAX * 100) + "%" }} /></div>
          <div className="mu" style={{ marginTop: 10 }}>{t("today")} <b>{dateStr}</b></div>
        </div></section>

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

        <section className="sec"><h2>{t("regH")}</h2>
          {!user ? (
            <div className="card">
              <p className="mu" style={{ margin: 0 }}>{t("loginTxt")}</p>
              <button className="btn" id="loginBtn" onClick={login}>{t("loginBtn")}</button>
              <div className="msg er">{loginMsg}</div>
            </div>
          ) : (
            <div className="card">
              <div className="row" style={{ paddingTop: 0 }}>
                <span className="mu">{t("as")} {user.name || user.email || "Player"}{isA ? " · " + t("adm") : ""}</span>
                <button className="sm" onClick={() => sb.auth.signOut()}>{t("logout")}</button>
              </div>
              <label>{t("fTeam")}</label><input value={f.team} onChange={set("team")} maxLength={30} autoComplete="off" />
              <label>{t("fIgn")}</label><input value={f.ign} onChange={set("ign")} maxLength={30} autoComplete="off" />
              <label>{t("fUid")}</label><input value={f.uid} onChange={set("uid")} inputMode="numeric" maxLength={14} autoComplete="off" />
              <label>{t("fMob")}</label><input value={f.mob} onChange={set("mob")} inputMode="tel" maxLength={15} autoComplete="tel" placeholder="98XXXXXXXX" />
              <button className="btn" disabled={full} onClick={register}>{mine ? t("upd") : t("regBtn")}</button>
              <div className={"msg " + (full ? "er" : reg.cls)}>{full ? t("full") : reg.txt}</div>
            </div>
          )}
        </section>

        {mine && (
          <section className="sec"><h2>{t("payH")}</h2><div className="card">
            <p className="mu" style={{ margin: 0 }}>{t("payTxt")}</p>
            <button className="btn wa" onClick={openWA}>{t("payBtn")}</button>
            <p style={{ margin: "12px 0 0" }}><span className={"pill" + (mine.paid ? " ok" : "")}>{mine.paid ? t("paid") : t("pend")}</span></p>
          </div></section>
        )}

        <section className="sec"><h2>{t("listH")}</h2><div className="card">
          {conf.length ? conf.map((x, i) => (
            <div className="row" key={x.id}><span>{i + 1}. <b>{x.team}</b> <span className="mu">{x.ign}</span></span><span className="pill ok">{t("paidS")}</span></div>
          )) : <div className="mu">{t("none")}</div>}
        </div></section>

        {isA && (
          <section className="sec"><h2>{t("admH")}</h2><div className="card">
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
          </div></section>
        )}

        <footer>© Redhead eSports · Rhx Andy<br />
          <a href="https://youtube.com/@rhx_andy" target="_blank" rel="noopener noreferrer">YouTube</a> · <a href="https://www.instagram.com/rhxesports_" target="_blank" rel="noopener noreferrer">Instagram</a>
        </footer>
      </main>
    </>
  );
}
