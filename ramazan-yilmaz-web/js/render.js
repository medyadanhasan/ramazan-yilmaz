// Sayfa içeriğini data/*.json dosyalarından okuyup DOM'a basar.
// Admin panelinden (Decap CMS) yapılan değişiklikler bu JSON dosyalarına
// yazıldığı için, sayfayı yeniden yüklediğinizde yeni içerik otomatik görünür.

async function fetchJSON(path) {
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error('JSON okunamadı: ' + path);
  return res.json();
}

function el(tag, opts = {}) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.html !== undefined) node.innerHTML = opts.html;
  if (opts.text !== undefined) node.textContent = opts.text;
  return node;
}

// Kart görseli: image alanı doluysa fotoğraf, boşsa emoji ikon gösterir.
function cardMedia(icon, image) {
  if (image) {
    const img = el('img', { className: 'card-img' });
    img.src = image;
    img.alt = '';
    return img;
  }
  return el('div', { className: 'icon', text: icon || '' });
}

async function renderIndex() {
  const data = await fetchJSON('data/index.json');

  document.querySelector('#hero .tag').textContent = data.hero.tag;
  document.querySelector('#hero h1').innerHTML =
    `<span>${data.hero.title}</span><br>${data.hero.subtitle}`;
  document.querySelector('#hero p').textContent = data.hero.description;

  const statsWrap = document.querySelector('#stats');
  statsWrap.innerHTML = '';
  data.stats.forEach((s) => {
    const stat = el('div', { className: 'stat' });
    const num = el('div', { className: 'num', text: '0' });
    num.dataset.target = s.target;
    num.dataset.suffix = s.suffix || '';
    stat.append(num, el('div', { className: 'lbl', text: s.label }));
    statsWrap.appendChild(stat);
  });

  const ny = document.querySelector('#ne-yapiyorum');
  ny.querySelector('.section-title').innerHTML = data.ne_yapiyorum.title;
  ny.querySelector('.section-sub').textContent = data.ne_yapiyorum.subtitle;
  const nyGrid = ny.querySelector('.grid');
  nyGrid.innerHTML = '';
  data.ne_yapiyorum.cards.forEach((c) => {
    const card = el('div', { className: 'card' });
    card.append(cardMedia(c.icon, c.image), el('h3', { text: c.title }), el('p', { text: c.text }));
    nyGrid.appendChild(card);
  });

  const uz = document.querySelector('#uzmanlik');
  uz.querySelector('.section-title').innerHTML = data.uzmanlik.title;
  uz.querySelector('.section-sub').textContent = data.uzmanlik.subtitle;
  const chips = uz.querySelector('.chips');
  chips.innerHTML = '';
  data.uzmanlik.chips.forEach((c) => chips.appendChild(el('span', { className: 'chip', text: c })));

  window.initEffects();
}

async function renderHakkimda() {
  const data = await fetchJSON('data/hakkimda.json');
  const section = document.querySelector('#hakkimda-intro');

  section.querySelector('.section-title').innerHTML = data.title;
  section.querySelector('.section-sub').textContent = data.subtitle;

  const photoWrap = document.querySelector('#profile-photo-wrap');
  photoWrap.innerHTML = '';
  if (data.photo) {
    const img = el('img', { className: 'profile-photo' });
    img.src = data.photo;
    img.alt = 'Ramazan Yılmaz';
    photoWrap.appendChild(img);
  }

  const introCard = document.querySelector('#intro-card');
  introCard.innerHTML = '';
  data.intro_paragraphs.forEach((p, i) => {
    const para = el('p', { text: p, className: '' });
    para.style.fontSize = '1.05rem';
    if (i > 0) para.style.marginTop = '1rem';
    introCard.appendChild(para);
  });

  const infoGrid = document.querySelector('#info-grid');
  infoGrid.innerHTML = '';
  data.info_cards.forEach((c) => {
    const card = el('div', { className: 'card' });
    card.append(
      el('div', { className: 'icon', text: c.icon }),
      el('h3', { text: c.title }),
      el('p', { html: c.html })
    );
    infoGrid.appendChild(card);
  });

  document.querySelector('#certificates-title').innerHTML = data.certificates_title;
  const chips = document.querySelector('#certificates-chips');
  chips.innerHTML = '';
  data.certificates.forEach((c) => chips.appendChild(el('span', { className: 'chip', text: c })));

  window.initEffects();
}

async function renderDeneyim() {
  const data = await fetchJSON('data/deneyim.json');

  document.querySelector('#deneyim-title').innerHTML = data.title;
  document.querySelector('#deneyim-subtitle').textContent = data.subtitle;

  const timeline = document.querySelector('#timeline');
  timeline.innerHTML = '';
  data.timeline.forEach((t) => {
    const item = el('div', { className: 't-item reveal' });
    const ul = el('ul');
    t.items.forEach((li) => ul.appendChild(el('li', { text: li })));
    item.append(
      el('div', { className: 't-date', text: t.date }),
      el('h3', { text: t.title }),
      el('div', { className: 't-org', text: t.org }),
      ul
    );
    timeline.appendChild(item);
  });

  window.initEffects();
}

function renderProjectGrid(gridEl, items) {
  gridEl.innerHTML = '';
  items.forEach((p) => {
    const card = el('div', { className: 'card' });
    card.append(
      el('span', { className: 'date', text: p.date }),
      cardMedia(p.icon, p.image),
      el('h3', { text: p.title }),
      el('p', { text: p.text })
    );
    gridEl.appendChild(card);
  });
}

async function renderProjeler() {
  const data = await fetchJSON('data/projeler.json');

  document.querySelector('#ab-title').innerHTML = data.ab_title;
  document.querySelector('#ab-subtitle').textContent = data.ab_subtitle;
  renderProjectGrid(document.querySelector('#ab-grid'), data.ab_projects);

  document.querySelector('#gonullu-title').innerHTML = data.gonullu_title;
  document.querySelector('#gonullu-subtitle').textContent = data.gonullu_subtitle;
  renderProjectGrid(document.querySelector('#gonullu-grid'), data.gonullu);

  window.initEffects();
}

async function renderIletisim() {
  const data = await fetchJSON('data/iletisim.json');

  document.querySelector('#iletisim-title').innerHTML = data.title;
  document.querySelector('#iletisim-subtitle').textContent = data.subtitle;

  const phoneLink = document.querySelector('#phone-link');
  phoneLink.textContent = data.phone;
  phoneLink.href = 'tel:' + data.phone_link;

  const emailLink = document.querySelector('#email-link');
  emailLink.textContent = data.email;
  emailLink.href = 'mailto:' + data.email;

  document.querySelector('#address').innerHTML = data.address;
  document.querySelector('#referanslar').textContent = data.referanslar;

  window.initEffects();
}

const RENDERERS = {
  index: renderIndex,
  hakkimda: renderHakkimda,
  deneyim: renderDeneyim,
  projeler: renderProjeler,
  iletisim: renderIletisim,
};

const page = document.body.dataset.page;
const renderFn = RENDERERS[page];
if (renderFn) {
  renderFn().catch((err) => console.error('İçerik yüklenemedi:', err));
}
