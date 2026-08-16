/* =========================================================
   สวดมนต์ทุกวัน — app.js
   ========================================================= */

/* ---------------- DATA ---------------- */
const CATEGORIES = ["ทั้งหมด","ทำวัตรเช้า-เย็น","สวดบูชาพระ","แผ่เมตตา","เสริมดวง","ขอพร","โอกาสพิเศษ"];

const PRAYERS = [
  {
    id:"jinapanjara",
    title:"บทสวดชินบัญชร (ฉบับย่อ)",
    category:"เสริมดวง",
    icon:"assets/lamp.png",
    badge:"แนะนำวันนี้",
    duration:"15 นาที",
    popularity:12345,
    desc:"เสริมดวง เสริมสิริมงคล ป้องกันภัยอันตราย แคล้วคลาดปลอดภัย",
    lines:[
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ (3 จบ)",
      "ชะยาสะนากะตา พุทธา เชตวา มารัง สะวาหะนัง",
      "จะตุสัจจาสะภัง ระสัง เย ปิวิงสุ นะราสะภา",
      "(บทสวดฉบับเต็มมี 15 บท แนะนำสวดตามหนังสือสวดมนต์ฉบับสมบูรณ์)",
      "ขอให้การสวดมนต์บทนี้ เสริมสิริมงคล คุ้มครองภัย",
      "แคล้วคลาดปลอดภัยแด่ท่านและครอบครัวทุกท่านเทอญ สาธุ"
    ]
  },
  {
    id:"metta-self",
    title:"แผ่เมตตาให้ตนเอง",
    category:"แผ่เมตตา",
    icon:"assets/tile2.png",
    duration:"2 นาที",
    popularity:8210,
    desc:"ตั้งจิตให้อภัยและรักตัวเอง ก่อนแผ่เมตตาให้ผู้อื่น",
    lines:[
      "อะหัง สุขิโต โหมิ",
      "(ขอให้ข้าพเจ้ามีความสุข)",
      "อะหัง นิททุกโข โหมิ",
      "(ขอให้ข้าพเจ้าปราศจากความทุกข์)",
      "อะหัง อะเวโร โหมิ",
      "(ขอให้ข้าพเจ้าปราศจากเวร)",
      "อะหัง อัพยาปัชโฌ โหมิ",
      "(ขอให้ข้าพเจ้าปราศจากความเบียดเบียน)",
      "สุขี อัตตานัง ปะริหะรามิ",
      "(ขอให้ข้าพเจ้ารักษาตนให้มีความสุขตลอดไป)"
    ]
  },
  {
    id:"wish",
    title:"คำอธิษฐานขอพร",
    category:"ขอพร",
    icon:"assets/tile3.png",
    duration:"2 นาที",
    popularity:5432,
    desc:"ตั้งจิตอธิษฐานขอพรสิ่งศักดิ์สิทธิ์ให้ชีวิตราบรื่น",
    lines:[
      "ขอตั้งจิตอธิษฐาน ด้วยใจที่สงบและกตัญญู",
      "ขอให้สิ่งศักดิ์สิทธิ์ทั้งหลายในสากลโลก จงเป็นสักขีพยาน",
      "ขอให้ข้าพเจ้าและครอบครัว มีสุขภาพแข็งแรง จิตใจเข้มแข็ง",
      "ขอให้การงานเจริญรุ่งเรือง มีสติปัญญาในการดำเนินชีวิต",
      "ขอให้พบเจอแต่สิ่งดี ๆ แคล้วคลาดจากภยันตรายทั้งปวง สาธุ"
    ]
  },
  {
    id:"popular",
    title:"บทสวดยอดนิยม",
    category:"เสริมดวง",
    icon:"assets/tile4.png",
    duration:"รวมยอดฮิต",
    popularity:9999,
    desc:"รวมบทสวดที่คนสวดมากที่สุดในแอปนี้ ไปดูกันเลย",
    lines:[
      "แตะ “ดูทั้งหมด” ที่หน้าแรก แล้วเลือกหมวด “เสริมดวง” หรือเรียงตามความนิยม",
      "เพื่อดูบทสวดยอดฮิตทั้งหมดของแอปนี้ได้เลยนะคะ 🪷"
    ]
  },
  {
    id:"birthday",
    title:"บทสวดมนต์วันเกิด",
    category:"โอกาสพิเศษ",
    icon:"assets/tile1.png",
    duration:"5 นาที",
    popularity:3210,
    desc:"ตั้งจิตอธิษฐานในวันคล้ายวันเกิด ระลึกถึงบุญคุณและตั้งเป้าหมายใหม่",
    lines:[
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ (3 จบ)",
      "ในวาระวันคล้ายวันเกิดนี้ ข้าพเจ้าขอตั้งจิตระลึกถึงพระคุณบิดามารดาผู้ให้กำเนิด",
      "ขอตั้งปณิธานที่จะทำความดี ละเว้นความชั่ว ทำจิตใจให้ผ่องใส",
      "ขอให้อายุ วรรณะ สุขะ พละ ปฏิภาณ ธนสารสมบัติ จงมีแด่ข้าพเจ้า",
      "ขอให้เจริญยิ่ง ๆ ขึ้นไปในธรรมและในทางโลก สาธุ"
    ]
  },
  {
    id:"itipiso",
    title:"บทพุทธคุณ (อิติปิโส)",
    category:"สวดบูชาพระ",
    icon:"assets/lamp.png",
    duration:"2 นาที",
    popularity:9876,
    desc:"สรรเสริญพระคุณของพระพุทธเจ้า นิยมสวดก่อนทำสมาธิ",
    lines:[
      "อิติปิ โส ภะคะวา",
      "อะระหัง สัมมาสัมพุทโธ",
      "วิชชาจะระณะสัมปันโน สุคะโต โลกะวิทู",
      "อะนุตตะโร ปุริสะทัมมะสาระถิ",
      "สัตถา เทวะมะนุสสานัง พุทโธ ภะคะวาติ"
    ]
  },
  {
    id:"trisarana",
    title:"บทไตรสรณคมน์",
    category:"ทำวัตรเช้า-เย็น",
    icon:"assets/lamp.png",
    duration:"2 นาที",
    popularity:7654,
    desc:"การถึงพระพุทธ พระธรรม พระสงฆ์ เป็นที่พึ่งที่ระลึก",
    lines:[
      "พุทธัง สะระณัง คัจฉามิ",
      "ธัมมัง สะระณัง คัจฉามิ",
      "สังฆัง สะระณัง คัจฉามิ",
      "ทุติยัมปิ พุทธัง สะระณัง คัจฉามิ",
      "ทุติยัมปิ ธัมมัง สะระณัง คัจฉามิ",
      "ทุติยัมปิ สังฆัง สะระณัง คัจฉามิ",
      "ตะติยัมปิ พุทธัง สะระณัง คัจฉามิ",
      "ตะติยัมปิ ธัมมัง สะระณัง คัจฉามิ",
      "ตะติยัมปิ สังฆัง สะระณัง คัจฉามิ"
    ]
  },
  {
    id:"metta-all",
    title:"แผ่เมตตาให้สรรพสัตว์",
    category:"แผ่เมตตา",
    icon:"assets/tile2.png",
    duration:"3 นาที",
    popularity:6543,
    desc:"แผ่ความปรารถนาดีให้สรรพสัตว์ทั้งหลายพ้นทุกข์",
    lines:[
      "สัพเพ สัตตา สัตว์ทั้งหลายที่เป็นเพื่อนทุกข์ เกิด แก่ เจ็บ ตาย ด้วยกันทั้งหมดทั้งสิ้น",
      "จงเป็นสุขเป็นสุขเถิด อย่าได้มีเวรแก่กันและกันเลย",
      "จงเป็นสุขเป็นสุขเถิด อย่าได้เบียดเบียนซึ่งกันและกันเลย",
      "จงเป็นสุขเป็นสุขเถิด อย่าได้มีความทุกข์กายทุกข์ใจเลย",
      "จงมีความสุขกายสุขใจ รักษาตนให้พ้นจากทุกข์ภัยทั้งสิ้นเทอญ"
    ]
  },
  {
    id:"namotassa",
    title:"บทนอบน้อมพระพุทธเจ้า",
    category:"ทำวัตรเช้า-เย็น",
    icon:"assets/lamp.png",
    duration:"1 นาที",
    popularity:4321,
    desc:"บทตั้งจิตนอบน้อม สวดก่อนบทสวดมนต์บทใด ๆ",
    lines:[
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ"
    ]
  }
];

const QUICK_TILES = [
  {icon:"assets/tile1.png",label:"สวดมนต์วันเกิด",id:"birthday"},
  {icon:"assets/tile2.png",label:"แผ่เมตตาให้ตนเอง",id:"metta-self"},
  {icon:"assets/tile3.png",label:"ขอพร สิ่งศักดิ์สิทธิ์",id:"wish"},
  {icon:"assets/tile4.png",label:"บทสวดยอดนิยม",id:"popular"}
];

const QUOTES = [
  {text:"การให้ธรรมะ ชนะการให้ทั้งปวง", by:"พุทธพจน์"},
  {text:"ผู้ให้ย่อมเป็นที่รัก", by:"พุทธสุภาษิต"},
  {text:"จิตที่ฝึกดีแล้ว นำสุขมาให้", by:"พุทธพจน์"},
  {text:"ความไม่ประมาท เป็นทางไม่ตาย", by:"พุทธพจน์"},
  {text:"ทำวันนี้ให้ดีที่สุด ปล่อยวางสิ่งที่ผ่านไป", by:"ธรรมะคำสอน"},
  {text:"สุขอื่นยิ่งกว่าความสงบใจ ไม่มี", by:"พุทธพจน์"},
  {text:"ทำดีได้ดี ทำชั่วได้ชั่ว", by:"สุภาษิตไทย"}
];

const BADGES = [
  {id:"d1", icon:"🌱", label:"เริ่มต้นวันแรก", need:1, type:"total"},
  {id:"d7", icon:"🔥", label:"ต่อเนื่อง 7 วัน", need:7, type:"streak"},
  {id:"d21", icon:"🏵️", label:"ต่อเนื่อง 21 วัน", need:21, type:"streak"},
  {id:"t10", icon:"🪷", label:"สวดครบ 10 ครั้ง", need:10, type:"total"},
  {id:"t50", icon:"✨", label:"สวดครบ 50 ครั้ง", need:50, type:"total"},
  {id:"fav3", icon:"💗", label:"บันทึกโปรด 3 บท", need:3, type:"fav"}
];

const DOW_TH = ["จ","อ","พ","พฤ","ศ","ส","อา"]; // Mon..Sun

/* ---------------- STATE (localStorage) ---------------- */
const STORE_KEY = "suadmon_data_v1";
function loadState(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return { completedDates:[], favorites:[], goal:21, fontSize:"medium", reminderOn:false, reminderTime:"19:00" };
}
function saveState(){ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
let state = loadState();

/* ---------------- HELPERS ---------------- */
function todayStr(d=new Date()){
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,"0"), day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function dowMon0(d){ return (d.getDay()+6)%7; } // Mon=0..Sun=6

function computeStreak(){
  const set = new Set(state.completedDates);
  let count = 0;
  let cur = new Date();
  // if today not done yet, streak still counts from yesterday backward
  if(!set.has(todayStr(cur))){
    cur.setDate(cur.getDate()-1);
  }
  while(set.has(todayStr(cur))){
    count++;
    cur.setDate(cur.getDate()-1);
  }
  return count;
}

function findPrayer(id){ return PRAYERS.find(p=>p.id===id); }

// the quick-tile icon crops (tile1-4.png) have their Thai label baked into
// the bottom of the image, so when reused as a small icon elsewhere we render
// them as a zoomed-in background-image (see .icon-tile in style.css) to crop
// out the label and show just the icon artwork.
function iconClass(path){ return path.includes("tile") ? "icon-tile" : ""; }

/* ---------------- HERO GREETING / QUOTE ---------------- */
function renderHero(){
  const h = new Date().getHours();
  let greet, sub;
  if(h>=5 && h<11){ greet="สวัสดีตอนเช้า"; sub="ขอให้วันนี้เป็นวันที่ดีนะคะ"; }
  else if(h>=11 && h<17){ greet="สวัสดีตอนบ่าย"; sub="พักสักครู่ แล้วมาสวดมนต์กันนะคะ"; }
  else if(h>=17 && h<21){ greet="สวัสดีตอนเย็น"; sub="สวดมนต์ก่อนนอน ใจจะสงบขึ้นนะคะ"; }
  else{ greet="ราตรีสวัสดิ์"; sub="สวดมนต์สักนิด แล้วหลับฝันดีนะคะ"; }
  document.getElementById("greetingText").innerHTML = `${greet} <span class="heart">💗</span>`;
  document.getElementById("greetingSub").innerHTML = `${sub} <span>💛</span>`;

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / 86400000);
  const q = QUOTES[dayOfYear % QUOTES.length];
  document.getElementById("quoteText").textContent = q.text;
  document.getElementById("quoteBy").textContent = `- ${q.by} -`;
}

/* ---------------- HOME: TODAY CAROUSEL ---------------- */
function renderCarousel(){
  const featured = [
    findPrayer("jinapanjara"),
    findPrayer("itipiso"),
    findPrayer("metta-self"),
    findPrayer("wish")
  ];
  const car = document.getElementById("todayCarousel");
  const dots = document.getElementById("todayDots");
  car.innerHTML = featured.map(p=>`
    <div class="today-item">
      <div class="ti-icon-wrap ${iconClass(p.icon)}" style="background-image:url('${p.icon}')"></div>
      <div class="ti-body">
        <div class="ti-title-row">
          <h3>${p.title}</h3>
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        </div>
        <p class="ti-desc">${p.desc}</p>
        <div class="ti-meta">
          <span>🕐 ${p.duration}</span>
          <span>👤 ${p.popularity.toLocaleString()} ครั้ง</span>
        </div>
        <button class="go-btn" data-open="${p.id}">สวดเลย <span class="circle">▶</span></button>
      </div>
    </div>
  `).join("");
  dots.innerHTML = featured.map((_,i)=>`<span class="${i===0?"active":""}"></span>`).join("");

  car.querySelectorAll("[data-open]").forEach(btn=>{
    btn.addEventListener("click", ()=> openReader(btn.dataset.open));
  });

  car.addEventListener("scroll", ()=>{
    const idx = Math.round(car.scrollLeft / car.clientWidth);
    dots.querySelectorAll("span").forEach((d,i)=>d.classList.toggle("active", i===idx));
  });
}

/* ---------------- HOME: QUICK TILES ---------------- */
function renderTiles(){
  const wrap = document.getElementById("quickTiles");
  wrap.innerHTML = QUICK_TILES.map(t=>`
    <button class="tile" data-open="${t.id}" aria-label="${t.label}">
      <img src="${t.icon}" alt="${t.label}">
    </button>
  `).join("");
  wrap.querySelectorAll("[data-open]").forEach(btn=>{
    btn.addEventListener("click", ()=> openReader(btn.dataset.open));
  });
}

/* ---------------- HOME: STREAK ---------------- */
function renderStreak(){
  const streak = computeStreak();
  document.getElementById("streakNum").textContent = streak;
  document.getElementById("goalDays").textContent = state.goal;
  document.getElementById("meritStreak").textContent = streak;

  const cheer = document.getElementById("streakCheer");
  if(streak===0) cheer.textContent = "เริ่มต้นวันนี้เลยนะคะ";
  else if(streak<7) cheer.textContent = "เก่งมากเลยค่ะ! ✨";
  else if(streak<21) cheer.textContent = "สุดยอดไปเลยค่ะ! 🔥";
  else cheer.textContent = "สม่ำเสมอสุด ๆ ค่ะ! 🏵️";

  const week = document.getElementById("streakWeek");
  const now = new Date();
  const monIdx = dowMon0(now);
  const monday = new Date(now); monday.setDate(now.getDate()-monIdx);
  const set = new Set(state.completedDates);

  let html="";
  for(let i=0;i<7;i++){
    const d = new Date(monday); d.setDate(monday.getDate()+i);
    const ds = todayStr(d);
    const isToday = ds===todayStr(now);
    const isFuture = d > now && !isToday;
    const done = set.has(ds);
    let cls = "day-badge";
    let content = "";
    if(done){ cls+=" done"; content="✓"; }
    else if(isFuture){ cls+=" future"; content=""; }
    if(isToday) cls+=" today";
    html += `<div class="day-col"><div class="${cls}">${content}</div><span class="day-label">${DOW_TH[i]}</span></div>`;
  }
  week.innerHTML = html;
}

/* ---------------- PRAYER LIBRARY ---------------- */
let activeCategory = "ทั้งหมด";
let searchTerm = "";

function renderChips(){
  const row = document.getElementById("chipRow");
  row.innerHTML = CATEGORIES.map(c=>`<button class="chip ${c===activeCategory?"active":""}" data-cat="${c}">${c}</button>`).join("");
  row.querySelectorAll("[data-cat]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ activeCategory = btn.dataset.cat; renderChips(); renderPrayerList(); });
  });
}

function renderPrayerList(){
  const list = document.getElementById("prayerList");
  let items = PRAYERS.slice().sort((a,b)=>b.popularity-a.popularity);
  if(activeCategory!=="ทั้งหมด") items = items.filter(p=>p.category===activeCategory);
  if(searchTerm.trim()) items = items.filter(p=>p.title.includes(searchTerm.trim()));

  if(items.length===0){
    list.innerHTML = `<p class="no-results">ไม่พบบทสวดที่ค้นหาค่ะ 🥲</p>`;
    return;
  }
  list.innerHTML = items.map(p=>prayerCardHTML(p)).join("");
  bindPrayerCards(list);
}

function prayerCardHTML(p){
  const isFav = state.favorites.includes(p.id);
  return `
    <button class="prayer-card" data-open="${p.id}">
      <div class="pc-icon-wrap ${iconClass(p.icon)}" style="background-image:url('${p.icon}')"></div>
      <div class="pc-body">
        <h3>${p.title}</h3>
        <div class="pc-meta">
          <span class="pc-tag">${p.category}</span>
          <span class="pc-time">🕐 ${p.duration}</span>
        </div>
      </div>
      <span class="pc-fav" data-fav="${p.id}">${isFav?"❤️":"🤍"}</span>
    </button>
  `;
}

function bindPrayerCards(container){
  container.querySelectorAll("[data-open]").forEach(card=>{
    card.addEventListener("click", (e)=>{
      if(e.target.closest("[data-fav]")) return;
      openReader(card.dataset.open);
    });
  });
  container.querySelectorAll("[data-fav]").forEach(el=>{
    el.addEventListener("click", (e)=>{
      e.stopPropagation();
      toggleFavorite(el.dataset.fav);
    });
  });
}

function toggleFavorite(id){
  const i = state.favorites.indexOf(id);
  if(i>-1) state.favorites.splice(i,1); else state.favorites.push(id);
  saveState();
  renderPrayerList();
  renderFavList();
  renderMeritStats();
  if(currentPrayer && currentPrayer.id===id) updateFavIcon();
}

/* ---------------- MERIT SCREEN ---------------- */
function renderMeritStats(){
  document.getElementById("meritTotal").textContent = state.completedDates.length;
  document.getElementById("meritFav").textContent = state.favorites.length;
}

function renderCalendar(){
  const cal = document.getElementById("calendar");
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  const firstDow = dowMon0(new Date(y,m,1));
  const daysInMonth = new Date(y,m+1,0).getDate();
  const set = new Set(state.completedDates);

  let html = DOW_TH.map(d=>`<div class="cal-dow">${d}</div>`).join("");
  for(let i=0;i<firstDow;i++) html += `<div class="cal-day empty"></div>`;
  for(let day=1; day<=daysInMonth; day++){
    const ds = todayStr(new Date(y,m,day));
    const isToday = ds===todayStr(now);
    const done = set.has(ds);
    html += `<div class="cal-day ${done?"done":""} ${isToday?"today":""}">${day}</div>`;
  }
  cal.innerHTML = html;
}

function renderBadges(){
  const grid = document.getElementById("badgeGrid");
  const streak = computeStreak();
  const total = state.completedDates.length;
  const fav = state.favorites.length;
  grid.innerHTML = BADGES.map(b=>{
    const val = b.type==="streak"?streak : b.type==="fav"?fav : total;
    const unlocked = val>=b.need;
    return `<div class="badge-item ${unlocked?"":"locked"}">
      <span class="b-icon">${b.icon}</span>
      <span class="b-label">${b.label}</span>
    </div>`;
  }).join("");
}

function renderFavList(){
  const list = document.getElementById("favList");
  const empty = document.getElementById("favEmpty");
  const favs = PRAYERS.filter(p=>state.favorites.includes(p.id));
  if(favs.length===0){
    list.innerHTML=""; empty.style.display="block"; return;
  }
  empty.style.display="none";
  list.innerHTML = favs.map(p=>prayerCardHTML(p)).join("");
  bindPrayerCards(list);
}

/* ---------------- READER OVERLAY ---------------- */
let currentPrayer = null;
let readerTimer = null;
let currentLine = 0;
let isPlaying = false;
const LINE_SECONDS = 3.2;

function openReader(id){
  currentPrayer = findPrayer(id);
  if(!currentPrayer) return;
  currentLine = 0;
  isPlaying = false;
  clearInterval(readerTimer);

  document.getElementById("readerCat").textContent = currentPrayer.category;
  document.getElementById("readerTitle").textContent = currentPrayer.title;
  document.getElementById("readerDesc").textContent = currentPrayer.desc || "";
  document.getElementById("readerDuration").textContent = currentPrayer.duration;
  document.getElementById("readerPop").textContent = currentPrayer.popularity.toLocaleString();
  updateFavIcon();
  renderReaderLines();
  updateProgress();
  setPlayIcon(false);

  document.getElementById("readerOverlay").classList.add("open");
}

function closeReader(){
  document.getElementById("readerOverlay").classList.remove("open");
  clearInterval(readerTimer);
  isPlaying = false;
}

function updateFavIcon(){
  const btn = document.getElementById("readerFav");
  btn.textContent = state.favorites.includes(currentPrayer.id) ? "❤️" : "🤍";
}

function renderReaderLines(){
  const wrap = document.getElementById("readerText");
  wrap.innerHTML = currentPrayer.lines.map((l,i)=>{
    let cls = "reader-line";
    if(i<currentLine) cls+=" past";
    if(i===currentLine) cls+=" current";
    return `<p class="${cls}" data-line="${i}">${l}</p>`;
  }).join("");
  const cur = wrap.querySelector(".current");
  if(cur) cur.scrollIntoView({block:"center", behavior:"smooth"});
}

function updateProgress(){
  const pct = currentPrayer.lines.length<=1 ? 100 : Math.round((currentLine/(currentPrayer.lines.length-1))*100);
  document.getElementById("readerProgressBar").style.width = pct+"%";
}

function setPlayIcon(playing){
  document.getElementById("playIcon").style.display = playing?"none":"block";
  document.getElementById("pauseIcon").style.display = playing?"block":"none";
}

function togglePlay(){
  isPlaying = !isPlaying;
  setPlayIcon(isPlaying);
  if(isPlaying){
    playChime(660);
    readerTimer = setInterval(()=>{
      if(currentLine < currentPrayer.lines.length-1){
        currentLine++;
        renderReaderLines();
        updateProgress();
      } else {
        clearInterval(readerTimer);
        isPlaying=false;
        setPlayIcon(false);
        markComplete();
      }
    }, LINE_SECONDS*1000);
  } else {
    clearInterval(readerTimer);
  }
}

function restartReader(){
  currentLine = 0;
  isPlaying = false;
  clearInterval(readerTimer);
  setPlayIcon(false);
  renderReaderLines();
  updateProgress();
}

function markComplete(){
  const ds = todayStr();
  const already = state.completedDates.includes(ds);
  if(!already){
    state.completedDates.push(ds);
    saveState();
  }
  renderStreak();
  renderMeritStats();
  renderCalendar();
  renderBadges();
  playChime(880);
  spawnBurst();
  document.getElementById("completeMsg").textContent = already
    ? `วันนี้สวดครบแล้วอีกรอบ อนุโมทนาบุญด้วยนะคะ 🌸`
    : `สวดครบ “${currentPrayer.title}” แล้ว วันนี้ครบ ${computeStreak()} วันติดต่อกันค่ะ`;
  document.getElementById("completeModal").classList.add("open");
}

/* ---------------- SPARKLE BURST + CHIME ---------------- */
function spawnBurst(){
  const emojis=["✨","🌸","💗","⭐","🪷"];
  const cx = window.innerWidth/2, cy = window.innerHeight/2;
  for(let i=0;i<14;i++){
    const el = document.createElement("span");
    el.className="burst-emoji";
    el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    const angle = Math.random()*Math.PI*2;
    const dist = 80+Math.random()*120;
    el.style.left = cx+"px"; el.style.top = cy+"px";
    el.style.setProperty("--dx", Math.cos(angle)*dist+"px");
    el.style.setProperty("--dy", Math.sin(angle)*dist+"px");
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 1000);
  }
}

let audioCtx;
function playChime(freq){
  try{
    audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type="sine"; o.frequency.value=freq;
    g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime+1.1);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime+1.1);
  }catch(e){}
}

/* ---------------- NAV / SCREENS ---------------- */
function showScreen(name){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("screen-"+name).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(`.nav-item[data-nav="${name}"]`).forEach(b=>b.classList.add("active"));
  window.scrollTo({top:0, behavior:"smooth"});

  if(name==="merit"){ renderMeritStats(); renderCalendar(); renderBadges(); renderFavList(); }
}

/* ---------------- SETTINGS ---------------- */
function initSettings(){
  document.querySelectorAll("#fontSizeOptions button").forEach(btn=>{
    if(btn.dataset.size===state.fontSize) btn.classList.add("active"); else btn.classList.remove("active");
    btn.addEventListener("click", ()=>{
      state.fontSize = btn.dataset.size; saveState();
      document.querySelectorAll("#fontSizeOptions button").forEach(b=>b.classList.toggle("active", b===btn));
      document.body.classList.remove("font-small","font-large");
      if(state.fontSize==="small") document.body.classList.add("font-small");
      if(state.fontSize==="large") document.body.classList.add("font-large");
    });
  });
  document.body.classList.toggle("font-small", state.fontSize==="small");
  document.body.classList.toggle("font-large", state.fontSize==="large");

  document.querySelectorAll("#goalOptions button").forEach(btn=>{
    if(Number(btn.dataset.goal)===state.goal) btn.classList.add("active"); else btn.classList.remove("active");
    btn.addEventListener("click", ()=>{
      state.goal = Number(btn.dataset.goal); saveState();
      document.querySelectorAll("#goalOptions button").forEach(b=>b.classList.toggle("active", b===btn));
      renderStreak();
    });
  });

  const toggle = document.getElementById("reminderToggle");
  const timeInput = document.getElementById("reminderTime");
  toggle.checked = state.reminderOn;
  timeInput.value = state.reminderTime;
  timeInput.disabled = !state.reminderOn;
  toggle.addEventListener("change", ()=>{
    state.reminderOn = toggle.checked; saveState();
    timeInput.disabled = !state.reminderOn;
  });
  timeInput.addEventListener("change", ()=>{ state.reminderTime = timeInput.value; saveState(); });

  document.getElementById("resetBtn").addEventListener("click", ()=>{
    if(confirm("ล้างข้อมูลการสวดมนต์ทั้งหมดใช่ไหมคะ? การกระทำนี้ย้อนกลับไม่ได้")){
      state = { completedDates:[], favorites:[], goal:21, fontSize:"medium", reminderOn:false, reminderTime:"19:00" };
      saveState();
      document.body.classList.remove("font-small","font-large");
      renderAll();
      showScreen("home");
    }
  });
}

/* ---------------- BIND EVENTS ---------------- */
function bindNav(){
  document.querySelectorAll(".nav-item").forEach(btn=>{
    btn.addEventListener("click", ()=> showScreen(btn.dataset.nav));
  });
  document.querySelectorAll("[data-nav]").forEach(el=>{
    if(!el.classList.contains("nav-item")){
      el.addEventListener("click", ()=> showScreen(el.dataset.nav));
    }
  });
}

function bindReaderControls(){
  document.getElementById("readerBack").addEventListener("click", closeReader);
  document.getElementById("readerPlay").addEventListener("click", togglePlay);
  document.getElementById("readerRestart").addEventListener("click", restartReader);
  document.getElementById("readerDone").addEventListener("click", ()=>{
    clearInterval(readerTimer); isPlaying=false; setPlayIcon(false);
    markComplete();
  });
  document.getElementById("readerFav").addEventListener("click", ()=> toggleFavorite(currentPrayer.id));
  document.getElementById("readerOverlay").addEventListener("click", (e)=>{
    if(e.target.id==="readerOverlay") closeReader();
  });
  document.getElementById("completeClose").addEventListener("click", ()=>{
    document.getElementById("completeModal").classList.remove("open");
    closeReader();
  });
}

function bindSearch(){
  document.getElementById("searchInput").addEventListener("input", (e)=>{
    searchTerm = e.target.value;
    renderPrayerList();
  });
}

function bindBell(){
  document.getElementById("bellBtn").addEventListener("click", ()=>{
    showScreen("settings");
  });
}

/* ---------------- INIT ---------------- */
function renderAll(){
  renderHero();
  renderCarousel();
  renderTiles();
  renderStreak();
  renderChips();
  renderPrayerList();
  renderMeritStats();
  renderCalendar();
  renderBadges();
  renderFavList();
}

document.addEventListener("DOMContentLoaded", ()=>{
  renderAll();
  bindNav();
  bindReaderControls();
  bindSearch();
  bindBell();
  initSettings();
});
