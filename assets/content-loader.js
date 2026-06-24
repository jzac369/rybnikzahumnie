// Načíta obsah z Firestore a nahradí statický text živými dátami z admin systému.
// Ak Firestore ešte nemá dáta (alebo nastane chyba), stránka ticho ostane pri pôvodnom statickom texte.
import { db, doc, getDoc, collection, getDocs, query, orderBy } from "./firebase-init.js";

async function loadPageBlocks() {
  const blocks = document.querySelectorAll("[data-cms]");
  if (!blocks.length) return;
  const pageId = document.body.dataset.page;
  if (!pageId) return;
  try {
    const snap = await getDoc(doc(db, "pages", pageId));
    if (!snap.exists()) return;
    const data = snap.data();
    blocks.forEach(el => {
      const field = el.dataset.cms;
      if (data[field] !== undefined && data[field] !== "") {
        el.innerHTML = data[field];
      }
    });
  } catch (e) {
    console.warn("CMS obsah sa nepodarilo načítať, zobrazuje sa pôvodný text.", e);
  }
}

async function loadEvents() {
  const list = document.getElementById("events-list");
  if (!list) return;
  try {
    const q = query(collection(db, "events"), orderBy("sortDate", "desc"));
    const snap = await getDocs(q);
    if (snap.empty) return;
    list.innerHTML = "";
    snap.forEach(docSnap => {
      const e = docSnap.data();
      const moreHtml = e.body
        ? `<details style="margin-top:8px;"><summary style="cursor:pointer; color:var(--water-deep); font-size:.85rem;">Čítať viac</summary><div style="margin-top:10px; font-size:.92rem;">${e.body}</div></details>`
        : "";
      list.insertAdjacentHTML("beforeend", `
        <div class="feature-card" style="display:flex; gap:22px; align-items:flex-start; margin-bottom:16px;">
          <div class="mono" style="text-align:center; min-width:64px; background:var(--ink-deep); color:#fff; border-radius:10px; padding:10px 6px;">
            <div style="font-size:1.4rem; font-weight:700; line-height:1;">${e.day || ""}</div>
            <div style="font-size:.72rem; letter-spacing:1px; opacity:.8;">${e.month || ""}/${e.year || ""}</div>
          </div>
          <div>
            <h3 style="font-size:1.08rem; margin-bottom:6px;">${e.title || ""}</h3>
            <p style="font-size:.92rem; color:var(--ink);">${e.excerpt || ""}</p>
            ${moreHtml}
          </div>
        </div>`);
    });
  } catch (e) {
    console.warn("Udalosti sa nepodarilo načítať z databázy.", e);
  }
}

async function loadCatches() {
  const list = document.getElementById("catches-list");
  if (!list) return;
  try {
    const q = query(collection(db, "catches"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    if (snap.empty) return;
    list.innerHTML = "";
    snap.forEach(docSnap => {
      const c = docSnap.data();
      list.insertAdjacentHTML("beforeend", `
        <div class="feature-card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
          <div>
            <h3 style="font-size:1.02rem; margin-bottom:4px;">${c.name || ""}</h3>
            <p style="font-size:.85rem; color:var(--ink);">${c.date || ""} · nástraha: ${c.bait || ""}</p>
          </div>
          <div class="mono" style="display:flex; gap:18px; text-align:right;">
            <div><div style="font-size:.7rem; color:var(--water-deep); text-transform:uppercase;">Druh</div><b>${c.species || ""}</b></div>
            <div><div style="font-size:.7rem; color:var(--water-deep); text-transform:uppercase;">Veľkosť</div><b>${c.size || ""}</b></div>
            <div><div style="font-size:.7rem; color:var(--water-deep); text-transform:uppercase;">Hmotnosť</div><b>${c.weight || ""}</b></div>
          </div>
        </div>`);
    });
  } catch (e) {
    console.warn("Úlovky sa nepodarilo načítať z databázy.", e);
  }
}

async function loadMembers() {
  const list = document.getElementById("members-list");
  if (!list) return;
  try {
    const q = query(collection(db, "members"), orderBy("number", "asc"));
    const snap = await getDocs(q);
    if (snap.empty) return;
    list.innerHTML = "";
    snap.forEach(docSnap => {
      const m = docSnap.data();
      list.insertAdjacentHTML("beforeend",
        `<span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">${m.number || ""}. ${m.name || ""}${m.role ? " — " + m.role : ""}</span>`);
    });
  } catch (e) {
    console.warn("Zoznam členov sa nepodarilo načítať z databázy.", e);
  }
}

loadPageBlocks();
loadEvents();
loadCatches();
loadMembers();
