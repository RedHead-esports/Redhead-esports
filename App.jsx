import React, { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import logoImg from "./logo.jpg";

/* ====== SETTINGS ====== */
const OWNER_WA = "917759893473";
const OWNER_EMAIL = "777mrsevou@gmail.com"; // sirf is Gmail se Admin Panel khulega
const SUPABASE_URL = "https://exkhfrwhxbbjqbauthlx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4a2hmcndoeGJianFiYXV0aGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MTk3MzQsImV4cCI6MjEwODQ5NTczNH0.4a4TnxnNLP6COxGHkqraBZD7K-GClxfPfkG-48XKqdg";
const MAX = 8;
const MAX_PER = 20; // ek ID se ek din me max requests (spam se bachne ke liye)     // ek din me teams
const DAYS = 10;    // kitne din aage tak registration (aaj se shuru)
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ====== LANGUAGES ====== */
const T = {
en:{nLobby:"Matches",nTop:"Top",nProf:"Profile",welcome:"Welcome Back,",playerW:"Player",qaProfile:"My Profile",qaTop:"Top Teams",qaContact:"Contact Us",qaRules:"Rules",myContest:"My Contest",cUp:"Upcoming",cOn:"Ongoing",cDone:"Completed",esGames:"eSport Games",lobRes:"Results",lobAll:"All",noMatches:"No matches here yet. Check back soon!",spotsLeft:"Only {n} spots left",spotsFull:"Slots full",joinB:"JOIN",joinedB:"REGISTERED",watchB:"WATCH MATCH",mcPrize:"Prize pool",mcKill:"Per kill",mcEntry:"Entry fee",mcType:"Type",mcView:"View",mcMap:"Map",freeW:"FREE",topH:"Top Teams",tFull:"Fulltime",tWeek:"Weekly",tMonth:"Monthly",tPos:"Position",tTeam:"Team",tWin:"Winning",noTop:"No results yet.",contactH:"Contact Us",followH:"Follow Us",ctWa:"WhatsApp",ctIg:"Instagram",ctYt:"YouTube",ctTg:"Telegram",ctDc:"Join Discord",profH:"My Profile",statTeams:"Teams registered",statConf:"Confirmed",mToday:"Today's Live Match",faqH:"FAQ",aboutH:"About Us",aboutT:"Red Head eSports hosts daily Free Fire and BGMI tournaments. Owner: Rhx Andy.",aTN:"Notice",noticeL:"Important update shown on Home (leave empty to hide)",noticeSave:"Save notice",perKillL:"Per kill prize (₹, optional)",cancelledT:"Cancelled",winnerT:"Winner",mapL:"Map (pick or type)",perspL:"View (TPP / FPP)",killsL:"Kills to win - TDM (optional)",winCond:"Win Condition",winCondT:"The first team to reach {k} kills wins the match.",mapView:"Map & View",sizeNote:"Solo = 1 player, Duo = 2, Trio = 3, Squad = 4",gameFF:"Free Fire",gameBG:"BGMI",bgRulesNote:"Mode-wise match rules for BGMI are announced by the admin for each match.",aTB:"Banners",bannerHint:"Make a poster for each match type and upload it to GitHub with exactly this name (.jpg, .png or .webp). The right one shows to players on the registration panel. If one is missing, the site tries banner-{mode}, then banner-default.",bannerNeed:"Needed for this match",copyN:"Copy name",aiBtn:"🤖 Ask AI for a new prompt",aiBusy:"AI is writing…",aiFail:"AI did not respond, so a new local style was picked instead.",aiNote:"AI writes a fresh scene every time. It is free and can be slow.",regFree:"Register Now (Free)",freeNote:"Free entry: your team is confirmed instantly, no payment or WhatsApp needed. Only one team per mobile number.",freeDone:"Registered and confirmed ✓ You are in!",dupPhone:"This mobile number has already registered a team for this match.",freeL:"FREE",myTeamsH:"Your teams",savedOk:"Details updated ✓",newStyle:"✨ New style (different prompt)",styleL:"Style",refundBanner:"⚠ IMPORTANT: If all {n} team slots are not filled, the match will be cancelled and everyone will be refunded.",pendH:"Pending teams",tsizeL:"Team size",timeL:"Tournament time",regCloseL:"Registration closes at (optional)",tbaT:"Time TBA",slotAdd:"+ Add tournament",aTP:"Prompt",promptHint:"Copy this prompt and paste it in an AI image tool to make the poster.",copyP:"Copy this prompt",copyAllP:"Copy all tournaments of the day",rulesPanelH:"Rules for this match",modeCS:"CS Squad",modeClassic:"Bermuda Classic",classicH:"Bermuda Classic Match",classicSub:"Room ID and password appear here at the start time.",roomH:"Room details",roomId:"Room ID",roomPw:"Password",roomWait:"Room ID and password will appear here at {t}. Keep this page open.",roomLogin:"Team leaders: login with Google to see your Room ID and password.",seatsH:"Seat numbers",seatL:"Seat",p3:"3rd Prize",csRulesH:"General & CS Squad Rules",classicRulesH:"Bermuda Classic Rules",aTU:"Setup",aTRm:"Room",modeL:"Match mode for this day",entryL:"Entry fee (₹)",p1L:"1st / Winner prize (₹)",p2L:"2nd / Runner-up prize (₹)",p3L:"3rd prize (₹) - Classic only",maxL:"Max teams - Classic only",roomTimeL:"Room opens at",roomIdL:"Room ID",roomPwL:"Room password",roomSave:"Save room (shows at the set time)",roomNow:"Show to leaders now",roomHide:"Hide room",roomHidden:"Hidden from players",seatsAssign:"↺ Use confirmation order for seats",placesH:"Final positions",pick1:"1st place",pick2:"2nd place",pick3:"3rd place",pickSel:"— select team —",luckyPlay:"🎁 Do the Lucky Draw",luckyHow:"Any player with a confirmed team can tap to draw. The winner is picked randomly by the server, so nobody can change it.",luckyElig:"Only logged-in players with a confirmed team can draw.",luckyBy:"Draw done by",luckyH:"Lucky Draw",luckyPrize:"₹40 Play Store redeem code",luckyPool:"Teams in the draw",luckyWin:"Lucky winner",luckyNote:"The admin will send the redeem code to the winner on WhatsApp.",luckyBtn:"🎁 Run Lucky Draw (₹40)",luckyReset:"Reset lucky draw",luckyNeed:"Lucky draw unlocks after the final is decided.",cfmLucky:"Run the lucky draw now? One of the 8 teams will be picked at random.",cfmLuckyReset:"Reset the lucky draw result?",stLive:"LIVE",wonL:"Won",lostL:"Lost",gameRulesH:"In-game Rules",rdHint:"Tap a round: 1st team → 2nd team → 1st (revive penalty ⚠) → 2nd (revive penalty ⚠) → clear. First to 5 wins the match.",statusH:"Match status for this day",stCancel:"Match cancelled (will not happen)",stTbd:"Not decided",stOn:"Match will happen",tbdH:"Match not decided yet",tbdMsg:"Registration opens once the admin confirms the match for this day.",tbdS:"Not decided",tbdReg:"Registration is closed until the match is confirmed.",aTT:"Teams",aTD:"Draw",aTS:"Schedule",aTR:"Results",aTC:"Day control",needDraw:"Do the draw first (Draw tab).",prizeL:"Prize money",drawStat:"Confirmed teams",nMatch:"Match",matchH:"Today's Matches",matchN:"Match",winOf:"Winner of",stNext:"NEXT",stUp:"Upcoming",stDn:"Done",noSched:"Match schedule will appear here once the admin announces the draw.",gapNote:"15–20 min break between matches.",schedH:"Match Schedule",startL:"First match starts at",gapL:"Gap between matches (min)",pairH:"Round 1 pairings (you decide)",manualBtn:"Manual order (no shuffle)",cfmSwap:"Changing pairings will clear winners. Continue?",reqNote:"Your registration is a request. The admin decides how many of your teams are accepted. A team is confirmed only after approval and payment.",maxTeams:"Request limit reached (20). Please contact admin on WhatsApp.",myCnt:"Your teams",editB:"Edit",cancelEdit:"Cancel edit",rbH:"Rulebook",regClosed:"Registration for this match is closed.",nHome:"Home",nDash:"Dashboard",nHist:"History",nRules:"Rules",nAdmin:"Admin",dashH:"Dashboard",stDone:"Tournaments",stTeams:"Teams played",stPrize:"Prize paid",upH:"Upcoming Days",myH:"My Registrations",noMine:"You have not registered yet.",histH:"Tournament History",noHist:"No tournaments yet. Results appear here after the draw.",inProg:"In progress",details:"View bracket",hide:"Hide",rulesH:"Rules",admDays:"Select Day",admOnly:"Admin only. Login with the owner Google account.",postersH:"Posters",soon:"Poster coming soon",optLogin:"Login is optional",regd:"Registered ✓",tdy:"Today",fullTag:"FULL",mDay:"Match day:",daysH:"Pick Match Day",canH:"Match Cancelled",canMsg:"Registration is closed for this day.",drawH:"Match Draw",rndTag:"🎲 Random draw",drawWait:"The draw will appear here once all 8 teams are confirmed.",rnd1:"Round 1",rnd2:"Semi Final",rnd3:"Final",tbd:"TBD",win:"Winner",champ:"Champion",runner:"Runner-up",drawBtn:"🎲 Draw Teams (Random)",redrawBtn:"🎲 Draw Again",resetDraw:"Reset draw",drawNeed:"Draw unlocks when 8 teams are confirmed.",shuf:"Shuffling…",cancelH:"Cancel / Reopen this day",notePh:"Reason (everyone will see this)",cancelBtn:"Cancel this day's match",reopenBtn:"Reopen this day",cfmRedraw:"Draw again? Current winners will be cleared.",cfmCancel:"Cancel this day's match? Everyone will see it.",cfmReset:"Reset the draw?",admH:"Admin Panel",aReg:"Registered",aConf:"Confirmed",aCol:"Collected",aCopy:"Copy confirmed list",copied:"Copied ✓",game:"FREE FIRE",sub:"Daily Free Fire Tournament",owner:"Owner",daily:"Daily Tournaments",teams:"Teams",every:"Everyday",left:"Slots left",today:"Today's match:",
 prizeH:"Entry & Prize Pool",entry:"Entry / Team",p1:"1st Prize",p2:"2nd Prize",fmtH:"Match Format",
 r1:"<b>Round 1:</b> 8 teams play 4 matches → 4 teams advance.",r2:"<b>Semi Final:</b> 4 teams play 2 matches → 2 teams advance.",r3:"<b>Final:</b> the last 2 teams fight for the title.",
 live:"Daily matches. Streamed LIVE on YouTube — occasionally I may not be able to go live.",
 regH:"Register",loginTxt:"Sign in with your Google account to register your team.",loginBtn:"Continue with Google",logout:"Logout",
 fTeam:"Team Name",fIgn:"Leader's Free Fire Name (IGN)",fUid:"Free Fire UID",fMob:"Mobile Number (WhatsApp)",regBtn:"Send Registration Request",upd:"Update Details",
 payH:"Payment",payTxt:"Entry fee ₹{e}. Tap the button to message us on WhatsApp — payment details will be shared there. Your slot is confirmed after payment.",payBtn:"Message on WhatsApp",
 pend:"Payment pending",paid:"Payment confirmed ✓",paidS:"Confirmed ✓",pendS:"Pending",listH:"Confirmed Teams",none:"No confirmed teams yet.",
 full:"All 8 slots for this day are full. Pick another day!",bad:"Please fill all details correctly (UID: numbers only).",ok:"Registered! WhatsApp is opening — just press Send.",
 as:"Signed in as",adm:"Admin",mark:"Confirm ✓",unm:"Unconfirm",delq:"Remove this team?",err:"Something went wrong: ",
 needLogin:"Login is not available here yet.",wa:"Hi Redhead eSports! I registered for a Free Fire tournament.\nMatch: {k}\nDate: {d}\nTeam: {t}\nIGN: {i}\nUID: {u}\nMobile: {m}\nEntry ₹{e} – please share payment details."},
hi:{nLobby:"मैच",nTop:"टॉप",nProf:"प्रोफाइल",welcome:"वापसी पर स्वागत है,",playerW:"खिलाड़ी",qaProfile:"मेरी प्रोफाइल",qaTop:"टॉप टीमें",qaContact:"संपर्क करें",qaRules:"नियम",myContest:"मेरे मैच",cUp:"आने वाले",cOn:"चालू",cDone:"पूरे हुए",esGames:"ईस्पोर्ट गेम्स",lobRes:"नतीजे",lobAll:"सभी",noMatches:"अभी यहाँ कोई मैच नहीं है। थोड़ी देर बाद देखें!",spotsLeft:"सिर्फ़ {n} जगह बाकी",spotsFull:"स्लॉट भर गए",joinB:"जुड़ें",joinedB:"रजिस्टर्ड",watchB:"मैच देखें",mcPrize:"इनाम राशि",mcKill:"प्रति किल",mcEntry:"एंट्री फीस",mcType:"टाइप",mcView:"व्यू",mcMap:"मैप",freeW:"फ्री",topH:"टॉप टीमें",tFull:"हमेशा",tWeek:"साप्ताहिक",tMonth:"मासिक",tPos:"स्थान",tTeam:"टीम",tWin:"जीत",noTop:"अभी कोई नतीजा नहीं।",contactH:"संपर्क करें",followH:"हमें फॉलो करें",ctWa:"WhatsApp",ctIg:"Instagram",ctYt:"YouTube",ctTg:"Telegram",ctDc:"Discord जुड़ें",profH:"मेरी प्रोफाइल",statTeams:"रजिस्टर टीमें",statConf:"कन्फर्म",mToday:"आज का लाइव मैच",faqH:"सवाल जवाब",aboutH:"हमारे बारे में",aboutT:"रेड हेड ईस्पोर्ट्स रोज़ फ्री फायर और BGMI के टूर्नामेंट कराता है। ओनर: Rhx Andy।",aTN:"सूचना",noticeL:"होम पर दिखने वाली ज़रूरी सूचना (खाली छोड़ो तो हट जाएगी)",noticeSave:"सूचना सेव करें",perKillL:"प्रति किल इनाम (₹, ज़रूरी नहीं)",cancelledT:"कैंसिल",winnerT:"विजेता",mapL:"मैप (चुनें या लिखें)",perspL:"व्यू (TPP / FPP)",killsL:"जीतने के लिए किल्स - TDM (ज़रूरी नहीं)",winCond:"जीत का नियम",winCondT:"जो टीम पहले {k} किल्स पूरी करेगी वही मैच जीतेगी।",mapView:"मैप और व्यू",sizeNote:"Solo = 1 खिलाड़ी, Duo = 2, Trio = 3, Squad = 4",gameFF:"फ्री फायर",gameBG:"BGMI",bgRulesNote:"BGMI के मैच के खास नियम एडमिन हर मैच के लिए बताएगा।",aTB:"बैनर",bannerHint:"हर तरह के मैच का पोस्टर बनाकर बिल्कुल इसी नाम से GitHub पर डालें (.jpg, .png या .webp)। सही वाला पोस्टर रजिस्ट्रेशन पैनल में खिलाड़ियों को दिखेगा। कोई न हो तो साइट banner-{mode}, फिर banner-default ढूँढती है।",bannerNeed:"इस मैच के लिए चाहिए",copyN:"नाम कॉपी करें",aiBtn:"🤖 AI से नया प्रॉम्प्ट लिखवाएँ",aiBusy:"AI लिख रहा है…",aiFail:"AI ने जवाब नहीं दिया, इसलिए नया लोकल स्टाइल चुन लिया गया।",aiNote:"AI हर बार नया सीन लिखता है। यह फ्री है और धीमा हो सकता है।",regFree:"अभी रजिस्टर करें (फ्री)",freeNote:"फ्री एंट्री: आपकी टीम तुरंत कन्फर्म हो जाएगी, पेमेंट या WhatsApp की ज़रूरत नहीं। एक मोबाइल नंबर से सिर्फ़ एक टीम।",freeDone:"रजिस्टर और कन्फर्म हो गया ✓ आप शामिल हैं!",dupPhone:"इस मोबाइल नंबर से इस मैच की टीम पहले ही रजिस्टर हो चुकी है।",freeL:"फ्री",myTeamsH:"आपकी टीमें",savedOk:"डिटेल अपडेट हो गई ✓",newStyle:"✨ नया स्टाइल (अलग प्रॉम्प्ट)",styleL:"स्टाइल",refundBanner:"⚠ ज़रूरी: अगर सभी {n} टीमें पूरी नहीं हुईं, तो मैच कैंसिल कर दिया जाएगा और सभी को रिफंड कर दिया जाएगा।",pendH:"पेंडिंग टीमें",tsizeL:"टीम साइज़",timeL:"टूर्नामेंट का समय",regCloseL:"रजिस्ट्रेशन बंद होने का समय (ज़रूरी नहीं)",tbaT:"समय तय नहीं",slotAdd:"+ टूर्नामेंट जोड़ें",aTP:"प्रॉम्प्ट",promptHint:"यह प्रॉम्प्ट कॉपी करके किसी AI इमेज टूल में डालें और पोस्टर बनाएँ।",copyP:"यह प्रॉम्प्ट कॉपी करें",copyAllP:"इस दिन के सारे टूर्नामेंट कॉपी करें",rulesPanelH:"इस मैच के नियम",modeCS:"CS स्क्वाड",modeClassic:"बरमूडा क्लासिक",classicH:"बरमूडा क्लासिक मैच",classicSub:"रूम ID और पासवर्ड शुरू होने के समय यहाँ दिखेंगे।",roomH:"रूम की जानकारी",roomId:"रूम ID",roomPw:"पासवर्ड",roomWait:"रूम ID और पासवर्ड {t} पर यहाँ दिखेंगे। यह पेज खुला रखें।",roomLogin:"टीम लीडर Google से लॉगिन करें, तभी रूम ID और पासवर्ड दिखेगा।",seatsH:"सीट नंबर",seatL:"सीट",p3:"तीसरा इनाम",csRulesH:"सामान्य और CS स्क्वाड नियम",classicRulesH:"बरमूडा क्लासिक नियम",aTU:"सेटअप",aTRm:"रूम",modeL:"इस दिन का मैच मोड",entryL:"एंट्री फीस (₹)",p1L:"पहला / विजेता इनाम (₹)",p2L:"दूसरा / उपविजेता इनाम (₹)",p3L:"तीसरा इनाम (₹) - सिर्फ़ क्लासिक",maxL:"अधिकतम टीमें - सिर्फ़ क्लासिक",roomTimeL:"रूम खुलने का समय",roomIdL:"रूम ID",roomPwL:"रूम पासवर्ड",roomSave:"रूम सेव करें (तय समय पर दिखेगा)",roomNow:"लीडर को अभी दिखाएँ",roomHide:"रूम छुपाएँ",roomHidden:"खिलाड़ियों से छुपा है",seatsAssign:"↺ कन्फर्मेशन क्रम से सीट दें",placesH:"अंतिम स्थान",pick1:"पहला स्थान",pick2:"दूसरा स्थान",pick3:"तीसरा स्थान",pickSel:"— टीम चुनें —",luckyPlay:"🎁 लकी ड्रॉ करें",luckyHow:"जिस खिलाड़ी की टीम कन्फर्म है वह दबाकर ड्रॉ कर सकता है। विजेता सर्वर रैंडम चुनता है, इसलिए कोई बदल नहीं सकता।",luckyElig:"सिर्फ़ लॉगिन वाले खिलाड़ी जिनकी टीम कन्फर्म है, वही ड्रॉ कर सकते हैं।",luckyBy:"ड्रॉ किसने किया",luckyH:"लकी ड्रॉ",luckyPrize:"₹40 का प्ले स्टोर रिडीम कोड",luckyPool:"ड्रॉ में शामिल टीमें",luckyWin:"लकी विजेता",luckyNote:"रिडीम कोड एडमिन विजेता को WhatsApp पर भेजेगा।",luckyBtn:"🎁 लकी ड्रॉ करें (₹40)",luckyReset:"लकी ड्रॉ रीसेट",luckyNeed:"फाइनल का नतीजा आने के बाद लकी ड्रॉ खुलेगा।",cfmLucky:"अभी लकी ड्रॉ करें? 8 टीमों में से 1 रैंडम चुनी जाएगी।",cfmLuckyReset:"लकी ड्रॉ का नतीजा रीसेट करें?",stLive:"लाइव",wonL:"जीते",lostL:"हारे",gameRulesH:"गेम के अंदर के नियम",rdHint:"राउंड दबाएँ: पहली टीम → दूसरी टीम → पहली (रिवाइव पेनल्टी ⚠) → दूसरी (रिवाइव पेनल्टी ⚠) → खाली। जो पहले 5 जीते वह मैच जीतेगा।",statusH:"इस दिन का मैच स्टेटस",stCancel:"मैच कैंसिल (नहीं होगा)",stTbd:"अभी तय नहीं",stOn:"मैच होगा",tbdH:"मैच अभी तय नहीं",tbdMsg:"एडमिन के इस दिन का मैच कन्फर्म करते ही रजिस्ट्रेशन खुलेगा।",tbdS:"तय नहीं",tbdReg:"मैच कन्फर्म होने तक रजिस्ट्रेशन बंद है।",aTT:"टीमें",aTD:"ड्रॉ",aTS:"शेड्यूल",aTR:"नतीजे",aTC:"दिन कंट्रोल",needDraw:"पहले ड्रॉ करें (ड्रॉ टैब में)।",prizeL:"इनाम राशि",drawStat:"कन्फर्म टीमें",nMatch:"मैच",matchH:"आज के मैच",matchN:"मैच",winOf:"विजेता:",stNext:"अगला",stUp:"आने वाला",stDn:"खत्म",noSched:"एडमिन के ड्रॉ घोषित करते ही मैच का शेड्यूल यहाँ दिखेगा।",gapNote:"हर मैच के बीच 15–20 मिनट का ब्रेक।",schedH:"मैच शेड्यूल",startL:"पहला मैच शुरू होगा",gapL:"मैचों के बीच गैप (मिनट)",pairH:"राउंड 1 की जोड़ियाँ (आप तय करें)",manualBtn:"मैनुअल क्रम (बिना शफल)",cfmSwap:"जोड़ियाँ बदलने पर विजेता हट जाएँगे। जारी रखें?",reqNote:"आपका रजिस्ट्रेशन एक रिक्वेस्ट है। आपकी कितनी टीमें लेनी हैं, यह एडमिन तय करेगा। भुगतान और अप्रूवल के बाद ही टीम कन्फर्म होगी।",maxTeams:"रिक्वेस्ट की सीमा (20) पूरी हो गई। एडमिन को WhatsApp करें।",myCnt:"आपकी टीमें",editB:"बदलें",cancelEdit:"बदलाव रद्द करें",rbH:"नियम पुस्तिका",regClosed:"इस मैच का रजिस्ट्रेशन बंद हो गया।",nHome:"होम",nDash:"डैशबोर्ड",nHist:"हिस्ट्री",nRules:"नियम",nAdmin:"एडमिन",dashH:"डैशबोर्ड",stDone:"टूर्नामेंट",stTeams:"टीमें खेलीं",stPrize:"इनाम बँटा",upH:"आने वाले दिन",myH:"मेरे रजिस्ट्रेशन",noMine:"आपने अभी रजिस्टर नहीं किया है।",histH:"टूर्नामेंट हिस्ट्री",noHist:"अभी कोई टूर्नामेंट नहीं। ड्रॉ के बाद नतीजे यहाँ दिखेंगे।",inProg:"जारी है",details:"ब्रैकेट देखें",hide:"छुपाएँ",rulesH:"नियम",admDays:"दिन चुनें",admOnly:"सिर्फ़ एडमिन के लिए। ओनर के Google अकाउंट से लॉगिन करें।",postersH:"पोस्टर",soon:"पोस्टर जल्द आएगा",optLogin:"लॉगिन ज़रूरी नहीं है",regd:"रजिस्टर हो चुका ✓",tdy:"आज",fullTag:"फुल",mDay:"मैच का दिन:",daysH:"मैच का दिन चुनें",canH:"मैच कैंसिल",canMsg:"इस दिन के लिए रजिस्ट्रेशन बंद है।",drawH:"मैच ड्रॉ",rndTag:"🎲 रैंडम ड्रॉ",drawWait:"8 टीमें कन्फर्म होते ही ड्रॉ यहाँ दिखेगा।",rnd1:"राउंड 1",rnd2:"सेमी फाइनल",rnd3:"फाइनल",tbd:"तय नहीं",win:"विजेता",champ:"चैंपियन",runner:"उपविजेता",drawBtn:"🎲 टीमों का ड्रॉ (रैंडम)",redrawBtn:"🎲 दोबारा ड्रॉ",resetDraw:"ड्रॉ रीसेट",drawNeed:"8 टीमें कन्फर्म होने पर ड्रॉ खुलेगा।",shuf:"टीमें मिक्स हो रही हैं…",cancelH:"इस दिन को कैंसिल / दोबारा खोलें",notePh:"कारण (सबको दिखेगा)",cancelBtn:"इस दिन का मैच कैंसिल करें",reopenBtn:"इस दिन को दोबारा खोलें",cfmRedraw:"दोबारा ड्रॉ करें? मौजूदा विजेता हट जाएँगे।",cfmCancel:"इस दिन का मैच कैंसिल करें? सबको दिखेगा।",cfmReset:"ड्रॉ रीसेट करें?",admH:"एडमिन पैनल",aReg:"रजिस्टर्ड",aConf:"कन्फर्म",aCol:"कलेक्शन",aCopy:"कन्फर्म लिस्ट कॉपी करें",copied:"कॉपी हो गया ✓",game:"फ्री फायर",sub:"डेली फ्री फायर टूर्नामेंट",owner:"ओनर",daily:"रोज़ टूर्नामेंट",teams:"टीमें",every:"रोज़",left:"खाली स्लॉट",today:"आज का मैच:",
 prizeH:"एंट्री और इनाम",entry:"एंट्री / टीम",p1:"पहला इनाम",p2:"दूसरा इनाम",fmtH:"मैच का फॉर्मेट",
 r1:"<b>राउंड 1:</b> 8 टीमें 4 मैच खेलेंगी → 4 टीमें आगे बढ़ेंगी।",r2:"<b>सेमी फाइनल:</b> 4 टीमें 2 मैच खेलेंगी → 2 टीमें आगे बढ़ेंगी।",r3:"<b>फाइनल:</b> आखिरी 2 टीमें खिताब के लिए भिड़ेंगी।",
 live:"मैच रोज़ होंगे। YouTube पर LIVE दिखाया जाएगा — कभी-कभी लाइव नहीं कर पाऊँगा।",
 regH:"रजिस्टर करें",loginTxt:"अपनी टीम रजिस्टर करने के लिए Google अकाउंट से लॉगिन करें।",loginBtn:"Google से जारी रखें",logout:"लॉगआउट",
 fTeam:"टीम का नाम",fIgn:"लीडर का फ्री फायर नाम (IGN)",fUid:"फ्री फायर UID",fMob:"मोबाइल नंबर (WhatsApp)",regBtn:"रजिस्ट्रेशन रिक्वेस्ट भेजें",upd:"डिटेल अपडेट करें",
 payH:"पेमेंट",payTxt:"एंट्री फीस ₹{e}। नीचे बटन दबाकर WhatsApp पर मैसेज करें, पेमेंट की जानकारी वहीं मिलेगी। पेमेंट के बाद आपका स्लॉट पक्का होगा।",payBtn:"WhatsApp पर मैसेज करें",
 pend:"पेमेंट बाकी है",paid:"पेमेंट कन्फर्म ✓",paidS:"कन्फर्म ✓",pendS:"बाकी",listH:"कन्फर्म टीमें",none:"अभी कोई टीम कन्फर्म नहीं हुई।",
 full:"इस दिन के सभी 8 स्लॉट भर चुके हैं। कोई और दिन चुनें!",bad:"कृपया सारी जानकारी सही भरें (UID में सिर्फ़ नंबर)।",ok:"रजिस्टर हो गया! WhatsApp खुल रहा है — बस Send दबाएँ।",
 as:"लॉगिन:",adm:"एडमिन",mark:"कन्फर्म करें ✓",unm:"अनकन्फर्म",delq:"यह टीम हटाएँ?",err:"कुछ गड़बड़ हुई: ",
 needLogin:"यहाँ अभी लॉगिन उपलब्ध नहीं है।",wa:"नमस्ते Redhead eSports! मैंने Free Fire टूर्नामेंट के लिए रजिस्टर किया है।\nमैच: {k}\nतारीख: {d}\nटीम: {t}\nIGN: {i}\nUID: {u}\nमोबाइल: {m}\nएंट्री ₹{e} – कृपया पेमेंट की जानकारी भेजें।"},
hl:{nLobby:"Matches",nTop:"Top",nProf:"Profile",welcome:"Welcome Back,",playerW:"Player",qaProfile:"My Profile",qaTop:"Top Teams",qaContact:"Contact Us",qaRules:"Rules",myContest:"Mere Matches",cUp:"Upcoming",cOn:"Ongoing",cDone:"Completed",esGames:"eSport Games",lobRes:"Results",lobAll:"Sab",noMatches:"Abhi yahan koi match nahi hai. Thodi der baad dekho!",spotsLeft:"Sirf {n} jagah baaki",spotsFull:"Slots full",joinB:"JOIN",joinedB:"REGISTERED",watchB:"WATCH MATCH",mcPrize:"Prize pool",mcKill:"Per kill",mcEntry:"Entry fee",mcType:"Type",mcView:"View",mcMap:"Map",freeW:"FREE",topH:"Top Teams",tFull:"Fulltime",tWeek:"Weekly",tMonth:"Monthly",tPos:"Position",tTeam:"Team",tWin:"Winning",noTop:"Abhi koi result nahi.",contactH:"Contact Us",followH:"Follow Us",ctWa:"WhatsApp",ctIg:"Instagram",ctYt:"YouTube",ctTg:"Telegram",ctDc:"Discord Join",profH:"My Profile",statTeams:"Teams registered",statConf:"Confirmed",mToday:"Aaj ka Live Match",faqH:"FAQ",aboutH:"About Us",aboutT:"Red Head eSports roz Free Fire aur BGMI ke tournaments karata hai. Owner: Rhx Andy.",aTN:"Notice",noticeL:"Home par dikhne wali important notice (khali chhodo to hat jayegi)",noticeSave:"Notice save karo",perKillL:"Per kill prize (₹, optional)",cancelledT:"Cancel",winnerT:"Winner",mapL:"Map (chuno ya likho)",perspL:"View (TPP / FPP)",killsL:"Jeetne ke liye kills - TDM (optional)",winCond:"Jeet ka rule",winCondT:"Jo team pehle {k} kills poori karegi wahi match jeetegi.",mapView:"Map aur View",sizeNote:"Solo = 1 player, Duo = 2, Trio = 3, Squad = 4",gameFF:"Free Fire",gameBG:"BGMI",bgRulesNote:"BGMI ke match ke khaas rules admin har match ke liye batayega.",aTB:"Banners",bannerHint:"Har type ke match ka poster banao aur bilkul isi naam se GitHub par daalo (.jpg, .png ya .webp). Sahi wala poster registration panel me players ko dikhega. Koi na ho to site banner-{mode}, phir banner-default dhundhti hai.",bannerNeed:"Is match ke liye chahiye",copyN:"Naam copy karo",aiBtn:"🤖 AI se naya prompt likhwao",aiBusy:"AI likh raha hai…",aiFail:"AI ne jawab nahi diya, isliye naya local style chuna gaya.",aiNote:"AI har baar naya scene likhta hai. Free hai aur slow ho sakta hai.",regFree:"Abhi Register Karo (Free)",freeNote:"Free entry: team turant confirm ho jayegi, payment ya WhatsApp ki zaroorat nahi. Ek mobile number se sirf ek team.",freeDone:"Register aur confirm ho gaya ✓ Aap shamil ho!",dupPhone:"Is mobile number se is match ki team pehle hi register ho chuki hai.",freeL:"FREE",myTeamsH:"Aapki teams",savedOk:"Details update ho gayi ✓",newStyle:"✨ Naya style (alag prompt)",styleL:"Style",refundBanner:"⚠ IMPORTANT: Agar saari {n} teams poori nahi hui, to match cancel kar diya jayega aur sabko refund kar diya jayega.",pendH:"Pending teams",tsizeL:"Team size",timeL:"Tournament ka time",regCloseL:"Registration band hone ka time (optional)",tbaT:"Time TBA",slotAdd:"+ Tournament jodo",aTP:"Prompt",promptHint:"Ye prompt copy karke kisi AI image tool me daalo aur poster banao.",copyP:"Ye prompt copy karo",copyAllP:"Is din ke saare tournaments copy karo",rulesPanelH:"Is match ke rules",modeCS:"CS Squad",modeClassic:"Bermuda Classic",classicH:"Bermuda Classic Match",classicSub:"Room ID aur password start time par yahan dikhenge.",roomH:"Room details",roomId:"Room ID",roomPw:"Password",roomWait:"Room ID aur password {t} par yahan dikhenge. Ye page khula rakho.",roomLogin:"Team leader Google se login karo, tabhi Room ID aur password dikhega.",seatsH:"Seat numbers",seatL:"Seat",p3:"3rd Prize",csRulesH:"General & CS Squad Rules",classicRulesH:"Bermuda Classic Rules",aTU:"Setup",aTRm:"Room",modeL:"Is din ka match mode",entryL:"Entry fee (₹)",p1L:"1st / Winner prize (₹)",p2L:"2nd / Runner-up prize (₹)",p3L:"3rd prize (₹) - sirf Classic",maxL:"Max teams - sirf Classic",roomTimeL:"Room kab khulega",roomIdL:"Room ID",roomPwL:"Room password",roomSave:"Room save karo (set time par dikhega)",roomNow:"Leaders ko abhi dikhao",roomHide:"Room chhupao",roomHidden:"Players se chhupa hai",seatsAssign:"↺ Confirmation order se seat do",placesH:"Final positions",pick1:"1st place",pick2:"2nd place",pick3:"3rd place",pickSel:"— team chuno —",luckyPlay:"🎁 Lucky Draw karo",luckyHow:"Jis player ki team confirm hai wo dabake draw kar sakta hai. Winner server random chunta hai, isliye koi badal nahi sakta.",luckyElig:"Sirf login wale players jinki team confirm hai, wahi draw kar sakte hain.",luckyBy:"Draw kisne kiya",luckyH:"Lucky Draw",luckyPrize:"₹40 ka Play Store redeem code",luckyPool:"Draw me shamil teams",luckyWin:"Lucky winner",luckyNote:"Redeem code admin winner ko WhatsApp par bhejega.",luckyBtn:"🎁 Lucky Draw karo (₹40)",luckyReset:"Lucky draw reset",luckyNeed:"Final ka result aane ke baad lucky draw khulega.",cfmLucky:"Abhi lucky draw karein? 8 teams me se 1 random chuni jayegi.",cfmLuckyReset:"Lucky draw ka result reset karein?",stLive:"LIVE",wonL:"Jeete",lostL:"Haare",gameRulesH:"In-game Rules",rdHint:"Round dabao: 1st team → 2nd team → 1st (revive penalty ⚠) → 2nd (revive penalty ⚠) → khali. Jo pehle 5 jeete wo match jeetega.",statusH:"Is din ka match status",stCancel:"Match cancel (nahi hoga)",stTbd:"Abhi decide nahi",stOn:"Match hoga",tbdH:"Match abhi decide nahi hua",tbdMsg:"Admin is din ka match confirm karega tab registration khulega.",tbdS:"Decide nahi",tbdReg:"Match confirm hone tak registration band hai.",aTT:"Teams",aTD:"Draw",aTS:"Schedule",aTR:"Results",aTC:"Day control",needDraw:"Pehle draw karo (Draw tab me).",prizeL:"Prize money",drawStat:"Confirmed teams",nMatch:"Match",matchH:"Aaj ke Matches",matchN:"Match",winOf:"Winner of",stNext:"NEXT",stUp:"Upcoming",stDn:"Done",noSched:"Admin draw announce karega to match schedule yahan dikhega.",gapNote:"Har match ke beech 15–20 min ka gap.",schedH:"Match Schedule",startL:"Pehla match shuru hoga",gapL:"Matches ke beech gap (min)",pairH:"Round 1 ki jodiyan (aap decide karo)",manualBtn:"Manual order (bina shuffle)",cfmSwap:"Jodiyan badalne par winners hat jayenge. Continue?",reqNote:"Aapka registration ek request hai. Aapki kitni teams leni hain ye admin decide karega. Payment aur approval ke baad hi team confirm hogi.",maxTeams:"Request limit (20) poori ho gayi. Admin ko WhatsApp karo.",myCnt:"Aapki teams",editB:"Edit",cancelEdit:"Edit cancel karo",rbH:"Rulebook",regClosed:"Is match ka registration band ho gaya.",nHome:"Home",nDash:"Dashboard",nHist:"History",nRules:"Rules",nAdmin:"Admin",dashH:"Dashboard",stDone:"Tournaments",stTeams:"Teams khelin",stPrize:"Prize baanta",upH:"Aane wale Din",myH:"Mere Registrations",noMine:"Aapne abhi register nahi kiya hai.",histH:"Tournament History",noHist:"Abhi koi tournament nahi. Draw ke baad results yahan dikhenge.",inProg:"Chal raha hai",details:"Bracket dekho",hide:"Chhupao",rulesH:"Rules",admDays:"Din Chuno",admOnly:"Sirf Admin ke liye. Owner ke Google account se login karo.",postersH:"Posters",soon:"Poster jald aayega",optLogin:"Login zaroori nahi hai",regd:"Register ho chuka ✓",tdy:"Aaj",fullTag:"FULL",mDay:"Match ka din:",daysH:"Match Day Chuno",canH:"Match Cancel",canMsg:"Is din ke liye registration band hai.",drawH:"Match Draw",rndTag:"🎲 Random draw",drawWait:"8 teams confirm hote hi draw yahan dikhega.",rnd1:"Round 1",rnd2:"Semi Final",rnd3:"Final",tbd:"TBD",win:"Winner",champ:"Champion",runner:"Runner-up",drawBtn:"🎲 Teams Draw (Random)",redrawBtn:"🎲 Dobara Draw",resetDraw:"Draw Reset",drawNeed:"8 teams confirm hone par draw khulega.",shuf:"Teams mix ho rahi hain…",cancelH:"Is din ko Cancel / Dobara Kholo",notePh:"Reason (sabko dikhega)",cancelBtn:"Is din ka match Cancel karo",reopenBtn:"Is din ko dobara kholo",cfmRedraw:"Dobara draw karein? Abhi ke winners hat jayenge.",cfmCancel:"Is din ka match cancel karein? Sabko dikhega.",cfmReset:"Draw reset karein?",admH:"Admin Panel",aReg:"Registered",aConf:"Confirmed",aCol:"Collection",aCopy:"Confirmed list copy karo",copied:"Copy ho gaya ✓",game:"FREE FIRE",sub:"Daily Free Fire Tournament",owner:"Owner",daily:"Roz Tournaments",teams:"Teams",every:"Everyday",left:"Slots bache",today:"Aaj ka match:",
 prizeH:"Entry aur Prize",entry:"Entry / Team",p1:"1st Prize",p2:"2nd Prize",fmtH:"Match Format",
 r1:"<b>Round 1:</b> 8 teams 4 match khelengi → 4 teams aage.",r2:"<b>Semi Final:</b> 4 teams 2 match khelengi → 2 teams aage.",r3:"<b>Final:</b> aakhri 2 teams title ke liye ladengi.",
 live:"Daily match hoga. YouTube pe LIVE aaunga — kabhi kabhi live nahi kar paaunga.",
 regH:"Register Karo",loginTxt:"Team register karne ke liye apne Google account se login karo.",loginBtn:"Google se Login",logout:"Logout",
 fTeam:"Team ka Naam",fIgn:"Leader ka Free Fire Name (IGN)",fUid:"Free Fire UID",fMob:"Mobile Number (WhatsApp)",regBtn:"Registration Request Bhejo",upd:"Details Update Karo",
 payH:"Payment",payTxt:"Entry fee ₹{e}. Niche button dabake WhatsApp pe message bhejo, payment details wahin milengi. Payment ke baad slot pakka hoga.",payBtn:"WhatsApp pe Message Bhejo",
 pend:"Payment pending",paid:"Payment confirm ✓",paidS:"Confirmed ✓",pendS:"Pending",listH:"Confirmed Teams",none:"Abhi koi team confirm nahi hui.",
 full:"Is din ke saare 8 slots full hain. Dusra din chuno!",bad:"Saari details sahi bharo (UID me sirf numbers).",ok:"Register ho gaya! WhatsApp khul raha hai — bas Send dabao.",
 as:"Login:",adm:"Admin",mark:"Confirm ✓",unm:"Unconfirm",delq:"Ye team hata dein?",err:"Kuch gadbad hui: ",
 needLogin:"Yahan abhi login available nahi hai.",wa:"Hi Redhead eSports! Maine Free Fire tournament ke liye register kiya hai.\nMatch: {k}\nDate: {d}\nTeam: {t}\nIGN: {i}\nUID: {u}\nMobile: {m}\nEntry ₹{e} – payment details bhejiye."}
};

const loc = { en: "en-IN", hi: "hi-IN", hl: "en-IN" };
const pad = (n) => String(n).padStart(2, "0");
const keyOf = (off) => { const d = new Date(); d.setDate(d.getDate() + off); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
const dpart = (k) => k.replace(/^[a-z]+:/, "").slice(0, 10);
const dateOf = (k) => { const p = dpart(k).split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); };

/* ====== RANDOM DRAW ====== */
function shuffle(a) {
  const r = a.slice(), buf = new Uint32Array(r.length);
  crypto.getRandomValues(buf);
  for (let i = r.length - 1; i > 0; i--) { const j = buf[i] % (i + 1); const x = r[i]; r[i] = r[j]; r[j] = x; }
  return r;
}
function build(draw) {
  const s = draw.seed, w = draw.w || {}, rd = draw.rd || {};
  const win = (m) => (m.w === 0 ? m.a : m.w === 1 ? m.b : null);
  const R = [[], [], []];
  for (let i = 0; i < 4; i++) R[0].push({ a: s[2 * i], b: s[2 * i + 1], w: w["0-" + i], k: "0-" + i, rd: rd["0-" + i] });
  for (let i = 0; i < 2; i++) R[1].push({ a: win(R[0][2 * i]), b: win(R[0][2 * i + 1]), w: w["1-" + i], k: "1-" + i, rd: rd["1-" + i] });
  R[2].push({ a: win(R[1][0]), b: win(R[1][1]), w: w["2-0"], k: "2-0", rd: rd["2-0"] });
  return R;
}
const scoreOf = (arr) => ({ a: (arr || []).filter((v) => v === "a" || v === "A").length, b: (arr || []).filter((v) => v === "b" || v === "B").length });

function matchList(draw) {
  const R = build(draw), out = [];
  R[0].forEach((m, i) => out.push({ ...m, no: i + 1, r: "rnd1" }));
  R[1].forEach((m, i) => out.push({ ...m, no: 5 + i, r: "rnd2", sa: 2 * i + 1, sb: 2 * i + 2 }));
  out.push({ ...R[2][0], no: 7, r: "rnd3", sa: 5, sb: 6 });
  return out;
}
const f12 = (hm, lc) => { if (!hm) return ""; const p = hm.split(":").map(Number); return new Date(2000, 0, 1, p[0], p[1]).toLocaleTimeString(lc, { hour: "numeric", minute: "2-digit" }); };
const slotKeys = (dk, st) => [dk].concat(Object.keys(st).filter((k) => k.startsWith(dk + "~")).sort((a, b) => Number(a.split("~")[1]) - Number(b.split("~")[1])));
function fmtTime(draw, n, lc) {
  if (!draw.start) return "TBA";
  const p = draw.start.split(":").map(Number), tot = p[0] * 60 + p[1] + n * (draw.gap || 20);
  return new Date(2000, 0, 1, Math.floor(tot / 60) % 24, tot % 60).toLocaleTimeString(lc, { hour: "numeric", minute: "2-digit" });
}

const STYLES = [
  { name: "Cinematic hero", look: "a white-haired masked anime gamer in a black hoodie, seen from behind in a dramatic pose, towering over a Bermuda island skyline with parachute silhouettes and drifting smoke", layout: "hero character large in the center, title across his chest, details in a clean band at the bottom", avoid: "cartoonish colors, clutter" },
  { name: "Minimal bold type", look: "huge condensed title typography as the hero, flat color blocks, thin accent rules, lots of negative space", layout: "left-aligned stacked headline, details in a tidy column, logo top-left", avoid: "photos, characters, busy backgrounds" },
  { name: "Broadcast scoreboard", look: "esports broadcast graphics: angular panels, score-strip bars, bracket lines and VS tags", layout: "title banner on top, two angled panels for mode and prizes, schedule strip at the bottom", avoid: "realistic scenes" },
  { name: "Mission briefing", look: "a classified military dossier on dark charcoal with a red CLASSIFIED stamp, torn paper edges, coordinates and map marks", layout: "paper-style sheet centered, stamps overlapping corners, details as typed lines", avoid: "bright cartoon style" },
  { name: "Tactical HUD", look: "a clean tactical interface with crosshair, corner brackets, radar rings and thin data blocks", layout: "crosshair behind the title, data blocks left and right, footer as a status bar", avoid: "neon glow, rainbow colors" },
  { name: "Versus split", look: "two squads facing each other across a sharp diagonal split, red on one side and yellow on the other", layout: "title across the diagonal, VS badge in the center, prizes as badges under each side", avoid: "symmetry that hides the text" },
  { name: "Trophy showcase", look: "a polished golden trophy on a dark pedestal surrounded by stacked prize cards, subtle confetti", layout: "trophy centered, prize cards below, title arched above", avoid: "excess sparkle" },
  { name: "Halftone comic", look: "bold halftone dots, speed lines, sticker-style badges and thick outlines", layout: "dynamic diagonal title, burst badges for entry and prizes", avoid: "photorealism" },
  { name: "Brutalist numerals", look: "oversized date numerals as the hero element in stencil type, raw concrete texture, hazard-stripe edges", layout: "giant date number behind the title, details in boxed labels", avoid: "soft gradients" },
  { name: "Island map", look: "a top-down Bermuda island map with topographic lines, drop pins, dashed flight paths and a compass", layout: "map fills the background, title on a dark banner, details on map labels", avoid: "real-world logos" },
  { name: "Street stencil", look: "spray-painted stencil lettering on a concrete wall, paint drips, sticker slaps and tape marks", layout: "stencil title on the wall, details on stickers and paper strips", avoid: "clean vector look" },
  { name: "Dark luxe", look: "matte black marble with thin gold foil lines, elegant spacing, premium sports-league feel", layout: "centered symmetrical layout, gold divider lines between info blocks", avoid: "loud colors, comic effects" },
];
const PALETTES = ["charcoal gray base with red and golden-yellow accents (brand colors)", "matte black base, golden-yellow headlines, red highlights", "steel gray gradient, red warning-stripe accents, yellow text", "dark graphite, bold red blocks, pale gold typography"];
const TEXTURES = ["subtle film grain and fine scratches", "faint grid and soft vignette, no glow", "concrete wall texture with light dust", "brushed metal panels with sharp edges", "halftone dot shading and paper grain"];
const FONTS = ["ultra-bold condensed sans (Bebas-style)", "stencil military font for headings with a clean sans for details", "heavy italic racing-style condensed font", "bold slab headline with thin tracked caption text"];
const MODES = { cs: { entry: 234, p1: 950, p2: 600, p3: 0, max: 8, size: 4, perKill: 0 }, classic: { entry: 234, p1: 950, p2: 600, p3: 300, max: 12, size: 4, perKill: 0 } };
const cfgOf = (d) => { const c = (d && d.cfg) || {}; const m = c.mode === "classic" ? "classic" : "cs"; const o = { ...MODES[m], ...c, mode: m }; if (m === "cs") o.max = 8; else if (c.max == null && d && d.date && d.date.startsWith("bgmi:")) o.max = { 1: 100, 2: 50, 3: 33, 4: 25 }[o.size] || 25; return o; };
const stOf = (d) => (!d ? "tbd" : d.status ? d.status : d.cancelled ? "cancel" : "on"); // cancel | tbd | on

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
    ["Registration", "Registration (with payment) must be completed before the registration closing time shown for each match."],
    ["Teams", "Number of teams and team size (1v1, 2v2, 3v3 or 4v4) are announced for each match."],
    ["Map", "Map will be “Classic Squad Bermuda”."],
    ["Rounds", "The match will be of 9 rounds."],
    ["Headshot", "The match will be One Tap Headshot only."],
    ["Fair Play", "Cheater / Hacker are not allowed. If caught, the entire team will be banned and the entry fee will not be refunded."],
  ],
  hi: [
    ["रजिस्ट्रेशन", "रजिस्ट्रेशन (भुगतान के साथ) हर मैच के लिए बताए गए बंद होने के समय से पहले करना होगा।"],
    ["टीमें", "टीमों की संख्या और टीम साइज़ (1v1, 2v2, 3v3 या 4v4) हर मैच के लिए बताया जाएगा।"],
    ["मैप", "मैप “क्लासिक स्क्वाड बरमूडा” होगा।"],
    ["राउंड", "मैच 9 राउंड का होगा।"],
    ["हेडशॉट", "मैच वनटेप हेडशॉट का होगा।"],
    ["फेयर प्ले", "चीटर / हैकर की अनुमति नहीं है, पकड़े जाने पर पूरी टीम बैन कर दी जाएगी, पैसे भी वापस नहीं होंगे।"],
  ],
  hl: [
    ["Registration", "Registration (payment ke saath) har match ke liye bataye gaye closing time se pehle karna hoga."],
    ["Teams", "Teams ki sankhya aur team size (1v1, 2v2, 3v3 ya 4v4) har match ke liye bataya jayega."],
    ["Map", "Map “Classic Squad Bermuda” hoga."],
    ["Rounds", "Match 9 rounds ka hoga."],
    ["Headshot", "Match One Tap Headshot ka hoga."],
    ["Fair Play", "Cheater / Hacker ki permission nahi hai. Pakde jaane par poori team BAN hogi aur paise bhi wapas nahi honge."],
  ],
};

const CLASSIC_RULES = {
  en: [["Room ID & Password", "Team leaders get the Room ID and password on this website at the start time (login required)."], ["Seat Number", "Every team gets a seat number. Sit only on your own seat."], ["Fair Play", "Cheater / Hacker: the entire team is banned and the entry fee is not refunded."]],
  hi: [["रूम ID और पासवर्ड", "टीम लीडर को रूम ID और पासवर्ड शुरू होने के समय इसी वेबसाइट पर मिलेगा (लॉगिन ज़रूरी)।"], ["सीट नंबर", "हर टीम को एक सीट नंबर मिलेगा। सिर्फ़ अपनी सीट पर बैठें।"], ["फेयर प्ले", "चीटर / हैकर की पूरी टीम बैन होगी और एंट्री फीस वापस नहीं होगी।"]],
  hl: [["Room ID & Password", "Team leader ko Room ID aur password start time par isi website par milega (login zaroori)."], ["Seat Number", "Har team ko ek seat number milega. Sirf apni seat par baitho."], ["Fair Play", "Cheater / Hacker ki poori team ban hogi aur entry fee wapas nahi hogi."]],
};

const REFUND = { en: ["Refund Policy", "If all team slots are not filled, the match will be cancelled and every registered team will be refunded."], hi: ["रिफंड नियम", "अगर सभी टीमें पूरी नहीं हुईं, तो मैच कैंसिल कर दिया जाएगा और सभी रजिस्टर्ड टीमों को पैसे वापस (रिफंड) कर दिए जाएंगे।"], hl: ["Refund Rule", "Agar saari teams poori nahi hui, to match cancel kar diya jayega aur sabko refund kar diya jayega."] };
["en", "hi", "hl"].forEach((l) => { RULES[l].push(REFUND[l]); CLASSIC_RULES[l].push(REFUND[l]); });

const GAME_RULES = {
  en: [
    ["Character Skill", "Character skill will be OFF in the game."],
    ["No Revive", "Reviving teammates is not allowed."],
    ["Revive Penalty", "If a team is caught reviving, even if they win that round, the round will not be counted and the opposing team will be awarded the round."],
    ["How to Win", "The match is of 9 rounds. The first team to win 5 rounds wins the match."],
  ],
  hi: [
    ["कैरेक्टर स्किल", "गेम में कैरेक्टर स्किल बंद (OFF) रहेगी।"],
    ["रिवाइव मना है", "रिवाइव देना मना है।"],
    ["रिवाइव पर पेनल्टी", "रिवाइव देते हुए पकड़े गए और वह राउंड जीत भी गए, तो वह राउंड गिना नहीं जाएगा और सामने वाली टीम को राउंड जीता हुआ माना जाएगा।"],
    ["जीत का नियम", "मैच 9 राउंड का होगा। जो टीम पहले 5 राउंड जीतेगी, वही मैच जीतेगी।"],
  ],
  hl: [
    ["Character Skill", "Game me Character skill OFF rahegi."],
    ["Revive Mana Hai", "Revive dena mana hai."],
    ["Revive Penalty", "Agar revive dete hue pakde gaye aur wo round jeet bhi gaye, to wo round ginaa nahi jayega aur saamne wali team ko round jeeta hua mana jayega."],
    ["Jeet ka Rule", "Match 9 rounds ka hoga. Jo team pehle 5 round jeetegi wahi match jeetegi."],
  ],
};

/* ====== POSTERS: repo me poster1.jpg, poster2.jpg ... daalo, apne aap dikh jayenge ====== */
const posterMods = import.meta.glob("./poster*.{jpg,jpeg,png,webp}", { eager: true, query: "?url", import: "default" });
const POSTERS = Object.keys(posterMods).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map((k) => posterMods[k]);
const bgPosterMods = import.meta.glob("./bgmi-poster*.{jpg,jpeg,png,webp}", { eager: true, query: "?url", import: "default" });
const POSTERS_BG = Object.keys(bgPosterMods).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map((k) => bgPosterMods[k]);
const TILE_FILES = import.meta.glob("./tile-*.{jpg,jpeg,png,webp}", { eager: true, query: "?url", import: "default" });
const TILE_IMG = {}; Object.keys(TILE_FILES).forEach((k) => { TILE_IMG[k.replace(/^\.\//, "").replace(/\.(jpe?g|png|webp)$/i, "").toLowerCase()] = TILE_FILES[k]; });
const TILES = [["ff", "classic", "🔥", "FF Classic"], ["ff", "cs", "⚔", "FF CS Squad"], ["bgmi", "classic", "🪂", "BGMI Classic"], ["bgmi", "cs", "🪖", "BGMI TDM"]];
const TELEGRAM_URL = ""; // apna Telegram link yahan daalo (khali = chhupa rahega)
const DISCORD_URL = "";  // apna Discord link yahan daalo (khali = chhupa rahega)
const FAQ = {
  en: [["How do I register?", "Open Matches, tap JOIN on a match, fill your team details and send the request. Free matches confirm instantly; paid ones confirm after payment."], ["When do I get the Room ID?", "Team leaders see the Room ID, password and seat number on the Match tab at the start time, after login."], ["What if teams are not full?", "The match is cancelled and everyone is refunded."], ["Can I edit my team?", "Yes, from the same phone or Google login, tap Edit on your team."]],
  hi: [["रजिस्टर कैसे करूँ?", "मैच खोलें, किसी मैच पर जुड़ें दबाएँ, टीम की जानकारी भरकर रिक्वेस्ट भेजें। फ्री मैच तुरंत कन्फर्म होता है, पेड मैच पेमेंट के बाद।"], ["रूम ID कब मिलेगी?", "लॉगिन करने पर टीम लीडर को शुरू होने के समय मैच टैब में रूम ID, पासवर्ड और सीट नंबर दिखेगा।"], ["टीमें पूरी न हुईं तो?", "मैच कैंसिल होगा और सभी को रिफंड मिलेगा।"], ["टीम एडिट कर सकता हूँ?", "हाँ, उसी फोन या Google लॉगिन से अपनी टीम पर बदलें दबाएँ।"]],
  hl: [["Register kaise karun?", "Matches kholo, kisi match par JOIN dabao, team details bharke request bhejo. Free match turant confirm hota hai, paid match payment ke baad."], ["Room ID kab milegi?", "Login karne par team leader ko start time par Match tab me Room ID, password aur seat number dikhega."], ["Teams poori na hui to?", "Match cancel hoga aur sabko refund milega."], ["Team edit kar sakta hun?", "Haan, usi phone ya Google login se apni team par Edit dabao."]],
};
const BANNER_FILES = import.meta.glob("./*banner-*.{jpg,jpeg,png,webp}", { eager: true, query: "?url", import: "default" });
const BANNERS = {}; Object.keys(BANNER_FILES).forEach((k) => { BANNERS[k.replace(/^\.\//, "").replace(/\.(jpe?g|png|webp)$/i, "").toLowerCase()] = BANNER_FILES[k]; });
const bannerKeys = (c, g) => { const p = g === "bgmi" ? "bgmi-banner" : "banner", b = p + "-" + c.mode + "-" + c.size + "v" + c.size, f = c.entry === 0 ? "free" : "paid"; return [b + "-" + f, b, p + "-" + c.mode + "-" + f, p + "-" + c.mode, p + "-default"]; };
const bannerFor = (c, g) => { const k = bannerKeys(c, g).find((x) => BANNERS[x]); return k ? BANNERS[k] : null; };

function Posters({ t, game }) {
  const ref = useRef(null);
  const [big, setBig] = useState(null);
  const PL = game === "bgmi" ? POSTERS_BG : POSTERS;
  const items = PL.length ? PL : Array.from({ length: 6 }, () => null);
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
function Tm({ x, win, lose, canPick, onPick, t, sc, side }) {
  return (
    <div className={"tm" + (win ? " w" : "") + (lose ? " l" : "")}>
      <span>{side && <i className={"dot " + side} />}{x ? x.team : t("tbd")}{x && <small className="mu"> {x.ign}</small>}</span>
      <span>{sc != null && <b className="sc">{sc}</b>}{win && "🏆 "}{canPick && <button className="sm" onClick={onPick}>{win ? "✓" : t("win")}</button>}</span>
    </div>
  );
}
function Rounds({ arr, onTap }) {
  const a = arr && arr.length ? arr : Array(9).fill("");
  return (
    <div className="rds">
      {a.map((v, i) => { const pen = v && v === v.toUpperCase(); return (
        <button key={i} type="button" disabled={!onTap} className={"rc" + (v ? " " + v.toLowerCase() : "") + (pen ? " pen" : "")} onClick={() => onTap && onTap(i)}>{i + 1}{pen && <sup>⚠</sup>}</button>
      ); })}
    </div>
  );
}
function Lucky({ lk, pool, t }) {
  return (
    <div className="lucky">
      <div className="h sm y">🎁 {t("luckyH")}</div>
      <div className="mu">{t("luckyPrize")}</div>
      <div className="mlabel">{t("luckyPool")}</div>
      <div className="chips">{pool.map((x) => <span key={x.id} className={"chip" + (x.id === lk.id ? " win" : "")}>{x.id === lk.id && "🎁 "}{x.team}</span>)}</div>
      <div className="lwin"><small>{t("luckyWin")}</small><h3>{lk.team}</h3><span className="mu">{lk.ign}</span><div className="lm">₹40</div></div>
      {lk.by_team && <p className="mu lnote">{t("luckyBy")}: <b>{lk.by_team}</b></p>}
      <p className="mu lnote">{t("luckyNote")}</p>
    </div>
  );
}
function Podium({ champ, run, third, t, p1 = 950, p2 = 600, p3 = 0 }) {
  return (
    <div className="podium">
      <div className="pd first">
        <div className="pdi">🏆</div>
        <small>{t("champ")}</small>
        <h3>{champ.team}</h3>
        <span className="mu">{champ.ign}</span>
        <div className="mlabel">{t("prizeL")}</div>
        <div className="money">₹{p1}</div>
      </div>
      {run && (
        <div className="pd second">
          <div className="pdi">🥈</div>
          <small>{t("runner")}</small>
          <h3>{run.team}</h3>
          <span className="mu">{run.ign}</span>
          <div className="mlabel">{t("prizeL")}</div>
          <div className="money">₹{p2}</div>
        </div>
      )}
      {third && (
        <div className="pd third">
          <div className="pdi">🥉</div>
          <small>3RD</small>
          <h3>{third.team}</h3>
          <span className="mu">{third.ign}</span>
          <div className="mlabel">{t("prizeL")}</div>
          <div className="money">₹{p3}</div>
        </div>
      )}
    </div>
  );
}
function Bracket({ R, t, isA, pick, pod = true, onRound, pr }) {
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
            const can = isA && m.a && m.b, has = (m.rd || []).some(Boolean), sc = scoreOf(m.rd), edit = can && onRound;
            return (
              <div className="mt" key={i}>
                <Tm x={m.a} t={t} side="a" sc={has ? sc.a : null} win={m.w === 0} lose={m.w === 1} canPick={can} onPick={() => pick(r, i, 0)} />
                <div className="vs" />
                <Tm x={m.b} t={t} side="b" sc={has ? sc.b : null} win={m.w === 1} lose={m.w === 0} canPick={can} onPick={() => pick(r, i, 1)} />
                {(has || edit) && m.a && m.b && <Rounds arr={m.rd} onTap={edit ? (idx) => onRound(r, i, idx) : undefined} />}
                {has && m.a && m.b && <div className="mu wl">{m.a.team}: {t("wonL")} {sc.a} · {t("lostL")} {sc.b} &nbsp;|&nbsp; {m.b.team}: {t("wonL")} {sc.b} · {t("lostL")} {sc.a}</div>}
                {edit && <div className="mu rhint">{t("rdHint")}</div>}
              </div>
            );
          })}
        </div>
      ))}
      {champ && pod && <Podium champ={champ} run={run} t={t} p1={pr ? pr.p1 : 950} p2={pr ? pr.p2 : 600} />}
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
  const PAGES = ["home", "join", "lobby", "mine", "top", "profile", "contact", "faq", "match", "dash", "hist", "rules", "admin"];
  const [page, setPage] = useState(() => { const h = window.location.hash.slice(1); return PAGES.includes(h) ? h : "home"; });
  const [aSel, setASel] = useState(2);
  const [slotSel, setSlotSel] = useState(0);
  const [aSlot, setASlot] = useState(0);
  const [mSlot, setMSlot] = useState(0);
  const pend = useRef(0);
  const [lobTab, setLobTab] = useState("up");
  const [lobMode, setLobMode] = useState("all");
  const [cTab, setCTab] = useState("up");
  const [tTab, setTTab] = useState("full");
  const [ppK, setPpK] = useState(null);
  const [faqO, setFaqO] = useState(0);
  const [noticeTxt, setNoticeTxt] = useState("");
  const [hist, setHist] = useState([]);
  const [openH, setOpenH] = useState(null);
  const go = (p) => { setPage(p); try { window.history.replaceState(null, "", "#" + p); } catch (e) {} window.scrollTo(0, 0); };
  const [gid] = useState(() => {
    const mk = () => "g_" + ((window.crypto && crypto.randomUUID) ? crypto.randomUUID().replace(/-/g, "").slice(0, 16) : Math.random().toString(16).slice(2, 18));
    try { let g = localStorage.getItem("gid"); if (!g) { g = mk(); localStorage.setItem("gid", g); } return g; } catch (e) { return mk(); }
  });
  const [pv, setPv] = useState(() => Math.floor(Math.random() * 100));
  const [aiTxt, setAiTxt] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [priv, setPriv] = useState({});
  const [gkeys, setGkeys] = useState(() => { try { return JSON.parse(localStorage.getItem("gkeys") || "{}"); } catch (e) { return {}; } });
  const saveKey = (id, k) => setGkeys((p) => { const n = { ...p, [id]: k }; try { localStorage.setItem("gkeys", JSON.stringify(n)); } catch (e) {} return n; });
  const rndKey = () => ((window.crypto && crypto.randomUUID) ? crypto.randomUUID().replace(/-/g, "") : Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2) + "0000000000000000");
  const [game, setGameS] = useState(() => { try { return localStorage.getItem("game") || "ff"; } catch (e) { return "ff"; } });
  const BG = { modeCS: "TDM", modeClassic: "Classic", csRulesH: "General Rules", classicRulesH: "Classic Rules", classicH: "Classic Match" };
  const t = (k) => { let v = (T[L] || T.en)[k]; if (game === "bgmi" && typeof v === "string") v = BG[k] || v.replace(/Free Fire|FREE FIRE|फ्री फायर/g, "BGMI"); return v; };
  const dk = (d) => (game === "bgmi" ? "bgmi:" + d : d);
  const sizeLbl = (x) => (game === "bgmi" && x.mode === "classic" ? ["", "Solo", "Duo", "Trio", "Squad"][x.size] : x.size + "v" + x.size);
  const setGame = (g) => { setGameS(g); try { localStorage.setItem("game", g); } catch (e) {} setSel(0); setASel(2); setMSlot(0); };
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
      sb.from("teams").select("*").gte("date", keyOf(-30)),
      sb.from("day_state").select("*").gte("date", t0),
      sb.from("day_state").select("*").not("draw", "is", null).order("date", { ascending: false }).limit(40),
    ]);
    if (!h.error) setHist(h.data);
    if (a.error) setLoginMsg("Error: " + a.error.message); else setRows(a.data);
    const r3 = await sb.from("room_secrets").select("*").gte("date", t0);
    const r4 = await sb.from("team_private").select("*").gte("date", t0);
    if (!r4.error) { const m4 = {}; r4.data.forEach((x) => { m4[x.team_id] = x; }); setPriv(m4); }
    if (!r3.error) { const m3 = {}; r3.data.forEach((x) => { m3[x.date] = x; }); setRooms(m3); }
    if (!b.error) { const m = {}; b.data.forEach((x) => { m[x.date] = x; }); setDayStates(m); }
  }, []);
  useEffect(() => {
    load();
    const ch = sb.channel("live")
      .on("postgres_changes", { event: "*", schema: "public", table: "teams" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "day_state" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "room_secrets" }, load)
      .subscribe();
    const iv = setInterval(load, 20000);
    return () => { sb.removeChannel(ch); clearInterval(iv); };
  }, [load]);

  const tSlots = slotKeys(dk(keyOf(0)), dayStates).filter((k) => stOf(dayStates[k]) === "on");
  const tk = tSlots.length ? tSlots[Math.min(mSlot, tSlots.length - 1)] : dk(keyOf(0));
  const cfgT = cfgOf(dayStates[tk]);
  const tds = dayStates[tk] || {}, tdraw = tds.draw || null, tst = stOf(dayStates[tk]), tcancel = tst === "cancel";
  const ml = tdraw ? matchList(tdraw) : [];
  const nextNo = (ml.find((m) => !(m.w === 0 || m.w === 1) && m.a && m.b) || {}).no;

  /* selected day */
  const days = Array.from({ length: DAYS }, (_, i) => dk(keyOf(i)));
  const aKeys = Array.from({ length: DAYS + 2 }, (_, i) => dk(keyOf(i - 2)));
  const dayKey = page === "admin" ? aKeys[aSel] : days[Math.min(sel, DAYS - 1)];
  const slots = slotKeys(dayKey, dayStates);
  const D = slots[Math.min(page === "admin" ? aSlot : slotSel, slots.length - 1)];
  useEffect(() => { setSlotSel(pend.current || 0); pend.current = 0; setASlot(0); }, [sel, aSel]);
  const ds = dayStates[D] || {};
  const dst = stOf(dayStates[D]);
  const cfg = cfgOf(dayStates[D]);
  const cancelled = dst === "cancel", tbd = dst === "tbd";
  const draw = ds.draw || null;
  const teams = rows.filter((x) => x.date === D).sort((a, b) => (a.at || 0) - (b.at || 0));
  const conf = teams.filter((x) => x.paid);
  const myKey = (user ? user.id : gid) + "_" + D;
  const myTeams = teams.filter((x) => x.id === myKey || x.id.startsWith(myKey + "_"));
  const [editId, setEditId] = useState(null);
  const [rooms, setRooms] = useState({});
  const [rid, setRid] = useState("");
  const [rpw, setRpw] = useState("");
  const [aTab, setATab] = useState("teams");
  const adml = draw ? matchList(draw) : [];
  const full = conf.length >= cfg.max;
  const nowD = new Date(), nowHM = pad(nowD.getHours()) + ":" + pad(nowD.getMinutes());
  const late = !!cfg.regClose && dpart(D) === keyOf(0) && nowHM >= cfg.regClose;
  const closed = full || cancelled || tbd || late;
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
      .replace("{e}", cfg.entry).replace("{k}", (game === "bgmi" ? (cfg.mode === "classic" ? "Classic " : "TDM ") : (cfg.mode === "classic" ? "Bermuda Classic " : "CS Squad ")) + sizeLbl(cfg) + (cfg.map ? " " + cfg.map : "") + (cfg.time ? " · " + f12(cfg.time, loc[L]) : "")).replace("{u}", f.uid.trim() || "-").replace("{m}", f.mob.trim() || "-");
    const url = "https://wa.me/" + OWNER_WA + "?text=" + encodeURIComponent(msg);
    const w = window.open(url, "_blank");
    if (!w) { try { window.location.href = url; } catch (e) {} }
  }

  async function register() {
    const editing = !!editId;
    if (closed && !editing) { say(cancelled ? t("canMsg") : tbd ? t("tbdReg") : late ? t("regClosed") : t("full"), "er"); return; }
    const team = f.team.trim(), ign = f.ign.trim(), uid = f.uid.trim(), mob = f.mob.replace(/\D/g, "");
    if (editing) {
      if (!team || !ign) { say(t("bad"), "er"); sfx.err(); return; }
      const ed = myTeams.find((x) => x.id === editId);
      if (!ed) { setEditId(null); return; }
      const r = user ? await sb.from("teams").update({ team, ign }).eq("id", ed.id) : await sb.rpc("edit_team_guest", { p_id: ed.id, p_key: gkeys[ed.id] || "", p_team: team, p_ign: ign });
      if (r.error) { say(t("err") + r.error.message, "er"); return; }
      say(t("savedOk"), "go"); sfx.ok(); load(); setEditId(null); setF((p) => ({ ...p, team: "", ign: "" })); return;
    }
    if (!team || !ign || !/^\d{6,14}$/.test(uid) || mob.length < 10 || mob.length > 13) { say(t("bad"), "er"); sfx.err(); return; }
    if (myTeams.length >= MAX_PER) { say(t("maxTeams"), "er"); sfx.err(); return; }
    const ek = user ? null : rndKey();
    const r = await sb.rpc("register_team", { p_date: D, p_owner: user ? user.id : gid, p_team: team, p_ign: ign, p_phone: mob, p_uid: uid, p_ekey: ek });
    if (r.error) { const m = r.error.message || ""; say(/already registered/i.test(m) ? t("dupPhone") : /full/i.test(m) ? t("full") : t("err") + m, "er"); sfx.err(); return; }
    const res = r.data || {};
    if (ek && res.id) saveKey(res.id, ek);
    load(); sfx.ok(); setEditId(null); setF((p) => ({ ...p, team: "", ign: "" }));
    if (res.paid) say(t("freeDone"), "go"); else { say(t("ok"), "go"); openWA({ team, ign, date: D }); }
  }

  async function login() {
    const r = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
    if (r.error) setLoginMsg(t("err") + r.error.message);
  }

  /* ---- admin actions ---- */
  async function setPaid(id, paid) {
    let r = await sb.from("teams").update(paid ? { paid, cat: Date.now() } : { paid, cat: null }).eq("id", id);
    if (r.error && /cat/.test(r.error.message)) r = await sb.from("teams").update({ paid }).eq("id", id);
    if (r.error) alert(t("err") + r.error.message); else load();
  }
  async function remove(id) { if (!window.confirm(t("delq"))) return; const r = await sb.from("teams").delete().eq("id", id); if (r.error) alert(t("err") + r.error.message); else load(); }
  async function copyList() {
    const txt = "Redhead eSports - " + dLong + "\n" + conf.map((x, i) => (i + 1) + ". " + x.team + " (" + x.ign + ")").join("\n");
    try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (e) { window.prompt("Copy:", txt); }
  }
  async function saveState(patch, key = D) {
    const cur = dayStates[key] || {};
    const row = { date: key, cancelled: !!cur.cancelled, note: cur.note || "", draw: cur.draw || null, cfg: cur.cfg || null, status: cur.status ? cur.status : (dayStates[key] ? stOf(dayStates[key]) : "on"), ...patch, updated_at: new Date().toISOString() };
    const r = await sb.from("day_state").upsert(row);
    if (r.error) { alert(t("err") + r.error.message); return false; }
    setDayStates((p) => ({ ...p, [key]: row }));
    load(); return true;
  }
  async function doDraw() {
    if (conf.length !== MAX || cancelled) return;
    if (draw && !window.confirm(t("cfmRedraw"))) return;
    const names = conf.map((x) => x.team);
    const seed = shuffle(conf.map((x) => ({ id: x.id, team: x.team, ign: x.ign })));
    await new Promise((res) => { let n = 0; const iv = setInterval(() => { setShuf(shuffle(names)); if (++n >= 22) { clearInterval(iv); res(); } }, 80); });
    setShuf(null);
    if (await saveState({ draw: { seed, w: {}, rd: {}, at: Date.now(), start: (draw && draw.start) || cfg.time || "", gap: (draw && draw.gap) || 20 } })) sfx.ok();
  }
  async function doManual() {
    if (conf.length !== MAX || cancelled) return;
    if (draw && !window.confirm(t("cfmRedraw"))) return;
    await saveState({ draw: { seed: conf.map((x) => ({ id: x.id, team: x.team, ign: x.ign })), w: {}, rd: {}, at: Date.now(), start: (draw && draw.start) || cfg.time || "", gap: (draw && draw.gap) || 20 } });
  }
  async function swapSeed(slot, id) {
    const seed = draw.seed.slice(), j = seed.findIndex((x) => x.id === id);
    if (j < 0 || j === slot) return;
    if (Object.keys(draw.w || {}).length && !window.confirm(t("cfmSwap"))) return;
    const tmp = seed[slot]; seed[slot] = seed[j]; seed[j] = tmp;
    await saveState({ draw: { ...draw, seed, w: {}, rd: {} } });
  }
  async function setRound(r, i, idx) {
    const key = r + "-" + i, rd = { ...(draw.rd || {}) }, arr = (rd[key] && rd[key].length ? rd[key] : Array(9).fill("")).slice();
    const cyc = ["", "a", "b", "A", "B"];
    arr[idx] = cyc[(cyc.indexOf(arr[idx]) + 1) % cyc.length];
    rd[key] = arr;
    const w = { ...(draw.w || {}) }, old = w[key], sc = scoreOf(arr), win = sc.a >= 5 ? 0 : sc.b >= 5 ? 1 : null;
    if (win === null) delete w[key]; else w[key] = win;
    if (old !== w[key]) { let ri = i; for (let rr = r + 1; rr < 3; rr++) { ri = Math.floor(ri / 2); delete w[rr + "-" + ri]; } }
    await saveState({ draw: { ...draw, rd, w } });
  }
  async function runLucky(date, dr) {
    if (!dr || dr.lucky) return;
    const names = dr.seed.map((x) => x.team);
    await new Promise((res) => { let n = 0; const iv = setInterval(() => { setShuf(shuffle(names)); if (++n >= 25) { clearInterval(iv); res(); } }, 80); });
    setShuf(null);
    const r = await sb.rpc("run_lucky_draw", { p_date: date });
    if (r.error) { alert(t("err") + r.error.message); return; }
    sfx.ok(); load();
  }
  async function doLucky() {
    if (!draw || draw.lucky || !R || !(R[2][0].w === 0 || R[2][0].w === 1)) return;
    if (window.confirm(t("cfmLucky"))) await runLucky(D, draw);
  }
  async function resetLucky() { if (window.confirm(t("cfmLuckyReset"))) await saveState({ draw: { ...draw, lucky: null } }); }
  async function saveCfg(patch) {
    const m = { ...((dayStates[D] && dayStates[D].cfg) || {}), ...patch };
    if (m.mode === "classic" && m.max == null) m.max = cfgOf({ date: D, cfg: m }).max;
    await saveState({ cfg: m });
  }
  async function saveRoom(how) {
    const cur = rooms[D]; let at = cur ? cur.reveal_at : null;
    if (how === "now") at = new Date().toISOString(); else if (how === "hide") at = null; else if (how === "time") at = new Date(D + "T" + (cfg.roomTime || cfg.time || "00:00") + ":00").toISOString();
    const r = await sb.from("room_secrets").upsert({ date: D, room_id: rid.trim(), room_pass: rpw.trim(), reveal_at: at });
    if (r.error) alert(t("err") + r.error.message); else load();
  }
  async function assignSeats() { await saveCfg({ seats: {} }); }
  async function setPlace(k, id) { const tm = conf.find((x) => x.id === id), res = { ...(cfg.results || {}) }; if (tm) res[k] = { id: tm.id, team: tm.team, ign: tm.ign }; else delete res[k]; await saveCfg({ results: res }); }
  async function addSlot() {
    const nums = slots.map((k) => (k.includes("~") ? Number(k.split("~")[1]) : 1)), nk = dayKey + "~" + (Math.max(...nums) + 1);
    const base = { mode: cfg.mode, size: cfg.size, entry: cfg.entry, p1: cfg.p1, p2: cfg.p2, p3: cfg.p3, max: cfg.max };
    if (await saveState({ cfg: base, status: "on", cancelled: false }, nk)) setASlot(slots.length);
  }
  async function copyText(txt) { try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (e) { window.prompt("Copy:", txt); } }
  async function askAI() {
    setAiBusy(true);
    const meta = "You are a senior esports poster art director. Rewrite the brief below into ONE vivid, detailed image-generation prompt (110-160 words). Keep every fact and every text line exactly as given (dates, times, prices, handles). Invent a fresh, specific scene, camera angle and lighting each time. Keep the palette dark charcoal gray with red and golden-yellow accents, classy, no heavy glow. Output only the prompt.\n\nBRIEF:\n" + posterPrompt(D, pv + Math.floor(Math.random() * 50));
    try {
      const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 25000);
      const r = await fetch("https://text.pollinations.ai/" + encodeURIComponent(meta) + "?model=openai&seed=" + Math.floor(Math.random() * 1000000), { signal: ctl.signal });
      clearTimeout(to);
      const txt = (await r.text()).trim();
      if (!r.ok || txt.length < 80) throw new Error("bad");
      setAiTxt(txt);
    } catch (e) { setAiTxt(""); setPv((x) => x + 1 + Math.floor(Math.random() * 3)); alert(t("aiFail")); }
    setAiBusy(false);
  }
  async function resetDraw() { if (window.confirm(t("cfmReset"))) await saveState({ draw: null }); }
  async function pick(r, i, side) {
    const w = { ...(draw.w || {}) };
    if (w[r + "-" + i] === side) delete w[r + "-" + i]; else w[r + "-" + i] = side;
    let ri = i;
    for (let rr = r + 1; rr < 3; rr++) { ri = Math.floor(ri / 2); delete w[rr + "-" + ri]; }
    await saveState({ draw: { ...draw, w } });
  }
  async function setStatus(st) {
    if (st === "cancel" && !window.confirm(t("cfmCancel"))) return;
    await saveState({ status: st, cancelled: st === "cancel", note: st === "cancel" ? note.trim() : "" });
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
  useEffect(() => { const r = rooms[D]; setRid(r ? r.room_id || "" : ""); setRpw(r ? r.room_pass || "" : ""); }, [D, rooms[D] && rooms[D].room_id, rooms[D] && rooms[D].room_pass]);
  const atabs = cfg.mode === "classic"
    ? [["teams", "👥", "aTT"], ["setup", "💰", "aTU"], ["room", "🔑", "aTRm"], ["res", "🏆", "aTR"], ["prompt", "📝", "aTP"], ["banners", "🖼", "aTB"], ["notice", "📢", "aTN"], ["day", "⚙", "aTC"]]
    : [["teams", "👥", "aTT"], ["setup", "💰", "aTU"], ["draw", "🎲", "aTD"], ["sched", "📅", "aTS"], ["res", "🏆", "aTR"], ["prompt", "📝", "aTP"], ["banners", "🖼", "aTB"], ["notice", "📢", "aTN"], ["day", "⚙", "aTC"]];
  const atab = atabs.some((x) => x[0] === aTab) ? aTab : "teams";
  const notice = (dayStates["~notice"] && dayStates["~notice"].cfg && dayStates["~notice"].cfg.text) || "";
  useEffect(() => { setNoticeTxt(notice); }, [notice]);
  const gName = game === "bgmi" ? "BGMI" : (L === "hi" ? "फ्री फायर" : "Free Fire");
  const phaseOf = (k) => {
    const x = dayStates[k]; if (!x) return "none";
    const st = stOf(x); if (st === "cancel") return "cancel"; if (st !== "on") return "none";
    const c = cfgOf(x); let fin = false;
    if (c.mode === "classic") fin = !!(c.results && c.results.p1); else if (x.draw) { const f = build(x.draw)[2][0]; fin = f.w === 0 || f.w === 1; }
    if (fin) return "done";
    const at = new Date(dpart(k) + "T" + (c.time || "23:59") + ":00").getTime(), nw = Date.now();
    if (nw < at) return "up";
    return nw - at < 6 * 3600 * 1000 ? "on" : "done";
  };
  const sortK = (a, b) => (dpart(a) + (cfgOf(dayStates[a]).time || "")).localeCompare(dpart(b) + (cfgOf(dayStates[b]).time || ""));
  const gKeys = Object.keys(dayStates).filter((k) => k[0] !== "~" && k.startsWith("bgmi:") === (game === "bgmi"));
  const lobList = gKeys.filter((k) => { const ph = phaseOf(k), ok = lobTab === "on" ? ph === "on" : lobTab === "up" ? ph === "up" : (ph === "done" || ph === "cancel"); return ok && (lobMode === "all" || cfgOf(dayStates[k]).mode === lobMode); }).sort((a, b) => (lobTab === "res" ? sortK(b, a) : sortK(a, b)));
  const joinSlot = (k) => {
    const g = k.startsWith("bgmi:") ? "bgmi" : "ff", base = dpart(k), off = Math.round((dateOf(base) - dateOf(keyOf(0))) / 86400000);
    if (off < 0 || off >= DAYS) { go("hist"); return; }
    const sl = slotKeys((g === "bgmi" ? "bgmi:" : "") + base, dayStates), idx = Math.max(0, sl.indexOf(k));
    if (g !== game) { setGameS(g); try { localStorage.setItem("game", g); } catch (e) {} }
    pend.current = idx; setSel(off); setSlotSel(idx); go("join");
  };
  const openTile = (g, m) => { if (g !== game) { setGameS(g); try { localStorage.setItem("game", g); } catch (e) {} } setLobMode(m); setLobTab("up"); go("lobby"); };
  const matchCard = (k) => {
    const x = dayStates[k], c = cfgOf(x), ph = phaseOf(k), bn = bannerFor(c, game), owner = user ? user.id : gid;
    const cnt = rows.filter((r) => r.date === k && r.paid).length, left = Math.max(0, c.max - cnt);
    const mineT = rows.some((r) => r.date === k && (r.id === owner + "_" + k || r.id.startsWith(owner + "_" + k + "_")));
    const total = c.p1 + c.p2 + (c.mode === "classic" ? c.p3 : 0);
    let win = null; if (ph === "done") { if (c.mode === "classic") win = c.results && c.results.p1; else if (x.draw) { const f = build(x.draw)[2][0]; win = f.w === 0 ? f.a : f.w === 1 ? f.b : null; } }
    const cell = (lb, v) => (<div className="mc-cell"><small>{lb}</small><b>{v}</b></div>);
    return (
      <div className="mcard" key={k}>
        {bn && <img className="mc-img" src={bn} alt="" />}
        <div className="mc-body">
          <div className="mc-head"><img src={logoImg} alt="" /><div><b>{gName} {sizeLbl(c)} · {c.mode === "classic" ? t("modeClassic") : t("modeCS")}</b><small>{dateOf(k).toLocaleDateString(loc[L], { day: "numeric", month: "short" })}{c.time ? " · " + f12(c.time, loc[L]) : ""}</small></div></div>
          <div className="mc-grid">
            <div className="mc-cell" onClick={() => setPpK(ppK === k ? null : k)} style={{ cursor: "pointer" }}><small>{t("mcPrize")} ▾</small><b>₹{total}</b></div>
            {c.perKill > 0 && cell(t("mcKill"), "₹" + c.perKill)}
            {cell(t("mcEntry"), c.entry === 0 ? t("freeW") : "₹" + c.entry)}
            {cell(t("mcType"), sizeLbl(c))}
            {cell(t("mcView"), c.persp || "—")}
            {cell(t("mcMap"), c.map || "—")}
          </div>
          {ppK === k && (<div className="mc-pp"><div className="row"><span>{t("p1")}</span><b className="y">₹{c.p1}</b></div><div className="row"><span>{t("p2")}</span><b className="y">₹{c.p2}</b></div>{c.mode === "classic" && c.p3 > 0 && <div className="row"><span>{t("p3")}</span><b className="y">₹{c.p3}</b></div>}</div>)}
          {ph !== "done" && ph !== "cancel" && (<><div className="mc-bar"><i style={{ width: Math.min(100, cnt / c.max * 100) + "%" }} /></div>
            <div className="mc-foot"><small className="mu">{left > 0 ? t("spotsLeft").replace("{n}", left) : t("spotsFull")} · {cnt}/{c.max}</small>
              {ph === "up" ? (<button className="btn" disabled={mineT || left === 0} onClick={() => joinSlot(k)}>{mineT ? t("joinedB") : t("joinB")}</button>) : (<button className="btn gh" onClick={() => go("match")}>{t("watchB")}</button>)}</div></>)}
          {ph === "cancel" && <div className="mc-foot"><span className="pill" style={{ color: "var(--rd)", borderColor: "var(--rd)" }}>{t("cancelledT")}</span></div>}
          {ph === "done" && (<div className="mc-foot">{win ? <small className="y">🏆 {t("winnerT")}: <b>{win.team}</b></small> : <small />}<button className="btn gh" onClick={() => go("hist")}>{t("histH")}</button></div>)}
        </div>
      </div>
    );
  };
  const myAll = rows.filter((r) => (user ? r.user_id === user.id : r.id.startsWith(gid + "_")));
  const bucket = (k) => { const ph = phaseOf(k); return ph === "on" ? "on" : (ph === "done" || ph === "cancel") ? "done" : "up"; };
  const myList = myAll.filter((r) => bucket(r.date) === cTab).sort((a, b) => sortK(a.date, b.date));
  const topList = (period) => {
    const cut = keyOf(period === "week" ? -7 : period === "month" ? -30 : -9999), agg = {};
    const add = (tm, amt) => { if (!tm || !tm.team) return; const kk = tm.team.trim().toLowerCase(); agg[kk] = agg[kk] || { name: tm.team, wins: 0, amt: 0 }; agg[kk].wins += 1; agg[kk].amt += amt; };
    Object.values(dayStates).forEach((x) => {
      if (!x.date || x.date[0] === "~" || x.date.startsWith("bgmi:") !== (game === "bgmi") || dpart(x.date) < cut) return;
      const c = cfgOf(x);
      if (c.mode !== "classic" && x.draw) { const f = build(x.draw)[2][0]; if (f.w === 0 || f.w === 1) { add(f.w === 0 ? f.a : f.b, c.p1); add(f.w === 0 ? f.b : f.a, c.p2); } }
      if (c.mode === "classic" && c.results) { add(c.results.p1, c.p1); add(c.results.p2, c.p2); if (c.p3 > 0) add(c.results.p3, c.p3); }
    });
    return Object.values(agg).sort((a, b) => b.amt - a.amt).slice(0, 20);
  };
  const dayInfo = (k) => {
    const sts = slotKeys(k, dayStates).map((x) => dayStates[x]).filter(Boolean), onS = sts.filter((x) => stOf(x) === "on");
    let em = "?", mode = null;
    if (onS.length > 1) em = onS.length + "×";
    else if (onS.length === 1) { const c = cfgOf(onS[0]), n = rows.filter((x) => x.date === onS[0].date && x.paid).length; em = n >= c.max ? t("fullTag") : n + "/" + c.max; mode = c.mode; }
    else if (sts.length && sts.every((x) => stOf(x) === "cancel")) em = "✕";
    return { on: onS.length > 0, cx: em === "✕", em: (mode === "classic" ? "🪂 " : "") + em };
  };
  const slotBtn = (k, i, cur, set) => { const c = cfgOf(dayStates[k]), st = stOf(dayStates[k]); return (
    <button key={k} className={"day slotb" + (i === cur ? " on" : "") + (st === "cancel" ? " cx" : "")} onClick={() => set(i)}>
      <small>{c.time ? f12(c.time, loc[L]) : t("tbaT")}</small><b style={{ fontSize: 15 }}>{c.mode === "classic" ? "🪂" : "⚔"} {sizeLbl(c)}</b><em>{st === "on" ? "✓" : st === "cancel" ? "✕" : "?"}</em>
    </button>); };
  const modeRules = (mode, cc) => {
    const R1 = RULES[L] || RULES.en, G = GAME_RULES[L] || GAME_RULES.en, C = CLASSIC_RULES[L] || CLASSIC_RULES.en;
    if (game === "bgmi") {
      const x = [R1[0], R1[1]], cx = cc || {};
      if (cx.map || cx.persp) x.push([t("mapView"), (cx.map || "") + (cx.map && cx.persp ? " · " : "") + (cx.persp || "")]);
      if (mode !== "classic" && cx.kills > 0) x.push([t("winCond"), t("winCondT").replace("{k}", cx.kills)]);
      return x.concat(C);
    }
    return mode === "classic" ? [R1[0], R1[1]].concat(C) : R1.concat(G);
  };
  const posterPrompt = (k, v) => posterPrompt0(k, v).replace(/Bermuda/g, game === "bgmi" ? "Erangel" : "Bermuda");
  const posterPrompt0 = (k, v) => {
    const c = cfgOf(dayStates[k]), tm = c.time ? f12(c.time, "en-IN") : "Time TBA", dt = dateOf(k).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
    const prizes = c.mode === "classic" ? "1st Prize ₹" + c.p1 + ", 2nd Prize ₹" + c.p2 + (c.p3 > 0 ? ", 3rd Prize ₹" + c.p3 : "") : "Winner ₹" + c.p1 + ", Runner-up ₹" + c.p2;
    const st = STYLES[v % STYLES.length], pick = (arr, o) => arr[(v * 7 + o * 3 + k.length) % arr.length];
    return ['Vertical esports poster, 1080x1350 (4:5), for "Red Head eSports" ' + (game === "bgmi" ? "BGMI" : "Free Fire") + ' tournament.',
      "STYLE: " + st.name + " - " + st.look + ".", "COMPOSITION: " + st.layout + ".", "COLORS: " + pick(PALETTES, 1) + ".", "TEXTURE: " + pick(TEXTURES, 2) + ".",
      "TYPOGRAPHY: " + pick(FONTS, 3) + ". All text must be perfectly spelled and easy to read on a phone.", "Use the attached RHX logo (white-haired masked gamer crest) as the brand mark.",
      "TEXT TO INCLUDE (exact):", "- TITLE: " + (game === "bgmi" ? "BGMI" : "FREE FIRE") + " TOURNAMENT", "- MODE: " + (game === "bgmi" ? (c.mode === "classic" ? "Classic (Battle Royale)" : "TDM (Team Deathmatch)") : (c.mode === "classic" ? "Bermuda Classic (Battle Royale)" : "CS Squad (Clash Squad)")) + " " + sizeLbl(c) + (c.map ? " - " + c.map : "") + (c.persp ? " " + c.persp : "") + (c.kills ? " - first to " + c.kills + " kills" : ""),
      "- DATE: " + dt, "- TIME: " + tm, "- TEAMS: " + c.max, "- ENTRY: " + (c.entry > 0 ? "₹" + c.entry + " per team" : "FREE ENTRY (show as a big badge)"), "- PRIZES: " + prizes,
      c.regClose ? "- REGISTRATION CLOSES: " + f12(c.regClose, "en-IN") : "", "- FOOTER: REGISTRATION OPEN - LINK IN BIO - YouTube @rhx_andy - Instagram @rhxesports_",
      "AVOID: " + st.avoid + ", extra or misspelled text, watermarks."].filter(Boolean).join("\n");
  };
  const seatRank = {}; conf.slice().sort((a, b) => (a.cat || a.at || 0) - (b.cat || b.at || 0)).forEach((x, i) => { seatRank[x.id] = i + 1; });
  const classicView = (date) => {
    const dsx = dayStates[date] || {}, c = cfgOf(dsx), tl = rows.filter((x) => x.date === date && x.paid).sort((a, b) => (a.at || 0) - (b.at || 0));
    const seats = c.seats || {}, res = c.results || {}, rm = rooms[date], my = user ? tl.filter((x) => x.user_id === user.id) : [];
    const rank = {}; tl.slice().sort((a, b) => (a.cat || a.at || 0) - (b.cat || b.at || 0)).forEach((x, i) => { rank[x.id] = i + 1; });
    const seatOf = (x) => seats[x.id] || rank[x.id];
    return (
      <>
        <div className="mu" style={{ marginBottom: 10 }}>🕗 {f12(c.roomTime || c.time, loc[L]) || t("tbaT")} · {t("classicSub")}</div>
        {my.length > 0 ? (
          <div className="lucky" style={{ marginTop: 0, marginBottom: 12 }}>
            <div className="h sm y">🔑 {t("roomH")}</div>
            {rm && rm.room_id ? (
              <div className="rmbox"><div><small>{t("roomId")}</small><b>{rm.room_id}</b></div><div><small>{t("roomPw")}</small><b>{rm.room_pass}</b></div></div>
            ) : <div className="mu" style={{ marginTop: 8 }}>{t("roomWait").replace("{t}", f12(c.roomTime || c.time, loc[L]) || t("tbaT"))}</div>}
            {my.map((x) => (<div className="row" key={x.id}><span><b>{x.team}</b></span><span className="pill ok">{t("seatL")} {seatOf(x)}</span></div>))}
          </div>
        ) : (!user && <div className="mu" style={{ marginBottom: 10 }}>{t("roomLogin")}</div>)}
        <div className="rt">{t("seatsH")}</div>
        {tl.length ? tl.slice().sort((a, b) => seatOf(a) - seatOf(b)).map((x) => (<div className="row" key={x.id}><span>{x.team} <span className="mu">{x.ign}</span></span><span className="pill">{"#" + seatOf(x)}</span></div>)) : <div className="mu">{t("none")}</div>}
        {res.p1 && <Podium champ={res.p1} run={res.p2} third={c.p3 > 0 ? res.p3 : null} t={t} p1={c.p1} p2={c.p2} p3={c.p3} />}
      </>
    );
  };
  const finalDoneT = !!(ml[6] && (ml[6].w === 0 || ml[6].w === 1));
  const canDrawT = !!user && (isA || rows.some((x) => x.date === tk && x.paid && x.user_id === user.id));
  const histG = hist.filter((x) => (x.date || "").startsWith("bgmi:") === (game === "bgmi"));
  const done = histG.filter((x) => { const f2 = build(x.draw)[2][0]; return f2.w === 0 || f2.w === 1; });
  const mineRows = rows.filter((x) => x.id.startsWith((user ? user.id : gid) + "_") && x.date.startsWith("bgmi:") === (game === "bgmi")).sort((a, b) => a.date.localeCompare(b.date));

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
        <div className="gsw">{[["ff", "🔥", t("gameFF")], ["bgmi", "🪖", "BGMI"]].map((x) => (<button key={x[0]} className={game === x[0] ? "on" : ""} onClick={() => setGame(x[0])}><span>{x[1]}</span>{x[0] === "ff" ? (L === "hi" ? "फ्री फायर" : "Free Fire") : "BGMI"}</button>))}</div>
        {page === "home" && (
          <>
            <section className="welcome">
              <img src={logoImg} alt="" />
              <div><small>{t("welcome")}</small><b>{user ? (user.name || (user.email || "").split("@")[0]) : t("playerW")}</b></div>
              {!user && <button className="sm" onClick={login}>{t("loginBtn")}</button>}
            </section>
            {notice && <div className="noticebar">📢 {notice}</div>}
            <div className="qa">{[["profile", "👤", "qaProfile"], ["top", "🏆", "qaTop"], ["contact", "🎧", "qaContact"], ["rules", "📜", "qaRules"]].map((x) => (<button key={x[0]} onClick={() => go(x[0])}><span>{x[1]}</span><small>{t(x[2])}</small></button>))}</div>
            <Posters t={t} game={game} />
            <section className="sec"><h2>{t("myContest")}</h2><div className="cthree">{[["up", "cUp"], ["on", "cOn"], ["done", "cDone"]].map((x) => (<button key={x[0]} onClick={() => { setCTab(x[0]); go("mine"); }}><span>🏆</span><small>{t(x[1])}</small></button>))}</div></section>
            <section className="sec"><h2>{t("esGames")}</h2><div className="tiles">{TILES.map((x) => { const img = TILE_IMG["tile-" + x[0] + "-" + x[1]]; return (<button key={x[0] + x[1]} className="tile" onClick={() => openTile(x[0], x[1])}>{img ? <img src={img} alt="" /> : <div className="tile-ph">{x[2]}</div>}<b>{x[3]}</b></button>); })}</div></section>
          </>
        )}
        {page === "lobby" && (
          <>
            <div className="ltabs">{[["on", "cOn"], ["up", "cUp"], ["res", "lobRes"]].map((x) => (<button key={x[0]} className={lobTab === x[0] ? "on" : ""} onClick={() => setLobTab(x[0])}>{t(x[1])}</button>))}</div>
            <div className="chips" style={{ margin: "12px 0" }}>{[["all", "lobAll"], ["classic", "modeClassic"], ["cs", "modeCS"]].map((x) => (<button key={x[0]} className={"chip" + (lobMode === x[0] ? " y" : "")} style={{ cursor: "pointer" }} onClick={() => setLobMode(x[0])}>{t(x[1])}</button>))}</div>
            {lobList.length ? lobList.map(matchCard) : <div className="card mu">{t("noMatches")}</div>}
          </>
        )}
        {page === "mine" && (
          <section className="sec"><h2>{t("myContest")}</h2>
            <div className="ltabs">{[["up", "cUp"], ["on", "cOn"], ["done", "cDone"]].map((x) => (<button key={x[0]} className={cTab === x[0] ? "on" : ""} onClick={() => setCTab(x[0])}>{t(x[1])}</button>))}</div>
            {myList.length ? myList.map((r) => (
              <div className="card" key={r.id} style={{ marginTop: 10 }}>
                <div className="row" style={{ padding: 0 }}><span><b>{r.team}</b> <span className="mu">{r.ign}</span></span><span className={"pill" + (r.paid ? " ok" : "")}>{r.paid ? t("paidS") : t("pendS")}</span></div>
                <div className="mu" style={{ fontSize: 13, marginTop: 4 }}>{r.date.startsWith("bgmi:") ? "BGMI" : "Free Fire"} · {dateOf(r.date).toLocaleDateString(loc[L], { day: "numeric", month: "short" })}{cfgOf(dayStates[r.date]).time ? " · " + f12(cfgOf(dayStates[r.date]).time, loc[L]) : ""}</div>
              </div>
            )) : <div className="card mu" style={{ marginTop: 10 }}>{t("noMine")}</div>}
          </section>
        )}
        {page === "top" && (
          <section className="sec"><h2>{t("topH")}</h2>
            <div className="ltabs">{[["full", "tFull"], ["week", "tWeek"], ["month", "tMonth"]].map((x) => (<button key={x[0]} className={tTab === x[0] ? "on" : ""} onClick={() => setTTab(x[0])}>{t(x[1])}</button>))}</div>
            <div className="card" style={{ marginTop: 10 }}>
              <div className="row mu" style={{ fontSize: 13 }}><span>{t("tPos")}</span><span style={{ flex: 1, marginLeft: 12 }}>{t("tTeam")}</span><span>{t("tWin")}</span></div>
              {topList(tTab).length ? topList(tTab).map((r, i) => (<div className="row" key={r.name}><b style={{ width: 28 }}>{i + 1}</b><span style={{ flex: 1 }}>{r.name} <span className="mu">🏆{r.wins}</span></span><b className="y">₹{r.amt}</b></div>)) : <div className="mu">{t("noTop")}</div>}
            </div>
          </section>
        )}
        {page === "contact" && (
          <section className="sec"><h2>{t("contactH")}</h2><div className="card">
            <div className="mu">{t("owner")}: <b>Rhx Andy</b></div>
            <a className="btn wa" href={"https://wa.me/" + OWNER_WA} target="_blank" rel="noopener noreferrer">{t("ctWa")}</a>
            <a className="btn gh" href="https://www.instagram.com/rhxesports_" target="_blank" rel="noopener noreferrer">{t("ctIg")}</a>
            <a className="btn gh" href="https://youtube.com/@rhx_andy" target="_blank" rel="noopener noreferrer">{t("ctYt")}</a>
            {TELEGRAM_URL && <a className="btn gh" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">{t("ctTg")}</a>}
            {DISCORD_URL && <a className="btn gh" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">{t("ctDc")}</a>}
          </div></section>
        )}
        {page === "profile" && (
          <>
            <section className="welcome" style={{ marginTop: 0 }}>
              <img src={logoImg} alt="" />
              <div><small>{t("profH")}</small><b>{user ? (user.name || (user.email || "").split("@")[0]) : t("playerW")}</b>{user && <small className="mu">{user.email}</small>}</div>
              {!user && <button className="sm" onClick={login}>{t("loginBtn")}</button>}
            </section>
            <div className="g3" style={{ marginTop: 12 }}>
              <div><b>{myAll.length}</b><small>{t("statTeams")}</small></div>
              <div><b>{myAll.filter((r) => r.paid).length}</b><small>{t("statConf")}</small></div>
              <div className="gd"><b>{myAll.filter((r) => bucket(r.date) === "done").length}</b><small>{t("cDone")}</small></div>
            </div>
            <div className="menu">
              {[["mine", "🏆", t("myContest")], ["match", "🎮", t("mToday")], ["hist", "📜", t("nHist")], ["top", "🥇", t("topH")], ["rules", "📘", t("nRules")], ["contact", "🎧", t("contactH")], ["faq", "❓", t("faqH") + " / " + t("aboutH")]].concat(isA ? [["admin", "⚙", t("nAdmin")]] : []).map((x) => (<button key={x[0]} className="menui" onClick={() => go(x[0])}><span>{x[1]}</span>{x[2]}<i>›</i></button>))}
              {user && <button className="menui" onClick={() => sb.auth.signOut()}><span>🚪</span>{t("logout")}<i>›</i></button>}
            </div>
          </>
        )}
        {page === "faq" && (
          <section className="sec"><h2>{t("aboutH")}</h2><div className="card"><p className="mu" style={{ margin: 0 }}>{t("aboutT")}</p></div>
            <h2 style={{ marginTop: 18 }}>{t("faqH")}</h2>
            {(FAQ[L] || FAQ.en).map((q, i) => (<div className="card" key={i} style={{ marginTop: 8, cursor: "pointer" }} onClick={() => setFaqO(faqO === i ? -1 : i)}><b>{q[0]}</b>{faqO === i && <p className="mu" style={{ margin: "8px 0 0" }}>{q[1]}</p>}</div>))}
          </section>
        )}
        {page === "join" && (
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
              const dt = dateOf(k), di = dayInfo(k);
              return (
                <button key={k} className={"day" + (i === sel ? " on" : "") + (di.on ? " hm" : "") + (di.cx ? " cx" : "")} onClick={() => setSel(i)}>
                  <small>{i === 0 ? t("tdy") : dt.toLocaleDateString(loc[L], { weekday: "short" })}</small>
                  <b>{dt.getDate()}</b>
                  <em>{di.em}</em>
                </button>
              );
            })}
          </div>
          {slots.length > 1 && <div className="days">{slots.map((k, i) => slotBtn(k, i, slotSel, setSlotSel))}</div>}
        </section>

        <div key={D} className="slide" onTouchStart={onTS} onTouchEnd={onTE}>
          <section className="sec"><div className="card">
            <div className="g3">
              <div><b>{cfg.max}</b><small>{t("teams")}</small></div>
              <div><b>{cfg.time ? f12(cfg.time, loc[L]) : t("tbaT")}</b><small>{dShort}</small></div>
              <div><b>{Math.max(0, cfg.max - conf.length)}</b><small>{t("left")}</small></div>
            </div>
            <div className="bar"><i style={{ width: Math.min(100, conf.length / cfg.max * 100) + "%" }} /></div>
            <div className="mu" style={{ marginTop: 10 }}>{t("mDay")} <b>{dLong}{cfg.time ? " · " + f12(cfg.time, loc[L]) : ""}</b></div>
            <div className="chips" style={{ marginTop: 10 }}><span className="chip y">{cfg.mode === "classic" ? t("modeClassic") : t("modeCS")}</span><span className="chip">{sizeLbl(cfg)}</span>{cfg.map && <span className="chip">{cfg.map}</span>}{cfg.persp && <span className="chip">{cfg.persp}</span>}</div>
          </div></section>

          {tbd && <div className="bn tb">⏳ {t("tbdH")}<small>{t("tbdMsg")}</small></div>}
          {cancelled && (
            <div className="bn">⚠ {t("canH")}{ds.note && <small>{ds.note}</small>}<small>{t("canMsg")}</small></div>
          )}

          <section className="sec"><h2>{t("regH")}</h2>
            {bannerFor(cfg, game) && <img className="rbanner" src={bannerFor(cfg, game)} alt="" />}
            {cfg.entry > 0 && <div className="rfbox">{t("refundBanner").replace("{n}", cfg.max)}</div>}
            <div className="rulebox">
              <div className="h sm y">📌 {t("rulesPanelH")} · {cfg.mode === "classic" ? t("modeClassic") : t("modeCS")} · {sizeLbl(cfg)}{cfg.map ? " · " + cfg.map : ""}{cfg.persp ? " · " + cfg.persp : ""}{cfg.time ? " · " + f12(cfg.time, loc[L]) : ""}</div>
              {modeRules(cfg.mode, cfg).map((r, i) => (<div className="rr" key={i}><b>{i + 1}.</b> {r[1]}</div>))}
            </div>
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
              {!editId && (<><label>{t("fUid")}</label><input value={f.uid} onChange={set("uid")} inputMode="numeric" maxLength={14} autoComplete="off" />
              <label>{t("fMob")}</label><input value={f.mob} onChange={set("mob")} inputMode="tel" maxLength={15} autoComplete="tel" placeholder="98XXXXXXXX" /></>)}
              <div className="mu" style={{ marginTop: 10 }}>{t("myCnt")}: {myTeams.length}</div>
              <div className="mu" style={{ marginTop: 6, fontSize: 13 }}>{cfg.entry > 0 ? t("reqNote") : t("freeNote")}</div>
              <button className="btn" disabled={closed && !editId} onClick={register}>{editId ? t("upd") : (cfg.entry === 0 ? t("regFree") : t("regBtn"))} · {dShort}</button>
              {editId && <button className="btn gh" onClick={() => { setEditId(null); setF((p) => ({ ...p, team: "", ign: "" })); }}>{t("cancelEdit")}</button>}
              <div className={"msg " + (closed ? "er" : reg.cls)}>{cancelled ? t("canMsg") : tbd ? t("tbdReg") : late ? t("regClosed") : full ? t("full") : reg.txt}</div>
            </div>
          </section>

          {myTeams.length > 0 && (
            <section className="sec"><h2>{cfg.entry > 0 ? t("payH") : t("myTeamsH")}</h2><div className="card">
              {cfg.entry > 0 && <p className="mu" style={{ margin: 0 }}>{t("payTxt").replace("{e}", cfg.entry)}</p>}
              {myTeams.map((x) => (
                <div className="row" key={x.id}>
                  <span><b>{x.team}</b> <span className="mu">{x.ign}</span></span>
                  <span>
                    <span className={"pill" + (x.paid ? " ok" : "")}>{x.paid ? t("paidS") : t("pendS")}</span>
                    {!x.paid && cfg.entry > 0 && <button className="sm" onClick={() => openWA(x)}>WhatsApp</button>}
                    {(user || gkeys[x.id]) && <button className="sm" onClick={() => { setEditId(x.id); setF((p) => ({ ...p, team: x.team, ign: x.ign })); }}>{t("editB")}</button>}
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
          {teams.some((x) => !x.paid) && (
            <section className="sec"><h2>{t("pendH")}</h2><div className="card">
              {teams.filter((x) => !x.paid).map((x, n) => (<div className="row" key={x.id}><span>{n + 1}. <b>{x.team}</b> <span className="mu">{x.ign}</span></span><span className="pill">{t("pendS")}</span></div>))}
            </div></section>
          )}

          {!cancelled && !tbd && cfg.mode === "classic" && (
            <section className="sec"><h2>{t("classicH")}</h2><div className="card">{classicView(D)}</div></section>
          )}
          {!cancelled && !tbd && cfg.mode !== "classic" && (
            <section className="sec"><h2>{t("drawH")}</h2><div className="card">
              {R ? (
                <>
                  <div className="mu" style={{ marginBottom: 4 }}>{t("rndTag")} · {new Date(draw.at).toLocaleTimeString(loc[L], { hour: "2-digit", minute: "2-digit" })}</div>
                  <Bracket R={R} t={t} isA={false} pick={pick} pr={cfg} />
                  {draw.lucky && <Lucky lk={draw.lucky} pool={draw.seed} t={t} />}
                </>
              ) : <div className="mu">{t("drawWait")}</div>}
            </div></section>
          )}

        </div>

          <Posters t={t} game={game} />
        <section className="sec"><h2>{t("prizeH")} · {cfg.mode === "classic" ? t("modeClassic") : t("modeCS")}</h2><div className="card"><div className="g3">
          <div><b>{cfg.entry > 0 ? "₹" + cfg.entry : t("freeL")}</b><small>{t("entry")}</small></div>
          <div className="gd"><b>₹{cfg.p1}</b><small>{t("p1")}</small></div>
          <div className="gd"><b>₹{cfg.p2}</b><small>{t("p2")}</small></div>
          {cfg.mode === "classic" && cfg.p3 > 0 && <div className="gd"><b>₹{cfg.p3}</b><small>{t("p3")}</small></div>}
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
            {tSlots.length > 1 && <div className="days">{tSlots.map((k, i) => slotBtn(k, i, Math.min(mSlot, tSlots.length - 1), setMSlot))}</div>}
            {tcancel && <div className="bn">⚠ {t("canH")}{tds.note && <small>{tds.note}</small>}</div>}
            {tst === "tbd" && <div className="bn tb">⏳ {t("tbdH")}<small>{t("tbdMsg")}</small></div>}
            {tst === "on" && cfgT.mode === "classic" && <div className="card">{classicView(tk)}</div>}
            {tst === "on" && cfgT.mode !== "classic" && (tdraw ? (
              <>
                <div className="mu" style={{ marginBottom: 10 }}>{dateOf(tk).toLocaleDateString(loc[L], { weekday: "long", day: "numeric", month: "long" })} · {t("gapNote")}</div>
                {ml.map((m) => {
                  const done = m.w === 0 || m.w === 1, has = (m.rd || []).some(Boolean), sc = scoreOf(m.rd), st = done ? "stDn" : has ? "stLive" : m.no === nextNo ? "stNext" : "stUp";
                  const nm = (x, src) => (x ? x.team : t("winOf") + " " + t("matchN") + " " + src);
                  return (
                    <div className="mt" key={m.no} style={{ marginBottom: 10 }}>
                      <div className="row" style={{ padding: "8px 12px" }}>
                        <b>{t("matchN")} {m.no} · {t(m.r)}</b>
                        <span><span className="mu">🕗 {fmtTime(tdraw, m.no - 1, loc[L])}</span> <span className={"pill" + (st === "stNext" || st === "stLive" ? " ok" : "")}>{t(st)}</span></span>
                      </div>
                      <div className={"tm" + (m.w === 0 ? " w" : "") + (m.w === 1 ? " l" : "")}><span><i className="dot a" />{nm(m.a, m.sa)}</span><span>{has && <b className="sc">{sc.a}</b>}{m.w === 0 && "🏆"}</span></div>
                      <div className="vs" />
                      <div className={"tm" + (m.w === 1 ? " w" : "") + (m.w === 0 ? " l" : "")}><span><i className="dot b" />{nm(m.b, m.sb)}</span><span>{has && <b className="sc">{sc.b}</b>}{m.w === 1 && "🏆"}</span></div>
                      {has && m.a && m.b && <><Rounds arr={m.rd} /><div className="mu wl">{m.a.team}: {t("wonL")} {sc.a} · {t("lostL")} {sc.b} &nbsp;|&nbsp; {m.b.team}: {t("wonL")} {sc.b} · {t("lostL")} {sc.a}</div></>}
                    </div>
                  );
                })}
                {ml[6] && (ml[6].w === 0 || ml[6].w === 1) && <Podium champ={ml[6].w === 0 ? ml[6].a : ml[6].b} run={ml[6].w === 0 ? ml[6].b : ml[6].a} t={t} p1={cfgT.p1} p2={cfgT.p2} />}
                {finalDoneT && (tdraw.lucky ? <Lucky lk={tdraw.lucky} pool={tdraw.seed} t={t} /> : shuf ? (
                  <div className="shuf"><b>{t("shuf")}</b><div>{shuf.map((n, i) => <span key={i}>{n}</span>)}</div></div>
                ) : (
                  <div className="lucky">
                    <div className="h sm y">🎁 {t("luckyH")}</div>
                    <div className="mu">{t("luckyPrize")}</div>
                    <p className="mu lnote">{t("luckyHow")}</p>
                    {!user ? <button className="btn" onClick={login}>{t("loginBtn")}</button>
                      : canDrawT ? <button className="btn" onClick={() => runLucky(tk, tdraw)}>{t("luckyPlay")}</button>
                      : <div className="mu" style={{ marginTop: 8 }}>{t("luckyElig")}</div>}
                  </div>
                ))}
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
            <div className="gd"><b>₹{done.reduce((a, x) => { const c = cfgOf(dayStates[x.date]); return a + c.p1 + c.p2; }, 0)}</b><small>{t("stPrize")}</small></div>
          </div></div></section>
          <section className="sec"><h2>{t("upH")}</h2><div className="card">
            {days.map((k) => { const di = dayInfo(k); return (
              <div className="row" key={k}><span>{dateOf(k).toLocaleDateString(loc[L], { weekday: "long", day: "numeric", month: "short" })}</span>
                <span className={"pill" + (di.on ? " ok" : "")}>{di.cx ? t("canH") : di.on ? di.em : t("tbdS")}</span></div>); })}
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
            {histG.length ? histG.map((x) => {
              const HR = build(x.draw), fin = HR[2][0], ch = fin.w === 0 ? fin.a : fin.w === 1 ? fin.b : null, ru = fin.w === 0 ? fin.b : fin.w === 1 ? fin.a : null, open = openH === x.date;
              return (
                <div className="card" key={x.date} style={{ marginBottom: 10 }}>
                  <div className="row" style={{ paddingTop: 0 }}><b>{dateOf(x.date).toLocaleDateString(loc[L], { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</b><span className={"pill" + (ch ? " ok" : "")}>{ch ? "✓" : t("inProg")}</span></div>
                  {ch && <Podium champ={ch} run={ru} t={t} p1={cfgOf(dayStates[x.date]).p1} p2={cfgOf(dayStates[x.date]).p2} />}
                  {x.draw.lucky && <Lucky lk={x.draw.lucky} pool={x.draw.seed} t={t} />}
                  <button className="btn gh" onClick={() => setOpenH(open ? null : x.date)}>{open ? t("hide") : t("details")}</button>
                  {open && <Bracket R={HR} t={t} isA={false} pick={pick} pod={false} />}
                </div>);
            }) : <div className="card mu">{t("noHist")}</div>}
          </section>
          </>
        )}
        {page === "rules" && (
          <>
          {game !== "bgmi" ? (<><section className="sec"><h2>{t("csRulesH")}</h2><div className="card">
            {(RULES[L] || RULES.en).map((r, i) => (<div className="rule" key={i}><span className="rn">{i + 1}</span><div><b>{r[0]}</b><p className="mu" style={{ margin: "2px 0 0" }}>{r[1]}</p></div></div>))}
          </div></section>
          <section className="sec"><h2>{t("gameRulesH")}</h2><div className="card">
            {(GAME_RULES[L] || GAME_RULES.en).map((r, i) => (<div className="rule" key={i}><span className="rn">{i + 1}</span><div><b>{r[0]}</b><p className="mu" style={{ margin: "2px 0 0" }}>{r[1]}</p></div></div>))}
          </div></section>
          </>) : (
            <section className="sec"><h2>{t("csRulesH")}</h2><div className="card">
              {(RULES[L] || RULES.en).slice(0, 2).map((r, i) => (<div className="rule" key={i}><span className="rn">{i + 1}</span><div><b>{r[0]}</b><p className="mu" style={{ margin: "2px 0 0" }}>{r[1]}</p></div></div>))}
              <p className="mu" style={{ margin: "10px 0 0", fontSize: 13 }}>{t("bgRulesNote")}</p>
            </div></section>
          )}
          <section className="sec"><h2>{t("classicRulesH")}</h2><div className="card">
            {(CLASSIC_RULES[L] || CLASSIC_RULES.en).map((r, i) => (<div className="rule" key={i}><span className="rn">{i + 1}</span><div><b>{r[0]}</b><p className="mu" style={{ margin: "2px 0 0" }}>{r[1]}</p></div></div>))}
          </div></section>
          </>
        )}
        {page === "admin" && (
          <>
          {isA ? (
            <>
              <section className="sec"><h2>{t("admDays")}</h2><div className="days">
                {aKeys.map((k, i) => { const dt = dateOf(k), di = dayInfo(k); return (
                  <button key={k} className={"day" + (i === aSel ? " on" : "") + (di.on ? " hm" : "") + (di.cx ? " cx" : "")} onClick={() => setASel(i)}>
                    <small>{dt.toLocaleDateString(loc[L], { weekday: "short" })}</small><b>{dt.getDate()}</b><em>{di.em}</em>
                  </button>); })}
              </div>
              <div className="days" style={{ marginTop: 8 }}>{slots.map((k, i) => slotBtn(k, i, aSlot, setASlot))}<button className="day slotb add" onClick={addSlot}><b>+</b><small>{t("slotAdd")}</small></button></div></section>
              <div key={D} className="slide">
                <div className="atabs">
                  {atabs.map((x) => (
                    <button key={x[0]} className={"atab" + (atab === x[0] ? " on" : "")} onClick={() => setATab(x[0])}><span>{x[1]}</span> {t(x[2])}</button>
                  ))}
                </div>
                <section className="sec"><h2>{t("admH")} · {dShort}</h2><div className="card">
                  {atab === "notice" && (
                    <>
                      <label style={{ marginTop: 0 }}>{t("noticeL")}</label>
                      <input value={noticeTxt} onChange={(e) => setNoticeTxt(e.target.value)} maxLength={160} />
                      <button className="btn" onClick={() => saveState({ cfg: { text: noticeTxt.trim() }, status: "on" }, "~notice")}>{t("noticeSave")}</button>
                    </>
                  )}
                  {atab === "banners" && (
                    <>
                      <p className="mu" style={{ marginTop: 0 }}>{t("bannerHint")}</p>
                      <div className="mu" style={{ marginBottom: 8 }}>{t("bannerNeed")}: <b className="y">{bannerKeys(cfg, game)[0]}</b> {BANNERS[bannerKeys(cfg, game)[0]] ? "✅" : "⬜"}</div>
                      {["cs", "classic"].map((m) => [1, 2, 3, 4].map((n) => ["free", "paid"].map((f) => {
                        const nm = (game === "bgmi" ? "bgmi-banner-" : "banner-") + m + "-" + n + "v" + n + "-" + f;
                        return (<div className="row" key={nm} style={nm === bannerKeys(cfg, game)[0] ? { background: "var(--s2)" } : null}><span>{BANNERS[nm] ? "✅" : "⬜"} {nm}</span><button className="sm" onClick={() => copyText(nm)}>{t("copyN")}</button></div>);
                      })))}
                    </>
                  )}
                  {atab === "prompt" && (
                    <>
                      <p className="mu" style={{ marginTop: 0 }}>{t("promptHint")}</p>
                      <div className="mu" style={{ marginBottom: 6 }}>{t("styleL")}: <b className="y">{STYLES[pv % STYLES.length].name}</b></div>
                      <button className="btn gh" style={{ marginTop: 0 }} onClick={() => { setAiTxt(""); setPv((x) => x + 1 + Math.floor(Math.random() * 3)); }}>{t("newStyle")}</button>
                      <button className="btn" disabled={aiBusy} onClick={askAI}>{aiBusy ? t("aiBusy") : t("aiBtn")}</button>
                      <div className="mu" style={{ fontSize: 12 }}>{t("aiNote")}</div>
                      <textarea className="pbox" readOnly value={aiTxt || posterPrompt(D, pv)} />
                      <button className="btn" onClick={() => copyText(aiTxt || posterPrompt(D, pv))}>{copied ? t("copied") : t("copyP")}</button>
                      {slots.length > 1 && (<><textarea className="pbox" readOnly value={slots.map((k) => posterPrompt(k, pv)).join("\n\n")} /><button className="btn gh" onClick={() => copyText(slots.map((k) => posterPrompt(k, pv)).join("\n\n"))}>{t("copyAllP")}</button></>)}
                    </>
                  )}
                  {atab === "setup" && (
                    <>
                      <label style={{ marginTop: 0 }}>{t("modeL")}</label>
                      <div className="opt3">
                        {[["cs", "⚔", "modeCS"], ["classic", "🪂", "modeClassic"]].map((x) => (
                          <button key={x[0]} className={"opt" + (cfg.mode === x[0] ? " on tbd" : "")} onClick={() => saveCfg({ mode: x[0] })}><span>{x[1]}</span><b>{t(x[2])}</b></button>
                        ))}
                      </div>
                      <label>{t("mapL")}</label>
                      <input list="maplist" key={"mp" + D + (cfg.map || "")} defaultValue={cfg.map || ""} placeholder={game === "bgmi" ? (cfg.mode === "classic" ? "Erangel" : "Warehouse") : "Bermuda"} onBlur={(e) => { const v = e.target.value.trim(); if (v !== (cfg.map || "")) saveCfg({ map: v }); }} />
                      <datalist id="maplist">{(game === "bgmi" ? (cfg.mode === "classic" ? ["Erangel", "Miramar", "Sanhok", "Vikendi", "Livik", "Rondo", "Nusa"] : ["Warehouse", "Hangar", "Ruins", "Town", "Library"]) : ["Bermuda", "Purgatory", "Kalahari", "Alpine", "NeXTerra", "Solara"]).map((m) => <option key={m} value={m} />)}</datalist>
                      {game === "bgmi" && cfg.mode === "classic" && (<><label>{t("perspL")}</label><div className="szrow" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>{["TPP", "FPP"].map((p) => <button key={p} className={"opt szb" + (cfg.persp === p ? " on tbd" : "")} onClick={() => saveCfg({ persp: cfg.persp === p ? "" : p })}><b>{p}</b></button>)}</div></>)}
                      {game === "bgmi" && cfg.mode !== "classic" && (<div key={"k" + D + (cfg.kills || "")}><label>{t("killsL")}</label><input type="number" inputMode="numeric" defaultValue={cfg.kills || ""} onBlur={(e) => { const v = Number(e.target.value); if (!isNaN(v) && v >= 0 && v !== (cfg.kills || 0)) saveCfg({ kills: v }); }} /></div>)}
                      <label>{t("tsizeL")}</label>
                      <div className="mu" style={{ fontSize: 12 }}>{game === "bgmi" && cfg.mode === "classic" ? t("sizeNote") : ""}</div>
                      <div className="szrow">{[1, 2, 3, 4].map((n) => <button key={n} className={"opt szb" + (cfg.size === n ? " on tbd" : "")} onClick={() => saveCfg({ size: n })}><b>{sizeLbl({ ...cfg, size: n })}</b></button>)}</div>
                      <label>{t("timeL")}</label>
                      <input type="time" key={"t" + D + (cfg.time || "")} defaultValue={cfg.time || ""} onChange={(e) => e.target.value && saveCfg({ time: e.target.value })} />
                      <label>{t("regCloseL")}</label>
                      <input type="time" key={"r" + D + (cfg.regClose || "")} defaultValue={cfg.regClose || ""} onChange={(e) => e.target.value && saveCfg({ regClose: e.target.value })} />
                      {[["entry", "entryL"], ["p1", "p1L"], ["p2", "p2L"], ["perKill", "perKillL"]].concat(cfg.mode === "classic" ? [["p3", "p3L"], ["max", "maxL"]] : []).map(([k, lb]) => (
                        <div key={k + D + cfg[k]}><label>{t(lb)}</label>
                          <input type="number" inputMode="numeric" defaultValue={cfg[k]} onBlur={(e) => { const v = Number(e.target.value); if (!isNaN(v) && v >= 0 && v !== cfg[k]) saveCfg({ [k]: v }); }} /></div>
                      ))}
                    </>
                  )}
                  {atab === "room" && (
                    <>
                      <label style={{ marginTop: 0 }}>{t("roomTimeL")}</label>
                      <input type="time" key={"m" + D + (cfg.roomTime || "")} defaultValue={cfg.roomTime || cfg.time || ""} onChange={(e) => e.target.value && saveCfg({ roomTime: e.target.value })} />
                      <label>{t("roomIdL")}</label><input value={rid} onChange={(e) => setRid(e.target.value)} maxLength={30} />
                      <label>{t("roomPwL")}</label><input value={rpw} onChange={(e) => setRpw(e.target.value)} maxLength={30} />
                      <button className="btn" onClick={() => saveRoom("time")}>{t("roomSave")}</button>
                      <button className="btn gh" onClick={() => saveRoom("now")}>{t("roomNow")}</button>
                      <button className="btn dg" onClick={() => saveRoom("hide")}>{t("roomHide")}</button>
                      {rooms[D] && <div className="mu" style={{ marginTop: 8 }}>{rooms[D].reveal_at ? "👁 " + new Date(rooms[D].reveal_at).toLocaleString(loc[L]) : "🙈 " + t("roomHidden")}</div>}
                      <label>{t("seatsH")}</label>
                      <button className="btn gh" onClick={assignSeats}>{t("seatsAssign")}</button>
                      {conf.map((x) => (
                        <div className="row" key={x.id + (cfg.seats && cfg.seats[x.id])}><span><b>{x.team}</b></span>
                          <input className="seatin" type="number" inputMode="numeric" defaultValue={(cfg.seats || {})[x.id] || ""} placeholder={String(seatRank[x.id] || "")} onBlur={(e) => { const v = Number(e.target.value); saveCfg({ seats: { ...(cfg.seats || {}), [x.id]: v > 0 ? v : null } }); }} /></div>
                      ))}
                    </>
                  )}
                  {atab === "res" && cfg.mode === "classic" && (
                    <>
                      <label style={{ marginTop: 0 }}>{t("placesH")}</label>
                      {[["p1", "pick1"], ["p2", "pick2"]].concat(cfg.p3 > 0 ? [["p3", "pick3"]] : []).map(([k, lb]) => (
                        <div key={k}><label>{t(lb)}</label>
                          <select value={(cfg.results && cfg.results[k] && cfg.results[k].id) || ""} onChange={(e) => setPlace(k, e.target.value)}><option value="">{t("pickSel")}</option>{conf.map((x) => <option key={x.id} value={x.id}>{x.team}</option>)}</select></div>
                      ))}
                      {cfg.results && cfg.results.p1 && <Podium champ={cfg.results.p1} run={cfg.results.p2} third={cfg.p3 > 0 ? cfg.results.p3 : null} t={t} p1={cfg.p1} p2={cfg.p2} p3={cfg.p3} />}
                    </>
                  )}
                  {atab === "teams" && (
                    <>
                      <div className="g3">
                        <div><b>{teams.length}</b><small>{t("aReg")}</small></div>
                        <div><b>{conf.length}</b><small>{t("aConf")}</small></div>
                        <div className="gd"><b>₹{conf.length * cfg.entry}</b><small>{t("aCol")}</small></div>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        {teams.length ? teams.map((x, i) => (
                          <div className="row" key={x.id}>
                            <span>{i + 1}. <b>{x.team}</b> <span className="mu">{x.ign}</span>{priv[x.id] && <small className="mu" style={{ display: "block" }}>📱 {priv[x.id].phone} · UID {priv[x.id].uid}</small>}</span>
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
                  {atab === "draw" && (
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
                  {atab === "sched" && (draw ? (
                    <>
                      <label style={{ marginTop: 0 }}>{t("startL")}</label>
                      <input type="time" key={"s" + D + (draw.start || "")} defaultValue={draw.start || cfg.time || ""} onChange={(e) => e.target.value && saveState({ draw: { ...draw, start: e.target.value } })} />
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
                  {atab === "res" && cfg.mode !== "classic" && (R ? (
                    <>
                      <Bracket R={R} t={t} isA={true} pick={pick} onRound={setRound} pr={cfg} />
                      <div style={{ marginTop: 16 }}>
                        {shuf ? <div className="shuf"><b>{t("shuf")}</b><div>{shuf.map((n, i) => <span key={i}>{n}</span>)}</div></div>
                          : draw.lucky ? (<><Lucky lk={draw.lucky} pool={draw.seed} t={t} /><button className="btn dg" onClick={resetLucky}>{t("luckyReset")}</button></>)
                          : (<><button className="btn" disabled={!(R[2][0].w === 0 || R[2][0].w === 1)} onClick={doLucky}>{t("luckyBtn")}</button>{!(R[2][0].w === 0 || R[2][0].w === 1) && <div className="mu" style={{ marginTop: 8 }}>{t("luckyNeed")}</div>}</>)}
                      </div>
                    </>
                  ) : <div className="mu">{t("needDraw")}</div>)}
                  {atab === "day" && (
                    <>
                      <label style={{ marginTop: 0 }}>{t("statusH")}</label>
                      <div className="opt3">
                        {[["cancel", "❌", "stCancel"], ["tbd", "⏳", "stTbd"], ["on", "✅", "stOn"]].map((x) => (
                          <button key={x[0]} className={"opt " + x[0] + (dst === x[0] ? " on" : "")} onClick={() => setStatus(x[0])}><span>{x[1]}</span><b>{t(x[2])}</b></button>
                        ))}
                      </div>
                      <label>{t("notePh")}</label>
                      <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={120} placeholder={t("notePh")} />
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
        {[["home", "🏠", "nHome"], ["lobby", "🎮", "nLobby"], ["top", "🏆", "nTop"], ["profile", "👤", "nProf"]].concat(isA ? [["admin", "🛡", "nAdmin"]] : []).map((x) => (
          <button key={x[0]} className={page === x[0] ? "on" : ""} onClick={() => go(x[0])}><span>{x[1]}</span><small>{t(x[2])}</small></button>
        ))}
      </nav>
    </>
  );
}
