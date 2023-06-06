import { GetCities } from "./utils/https.js";

const qS = el => document.querySelector(el);
const cE = el => document.createElement(el);

const createEl = (type, cls = null, textContent = null, parent = null, ...attrs) => {
  const element = cE(type);
  element.className = cls
  element.textContent = textContent;
  attrs.length > 0 ? attrs.forEach(attr => element.setAttribute(attr?.name, attr?.value)) : '';
  element
  parent?.appendChild(element);
  return element;
};

const renderingPopularCard = () => {
  GetCities('/cities')
    .then(data => data.filter(city => {
      city.show_in_popular ? popularCities.push(city) : null;
    }))
    .then(() => popularCities.map(city => createCityCard(city)))
  // GetCities('/cities').then(data => console.log(data))
  // console.log(popularCities)
};

const renderingAllCities = () => {
  GetCities('/cities')
    .then(data => data.map(city => citiesList.push(city)))
    .then(() => {
      citiesList.map(city => createCityCard(city))
    });
};

const renderingSearch = (value) => {
  GetCities('/cities')
    .then(data => data.map(city => searchCities.push(city))
    )
    .then(() => {
      searchCities = searchCities.filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
      return searchCities
    })
    .then(() => searchCities.map(city => createCityCard(city)))
};

const createBodyApp = () => {
  const wrappperApp = createEl('div', 'wrapper_app', null, bodyEl);
  const headerEl = createEl('div', 'header_app', null, wrappperApp);
  const titleEl = createEl('h1', 'title_app', 'cities', headerEl);
  const searchWrap = createEl('div', 'search_wrap', null, headerEl)
  const searchInputEl = createEl('input', 'search_input', null, searchWrap, { name: 'placeholder', value: 'cerca una città' })
  const searchBtnEl = createEl('i', 'search_btn fa-solid fa-magnifying-glass', null, searchWrap);
  const filterWrap = createEl('div', 'filter_wrap', null, wrappperApp)
  const filterTitle = createEl('h2', 'filter_title', 'most popular', filterWrap)
  const btnShowCities = createEl('button', 'show_cities', 'show all', filterWrap);
  const wrapperSliderCard = createEl('div', 'wrapper_slider_card', null, wrappperApp);

  btnShowCities.addEventListener('click', () => {
    if (btnShowCities.textContent === 'show all') {
      btnShowCities.textContent = 'show popular';
      filterTitle.textContent = 'all cities'
      wrapperSliderCard.textContent = '';
      renderingAllCities();
    } else {
      btnShowCities.textContent = 'show all';
      filterTitle.textContent = 'most popular'
      wrapperSliderCard.textContent = '';
      renderingPopularCard();
    }
  });

  searchInputEl.addEventListener('input', (e) => {
    // console.log(e.target.value);
    if (e.target.value === '') {
      btnShowCities.textContent = 'mostra tutte';
      wrapperSliderCard.textContent = '';
      renderingPopularCard();
    } else {
      wrapperSliderCard.textContent = '';
      searchCities = []
      renderingSearch(e.target.value);
    }
  });
};

const createCityCard = (obj) => {
  const wrapperSliderCard = qS('.wrapper_slider_card')
  const wrapperCard = createEl('div', 'wrapper_card', null, wrapperSliderCard);
  const cardImage = createEl('img', 'card_image', null, wrapperCard, { name: 'src', value: obj.cover_image_url }, { name: 'alt', value: 'city image' });
  const cardInfo = createEl('div', 'card_info', null, wrapperCard);
  const cardTitle = createEl('h3', 'card_title', obj.name, cardInfo);
  const wrapLocation = createEl('div', 'wrap_location', null, cardInfo);
  const iconLocation = createEl('i', 'icon_location fa-solid fa-location-dot', null, wrapLocation);
  const location = createEl('p', 'location', obj.country.name, wrapLocation);
  const popularStar = createEl('i', `popular_star ${obj.show_in_popular ? 'fa-solid fa-star' : ''}`, null, wrapperCard);

  wrapperCard.addEventListener('click', (e) => {
    createModalCard(obj)
  })
};

const createModalCard = (obj) => {
  const wrapModal = createEl('div', 'wrap_modal', null, bodyEl)
  const modalImage = createEl('img', 'modal_image', null, wrapModal, { name: 'src', value: obj.cover_image_url }, { name: 'alt', value: 'city image' });
  const popularStarModal = createEl('i', `popular_star_modal ${obj.show_in_popular ? 'fa-solid fa-star' : ''}`, null, wrapModal);
  const infoModal = createEl('div', 'info_modal', null, wrapModal);
  const modalTitle = createEl('h2', 'modal_title', obj.name, infoModal);
  const wrapLocation = createEl('div', 'wrap_location', null, infoModal);
  const iconLocation = createEl('i', 'icon_location fa-solid fa-location-dot', null, wrapLocation);
  const location = createEl('p', 'location', obj.country.name, wrapLocation);
  const descriptionModal = createEl('p', 'description_modal', obj.content, infoModal);
  const returnBtn = createEl('i', 'return_btn fa-solid fa-arrow-left', null, wrapModal);

  returnBtn.addEventListener('click', () => {
    bodyEl.removeChild(wrapModal);
  })
}

const bodyEl = qS('body');
const citiesList = []
const popularCities = []
let searchCities = []

createBodyApp();
renderingPopularCard();