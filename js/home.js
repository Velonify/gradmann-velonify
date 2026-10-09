document.addEventListener('g64ready', () => {
  const { $, $$ } = G64, P = G64.products;

  /* Hero-Szenen */
  const scenes = [
    { id: 'lost-eden', img: 'img/lost0.jpg', sats: ['p12', 'p2'] },
    { id: 'libre-vanille', img: 'img/hero-libre.jpg', sats: ['p5', 'p9'] },
    { id: 'la-vie-est-belle', img: 'img/hero-lavie.jpg', sats: ['p10', 'p7'] }
  ];
  const stage = $('#stage'), mainB = $('#main-b'), s1 = $('#s1'), s2 = $('#s2'), dots = $('#dots');
  dots.innerHTML = scenes.map((s, i) => `<button aria-label="Highlight ${i + 1}" ${i ? '' : 'aria-current="true"'}></button>`).join('');
  let si = 0, timer;
  const show = i => {
    si = i; const s = scenes[i], p = G64.byId(s.id);
    [mainB, s1, s2].forEach(el => el.style.opacity = 0);
    setTimeout(() => {
      mainB.src = s.img; s1.src = `img/${s.sats[0]}.jpg`; s2.src = `img/${s.sats[1]}.jpg`;
      [mainB, s1, s2].forEach(el => el.style.opacity = 1);
      $('#sc-brand').textContent = p.brand; $('#sc-name').textContent = p.name + (p.type !== 'Set' ? ' ' + p.type : '');
      $('#sc-link').href = G64.href(p);
    }, 280);
    $$('button', dots).forEach((b, k) => b.setAttribute('aria-current', k === i));
  };
  show(0);
  const auto = () => { clearInterval(timer); if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; timer = setInterval(() => show((si + 1) % scenes.length), 6000); };
  auto();
  stage.addEventListener('pointerenter', () => clearInterval(timer)); stage.addEventListener('pointerleave', auto); stage.addEventListener('focusin', () => clearInterval(timer)); stage.addEventListener('focusout', auto);
  dots.onclick = e => { const k = [...dots.children].indexOf(e.target.closest('button')); if (k > -1) { show(k); auto(); } };
  if (matchMedia('(hover:hover)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stage.addEventListener('pointermove', e => { const r = stage.getBoundingClientRect(); stage.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5) * 2); stage.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5) * 2); });
    stage.addEventListener('pointerleave', () => { stage.style.setProperty('--mx', 0); stage.style.setProperty('--my', 0); });
  }

  /* Duftfinder */
  const F = { for: '', family: '', max: '' };
  const match = () => P.filter(p => G64.forMatch(p, new Set(F.for ? [F.for] : [])) && (!F.family || p.family.includes(F.family)) && (!F.max || p.price <= +F.max));
  const upd = () => {
    const m = match();
    $('#fcount').innerHTML = m.length ? `<b>${m.length}</b> von ${P.length} Düften passen` : 'Keine Treffer – lockere einen Filter';
    $('#fprev').innerHTML = m.slice(0, 5).map(p => `<img src="${p.img}" alt="" title="${p.name}">`).join('');
    const qs = Object.entries(F).filter(([, v]) => v).map(([k, v]) => `${k === 'max' ? 'max' : k}=${encodeURIComponent(v)}`).join('&');
    $('#fgo').href = 'kollektion.html' + (qs ? '?' + qs : '');
  };
  $('#steps').onclick = e => {
    const c = e.target.closest('.chip'); if (!c) return; const k = c.closest('.f-step').dataset.k;
    $$('.chip', c.parentNode).forEach(x => x.classList.toggle('on', x === c)); F[k] = c.dataset.v; upd();
  };
  upd();

  /* Marken-Marquee */
  const brands = [...new Set(P.map(p => p.brand))];
  const row = (h) => brands.map(b => `<a href="kollektion.html?q=${encodeURIComponent(b)}"${h ? ' tabindex="-1" aria-hidden="true"' : ''}>${b}</a>`).join('');
  $('#marq').innerHTML = row(false) + row(true);

  /* Rail */
  const sets = {
    new: () => [...P].sort((a, b) => b.added - a.added),
    top: () => [...P].sort((a, b) => b.popular - a.popular),
    set: () => P.filter(p => p.set),
    u60: () => P.filter(p => p.price < 60).sort((a, b) => a.price - b.price)
  };
  const rail = $('#rail');
  const fill = k => { rail.innerHTML = sets[k]().slice(0, 8).map((p, i) => G64.card(p, i)).join(''); rail.scrollTo({ left: 0 }); nav(); };
  const nav = () => { $('#rp').disabled = rail.scrollLeft < 8; $('#rn').disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8; };
  $('#tabs').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; $$('.chip', $('#tabs')).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); fill(b.dataset.t); };
  const step = () => rail.querySelector('.pc').offsetWidth + 24;
  $('#rp').onclick = () => rail.scrollBy({ left: -step() * 2, behavior: 'smooth' });
  $('#rn').onclick = () => rail.scrollBy({ left: step() * 2, behavior: 'smooth' });
  rail.addEventListener('scroll', nav, { passive: true });
  fill('new');

  /* Geschenke */
  $('#giftGrid').innerHTML = P.filter(p => p.set).sort((a, b) => b.popular - a.popular).slice(0, 4).map((p, i) => G64.card(p, i)).join('');
  G64.reveal();
});
