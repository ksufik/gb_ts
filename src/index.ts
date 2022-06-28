import { formData, renderSearchFormBlock } from './search-form.js'
import { favoritesAmount, renderSearchStubBlock } from './search-results.js'
import { avatar, name, renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

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


