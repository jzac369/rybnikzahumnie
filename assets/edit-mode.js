// Režim úprav priamo na stránke. Aktivuje sa automaticky, keď je admin prihlásený.
import {
  auth, db, doc, setDoc, addDoc, deleteDoc, collection, getDocs, query, orderBy,
  onAuthStateChanged, signOut
} from "./firebase-init.js";
import { SEED_DATA } from "./seed-data.js";

let quillLoaded = false;
function loadQuill() {
  return new Promise((resolve) => {
    if (window.Quill) { quillLoaded = true; return resolve(); }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
    script.onload = () => { quillLoaded = true; resolve(); };
    document.head.appendChild(script);
  });
}

function injectStyles() {
  const css = `
  .cms-admin-bar{ position:sticky; top:0; z-index:200; background:#4A3526; color:#F3ECD9; font-family:'Work Sans',sans-serif;
    padding:10px 18px; display:flex; justify-content:space-between; align-items:center; font-size:.85rem; }
  .cms-admin-bar button{ background:#2F6B6B; color:#fff; border:none; padding:6px 14px; border-radius:6px; cursor:pointer; font-size:.8rem; font-weight:600;}
  .cms-edit-bar{ margin-bottom:6px; }
  .cms-edit-btn{ background:#2F6B6B; color:#fff; border:none; padding:4px 10px; border-radius:5px; font-size:.75rem; cursor:pointer; font-weight:600; opacity:.85;}
  .cms-edit-btn:hover{ opacity:1; }
  .cms-editing{ outline:2px dashed #2F6B6B; outline-offset:6px; border-radius:8px; padding:8px; }
  .cms-save-cancel{ margin-top:10px; display:flex; gap:8px; }
  .cms-save-btn{ background:#2F6B6B; color:#fff; border:none; padding:7px 16px; border-radius:6px; font-size:.82rem; font-weight:600; cursor:pointer;}
  .cms-cancel-btn{ background:#E3D9B8; color:#4A3526; border:none; padding:7px 16px; border-radius:6px; font-size:.82rem; font-weight:600; cursor:pointer;}
  .cms-toast{ position:fixed; bottom:24px; right:24px; background:#2F6B6B; color:#fff; padding:12px 20px; border-radius:8px; font-family:'Work Sans',sans-serif; font-size:.88rem; z-index:300; box-shadow:0 8px 20px rgba(0,0,0,.2);}
  .cms-event-admin-row{ display:flex; gap:8px; margin-bottom:10px; }
  .cms-event-admin-row input{ padding:6px 8px; border:1px solid #CFC09A; border-radius:5px; font-size:.85rem; }
  .cms-event-delete{ background:#a3372f; color:#fff; border:none; padding:4px 10px; border-radius:5px; font-size:.72rem; cursor:pointer; margin-left:10px;}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'cms-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function attachEditButton(el, pageId, field, type) {
  if (el.previousElementSibling && el.previousElementSibling.classList && el.previousElementSibling.classList.contains('cms-edit-bar')) {
    el.previousElementSibling.remove();
  }
  const bar = document.createElement('div');
  bar.className = 'cms-edit-bar';
  const btn = document.createElement('button');
  btn.className = 'cms-edit-btn';
  btn.textContent = '✏️ Upraviť';
  btn.addEventListener('click', () => {
    bar.remove();
    if (type === 'simple') editSimpleField(el, pageId, field);
    else editRichField(el, pageId, field);
  });
  bar.appendChild(btn);
  el.parentNode.insertBefore(bar, el);
}

async function editRichField(el, pageId, field) {
  await loadQuill();
  const original = el.innerHTML;
  el.classList.add('cms-editing');
  el.innerHTML = '<div class="cms-quill-mount"></div>';
  const mount = el.querySelector('.cms-quill-mount');
  const quill = new Quill(mount, {
    theme: 'snow',
    modules: { toolbar: [[{ header: [3, false] }], ['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']] }
  });
  quill.clipboard.dangerouslyPasteHTML(original);

  const controls = document.createElement('div');
  controls.className = 'cms-save-cancel';
  controls.innerHTML = `<button class="cms-save-btn">Uložiť zmeny</button><button class="cms-cancel-btn">Zrušiť</button>`;
  el.appendChild(controls);

  controls.querySelector('.cms-save-btn').addEventListener('click', async () => {
    const html = quill.root.innerHTML;
    await setDoc(doc(db, "pages", pageId), { [field]: html }, { merge: true });
    el.classList.remove('cms-editing');
    el.innerHTML = html;
    attachEditButton(el, pageId, field, 'rich');
    toast('Uložené ✓ Zmena je už živá na stránke.');
  });
  controls.querySelector('.cms-cancel-btn').addEventListener('click', () => {
    el.classList.remove('cms-editing');
    el.innerHTML = original;
    attachEditButton(el, pageId, field, 'rich');
  });
}

function editSimpleField(el, pageId, field) {
  const original = el.innerHTML;
  const currentText = el.textContent.trim();
  el.classList.add('cms-editing');
  el.innerHTML = '';
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.style = 'font-family:inherit; font-size:inherit; font-weight:inherit; padding:6px 10px; border:1.5px solid #2F6B6B; border-radius:6px; width:100%; max-width:420px;';
  el.appendChild(input);
  const controls = document.createElement('span');
  controls.style = 'margin-left:10px; display:inline-flex; gap:6px; vertical-align:middle;';
  controls.innerHTML = `<button class="cms-save-btn" style="padding:6px 12px;">Uložiť</button><button class="cms-cancel-btn" style="padding:6px 12px;">Zrušiť</button>`;
  el.appendChild(controls);
  input.focus();

  controls.querySelector('.cms-save-btn').addEventListener('click', async () => {
    const val = input.value;
    await setDoc(doc(db, "pages", pageId), { [field]: val }, { merge: true });
    el.classList.remove('cms-editing');
    el.innerHTML = val;
    attachEditButton(el, pageId, field, 'simple');
    toast('Uložené ✓');
  });
  controls.querySelector('.cms-cancel-btn').addEventListener('click', () => {
    el.classList.remove('cms-editing');
    el.innerHTML = original;
    attachEditButton(el, pageId, field, 'simple');
  });
}

function enableTextEditing() {
  document.querySelectorAll('[data-cms]').forEach(el => {
    const pageId = document.body.dataset.page;
    const field = el.dataset.cms;
    const type = el.dataset.cmsType === 'simple' ? 'simple' : 'rich';
    if (!pageId || !field) return;
    attachEditButton(el, pageId, field, type);
  });
}

// ---------- Inline events management on udalosti.html ----------
function dateToParts(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return { day: d, month: m, year: y };
}

async function enableEventsAdmin() {
  const list = document.getElementById('events-list');
  if (!list) return;
  await loadQuill();

  const patchWrap = document.createElement('div');
  patchWrap.style.marginBottom = '18px';
  patchWrap.innerHTML = `<button class="cms-cancel-btn" id="ev-patch-btn">⤓ Doplniť plné texty k existujúcim ukážkovým udalostiam</button> <span id="ev-patch-status" style="font-size:.82rem; color:var(--ink); margin-left:10px;"></span>`;
  list.parentNode.insertBefore(patchWrap, list);
  patchWrap.querySelector('#ev-patch-btn').addEventListener('click', async () => {
    const statusEl = document.getElementById('ev-patch-status');
    statusEl.textContent = 'Pracujem...';
    const snap = await getDocs(collection(db, "events"));
    let matched = 0, skipped = 0;
    for (const docSnap of snap.docs) {
      const existing = docSnap.data();
      if (existing.body) { skipped++; continue; }
      const seedMatch = SEED_DATA.events.find(se => se.title === existing.title);
      if (seedMatch) {
        await setDoc(doc(db, "events", docSnap.id), { body: seedMatch.body }, { merge: true });
        matched++;
      }
    }
    statusEl.textContent = `Hotovo — doplnených ${matched}, preskočených (už mali text) ${skipped}.`;
    render();
  });

  const wrap = document.createElement('div');
  wrap.style.marginBottom = '24px';
  wrap.innerHTML = `
    <div class="cms-event-admin-row">
      <input type="date" id="ev-date" style="flex:0 0 160px;">
      <input type="text" placeholder="Názov udalosti" id="ev-title" style="flex:1;">
    </div>
    <div class="cms-event-admin-row">
      <input type="text" placeholder="Krátky popis (zobrazí sa v zozname)" id="ev-excerpt" style="flex:1;">
    </div>
    <div style="margin-bottom:10px;">
      <div style="font-size:.8rem; color:var(--ink); margin-bottom:4px;">Plný text (nepovinné, zobrazí sa po rozkliknutí "Čítať viac")</div>
      <div id="ev-body-editor"></div>
    </div>
    <button class="cms-save-btn" id="ev-add-btn">+ Pridať udalosť</button>`;
  list.parentNode.insertBefore(wrap, list);
  const bodyEditor = makeEditor('ev-body-editor');

  async function render() {
    const q = query(collection(db, "events"), orderBy("sortDate", "desc"));
    const snap = await getDocs(q);
    list.innerHTML = '';
    snap.forEach(d => renderEventRow(d.id, d.data()));
  }

  function renderEventRow(id, e) {
    const row = document.createElement('div');
    row.className = 'feature-card';
    row.style = 'margin-bottom:16px;';
    row.innerHTML = `
      <div style="display:flex; gap:22px; align-items:flex-start; justify-content:space-between;">
        <div style="display:flex; gap:22px;">
          <div class="mono" style="text-align:center; min-width:64px; background:var(--ink-deep); color:#fff; border-radius:10px; padding:10px 6px;">
            <div style="font-size:1.4rem; font-weight:700; line-height:1;">${e.day || ''}</div>
            <div style="font-size:.72rem; letter-spacing:1px; opacity:.8;">${e.month || ''}/${e.year || ''}</div>
          </div>
          <div>
            <h3 style="font-size:1.08rem; margin-bottom:6px;">${e.title || ''}</h3>
            <p style="font-size:.92rem; color:var(--ink);">${e.excerpt || ''}</p>
            ${e.body ? `<details style="margin-top:8px;"><summary style="cursor:pointer; color:var(--water-deep); font-size:.85rem;">Čítať viac</summary><div style="margin-top:10px; font-size:.92rem;">${e.body}</div></details>` : ''}
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-shrink:0;">
          <button class="cms-edit-btn">✏️ Upraviť</button>
          <button class="cms-event-delete">Zmazať</button>
        </div>
      </div>`;
    row.querySelector('.cms-event-delete').addEventListener('click', async () => {
      if (confirm('Naozaj zmazať túto udalosť?')) { await deleteDoc(doc(db, "events", id)); render(); }
    });
    row.querySelector('.cms-edit-btn').addEventListener('click', () => openEventEditForm(row, id, e));
    list.appendChild(row);
  }

  function openEventEditForm(row, id, e) {
    const sortDate = e.sortDate || '';
    row.innerHTML = `
      <div class="cms-event-admin-row">
        <input type="date" class="edit-date" value="${sortDate}" style="flex:0 0 160px;">
        <input type="text" class="edit-title" value="${(e.title||'').replace(/"/g,'&quot;')}" style="flex:1;">
      </div>
      <div class="cms-event-admin-row">
        <input type="text" class="edit-excerpt" value="${(e.excerpt||'').replace(/"/g,'&quot;')}" style="flex:1;">
      </div>
      <div class="edit-body-mount" style="margin-bottom:10px;"></div>
      <div class="cms-save-cancel">
        <button class="cms-save-btn">Uložiť</button>
        <button class="cms-cancel-btn">Zrušiť</button>
      </div>`;
    const editQuill = makeEditor(row.querySelector('.edit-body-mount').id || (row.querySelector('.edit-body-mount').id = 'mount-' + id));
    editQuill.clipboard.dangerouslyPasteHTML(e.body || '');
    row.querySelector('.cms-save-btn').addEventListener('click', async () => {
      const dateVal = row.querySelector('.edit-date').value;
      const parts = dateVal ? dateToParts(dateVal) : { day: e.day, month: e.month, year: e.year };
      const updated = {
        title: row.querySelector('.edit-title').value.trim(),
        excerpt: row.querySelector('.edit-excerpt').value.trim(),
        body: editQuill.root.innerHTML,
        sortDate: dateVal || sortDate,
        day: parts.day, month: parts.month, year: parts.year,
      };
      await setDoc(doc(db, "events", id), updated, { merge: true });
      toast('Udalosť uložená ✓');
      render();
    });
    row.querySelector('.cms-cancel-btn').addEventListener('click', render);
  }

  wrap.querySelector('#ev-add-btn').addEventListener('click', async () => {
    const dateVal = document.getElementById('ev-date').value;
    const title = document.getElementById('ev-title').value.trim();
    const excerpt = document.getElementById('ev-excerpt').value.trim();
    const body = bodyEditor.root.innerHTML;
    if (!title || !dateVal) { alert('Vyplň aspoň dátum a názov udalosti.'); return; }
    const parts = dateToParts(dateVal);
    await addDoc(collection(db, "events"), { ...parts, title, excerpt, body, sortDate: dateVal });
    document.getElementById('ev-date').value = '';
    document.getElementById('ev-title').value = '';
    document.getElementById('ev-excerpt').value = '';
    bodyEditor.setContents([]);
    render();
    toast('Udalosť pridaná ✓ — zobrazuje sa podľa dátumu udalosti.');
  });

  render();
}

function enableAdminMode(user) {
  injectStyles();

  const bar = document.createElement('div');
  bar.className = 'cms-admin-bar';
  bar.innerHTML = `<span>🔧 Režim úprav — prihlásený ako <b>${user.email}</b>. Klikni na ✏️ pri texte, ktorý chceš zmeniť.</span>`;
  const logoutBtn = document.createElement('button');
  logoutBtn.textContent = 'Odhlásiť sa';
  logoutBtn.addEventListener('click', () => signOut(auth).then(() => location.reload()));
  bar.appendChild(logoutBtn);
  document.body.prepend(bar);

  enableTextEditing();
  enableEventsAdmin();
}

onAuthStateChanged(auth, user => {
  if (user) enableAdminMode(user);
});
