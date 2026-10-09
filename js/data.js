/* Produktdaten: Namen, Marken, Preise, Inhalt und Bilder stammen von gradmann1864.de.
   Duftfamilien/Zielgruppe (family, for) sind Platzhalter-Zuordnungen für den Prototyp. */
window.G64 = {
  freeShipFrom: 39,
  shipping: 4.4,
  products: [
    { id: 'lost-eden', brand: 'Maison Margiela', line: 'Replica', name: 'Lost Eden', type: 'Eau de Parfum', size: '100 ml', per: '1.717,00 € / 1 l', price: 171.70, uvp: 202.00, img: 'img/p6.jpg', gallery: ['img/lost0.jpg','img/lost2.jpg','img/lost3.jpg','img/lost5.jpg','img/lost6.jpg'], badge: 'duftwochen', for: 'unisex', family: ['süß','würzig','fruchtig'], tag: 'Nischenparfum', year: 2025, popular: 98, added: 12,
      notes: ['Roter Apfel','Vanille','Bananenblatt','Moschus','Kokosnuss','Ylang-Ylang','Galbanum','Jasmin','Oud','Sandelholz','Zitrone','Vetiver'],
      facets: [['süß',92],['würzig',70],['fruchtig',64],['leicht holzig',38],['cremig',46],['rauchig',54]],
      blurb: 'Die Fantasie, von der verbotenen Frucht zu kosten: rauchig-süß, mit rotem Apfel und Oud.',
      desc: 'Die verführerische Anziehungskraft einer unendlich verlockenden verbotenen Frucht, die dich dazu einlädt, dich deinen Versuchungen zu stellen. Lost Eden Eau de Parfum fängt das Wechselspiel des Verlangens in einer kontrastreichen, rauchig-süßen Duftkomposition ein. Wie alle REPLICA Fantasies Düfte ist auch Lost Eden um eine surreale Zutat herum kreiert, die der Fantasie der Meisterparfümeure entsprungen ist.',
      perfumer: 'Honorine Blanc' },
    { id: 'miniature-collection', brand: 'Goldfield & Banks', name: 'The Miniature Collection', type: 'Set', size: 'Set', price: 116.03, uvp: 136.50, img: 'img/p1.jpg', badge: 'duftwochen', set: true, for: 'unisex', family: ['frisch','holzig'], tag: 'Ikonische Luxusminiaturen', popular: 70, added: 5, blurb: 'Ikonische Luxusminiaturen im Set – ideal zum Entdecken oder Verschenken.' },
    { id: 'cola-addict', brand: 'Borntostandout', name: 'Cola Addict', type: 'Eau de Parfum', size: '50 ml', per: '4.140,00 € / 1 l', price: 207.00, img: 'img/p2.jpg', for: 'unisex', family: ['süß','fruchtig'], tag: 'Nischenparfum', popular: 66, added: 9 },
    { id: 'just-perfect', brand: 'Marc Jacobs', name: 'Just Perfect', type: 'Eau de Parfum', size: '30 ml', per: '1.920,00 € / 1 l', price: 57.60, from: true, img: 'img/p3.jpg', for: 'damen', family: ['blumig','fruchtig'], popular: 74, added: 11 },
    { id: 'good-girl-mini', brand: 'Carolina Herrera', name: 'Good Girl Miniaturen Set', type: 'Set', size: 'Set', price: 37.13, img: 'img/p4.jpg', set: true, for: 'damen', family: ['süß','würzig'], popular: 88, added: 10 },
    { id: 'good-girl-set', brand: 'Carolina Herrera', name: 'Good Girl', type: 'Eau de Parfum Set', size: 'Set', price: 91.50, img: 'img/p5.jpg', set: true, for: 'damen', family: ['süß','würzig'], popular: 92, added: 8 },
    { id: 'idole-set', brand: 'Lancôme', name: 'Idôle', type: 'Eau de Parfum Set', size: 'Set', price: 79.50, img: 'img/p7.jpg', set: true, for: 'damen', family: ['blumig'], popular: 79, added: 7 },
    { id: 'libre-vanille', brand: 'Yves Saint Laurent', name: 'Libre Vanille Couture', type: 'Eau de Parfum', size: '50 ml', per: '2.167,50 € / 1 l', price: 108.38, img: 'img/p8.jpg', badge: 'limitiert', for: 'damen', family: ['süß','blumig'], popular: 95, added: 13 },
    { id: 'la-vie-est-belle', brand: 'Lancôme', name: 'La vie est belle', type: 'Eau de Parfum Set', size: 'Set', price: 55.31, img: 'img/p9.jpg', set: true, for: 'damen', family: ['süß','blumig'], popular: 97, added: 6 },
    { id: 'tresor', brand: 'Lancôme', name: 'Trésor', type: 'Eau de Parfum Set', size: 'Set', price: 45.45, img: 'img/p10.jpg', set: true, for: 'damen', family: ['blumig','fruchtig'], popular: 61, added: 4 },
    { id: 'paradoxe', brand: 'Prada', name: 'Paradoxe', type: 'Eau de Parfum Set', size: 'Set', price: 98.63, img: 'img/p11.jpg', set: true, for: 'damen', family: ['blumig'], popular: 84, added: 3 },
    { id: 'molecule-01-champaca', brand: 'Escentric Molecules', name: 'Molecule 01 + Champaca', type: 'Eau de Toilette', size: '100 ml', per: '1.665,00 € / 1 l', price: 166.50, img: 'img/p12.jpg', for: 'unisex', family: ['holzig','blumig'], tag: 'Nischenparfum', popular: 82, added: 2 }
  ]
};
G64.byId = id => G64.products.find(p => p.id === id);
G64.fmt = n => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
G64.full = p => `${p.brand} ${p.name}${p.type && p.type !== 'Set' ? ' ' + p.type : ''}`;
G64.forMatch = (p, sel) => !sel.size || sel.has(p.for) || (p.for === 'unisex' && (sel.has('damen') || sel.has('herren')));
G64.href = p => `produkt.html?id=${p.id}`;
