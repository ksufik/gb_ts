import { toggleFavoriteItem } from './favorites.js';
import { IFormattedDatabase } from './flat-rent-sdk/flat-rent-sdk.js';
import { renderBlock } from './lib.js'
import { IPlace } from './results-from-api.js';


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

let itemsListPlaces = '';

export function renderSearchResultsBlock(places: IPlace[] | IFormattedDatabase[]) {

  if (Array.isArray(places) && places.length > 0) {
    places.forEach(place => {
      itemsListPlaces += `  <li class="result">
<div class="result-container">
  <div class="result-img-container">
    <div id=${place.id} name="${place.name ? place.name : place.title}" image=${place.image ? place.image : place.photos[0]} class="favorites active favorite-place"></div>
    <img class="result-img" src=${place.image ? place.image : place.photos[0]} alt=${place.name ? place.name : place.title}>
  </div>	
  <div class="result-info">
    <div class="result-info--header">
      <p>${place.name ? place.name : place.title}</p>
      <p class="price">${place.price ? place.price : place.totalPrice}</p>
    </div>
    <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness ? place.remoteness + 'км от вас' : place.coordinates} </div>
    <div class="result-info--descr">${place.description ? place.description : place.details}</div>
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
