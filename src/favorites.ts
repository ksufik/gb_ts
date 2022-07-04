import { getFavoritesAmount } from './user.js'

export interface IFavorites {
  id: string,
  name: string,
  img: string
}

export let faivoritesArr = [];
export let favoritesAmount: number;

export function toggleFavoriteItem(id: string, name: string, img: string) {
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

