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

async function loadAlbums() {
  const list = document.getElementById("albums-list");
  if (!list) return;
  const overlay = document.getElementById("lightbox-overlay");
  if (overlay && !overlay.dataset.closeBound) {
    overlay.dataset.closeBound = "1";
    overlay.addEventListener("click", () => overlay.style.display = "none");
    const img = document.getElementById("lightbox-img");
    if (img) img.addEventListener("click", (e) => e.stopPropagation());
  }
  try {
    const q = query(collection(db, "albums"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    list.innerHTML = "";
    if (snap.empty) {
      list.innerHTML = `<p style="color:var(--ink); font-style:italic;">Galéria je zatiaľ prázdna. Fotky čoskoro doplníme.</p>`;
      return;
    }
    snap.forEach(docSnap => {
      const album = docSnap.data();
      const photos = album.photos || [];
      const cover = photos[0]?.url || "";
      const card = document.createElement("div");
      card.className = "feature-card album-card";
      card.style.cursor = "pointer";
      card.innerHTML = `
        ${cover ? `<img src="${cover}" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; margin-bottom:10px;">` : ""}
        <span class="num">${album.year || ""} · ${photos.length} fotiek</span>
        <h3 style="font-size:1.05rem;">${album.title || ""}</h3>
        <div class="album-photos" style="display:none; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:12px;"></div>
      `;
      const photosGrid = card.querySelector(".album-photos");
      photos.forEach((p, idx) => {
        photosGrid.insertAdjacentHTML("beforeend", `<img src="${p.url}" style="width:100%; aspect-ratio:1; object-fit:cover; border-radius:6px; cursor:zoom-in;" class="album-photo-thumb" data-idx="${idx}">`);
      });
      card.addEventListener("click", (e) => {
        if (e.target.classList.contains("album-photo-thumb")) {
          const idx = parseInt(e.target.dataset.idx, 10);
          openLightbox(photos, idx);
          return;
        }
        const isOpen = photosGrid.style.display === "grid";
        photosGrid.style.display = isOpen ? "none" : "grid";
      });
      list.appendChild(card);
    });
  } catch (e) {
    console.warn("Galériu sa nepodarilo načítať.", e);
  }
}

let lightboxPhotos = [];
let lightboxIndex = 0;

function showLightboxImage() {
  const img = document.getElementById("lightbox-img");
  if (!img || !lightboxPhotos.length) return;
  img.src = lightboxPhotos[lightboxIndex].url;
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  if (prevBtn) prevBtn.style.visibility = lightboxIndex > 0 ? "visible" : "hidden";
  if (nextBtn) nextBtn.style.visibility = lightboxIndex < lightboxPhotos.length - 1 ? "visible" : "hidden";
}

function openLightbox(photos, index) {
  const overlay = document.getElementById("lightbox-overlay");
  if (!overlay) return;
  lightboxPhotos = photos;
  lightboxIndex = index;
  ensureLightboxControls(overlay);
  showLightboxImage();
  overlay.style.display = "flex";
}

function ensureLightboxControls(overlay) {
  if (document.getElementById("lightbox-prev")) return;
  const navStyle = "position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,.15); color:#fff; border:none; width:52px; height:52px; border-radius:50%; font-size:1.6rem; cursor:pointer; z-index:10;";
  const prevBtn = document.createElement("button");
  prevBtn.id = "lightbox-prev";
  prevBtn.innerHTML = "‹";
  prevBtn.style = navStyle + "left:18px;";
  prevBtn.addEventListener("click", (e) => { e.stopPropagation(); if (lightboxIndex > 0) { lightboxIndex--; showLightboxImage(); } });

  const nextBtn = document.createElement("button");
  nextBtn.id = "lightbox-next";
  nextBtn.innerHTML = "›";
  nextBtn.style = navStyle + "right:18px;";
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); if (lightboxIndex < lightboxPhotos.length - 1) { lightboxIndex++; showLightboxImage(); } });

  overlay.appendChild(prevBtn);
  overlay.appendChild(nextBtn);

  document.addEventListener("keydown", (e) => {
    if (overlay.style.display !== "flex") return;
    if (e.key === "ArrowLeft" && lightboxIndex > 0) { lightboxIndex--; showLightboxImage(); }
    if (e.key === "ArrowRight" && lightboxIndex < lightboxPhotos.length - 1) { lightboxIndex++; showLightboxImage(); }
    if (e.key === "Escape") overlay.style.display = "none";
  });
}

loadPageBlocks();
loadAlbums();
loadEvents();
loadCatches();
loadMembers();
