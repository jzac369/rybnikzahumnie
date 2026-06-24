// Pôvodný obsah zo starej stránky rybnikzahumnie.sk – slúži na jednorazové naplnenie databázy.
export const SEED_DATA = {
  pages: {
    home: {
      heroLead: "Sme správcom vodnej plochy Záhumnie v obci Veľké Orvište. Ponúkame športový rybolov nielen členom, ale aj širokej verejnosti — bez rozdielu veku a pohlavia. Príďte si oddýchnuť a zachytiť svoj úlovok.",
      vitajte: `<p>Rybárske združenie je správcom vodnej plochy Záhumnie v obci Veľké Orvište. Jedná sa o občianske združenie, ktoré si založilo pár priateľov športového rybolovu v obci a na základe povolenia podnikania v zvláštnom režime začalo v roku 2009 svoju činnosť.</p>
<p>RZ Záhumnie ponúka možnosť športového rybolovu nielen svojim členom, ale aj širokej verejnosti, bez rozdielu veku a pohlavia. O našich aktivitách svedčí aj viacero akcií organizovaných počas roka.</p>
<p>Vôbec nám nevadí, že nie ste registrovaným rybárom. Príďte si aktívne oddýchnuť počas roka a spríjemnite si čas pohodovou rybačkou na našom rybníku podľa našich vlastných pravidiel.</p>
<p class="signoff">Tešíme sa na Vašu návštevu.<br>Členovia RZ Záhumnie.</p>`,
      project: `<p>Trnavský samosprávny kraj sa svojou činnosťou ako partner verejného sektora angažuje aj na poli podpory samosprávy a občianskych združení formou dotačných výziev.</p>
<p>Naše občianske združenie, ktoré funguje už 15 rokov, je zamerané na ochranu životného prostredia a obnovu genofondu rýb. Na podporu zmiernenia klimatických zmien sme požiadali o podporu pre projekt „Zveľadenie oddychovo-relaxačného areálu rybník Záhumnie Veľké Orvište“.</p>
<p>Pre rozvoj tejto lokality sme uspeli s výzvou na zakúpenie kosačky na úpravu trávnatých plôch a brehov rybníka. Celý projekt sa podarilo zrealizovať v júli 2024 a kosačka od tej doby slúži na revitalizáciu a údržbu okolia rybníka.</p>`,
    },
    kontakt: {
      address: "Hlavná 17, 922 01 Veľké Orvište",
      phone1: "0907 780 912",
      phone2: "0903 947 768",
      email: "info@rybnikzahumnie.sk",
    },
    rybolov: {
      content: `<div class="pull-card" style="margin-bottom:30px;">
  <table style="width:100%; border-collapse:collapse;">
    <tr><td style="padding:8px 0; font-weight:600;">Vavrinec Peter</td><td class="mono" style="text-align:right;">0911 064 413</td></tr>
    <tr><td style="padding:8px 0; font-weight:600;">Palkech Marek</td><td class="mono" style="text-align:right;">0944 643 111</td></tr>
    <tr><td style="padding:8px 0; font-weight:600;">Michel Norbert</td><td class="mono" style="text-align:right;">0907 780 912</td></tr>
    <tr><td style="padding:8px 0; font-weight:600;">Králik Miroslav</td><td class="mono" style="text-align:right;">0902 106 080</td></tr>
    <tr><td style="padding:8px 0; font-weight:600;">Email</td><td class="mono" style="text-align:right;">info@rybnikzahumnie.sk</td></tr>
  </table>
</div>
<p style="margin-bottom:20px;">Naše rybárske združenie má k dispozícii dva druhy povolení:</p>
<div class="feature-grid" style="grid-template-columns:1fr 1fr; margin-bottom:30px;">
  <div class="feature-card">
    <span class="num">A · denný lístok</span>
    <h3>14 € / deň</h3>
    <ul style="font-size:.92rem; color:var(--ink); padding-left:18px; margin-top:10px;">
      <li>rybolov je obmedzený len na jeden deň</li>
      <li>loviaci si môže privlastniť jeden kus ušľachtilej ryby</li>
      <li>po ulovení ryby lov končí</li>
      <li>loviaci sa musí riadiť rybárskym poriadkom</li>
      <li>povolenie sa vracia bezodkladne po skončení lovu</li>
    </ul>
  </div>
  <div class="feature-card">
    <span class="num">B · ročný lístok</span>
    <h3>100 € / rok</h3>
    <ul style="font-size:.92rem; color:var(--ink); padding-left:18px; margin-top:10px;">
      <li>rybolov je časovo neobmedzený do konca kalendárneho roka</li>
      <li>loviaci si môže privlastniť desať kusov ušľachtilej ryby</li>
      <li>povolenie sa odovzdáva do 15. januára nasledujúceho roka</li>
      <li>po vyčerpaní limitu možnosť zakúpiť nové povolenie</li>
    </ul>
  </div>
</div>
<p>V prípade záujmu získania bližších informácií môžete kontaktovať ktoréhokoľvek <a href="zoznam-clenov.html" style="color:var(--water-deep); text-decoration:underline;">člena výboru združenia</a>.</p>
<p>V prípade záujmu zapožičania rybárskeho náčinia, kliknite <a href="servis.html" style="color:var(--water-deep); text-decoration:underline;">sem</a>.</p>`,
    },
    servis: {
      content: `<div class="pull-card">
  <p>V prípade záujmu Vám naše združenie vie zapožičať vybavenie pre rybolov.</p>
  <p>Vzhľadom na Vašu 100% spokojnosť na zverejnení tejto služby zatiaľ pracujeme.</p>
  <p>Do tejto doby Vám viac informácií poskytne pán <b>Králik Miroslav</b> na telefónnom čísle <span class="mono">00421 902 10 60 80</span>.</p>
  <p class="signoff">Za pochopenie ďakujeme.</p>
</div>`,
    },
    gdpr: {
      content: `<div class="pull-card">
  <p style="font-size:.95rem;">Pretekár, ktorý sa zúčastní na podujatí, ktoré organizuje RZ Záhumnie vo Veľkom Orvišti, ako dotknutá osoba, v zmysle zákona č. 18/2018 Z. z. o ochrane osobných údajov a v zmysle Nariadenia Európskeho parlamentu a Rady (EÚ) 2016/679, zaplatením štartovného a svojou registráciou súhlasí, aby jeho osobné údaje v rozsahu meno, priezvisko a bydlisko boli organizátorom použité a zverejnené v štartovej a výsledkovej listine pretekárov a zároveň súhlasí so zverejnením obrazového záznamu (foto+video) vyhotoveného počas pretekov.</p>
</div>`,
    },
    "zoznam-clenov": {
      content: `<div class="pull-card" style="margin-bottom:30px; overflow-x:auto;">
  <table style="width:100%; border-collapse:collapse;">
    <thead><tr style="border-bottom:1px solid var(--sand-line); font-size:.78rem; text-transform:uppercase; letter-spacing:1px; color:var(--water-deep);">
      <td style="padding-bottom:10px;">Č.</td><td style="padding-bottom:10px;">Meno</td><td style="padding-bottom:10px;">Funkcia</td><td style="padding-bottom:10px; text-align:right;">Telefón</td>
    </tr></thead>
    <tbody>
      <tr><td class="mono" style="padding:10px 0; color:var(--water-deep);">1</td><td style="padding:10px 0; font-weight:600;">Vavrinec Peter</td><td style="padding:10px 0;">Predseda združenia</td><td class="mono" style="padding:10px 0; text-align:right;">0911 064 413</td></tr>
      <tr><td class="mono" style="padding:10px 0; color:var(--water-deep);">2</td><td style="padding:10px 0; font-weight:600;">Palkech Marek</td><td style="padding:10px 0;">Podpredseda združenia</td><td class="mono" style="padding:10px 0; text-align:right;">0944 643 111</td></tr>
      <tr><td class="mono" style="padding:10px 0; color:var(--water-deep);">3</td><td style="padding:10px 0; font-weight:600;">Michel Norbert</td><td style="padding:10px 0;">Tajomník združenia</td><td class="mono" style="padding:10px 0; text-align:right;">0907 780 912</td></tr>
      <tr><td class="mono" style="padding:10px 0; color:var(--water-deep);">4</td><td style="padding:10px 0; font-weight:600;">Chrastek Ján</td><td style="padding:10px 0;">Pokladník združenia</td><td class="mono" style="padding:10px 0; text-align:right;"></td></tr>
      <tr><td class="mono" style="padding:10px 0; color:var(--water-deep);">5</td><td style="padding:10px 0; font-weight:600;">Bolješik Ján</td><td style="padding:10px 0;">Sekretár</td><td class="mono" style="padding:10px 0; text-align:right;"></td></tr>
      <tr><td class="mono" style="padding:10px 0; color:var(--water-deep);">6</td><td style="padding:10px 0; font-weight:600;">Králik Miroslav</td><td style="padding:10px 0;">Predseda RK</td><td class="mono" style="padding:10px 0; text-align:right;">0902 106 080</td></tr>
      <tr><td class="mono" style="padding:10px 0; color:var(--water-deep);">7</td><td style="padding:10px 0; font-weight:600;">Pánik Emil</td><td style="padding:10px 0;">Člen RK</td><td class="mono" style="padding:10px 0; text-align:right;"></td></tr>
      <tr><td class="mono" style="padding:10px 0; color:var(--water-deep);">8</td><td style="padding:10px 0; font-weight:600;">Mokoš Stanislav</td><td style="padding:10px 0;">Člen RK</td><td class="mono" style="padding:10px 0; text-align:right;"></td></tr>
    </tbody>
  </table>
</div>
<h3 style="margin-bottom:16px; font-size:1.1rem;">Ostatní členovia</h3>
<div>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">9. Belica Igor</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">10. Bejdák Ondrej ml.</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">11. Bejdák Ondrej st.</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">12. Hulvan Miloš</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">13. Kovačik Jozef st.</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">14. Kovačik Jozef ml.</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">15. Melicher Ivan</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">16. Mokoš Ján</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">17. Mokoš Peter</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">18. Moravčík Peter</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">19. Polák Milan</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">20. Summer Antón</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">21. Tešedík Milan</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">22. Toman Peter</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">23. Vavrinec Marián</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">24. Vavrinec Matej</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">25. Majerčík Miloš</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">26. Potoček Ján</span>
  <span style="display:inline-block; background:var(--sand); border-radius:20px; padding:7px 16px; margin:0 6px 10px 0; font-size:.88rem;">27. Strečanský Peter</span>
</div>
<p style="margin-top:20px; font-size:.92rem;"><b>Vavrinec Michal</b> — kandidát</p>`,
    },
    stanovy: {
      content: `<div class="pull-card" style="margin-bottom:24px;">
  <h4>Úvodné ustanovenie</h4>
  <p>Rybárske združenie Záhumnie – Veľké Orvište je združenie občanov založené v súlade so Zákonom č. 83/90 Zb. o združovaní občanov. Združuje občanov Veľkého Orvišťa a ich priateľov, ktorých spája spoločný záujem o zachovanie a ochranu genofondu rýb, využívanie rybárskeho práva, ochranu prírody a životného prostredia.</p>
</div>
<div class="pull-card" style="margin-bottom:24px;">
  <h4>Názov, sídlo a územná pôsobnosť</h4>
  <p>Názov organizácie: <b>Rybárske združenie Záhumnie – Veľké Orvište</b><br>Sídlo zväzu: Hlavná 17, 922 01 Veľké Orvište, okr. Piešťany<br>Pôsobnosť zväzu sa vzťahuje na katastrálne územie Veľkého Orvišťa.</p>
</div>
<div class="pull-card" style="margin-bottom:24px;">
  <h4>Členstvo a orgány združenia</h4>
  <p>Členstvo je dobrovoľné, od 18 rokov veku. Orgány: Členská schôdza (najvyšší orgán), Výkonný výbor (predseda, podpredseda, tajomník, sekretár, finančný hospodár), Revízna komisia (traja členovia).</p>
</div>
<div class="pull-card">
  <h4>Hospodárenie a zánik</h4>
  <p>Združenie hospodári s vlastným majetkom z členských príspevkov, povolení na rybolov a darov. O zániku rozhoduje členská schôdza trojpätinovou väčšinou.</p>
</div>`,
    },
    poriadok: {
      content: `<div class="pull-card" style="margin-bottom:24px;">
  <h4>Článok 1 — Všeobecné zásady</h4>
  <p style="font-size:.93rem;">Každý, kto loví ryby, musí mať pri sebe povolenie. Loviť sa smie max. na dve udice (do 3 m od seba). Denný limit: 2 ks ušľachtilých rýb (max 7 kg), alebo 4 ks lososovitých, alebo 3 kg bielej ryby. Kapor nad 65 cm sa vracia späť. Sumec sa musí vždy privlastniť. Stanovené miery: kapor 45–65 cm, zubáč 50 cm, šťuka 60 cm, pstruh 25 cm, amur 70 cm.</p>
</div>
<div class="pull-card" style="margin-bottom:24px;">
  <h4>Článok 2 — Denné doby lovu</h4>
  <p style="font-size:.93rem;">Letná sezóna 04:00–24:00, zimné mesiace 07:00–20:00. Júl–september: lov cez víkend nepretržite od piatku 4:00 do nedele 24:00. Deti a juniori majú samostatný harmonogram, do 15 rokov vždy s dozorom.</p>
</div>
<div class="pull-card">
  <h4>Článok 3 a 4 — Zákazy a všeobecné ustanovenia</h4>
  <p style="font-size:.93rem;">Zakázané sú výbušniny, elektrický prúd, siete, lov v noci so svetlom a iné nešportové spôsoby lovu. Návštevníci sú povinní udržovať poriadok, oheň len na vyhradených miestach, vozidlá mimo vyhradených plôch zakázané.</p>
</div>`,
    },
  },

  events: [
    { day:"14", month:"04", year:"2026", title:"Zoznam Pretekárov Orvišťský šupináč 25. apríl 2026", excerpt:"Zoznam prihlásených pretekárov na jarné kaprové preteky.", sortDate:"2026-04-14" },
    { day:"21", month:"02", year:"2026", title:"Propozície pretekov v love kapra XIV. ročník Orvištský šupináč", excerpt:"Pravidlá a podmienky účasti na jarných kaprových pretekoch.", sortDate:"2026-02-21" },
    { day:"04", month:"01", year:"2026", title:"RZ Záhumnie poriada preteky Jarný pstruh XVI. ročník", excerpt:"Dva samostatné preteky v love pstruhov na prívlač, 21. a 22. marca 2026.", sortDate:"2026-01-04" },
    { day:"15", month:"10", year:"2025", title:"Mikulášsky blyskáč mix dvojíc III. ročník", excerpt:"Preteky pre zmiešané dvojice, 29. novembra 2025 na rybníku Záhumnie.", sortDate:"2025-10-15" },
    { day:"10", month:"07", year:"2025", title:"Orvišťský blyskáč XV. ročník", excerpt:"Dva samostatné preteky v love pstruhov na prívlač, 25. a 26. októbra 2025.", sortDate:"2025-07-10" },
    { day:"10", month:"01", year:"2025", title:"A život ide ďalej", excerpt:"Po jarných pretekoch si mohli členovia aj verejnosť dopriať rybačku v príjemnom prostredí rybníka.", sortDate:"2025-01-10" },
    { day:"13", month:"08", year:"2024", title:"Orviťský blyskáč XIV. ročník", excerpt:"Preteky v love pstruhov na prívlač, 26. a 27. októbra 2024.", sortDate:"2024-08-13" },
    { day:"09", month:"06", year:"2024", title:"Už 15 rokov sme tu s vami", excerpt:"Ohliadnutie za 20 prihlásenými dvojicami na pretekoch v love pstruha.", sortDate:"2024-06-09" },
    { day:"24", month:"04", year:"2024", title:"Orvištský šupináč XII. ročník", excerpt:"Zoznam pretekárov kaprových pretekov, 27. apríla 2024.", sortDate:"2024-04-24" },
    { day:"18", month:"11", year:"2023", title:"Činorodé leto a jeseň na Záhumní", excerpt:"Po kvalitnej jarnej násade si členovia vychutnali rybačku na rybníku.", sortDate:"2023-11-18" },
  ],

  catches: [
    { name:"Peter Toman", date:"17. 6. 2017", bait:"lahôdková kukurica", species:"Kapor", size:"87 cm", weight:"cca 13 kg", createdAt: Date.now() },
    { name:"Ivan Madunický", date:"29. 7. 2017", bait:"boiles oliheň", species:"Kapor", size:"87 cm", weight:"11.9 kg", createdAt: Date.now()-1 },
    { name:"Matej Vavrinec", date:"14. 5. 2017", bait:"banánová kukurica", species:"Kapor", size:"86 cm", weight:"", createdAt: Date.now()-2 },
    { name:"Andrej Lužák", date:"12. 7. 2017", bait:"Wonder boils Mivardi", species:"Kapor", size:"84 cm", weight:"", createdAt: Date.now()-3 },
    { name:"Ivan Madunický", date:"19. 6. 2017", bait:"vyvážená nástraha", species:"Kapor", size:"82 cm", weight:"", createdAt: Date.now()-4 },
    { name:"Marek Palkech", date:"7. 5. 2017", bait:"banánová kukurica", species:"Kapor", size:"77 cm", weight:"", createdAt: Date.now()-5 },
    { name:"Ondrej Bejdák", date:"25. 6. 2017", bait:"halibut boila", species:"Kapor", size:"76 cm", weight:"cca 12 kg", createdAt: Date.now()-6 },
    { name:"Norbert Michel", date:"26. 4. 2017", bait:"lahôdková kukurica na záves", species:"Kapor", size:"71 cm", weight:"", createdAt: Date.now()-7 },
  ],
};
