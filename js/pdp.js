document.addEventListener('g64ready', () => {
  const { $, $$, ic } = G64;
  const id = new URLSearchParams(location.search).get('id') || 'lost-eden';
  const p = G64.byId(id) || G64.byId('lost-eden');
  const full = G64.full(p);
  document.title = `${full} – GRADMANN 1864`;
  $('#cb-brand').textContent = p.brand; $('#cb-brand').href = `kollektion.html?q=${encodeURIComponent(p.brand)}`; $('#cb-name').textContent = p.name;
  const imgs = p.gallery ? [p.img.replace('p6', 'lost0'), ...p.gallery.slice(1)].map(x => x) : [p.img];
  if (p.gallery) imgs[0] = 'img/lost0.jpg';
  const off = p.uvp ? Math.round((1 - p.price / p.uvp) * 100) : 0;
  const left = Math.max(0, G64.freeShipFrom - p.price);
  const wished = G64.wishes().includes(p.id);
  const facets = p.facets || p.family.map((f, i) => [f, 85 - i * 22]);

  $('#pdp').innerHTML = `
  <div class="gal rv">
    <div class="thumbs" id="thumbs">${imgs.map((s, i) => `<button ${i ? '' : 'aria-current="true"'} data-i="${i}" aria-label="Bild ${i + 1}"><img src="${s}" alt="" loading="lazy"></button>`).join('')}</div>
    <div class="gal-main" id="gm"><span class="badges">${off ? `<span class="badge sale">−${off} %</span>` : ''}${p.badge === 'neu' ? '<span class="badge ink">Neu</span>' : ''}${p.badge === 'limitiert' ? '<span class="badge ink">Limitiert</span>' : ''}</span><img id="gimg" src="${imgs[0]}" alt="${full}" width="1063" height="1063"></div>
  </div>
  <div class="buy rv" style="--d:1">
    <div class="brandline"><a href="kollektion.html?q=${encodeURIComponent(p.brand)}">${p.brand}${p.line ? ' · ' + p.line : ''}</a></div>
    <h1>${p.name}</h1>
    <p class="sub">${p.type === 'Set' ? 'Geschenkset' : p.type}${p.size !== 'Set' ? ' · ' + p.size : ''}${p.blurb ? '. ' + p.blurb : ''}</p>
    <div class="pricebox"><span class="now">${G64.fmt(p.price)}</span>${p.uvp ? `<s>UVP ${G64.fmt(p.uvp)}</s><span class="off">−${off} %</span>` : ''}</div>
    <p class="taxline">Inkl. MwSt., zzgl. Versand${p.per ? ` · ${p.per}` : ''}</p>
    ${p.size !== 'Set' ? `<div class="opt"><span>Inhalt: <b>${p.size}</b></span><div class="chips"><button class="chip on" aria-pressed="true">${p.size}</button></div></div>` : ''}
    <div class="atc">
      <div class="qty"><button id="qm" aria-label="Weniger">−</button><span id="qv">1</span><button id="qp" aria-label="Mehr">+</button></div>
      <button class="btn btn-primary" id="add">${ic('bag')}In den Warenkorb</button>
      <button class="wishbig" data-wish="${p.id}" aria-pressed="${wished}" aria-label="Auf die Wunschliste">${ic('heart')}</button>
    </div>
    <p class="avail"><i></i>Sofort versandfertig · Lieferfrist 1–3 Werktage</p>
    <div class="perks">
      <div class="perk">${ic('truck')}<div><b>${p.price >= G64.freeShipFrom ? 'Kostenloser Versand in Deutschland' : `Noch ${G64.fmt(left)} bis zum kostenlosen Versand`}</b><small>Sonst 4,40 € innerhalb Deutschlands</small></div></div>
      <div class="perk">${ic('gift')}<div><b>Eine Überraschung in jedem Paket</b><small>Dazu 3 % Treuerabatt für Stammkunden</small></div></div>
      <div class="perk">${ic('chat')}<div><b>Unsicher? Wir beraten dich.</b><small><a href="#">Per WhatsApp schreiben</a> oder in einer unserer 11 Filialen vorbeikommen</small></div></div>
    </div>
    <div class="acc">
      <details open><summary>Duftbeschreibung</summary><div class="in"><p>${p.desc || `${full}${p.size !== 'Set' ? ` im ${p.size} Flakon` : ' als Geschenkset'}. Weitere Details zu Duftnoten und Inhaltsstoffen findest du im Shop.`}</p>
        ${p.notes ? `<div><div class="small" style="margin-bottom:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">Duftnoten</div><div class="notes">${p.notes.map(n => `<span>${n}</span>`).join('')}</div></div>` : ''}
        ${p.facets ? `<div><div class="small" style="margin:6px 0 8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">Duftrichtung</div><div class="notes">${p.facets.map(([n]) => `<span>${n[0].toUpperCase() + n.slice(1)}</span>`).join('')}</div></div>` : ''}
      </div></details>
      <details><summary>Produktdetails</summary><div class="in"><dl><dt>Marke</dt><dd>${p.brand}</dd><dt>Für</dt><dd>${{ damen: 'Damen', herren: 'Herren', unisex: 'Unisex' }[p.for]}</dd><dt>Inhalt</dt><dd>${p.size === 'Set' ? '1 Stück' : p.size}</dd>${p.line ? `<dt>Linie</dt><dd>${p.line} Fantasies</dd>` : ''}${p.tag ? `<dt>Edition</dt><dd>${p.tag}</dd>` : ''}${p.year ? `<dt>Erschienen</dt><dd>${p.year}</dd>` : ''}${p.perfumer ? `<dt>Parfümeur</dt><dd>${p.perfumer}</dd>` : ''}</dl></div></details>
      <details><summary>Versand &amp; Rückgabe</summary><div class="in"><p>Versand innerhalb Deutschlands 4,40 €, ab 39 € Bestellwert kostenlos. Lieferzeit 1–3 Werktage bei Verfügbarkeit.</p><p class="small">Alle Details zu Rückgabe und Widerruf findest du in unseren <a href="#">Versand- und Rückgabeinformationen</a>.</p></div></details>
      <details><summary>Angebot: 15 % auf ausgewählte Düfte</summary><div class="in"><p class="small">Dieser Rabatt ist nicht mit anderen Rabatten kombinierbar. Bereits reduzierte Artikel sind vom Angebot ausgeschlossen. Der Rabatt gilt auch auf Raumdüfte, Diffuser und Duftkerzen der entsprechenden Kollektionen.</p></div></details>
    </div>
  </div>`;

  /* Galerie */
  const gm = $('#gm'), gi = $('#gimg');
  $('#thumbs').onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('#thumbs button').forEach(x => x.setAttribute('aria-current', x === b)); gi.style.opacity = 0; setTimeout(() => { gi.src = imgs[+b.dataset.i]; gi.style.opacity = 1; }, 200); };
  if (matchMedia('(hover:hover)').matches) {
    gm.addEventListener('pointerenter', () => gm.classList.add('zoom'));
    gm.addEventListener('pointerleave', () => gm.classList.remove('zoom'));
    gm.addEventListener('pointermove', e => { const r = gm.getBoundingClientRect(); gm.style.setProperty('--zx', (e.clientX - r.left) / r.width * 100 + '%'); gm.style.setProperty('--zy', (e.clientY - r.top) / r.height * 100 + '%'); });
  }

  /* Menge + Kauf */
  let q = 1; const qv = $('#qv');
  $('#qm').onclick = () => qv.textContent = q = Math.max(1, q - 1);
  $('#qp').onclick = () => qv.textContent = q = Math.min(9, q + 1);
  $('#add').onclick = () => G64.add(p.id, q, gi);
  $('#st-add').onclick = () => G64.add(p.id, q, $('#st-img'));

  /* Sticky Kaufleiste */
  $('#st-img').src = p.img; $('#st-n').textContent = full; $('#st-s').textContent = p.size === 'Set' ? 'Geschenkset' : p.size; $('#st-p').textContent = G64.fmt(p.price);
  new IntersectionObserver(([e]) => $('#sticky').classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < 0)).observe($('#add'));

  /* Story-Band (nur mit Bildmaterial) */
  if (p.gallery) {
    $('#story').hidden = false;
    $('#storyBig').innerHTML = `<span class="ln"><span>Die Fantasie, von der</span></span><span class="ln" style="--d:1"><span><em>verbotenen Frucht</em> zu kosten.</span></span>`;
    $('#storyTxt').textContent = 'Rauchig-süß, kontrastreich und um eine surreale Zutat herum komponiert: Lost Eden gehört zur Linie Replica Fantasies.';
    $('#storyImgs').innerHTML = p.gallery.slice(1, 3).map(s => `<img class="wipe" src="${s}" alt="" loading="lazy">`).join('');
    $('#story .big').classList.add('rv');
  }

  /* Cross-Sell */
  const rel = G64.products.filter(x => x.id !== p.id).sort((a, b) => (b.brand === p.brand) - (a.brand === p.brand) || (b.family.filter(f => p.family.includes(f)).length - a.family.filter(f => p.family.includes(f)).length) || b.popular - a.popular).slice(0, 4);
  $('#more').innerHTML = rel.map((x, i) => G64.card(x, i)).join('');
  G64.reveal();
});
