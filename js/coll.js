document.addEventListener('g64ready', () => {
  const { $, $$ } = G64, P = G64.products;
  const U = new URLSearchParams(location.search);
  const EMPTY_CAT = () => ['Pflege', 'Make-up', 'Haare', 'Natur', 'Kerzen', 'Reise'].includes(U.get('cat')) ? U.get('cat') : '';
  const S = {
    for: new Set(U.get('for') ? [U.get('for')] : []),
    family: new Set(U.get('family') ? [U.get('family')] : []),
    brand: new Set(), type: new Set(U.get('type') ? [U.get('type')] : U.get('cat') === 'Geschenke' ? ['Sets'] : []),
    max: +U.get('max') || 210, min: +U.get('min') || 0,
    sale: U.get('cat') === 'Duftwochen', wish: !!U.get('wish'),
    q: (U.get('q') || '').toLowerCase(), nische: U.get('cat') === 'Nische', neu: U.get('cat') === 'Neuheiten',
    sort: 'pop', empty: EMPTY_CAT()
  };
  const brands = [...new Set(P.map(p => p.brand))].sort();
  const families = ['süß', 'blumig', 'holzig', 'frisch', 'würzig', 'fruchtig'];
  const typeOf = p => p.set ? 'Sets' : p.type;
  const types = [...new Set(P.map(typeOf))];
  const LABEL = { damen: 'Damen', herren: 'Herren', unisex: 'Unisex' };

  const ck = (grp, v, label, n) => `<label class="ck"><input type="checkbox" data-g="${grp}" value="${v}"> ${label}<em>${n}</em></label>`;
  $('#f-for').innerHTML = ['damen', 'herren', 'unisex'].map(v => ck('for', v, LABEL[v], P.filter(p => G64.forMatch(p, new Set([v]))).length)).join('');
  $('#f-family').innerHTML = families.map(v => ck('family', v, v[0].toUpperCase() + v.slice(1), P.filter(p => p.family.includes(v)).length)).join('');
  $('#f-brand').innerHTML = brands.map(v => ck('brand', v, v, P.filter(p => p.brand === v).length)).join('');
  $('#f-type').innerHTML = types.map(v => ck('type', v, v, P.filter(p => typeOf(p) === v).length)).join('');
  if (S.type.has('set')) { S.type.delete('set'); S.type.add('Sets'); }

  const EMPTY = ['Pflege', 'Make-up', 'Haare', 'Natur', 'Kerzen', 'Reise'];
  const cats = [['', 'Alle'], ['for:damen', 'Damen'], ['for:herren', 'Herren'], ['for:unisex', 'Unisex'], ['type:Sets', 'Sets & Miniaturen'], ['nische', 'Nischenparfum'], ['sale', 'Aktion −15 %']];
  $('#cats').innerHTML = cats.map(([k, l]) => `<button class="chip" data-c="${k}">${l}</button>`).join('');

  const match = p => G64.forMatch(p, S.for) && (!S.family.size || p.family.some(f => S.family.has(f))) && (!S.brand.size || S.brand.has(p.brand)) &&
    (!S.type.size || S.type.has(typeOf(p))) && p.price <= S.max && p.price >= S.min && (!S.sale || p.badge === 'duftwochen') &&
    (!S.nische || p.tag === 'Nischenparfum') && (!S.neu || p.added >= 8) && (!S.wish || G64.wishes().includes(p.id)) &&
    (!S.q || (p.brand + ' ' + p.name + ' ' + p.type).toLowerCase().includes(S.q));
  const sorters = { pop: (a, b) => b.popular - a.popular, new: (a, b) => b.added - a.added, asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price };

  const grid = $('#grid'); let first = true;
  function render(animate = true) {
    const list = P.filter(match).sort(sorters[S.sort]);
    const paint = () => {
      let html = list.map((p, i) => G64.card(p, i)).join('');
      if (list.length >= 6 && !S.wish) {
        const parts = list.map((p, i) => G64.card(p, i)); parts.splice(5, 0, `<a class="promo-tile" href="kollektion.html?cat=Duftwochen"><div><b>Duftwochen: 15 % auf ausgewählte Düfte</b></div><p>Jetzt entdecken – nicht mit anderen Rabatten kombinierbar.</p><img class="stamp" src="img/stempel.png" alt=""></a>`);
        html = parts.join('');
      }
      grid.innerHTML = S.empty ? `<div class="empty-state"><h3>${S.empty}</h3><p>Diese Kategorie ist im Prototyp noch nicht befüllt – hier siehst du die Düfte.</p><a class="btn btn-primary" href="kollektion.html">Alle Düfte ansehen</a></div>` : list.length ? html : `<div class="empty-state"><h3>Keine Treffer</h3><p>Mit diesen Filtern haben wir leider nichts gefunden.</p><button class="btn btn-primary" id="reset">Filter zurücksetzen</button></div>`;
      grid.classList.remove('loading');
    };
    if (animate && !first) { grid.classList.add('loading'); setTimeout(paint, 180); } else paint();
    first = false;
    $('#count').innerHTML = `${list.length} ${list.length === 1 ? 'Produkt' : 'Produkte'} <small>von ${P.length}</small>`;
    $('#more').innerHTML = `<small class="small tnum">Du hast ${list.length} von ${list.length} Produkten gesehen</small><div class="bar"><i></i></div>`;
    // aktive Filter
    const act = [];
    S.for.forEach(v => act.push(['for', v, LABEL[v]])); S.family.forEach(v => act.push(['family', v, v])); S.brand.forEach(v => act.push(['brand', v, v])); S.type.forEach(v => act.push(['type', v, v]));
    if (S.max < 210) act.push(['max', '', `bis ${S.max} €`]); if (S.min) act.push(['min', '', `ab ${S.min} €`]); if (S.sale) act.push(['sale', '', 'Aktion −15 %']); if (S.nische) act.push(['nische', '', 'Nischenparfum']); if (S.neu) act.push(['neu', '', 'Neuheiten']); if (S.wish) act.push(['wish', '', 'Wunschliste']); if (S.q) act.push(['q', '', `„${S.q}“`]);
    $('#active').innerHTML = act.map(([g, v, l]) => `<button class="chip" data-rg="${g}" data-rv="${v}">${l}<i><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></i></button>`).join('');
    $('#fn').textContent = act.length ? ` (${act.length})` : '';
    // Controls synchronisieren
    $$('#facets input[type=checkbox][data-g]').forEach(i => { i.checked = S[i.dataset.g].has(i.value); const n = +i.parentNode.querySelector('em').textContent; i.disabled = n === 0; i.parentNode.style.opacity = n === 0 ? .45 : 1; });
    $('#f-sale').checked = S.sale; $('#pr').value = S.max; $('#pv').textContent = S.max >= 210 ? 'Alle' : `bis ${S.max} €`;
    $$('#cats .chip').forEach(c => { const k = c.dataset.c; const on = k === '' ? !act.length : k.startsWith('for:') ? S.for.size === 1 && S.for.has(k.slice(4)) && act.length === 1 : k.startsWith('type:') ? S.type.has(k.slice(5)) && act.length === 1 : k === 'nische' ? S.nische : k === 'sale' ? S.sale : false; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); });
    // Titel
    const one = S.for.size === 1 && !S.family.size && act.length === 1 ? [...S.for][0] : null;
    const t = S.sale ? ['Duft', 'wochen'] : S.wish ? ['Meine ', 'Wunschliste'] : S.nische ? ['Nische', 'nparfum'] : S.neu ? ['Alle ', 'Neuheiten'] : one === 'damen' ? ['Düfte für ', 'Sie'] : one === 'herren' ? ['Düfte für ', 'Ihn'] : S.q ? ['', S.q[0].toUpperCase() + S.q.slice(1)] : ['Alle ', 'Düfte'];
    $('#title').innerHTML = `<span class="ln"><span>${t[0]}<em>${t[1]}</em></span></span>`; $('#title').classList.add('in');
    document.title = `${t.join('')} – GRADMANN 1864`; $('#crumb').textContent = t.join('');
    G64.reveal();
  }

  document.addEventListener('change', e => {
    const i = e.target; if (i.matches('[data-g]')) { i.checked ? S[i.dataset.g].add(i.value) : S[i.dataset.g].delete(i.value); render(); }
    if (i.id === 'f-sale') { S.sale = i.checked; render(); }
    if (i.id === 'sort') { S.sort = i.value; render(); }
  });
  $('#pr').oninput = e => { S.max = +e.target.value; $('#pv').textContent = S.max >= 210 ? 'Alle' : `bis ${S.max} €`; }; $('#pr').onchange = () => render();
  const clear = () => { Object.values(S).forEach(v => v instanceof Set && v.clear()); S.max = 210; S.min = 0; S.sale = S.nische = S.neu = S.wish = false; S.q = ''; S.empty = ''; render(); };
  document.addEventListener('click', e => {
    if (e.target.closest('#fclear, #reset')) return clear();
    const r = e.target.closest('[data-rg]'); if (r) { const g = r.dataset.rg; if (S[g] instanceof Set) S[g].delete(r.dataset.rv); else if (g === 'max') S.max = 210; else if (g === 'min') S.min = 0; else S[g] = typeof S[g] === 'string' ? '' : false; render(); }
    const c = e.target.closest('[data-c]'); if (c) { const k = c.dataset.c; clear(); if (k.startsWith('for:')) S.for.add(k.slice(4)); else if (k.startsWith('type:')) S.type.add(k.slice(5)); else if (k) S[k] = true; render(); }
    const d = e.target.closest('.view button'); if (d) { $$('.view button').forEach(b => b.setAttribute('aria-pressed', b === d)); grid.classList.remove('dense', 'wide'); if (d.dataset.d) grid.classList.add(d.dataset.d); }
  });
  /* Mobile Filter-Drawer */
  const fo = open => { $('#facets').classList.toggle('open', open); $('#fapply').classList.toggle('open', open); $('#fscrim').classList.toggle('on', open); document.body.style.overflow = open ? 'hidden' : ''; };
  G64.closeFilter = () => fo(false);
  $('#fopen').onclick = () => fo(true); $('#fclose').onclick = () => fo(false); $('#fdone').onclick = () => fo(false); $('#fscrim').onclick = () => fo(false);
  render(false);
});
