import { renderBlock } from './lib.js'
import { IFavorites } from './search-results.js'

class User {
  username: string
  avatarUrl: string

  constructor(username: string, avatarUrl: string) {
    this.username = username
    this.avatarUrl = avatarUrl
  }
}


//для простоты оставила так..
export const USER = new User('Wade Warren', '/img/avatar.png');
export let name: string;
export let avatar: string;

//если делать таким способом, то потом надо строку преобразовывать в объект. Я не придумала, как это сделать. Поэтому согласно заданию, функция читает из localStorage, хотя это нигде и не применяется.
//Без setItem возвращается null
localStorage.setItem('user', '{username: "Wade Warren", avatarUrl: "/img/avatar.png"}');



export function getUserData(user: unknown): User | string {
  if (user instanceof User) {
    return user;
  }

  return user.toString();
}
//как-то все очень запутанно, сначала мы проверяем тип получаемых данных (user), а затем проверяем тип вовзращенных данных (getUserData())
const userData = getUserData(USER);
if (userData instanceof User) {
  name = userData.username;
  avatar = userData.avatarUrl
} else {
  name = 'noname';
  avatar = '';
}


//тут возникла ошибка, как правильно указать тип в faivoritesArr в search-results.ts? favoritesAmount: IFavorites?
export function getFavoritesAmount(favoritesArr): number {

  return favoritesArr.length;
}



export function renderUserBlock(
  name: string,
  avatarSrc: string,
  favoriteItemsAmount: number

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
            <i id="user-faivor" class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
