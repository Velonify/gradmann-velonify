/* GRADMANN 1864 – gemeinsame Shop-Logik: Header, Suche, Warenkorb, Wunschliste, Footer */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const P = G64.products;
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  G64.$ = $; G64.$$ = $$; G64.store = store;
  document.documentElement.classList.remove('no-js');

  /* ---------- Icons ---------- */
  const IC = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    heart: '<path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 3.800 4.500 7 4.500c2 0 3.500 1 5 3 1.500-2 3-3 5-3 3.200 0 5.400 3.100 4.200 6.600-1.700 4.800-9.200 9.400-9.200 9.400Z"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6.500a3 3 0 0 1 6 0V8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.500-6.500 8-6.500s8 2.500 8 6.500"/>',
    pin: '<path d="M12 21s7-6.200 7-11.500a7 7 0 1 0-14 0C5 14.800 12 21 12 21Z"/><circle cx="12" cy="9.500" r="2.500"/>',
    menu: '<path d="M4 8h16M4 16h16"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    left: '<path d="m15 6-6 6 6 6"/>', right: '<path d="m9 6 6 6-6 6"/>',
    truck: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="7" cy="17.500" r="1.800"/><circle cx="17" cy="17.500" r="1.800"/>',
    gift: '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v8h14v-8M12 8v12M12 8c-3 0-4.500-1-4.500-2.500S9 3 10.500 4 12 8 12 8Zm0 0c3 0 4.500-1 4.500-2.500S15 3 13.500 4 12 8 12 8Z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5Z"/>',
    store: '<path d="M4 9.500 5.500 4h13L20 9.500M4 9.500c0 1.700 1.300 2.500 2.700 2.500S9.300 11.200 9.300 9.500c0 1.700 1.300 2.500 2.700 2.500s2.700-.8 2.700-2.500c0 1.700 1.300 2.500 2.700 2.500s2.600-.8 2.600-2.500M5.500 12v8h13v-8"/>',
    star: '<path d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9L12 3Z"/>',
    check: '<path d="m5 12.500 4.500 4.500L19 7.500"/>',
    drop: '<path d="M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11Z"/>',
    sparkle: '<path d="M12 3v4m0 10v4M3 12h4m10 0h4m-15-6 2.500 2.500M15.500 15.500 18 18M18 6l-2.500 2.500M8.500 15.500 6 18"/>'
  };
  const ic = (n, c = '') => `<svg class="icon ${c}" viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
  G64.ic = ic;

  /* ---------- Karte ---------- */
  const BADGE = { neu: ['Neu', 'ink'], limitiert: ['Limitiert', 'ink'], duftwochen: ['−15 %', 'sale'] };
  G64.card = (p, i = 0) => {
    const b = p.badge ? `<span class="badge ${BADGE[p.badge][1]}">${BADGE[p.badge][0]}</span>` : '';
    const set = p.set && p.badge !== 'neu' ? '<span class="badge">Set</span>' : '';
    const wished = G64.wishes().includes(p.id);
    return `<article class="pc" style="--i:${i}" data-id="${p.id}">
      <a class="pc-media" href="${G64.href(p)}" tabindex="-1" aria-hidden="true">
        <span class="badges">${b}${set}</span>
        <img src="${p.img}" alt="" loading="lazy" width="400" height="400">
      </a>
      <button class="wish" data-wish="${p.id}" aria-pressed="${wished}" aria-label="${p.brand} ${p.name} merken">${ic('heart')}</button>
      <div class="qa"><button class="btn" data-add="${p.id}">${ic('bag')}In den Warenkorb</button></div>
      <div class="pc-body">
        <span class="pc-brand">${p.brand}</span>
        <a class="pc-name" href="${G64.href(p)}">${p.name}${p.type && p.type !== 'Set' ? ` <span style="font-weight:400;color:var(--ink-3)">${p.type}</span>` : ''}</a>
        <span class="pc-meta">${p.size === 'Set' ? 'Geschenkset' : p.size}</span>
        <div class="pc-price">${p.from ? '<small>ab</small>' : ''}<span class="${p.uvp ? 'off' : ''}">${G64.fmt(p.price)}</span>${p.uvp ? `<s>${G64.fmt(p.uvp)}</s>` : ''}</div>
        ${p.per ? `<span class="pc-per">${p.per}</span>` : ''}
      </div></article>`;
  };

  /* ---------- Wunschliste ---------- */
  G64.wishes = () => store.get('g64wish', []);
  function syncWishUI() {
    const w = G64.wishes();
    $$('[data-wish]').forEach(b => b.setAttribute('aria-pressed', w.includes(b.dataset.wish)));
    const c = $('#wishCount'); if (c) { c.textContent = w.length; c.classList.toggle('on', w.length > 0); c.parentNode.setAttribute('aria-label', `Wunschliste, ${w.length} Artikel`); }
  }
  G64.toggleWish = id => {
    let w = G64.wishes();
    const on = !w.includes(id);
    w = on ? [...w, id] : w.filter(x => x !== id);
    store.set('g64wish', w); syncWishUI();
    toast(on ? 'Zur Wunschliste hinzugefügt' : 'Von der Wunschliste entfernt');
  };

  /* ---------- Toast ---------- */
  let tt;
  function toast(msg) {
    const t = $('#toast'); t.innerHTML = ic('check') + msg; t.classList.add('on');
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2600);
  }
  G64.toast = toast;

  /* ---------- Warenkorb ---------- */
  const cart = () => store.get('g64cart', []);
  const saveCart = c => { store.set('g64cart', c); renderCart(); };
  G64.cartTotal = () => cart().reduce((s, l) => s + G64.byId(l.id).price * l.q, 0);
  G64.add = (id, q = 1, from) => {
    const c = cart(); const l = c.find(x => x.id === id);
    l ? l.q += q : c.push({ id, q });
    if (from) fly(from, id);
    saveCart(c);
    const bc = $('#bagCount'); bc.classList.remove('pop'); void bc.offsetWidth; bc.classList.add('pop');
    setTimeout(() => openDrawer(), from ? 750 : 0);
  };
  function fly(from, id) {
    const target = $('#bagBtn'); if (!target || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const a = from.getBoundingClientRect(), b = target.getBoundingClientRect();
    const im = document.createElement('img'); im.className = 'fly'; im.src = G64.byId(id).img; im.alt = '';
    im.style.left = a.left + a.width / 2 - 40 + 'px'; im.style.top = a.top + a.height / 2 - 40 + 'px';
    document.body.appendChild(im);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      im.style.transform = `translate(${b.left + b.width / 2 - a.left - a.width / 2}px, ${b.top + b.height / 2 - a.top - a.height / 2}px) scale(.2)`;
      im.style.opacity = '.2';
    }));
    setTimeout(() => im.remove(), 900);
  }
  function renderCart() {
    const c = cart(); const n = c.reduce((s, l) => s + l.q, 0);
    const bc = $('#bagCount'); bc.textContent = n; bc.classList.toggle('on', n > 0); $('#bagBtn').setAttribute('aria-label', `Warenkorb öffnen, ${n} ${n === 1 ? 'Artikel' : 'Artikel'}`);
    const total = G64.cartTotal();
    const left = Math.max(0, G64.freeShipFrom - total);
    const ship = $('#ship'); ship.classList.toggle('done', left === 0 && n > 0);
    $('#shipTxt').innerHTML = n === 0 ? `Kostenloser Versand ab <b>${G64.fmt(G64.freeShipFrom)}</b>` : left > 0 ? `Noch <b>${G64.fmt(left)}</b> bis zum kostenlosen Versand` : `<b>Geschafft:</b> Dein Versand ist kostenlos`;
    $('#shipBar').style.width = Math.min(100, total / G64.freeShipFrom * 100) + '%';
    const L = $('#lines');
    if (!n) { L.innerHTML = `<div class="empty"><h3>Dein Warenkorb ist leer</h3><p>Entdecke Neuheiten und Geschenksets – in jedem Paket steckt eine kleine Überraschung.</p><a class="btn btn-primary" style="margin-top:20px" href="kollektion.html">Düfte entdecken</a></div>`; }
    else L.innerHTML = c.map(l => { const p = G64.byId(l.id); return `<div class="line" data-id="${p.id}">
        <img src="${p.img}" alt="">
        <div><small>${p.brand}</small><b class="n">${p.name}${p.type !== 'Set' ? ' ' + p.type : ''}</b><small>${p.size === 'Set' ? 'Geschenkset' : p.size}</small>
        <div class="qty"><button data-q="-1" aria-label="Weniger">−</button><span>${l.q}</span><button data-q="1" aria-label="Mehr">+</button></div></div>
        <div class="pr tnum">${G64.fmt(p.price * l.q)}<br><button class="rm" data-rm>Entfernen</button></div></div>`; }).join('');
    $('#sub').textContent = G64.fmt(total);
    $('#shipLine').textContent = n === 0 ? '–' : left === 0 ? 'kostenlos' : G64.fmt(G64.shipping);
    $('#grand').textContent = G64.fmt(total + (n && left > 0 ? G64.shipping : 0));
    $('#checkout').disabled = !n;
    // Upsell: günstigstes Produkt, das noch fehlt, passend zur Versandschwelle
    const up = $('#upsell');
    const cand = n && left > 0 ? P.filter(p => !c.find(l => l.id === p.id)).sort((a, b) => Math.abs(a.price - left) - Math.abs(b.price - left))[0] : null;
    up.hidden = !cand;
    if (cand) up.innerHTML = `<h5>Dazu passt</h5><div class="u"><img src="${cand.img}" alt=""><div><b>${cand.brand} ${cand.name}</b><small class="tnum">${G64.fmt(cand.price)}</small></div><button class="mini" data-add-up="${cand.id}">Hinzufügen</button></div>`;
  }
  let lastFocus;
  function trap(e, box) { if (e.key !== 'Tab') return; const f = [...box.querySelectorAll('a[href],button:not([disabled]),input,select')].filter(x => x.offsetParent); if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  function openDrawer() { lastFocus = document.activeElement; $('#drawer').classList.add('open'); document.body.style.overflow = 'hidden'; $('#drawer .close').focus(); }
  function closeDrawer() { $('#drawer').classList.remove('open'); document.body.style.overflow = ''; lastFocus && lastFocus.focus && lastFocus.focus(); }
  G64.openCart = openDrawer;

  /* ---------- Chrome ---------- */
  const NAV = [
    ['Marken', 'kollektion.html?cat=Marken'], ['Neuheiten', 'kollektion.html?cat=Neuheiten'], ['Düfte', 'kollektion.html', 'mega'],
    ['Pflege', 'kollektion.html?cat=Pflege'], ['Geschenke', 'kollektion.html?cat=Geschenke'], ['Make-up', 'kollektion.html?cat=Make-up'],
    ['Haare', 'kollektion.html?cat=Haare'], ['Natur', 'kollektion.html?cat=Natur'], ['Duftwochen −15 %', 'kollektion.html?cat=Duftwochen', 'sale']
  ];
  const feat = G64.byId('libre-vanille');
  const page = location.pathname.split('/').pop() || 'index.html';
  const header = `
  <a class="skip" href="#main">Zum Inhalt springen</a>
  <div class="announce" role="region" aria-label="Aktionen"><div class="wrap">
    <div class="msg on"><b>Kostenloser Versand</b> in Deutschland ab 39 €</div>
    <div class="msg">Ein <b>kleines Geschenk</b> in jedem Paket</div>
    <div class="msg"><b>3 % Treuerabatt</b> für Stammkunden</div>
    <div class="side"><a href="#">Filialfinder</a><a href="#">Beauty Academy</a><a href="#">Kontakt</a></div>
  </div></div>
  <header class="hdr" id="hdr"><div class="wrap hdr-in">
    <div class="hdr-l">
      <button class="ibtn burger" id="burger" aria-label="Menü öffnen">${ic('menu')}</button>
      <button class="ibtn" id="searchOpen2" aria-label="Suche" style="display:none">${ic('search')}</button>
      <button class="hdr-search" id="searchOpen" aria-label="Suche öffnen">${ic('search')}<span>Duft, Marke, Pflege …</span><kbd>/</kbd></button>
    </div>
    <a class="brand" href="index.html" aria-label="Gradmann 1864 Parfümerie – Startseite"><img src="img/stempel.png" alt="" width="46" height="39"><span class="wm"><b>GRADMANN</b><i>Parfümerie · 1864</i></span></a>
    <div class="hdr-r">
      <a class="ibtn hide-m" href="#" aria-label="Filialfinder">${ic('pin')}</a>
      <a class="ibtn hide-m" href="#" aria-label="Konto">${ic('user')}</a>
      <a class="ibtn" href="kollektion.html?wish=1" aria-label="Wunschliste">${ic('heart')}<span class="count" id="wishCount">0</span></a>
      <button class="ibtn" id="bagBtn" aria-label="Warenkorb öffnen">${ic('bag')}<span class="count" id="bagCount">0</span></button>
    </div></div>
    <nav class="nav" aria-label="Hauptnavigation"><div class="wrap"><ul>
      ${NAV.map(([t, h, k]) => `<li class="${k === 'mega' ? 'has-mega' : k || ''}"><a href="${h}" ${page.startsWith('kollektion') && t === 'Düfte' ? 'aria-current="page"' : ''}>${t}</a>${k === 'mega' ? `
        <div class="mega"><div class="wrap mega-in">
          <div><h4>Damen</h4><ul><li><a href="kollektion.html?for=damen">Alle Damendüfte</a></li><li><a href="kollektion.html?family=blumig">Blumig</a></li><li><a href="kollektion.html?family=süß">Süß &amp; gourmand</a></li><li><a href="kollektion.html?cat=Neuheiten">Neuheiten</a></li></ul></div>
          <div><h4>Herren</h4><ul><li><a href="kollektion.html?for=herren">Alle Herrendüfte</a></li><li><a href="kollektion.html?family=holzig">Holzig</a></li><li><a href="kollektion.html?family=frisch">Frisch</a></li></ul></div>
          <div><h4>Entdecken</h4><ul><li><a href="kollektion.html?cat=Nische">Nischendüfte</a></li><li><a href="kollektion.html?type=set">Sets &amp; Miniaturen</a></li><li><a href="kollektion.html?cat=Kerzen">Duftkerzen</a></li><li><a href="kollektion.html?cat=Reise">Reisegrößen</a></li></ul></div>
          <div><h4>Nach Budget</h4><ul><li><a href="kollektion.html?max=50">Bis 50 €</a></li><li><a href="kollektion.html?max=100">Bis 100 €</a></li><li><a href="kollektion.html?min=100">Ab 100 €</a></li></ul></div>
          <a class="mega-feat" href="${G64.href(feat)}"><img src="${feat.img}" alt=""><div><small>Limitiert</small><b>${feat.name}</b><span>${G64.fmt(feat.price)}</span></div></a>
        </div></div>` : ''}</li>`).join('')}
    </ul></div></nav>
  </header>
  <div class="mnav" id="mnav" aria-hidden="true"><div class="scrim" data-close-m></div><div class="panel" role="dialog" aria-modal="true" aria-label="Menü">
    <div style="display:flex;justify-content:space-between;align-items:center"><span class="display" style="font-size:22px;letter-spacing:.14em;color:var(--ink)">GRADMANN</span><button class="ibtn" data-close-m aria-label="Menü schließen">${ic('x')}</button></div>
    <ul>${NAV.map(([t, h], i) => `<li><a href="${h}" style="--i:${i}">${t}${ic('arrow')}</a></li>`).join('')}</ul>
    <div style="display:grid;gap:10px;margin-top:auto"><a class="btn btn-ghost" href="#">${ic('pin')}Filialfinder</a><a class="btn btn-ghost" href="#">${ic('user')}Mein Konto</a></div>
  </div></div>
  <div class="search" id="search" role="dialog" aria-modal="true" aria-label="Suche" aria-hidden="true"><div class="search-in">
    <div class="search-box">${ic('search')}<input id="q" type="search" placeholder="Wonach suchst du?" autocomplete="off" aria-label="Suchbegriff"><button class="ibtn" id="searchClose" aria-label="Suche schließen">${ic('x')}</button></div>
    <div class="search-grid"><div><h5>Beliebt</h5><div class="chips" id="sugg"></div></div><div><h5 id="resH">Beliebt</h5><ul class="res" id="res"></ul></div></div>
  </div></div>
  <div class="drawer" id="drawer" aria-hidden="true"><div class="scrim" data-close-d></div><aside class="panel" role="dialog" aria-modal="true" aria-label="Warenkorb">
    <header><h2>Warenkorb</h2><button class="ibtn close" data-close-d aria-label="Warenkorb schließen">${ic('x')}</button></header>
    <div class="ship" id="ship"><span id="shipTxt"></span><div class="bar"><i id="shipBar"></i></div></div>
    <div class="lines" id="lines"></div>
    <div class="upsell" id="upsell" hidden></div>
    <footer>
      <div class="row"><span>Zwischensumme</span><span class="tnum" id="sub"></span></div>
      <div class="row"><span>Versand (DE)</span><span class="tnum" id="shipLine"></span></div>
      <div class="row total"><span>Gesamt</span><span class="tnum" id="grand"></span></div>
      <button class="btn btn-primary btn-block" id="checkout">Zur Kasse${ic('arrow', 'arr')}</button>
      <p class="small" style="text-align:center">Inkl. MwSt., zzgl. Versand. Zahlung per Kreditkarte, PayPal oder Überweisung.</p>
    </footer></aside></div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <a class="wa" href="#" aria-label="Beratung per WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2Zm5.100 14c-.2.600-1.200 1.200-1.700 1.200-.400.100-1 .100-1.600-.100-2.900-1.200-4.800-4.200-5-4.400-.1-.2-1.200-1.600-1.200-3s.7-2 1-2.300c.200-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.200.1.400 0 .5l-.4.600c-.1.200-.3.300-.1.600.7 1.100 1.600 2 2.700 2.500.3.100.4.100.6-.1l.7-.9c.2-.2.400-.2.600-.1l1.900.9c.2.100.4.200.4.300.1.200.1.800-.1 1.400Z"/></svg><span>Beratung per WhatsApp</span></a>`;
  document.body.insertAdjacentHTML('afterbegin', header);

  const footer = `
  <footer class="foot dark"><div class="wrap">
    <div class="foot-top">
      <div><div class="big">Ein kleines Geschenk in jedem Paket.</div><p style="max-width:40ch;margin-bottom:20px">Neuheiten, Aktionen und Tipps unserer Beraterinnen – direkt ins Postfach.</p>
        <form class="nl" id="nl"><label class="sr" for="nlm">E-Mail</label><input id="nlm" type="email" required placeholder="Deine E-Mail-Adresse"><button class="btn btn-light" style="--h:52px">Anmelden</button></form></div>
      <div><h4>Shop</h4><ul><li><a href="kollektion.html">Düfte</a></li><li><a href="kollektion.html?cat=Pflege">Pflege</a></li><li><a href="kollektion.html?cat=Make-up">Make-up</a></li><li><a href="kollektion.html?cat=Geschenke">Geschenke</a></li><li><a href="kollektion.html?cat=Marken">Alle Marken</a></li></ul></div>
      <div><h4>Service</h4><ul><li><a href="#">Bestellvorgang</a></li><li><a href="#">Versandinformationen</a></li><li><a href="#">Rückgabe</a></li><li><a href="#">Kontakt</a></li><li><a href="#">Gutscheinkarten</a></li></ul></div>
      <div><h4>Gradmann 1864</h4><ul><li><a href="#">Filialen &amp; Öffnungszeiten</a></li><li><a href="#">Beauty Academy</a></li><li><a href="#">Kosmetikinstitute</a></li><li><a href="#">Events</a></li><li><a href="#">Karriere</a></li><li>+49 7531 28256-0</li><li>service@gradmann1864.de</li></ul></div>
    </div>
    <div class="foot-pay" aria-label="Zahlungsarten"><span>Kreditkarte</span><span>PayPal</span><span>Paydirekt</span><span>Überweisung</span><span style="background:none;font-weight:400;margin-left:auto;color:#b9c4e4">Versand 4,40 € · frei ab 39 €</span></div>
    <div class="foot-bottom"><span>© 2026 Gradmann 1864 Parfümerie. Design-Prototyp auf Basis von gradmann1864.de.</span><span><a href="#">Impressum</a> · <a href="#">Datenschutz</a> · <a href="#">AGB</a></span></div>
  </div></footer>`;

  function init() {
    document.body.insertAdjacentHTML('beforeend', footer);
    $('#drawer .scrim'); 
    renderCart(); syncWishUI();

    /* Ankündigungsleiste */
    const msgs = $$('.announce .msg'); let mi = 0;
    setInterval(() => { msgs[mi].classList.remove('on'); mi = (mi + 1) % msgs.length; msgs[mi].classList.add('on'); }, 4200);

    /* Header-Schatten */
    const hdr = $('#hdr'); const onS = () => hdr.classList.toggle('stuck', scrollY > 24); onS(); addEventListener('scroll', onS, { passive: true });

    /* Suche */
    const S = $('#search'), q = $('#q'), res = $('#res'), resH = $('#resH');
    const sugg = ['Libre', 'La vie est belle', 'Good Girl', 'Nischenparfum', 'Set', 'Maison Margiela'];
    $('#sugg').innerHTML = sugg.map(s => `<button class="chip" data-s="${s}">${s}</button>`).join('');
    const hl = (t, v) => v ? t.replace(new RegExp('(' + v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>') : t;
    const showRes = v => {
      v = v.trim().toLowerCase();
      const list = v ? P.filter(p => (p.brand + ' ' + p.name + ' ' + p.type + ' ' + (p.set ? 'set geschenk' : '') + ' ' + (p.tag || '')).toLowerCase().includes(v)) : [...P].sort((a, b) => b.popular - a.popular).slice(0, 5);
      resH.textContent = v ? `${list.length} Treffer` : 'Beliebt';
      res.innerHTML = list.length ? list.slice(0, 6).map(p => `<li><a href="${G64.href(p)}"><img src="${p.img}" alt=""><span><small>${hl(p.brand, v)}</small><b>${hl(p.name, v)}</b> <small style="display:inline">${p.type}</small></span><b class="tnum">${G64.fmt(p.price)}</b></a></li>`).join('') : `<li style="padding:16px 8px;color:var(--ink-3)">Nichts gefunden. Versuche eine Marke oder einen Dufttyp.</li>`;
    };
    const openS = () => { S.classList.add('open'); S.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; showRes(q.value); setTimeout(() => q.focus(), 60); };
    const closeS = () => { S.classList.remove('open'); S.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    $('#searchOpen').onclick = openS; $('#searchOpen2').onclick = openS; $('#searchClose').onclick = closeS;
    q.oninput = () => showRes(q.value);
    $('#sugg').onclick = e => { const b = e.target.closest('[data-s]'); if (b) { q.value = b.dataset.s; showRes(q.value); q.focus(); } };
    q.onkeydown = e => { if (e.key === 'Enter') { const f = res.querySelector('a'); if (f) location.href = f.href; } };
    if (matchMedia('(max-width:1000px)').matches) $('#searchOpen2').style.display = 'grid';
    matchMedia('(max-width:1000px)').addEventListener('change', e => $('#searchOpen2').style.display = e.matches ? 'grid' : 'none');

    /* Mobile Menü */
    const mn = $('#mnav');
    $('#burger').onclick = () => { mn.classList.add('open'); mn.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
    $$('[data-close-m]').forEach(b => b.onclick = () => { mn.classList.remove('open'); mn.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; });

    /* Drawer */
    $('#bagBtn').onclick = openDrawer;
    $$('[data-close-d]').forEach(b => b.onclick = closeDrawer);
    $('#lines').onclick = e => {
      const row = e.target.closest('.line'); if (!row) return; const id = row.dataset.id; const c = cart(); const l = c.find(x => x.id === id);
      if (e.target.closest('[data-rm]')) return saveCart(c.filter(x => x.id !== id));
      const d = e.target.closest('[data-q]'); if (d) { l.q += +d.dataset.q; saveCart(l.q <= 0 ? c.filter(x => x.id !== id) : c); }
    };
    $('#upsell').onclick = e => { const b = e.target.closest('[data-add-up]'); if (b) { const c = cart(); c.push({ id: b.dataset.addUp, q: 1 }); saveCart(c); toast('Hinzugefügt'); } };
    $('#checkout').onclick = () => toast('Prototyp: hier startet der Checkout');

    /* Globale Delegation: In den Warenkorb / Wunschliste */
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-add]'); if (a) { e.preventDefault(); G64.add(a.dataset.add, +(a.dataset.qty || 1), a.closest('.pc')?.querySelector('.pc-media') || a); }
      const w = e.target.closest('[data-wish]'); if (w) { e.preventDefault(); G64.toggleWish(w.dataset.wish); }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeS(); closeDrawer(); G64.closeFilter && G64.closeFilter(); mn.classList.remove('open'); document.body.style.overflow = ''; }
      const open = $('#drawer.open .panel') || $('#search.open .search-in') || $('#mnav.open .panel'); if (open) trap(e, open);
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); openS(); }
    });
    $('#nl').onsubmit = e => { e.preventDefault(); toast('Danke! Bitte bestätige deine E-Mail.'); e.target.reset(); };

    /* Reveal */
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    G64.reveal = (root = document) => $$('.rv, .wipe, .lines-split', root).forEach(el => io.observe(el));
    G64.reveal();
    requestAnimationFrame(() => $$('.rv, .lines-split').forEach(el => el.getBoundingClientRect().top < innerHeight && el.classList.add('in')));

    document.dispatchEvent(new Event('g64ready'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
