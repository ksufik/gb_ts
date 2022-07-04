import { formData, renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { name, avatar, renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { favoritesAmount } from './favorites.js'

window.addEventListener('DOMContentLoaded', () => {

  //почему не отображается новое кол-во в избранном?
  renderUserBlock(name, avatar, favoritesAmount)
  renderSearchFormBlock(formData);
  renderSearchStubBlock()
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  )


})


