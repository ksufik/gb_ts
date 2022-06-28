import { renderBlock } from './lib.js'
import { getFavoritesAmount } from './user.js'

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

interface IPlace {
  id: number,
  bookedDates: [],
  description: string,
  image: string,
  name: string,
  price: number,
  remoteness: number
}

export interface IFavorites {
  id: string,
  name: string,
  img: string
}

export let faivoritesArr = [];
export let favoritesAmount: number;

function toggleFavoriteItem(id: string, name: string, img: string) {
  const newPlace: IFavorites = {
    id: id,
    name: name,
    img: img
  }

  if (faivoritesArr.find(elem => elem.id === newPlace.id)) {
    faivoritesArr = faivoritesArr.filter(elem => elem.id != newPlace.id);
  } else {
    faivoritesArr.push(newPlace);
  }


  favoritesAmount = getFavoritesAmount(faivoritesArr);
  console.log(favoritesAmount);
}


export function renderSearchResultsBlock(places: IPlace) {
  let itemsListPlaces = '';


  if (Array.isArray(places) && places.length > 0) {
    places.forEach(place => {
      itemsListPlaces += `  <li class="result">
<div class="result-container">
  <div class="result-img-container">
    <div id=${place.id} name="${place.name}" image=${place.image} class="favorites active favorite-place"></div>
    <img class="result-img" src=${place.image} alt=${place.name}>
  </div>	
  <div class="result-info">
    <div class="result-info--header">
      <p>${place.name}</p>
      <p class="price">${place.price}</p>
    </div>
    <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness} км от вас</div>
    <div class="result-info--descr">${place.description}</div>
    <div class="result-info--footer">
      <div>
        <button>Забронировать</button>
      </div>
    </div>
  </div>
</div>
</li>`
    })
  }
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
    </ul>
    `
  )

  const nodeListPlace = document.querySelector('.results-list');
  nodeListPlace.insertAdjacentHTML('afterbegin', itemsListPlaces);

  let favoritePlaces = document.querySelectorAll('.favorite-place');
  favoritePlaces.forEach(favoritePlace => {

    let placeId = favoritePlace.getAttribute('id');
    let placeName = favoritePlace.getAttribute('name');
    let placeImg = favoritePlace.getAttribute('image');

    favoritePlace.addEventListener('click', function (e: MouseEvent) {
      toggleFavoriteItem(placeId, placeName, placeImg);
    })
  })

}
