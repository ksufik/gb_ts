import { getDate, ISearchFormData, renderSearchFormBlock, search } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { avatar, favorites, name, renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

window.addEventListener('DOMContentLoaded', () => {

  let formData: ISearchFormData = {
    city: "Санкт-Петербург",
    checkIn: getDate('checkIn'),
    checkOut: getDate('checkOut'),
    price: 0
  }

  renderUserBlock(name, avatar, favorites)
  renderSearchFormBlock(formData);
  renderSearchStubBlock()
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  )

  /** Брать элементы из DOM тогда когда они появились в нём, т.е. после всех ф-ций рендер*/
  const state = {}
  const form = document.getElementById('form')
  const btnSearch = document.getElementById('btn-search')

  // form.addEventListener('load', () => {
  //   // const valueControl = (HTMLFormElement)
  //   // const nameControl = (e.target as HTMLFormElement).name

  //   // state[nameControl] = valueControl

  //   // console.log('form load state', valueControl);
  //   console.log('page is fully loaded');
  // })




  form.addEventListener('change', function (e: Event) {
    const valueControl = (e.target as HTMLFormElement).value
    const nameControl = (e.target as HTMLFormElement).name

    formData[nameControl] = valueControl
  })

  btnSearch.addEventListener('click', function (e: MouseEvent) {
    e.preventDefault()

    search(formData);
  })

})


