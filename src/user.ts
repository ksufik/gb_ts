import { renderBlock } from './lib.js'

export const USER = {
  username: 'Wade Warren',
  avatarUrl: '/img/avatar.png'
}
// не поняла из какого localStorage надо было это взять и как правильно сделать
export function getUserData(user: unknown) {
  if (user === Object) {
    return user;
  }
  return user.toString();
}

export function getFavoritesAmount(favoritesAmount: unknown) {
  if (favoritesAmount === Number) {
    return favoritesAmount;
  }

  if (favoritesAmount === null) {
    return null;
  }

  return favoritesAmount.toString();
}

export function renderUserBlock(
  name: string,
  avatarSrc: string,
  favoriteItemsAmount?: number

) {
  const favoritesCaption = favoriteItemsAmount > 0 ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount > 0 ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarSrc} alt=${name} />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
