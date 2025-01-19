class u {
  constructor(e) {
    this.apiBackend = e;
  }
  async CardGenerator(e = 1) {
    const t = document.querySelector('.movies__list');
    (await this.apiBackend.loadAllFilms())
      .sort((n, o) => o.rating - n.rating)
      .slice(0, e)
      .forEach((n) => {
        const o = document.createElement('li');
        o.classList = 'movies__list-item';
        const r = document.createElement('article');
        (r.classList = 'movie-card'), r.setAttribute('id', `${n.id}`), r.setAttribute('aria-label', `${n.title}`);
        const c = document.createElement('img');
        (c.classList = 'movie-card__image'),
          (c.src = `${n.image}`),
          (c.alt = `Omslag för filmen ${n.title}`),
          c.setAttribute('aria-hidden', 'false');
        const v = document.createElement('h3');
        (v.classList = 'movie-card__title'), (v.textContent = `${n.title}`);
        const l = document.createElement('time');
        (l.classList = 'movie-card__date'),
          l.setAttribute('aria-label', `Premiär ${n.date}`),
          (l.textContent = `${n.date}`);
        const d = document.createElement('button');
        (d.classList = 'movie-card__button'),
          (d.textContent = 'Boka biljett'),
          d.setAttribute('aria-label', 'Boka biljett');
        const m = document.createElement('span');
        (m.classList = 'movie-card__genre'),
          (m.textContent = `${n.genre}`),
          m.setAttribute('aria-label', `Genre: ${n.genre}`),
          r.appendChild(c),
          r.appendChild(v),
          r.appendChild(l),
          r.appendChild(m),
          r.appendChild(d),
          o.appendChild(r),
          t.appendChild(o);
      });
  }
}
class p extends EventTarget {
  constructor(e) {
    super(), (this.searchString = e);
  }
  doesFilmMatch(e) {
    var n, o, r, c;
    if (!this.searchString) return !0;
    const t =
        ((o = (n = e == null ? void 0 : e.data) == null ? void 0 : n.title) == null ? void 0 : o.toLowerCase()) || '',
      i =
        ((c = (r = e == null ? void 0 : e.data) == null ? void 0 : r.description) == null ? void 0 : c.toLowerCase()) ||
        '',
      a = this.searchString.toLowerCase();
    return t.includes(a) || i.includes(a);
  }
  render() {
    const e = document.createElement('div');
    e.className = 'moviesSecond__search';
    const t = document.createElement('input');
    return (
      (t.placeholder = 'Sök film'),
      t.addEventListener('keyup', () => {
        (this.searchString = t.value), this.dispatchEvent(new Event('change'));
      }),
      e.append(t),
      e
    );
  }
}
// class h extends EventTarget {
//   constructor(e) {
//     super(), (this.backend = e);
//   }
//   async start(e) {
//     const t = await this.backend.loadAllFilms();
//     (this.filter = new p('')),
//       this.filter.addEventListener('change', () => {
//         this.update();
//       });
//     const i = this.filter.render();
//     e.append(i);
//     const a = document.createElement('ul');
//     (a.className = 'moviesSecond__list'),
//       e.append(a),
//       (this.films = t.map((n) => {
//         const o = this.renderFilm(n);
//         return a.append(o), { data: n, elem: o };
//       }));
//   }
//   update() {
//     this.films.forEach(({ data: e, elem: t }) => {
//       const i = this.filter.doesFilmMatch({ data: e });
//       t.style.display = i ? 'block' : 'none';
//     });
//   }
//   renderFilm(e) {
//     const t = document.createElement('li');
//     return (
//       t.classList.add('moviesSecond__list__elem'),
//       (t.innerHTML = `
//         <img src="${e.image}" class="moviesSecond__list__elem__image"  alt="${e.title}">
//         <h3 class="moviesSecond__list__elem__title">${e.title}</h3>
//         <p class="moviesSecond__list__elem__desc">${e.desc} <strong>(${e.year})</strong></p>
//         <p class="moviesSecond__list__elem__rating">Rating: ${e.rating}</p>
//         <p class="moviesSecond__list__elem__date">Datum: ${e.date}</p>
//         <p class="moviesSecond__list__elem__price">Pris: ${e.price}SEK</p>
//         <p class="moviesSecond__list__elem__seat">Platser: ${e.seatsAvailable}</p>
//     `),
//       t
//     );
//   }
// }
class _ {
  constructor(e) {
    this.apiUrl = e;
  }
  async loadAllFilms() {
    const e = await fetch(this.apiUrl + '/movies');
    if (!e.ok) throw new Error(`Failed to fetch movies: ${e.statusText}`);
    const t = await e.json();
    return console.log(t), t;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const s = document.querySelector('.hamburger'),
    e = document.querySelector('.hamburger__items'),
    t = document.querySelector('.hamburger__close');
  s &&
    e &&
    s.addEventListener('click', () => {
      e.classList.toggle('active'), s.classList.toggle('open');
    }),
    t &&
      t.addEventListener('click', () => {
        e.classList.remove('active'), s.classList.remove('open');
      });
});
class g {
  constructor(e) {
    this.apiPath = e;
  }
  async fetchData() {
    try {
      return (await (await fetch(this.apiPath)).json()).liveEvents;
    } catch (e) {
      return console.error('Error fetching data:', e), [];
    }
  }
}
class L {
  constructor(e) {
    this.container = document.querySelector(e);
  }
  createLiveEvent({ title: e, description: t, image: i }) {
    const a = document.createElement('li');
    return (
      a.classList.add('live__list-item'),
      (a.innerHTML = `
        <div class="live__list-item-image-wrapper">
                <img src="${i}" class="live__list-item-image" alt="${e}" />
            </div>
            <div class="live__list-item-title">
                <h3>${e}</h3>
                <button class="live__list-item-btn" aria-label="Book ticket to live event">BOKA</button>
            </div>
            <div class="live__list-item-description">
                <p>${t}</p>
            </div>
            `),
      a
    );
  }
  renderLiveEvents(e) {
    if (window.location.pathname === '/' || window.location.pathname === '/index') {
      if (!this.container) {
        console.error('Container element not found');
        return;
      }
      if (!Array.isArray(e) || e.length === 0) {
        this.container.innerHTML = '<p> No live events founds.</p>';
        return;
      }
      this.container.innerHTML = '';
      const t = document.createDocumentFragment();
      e.forEach((i) => {
        const a = this.createLiveEvent(i);
        t.appendChild(a);
      }),
        this.container.appendChild(t);
    }
    return null;
  }
}
async function E() {
  const s = '/static/dist/assets/json/liveEvents.json',
    e = new g(s),
    t = new L('.live__list');
  try {
    const i = await e.fetchData();
    t.renderLiveEvents(i);
  } catch (i) {
    console.error('Error initializing live events:', i);
  }
}
// if (document.querySelector('.moviesSecond')) {
//   const s = document.createElement('h4');
//   s.classList.add('movies__message__new'),
//     (s.innerText = `Api is starting
// Loading movies... Please wait.`),
//     document.querySelector('.movies__message').appendChild(s),
//     (s.style.display = 'none');
//   const e = new _('https://kino-bio-projekt.onrender.com');
//   //   console.log('Link to API:' + e);
//   const t = new h(e),
//     i = document.querySelector('.moviesSecond');
//   t.start(i, s);
// } else {
//   const s = new _('https://kino-bio-projekt.onrender.com');
//   //   new u(s).CardGenerator(4);
// }
document.addEventListener('DOMContentLoaded', E);
