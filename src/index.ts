import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock, USER } from './user.js'
import { renderToast } from './lib.js'

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(USER.username, USER.avatarUrl, 0)
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  )
})

/** Брать элементы из DOM тогда когда они появились в нём, т.е. после всех ф-ций рендер*/
const state = {}
const form = document.getElementById('form')
const btnSearch = document.getElementById('btn-search')

// form.addEventListener('change', function (e: Event) {
//   const valueControl = (e.target as HTMLFormElement).value
//   const nameControl = (e.target as HTMLFormElement).name

//   state[nameControl] = valueControl

//   console.log('state', state);
// })

btnSearch.addEventListener('click', function (e: MouseEvent) {
  e.preventDefault()
  console.log('state', state);

})
