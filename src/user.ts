import { renderBlock } from './lib.js'


//для простоты оставила так..
export const USER = {
  username: 'Wade Warren',
  avatarUrl: '/img/avatar.png'
}

//если делать таким способом, то потом надо строку преобразовывать в объект. Я не придумала, как это сделать. Поэтому согласно заданию, функция читает из localStorage, но это нигда не применяется.
//Без setItem возвращается null
localStorage.setItem('user', '{username: "Wade Warren", avatarUrl: "/img/avatar.png"}');



export function getUserData(user: unknown) {
  // зачем нужно было читать именно из localStorage?

  // let user = localStorage.getItem('user');
  // let userObj = (user);
  // return userObj;

  if (user === Object) {
    return null;
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
