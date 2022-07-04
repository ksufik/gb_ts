import { renderBlock } from './lib.js'
import { ONE_MONTH, ONE_DAY, TWO_DAY } from './constants.js'
import { BASE_URL } from './API/index.js'
import { renderSearchResultsBlock } from './search-results.js';
import { FlatRentSdk, IParameters } from './flat-rent-sdk/flat-rent-sdk.js';

function getLastDayOfMonth(year: number, month: number) {
  let date = new Date(year, month, 0);
  return date.getDate();
}

function getDate(dateType: string) {
  let currentDate = new Date(Date.now()).toLocaleDateString();
  let curDateArr = currentDate.split(".");
  let [currentDay, currentMonth, currentYear] = curDateArr;

  let currentDateNum = Number(currentDay);
  let currentMonthNum = Number(currentMonth);
  let currentYearNum = Number(currentYear);

  let lastDay = getLastDayOfMonth(currentYearNum, currentMonthNum);

  switch (dateType) {
    //проверка на последний день в месяце
    case 'checkIn':
      let checkInDate = currentDateNum + ONE_DAY;
      let checkInMonth = currentMonthNum;
      if (checkInDate > lastDay) {
        checkInDate = checkInDate - lastDay;
        checkInMonth += ONE_MONTH;
      }
      let checkInDateStr = checkInDate < 10 ? "0" + String(checkInDate) : String(checkInDate);
      let checkInMonthStr = checkInMonth < 10 ? "0" + String(checkInMonth) : String(checkInMonth);

      return [currentYear, checkInMonthStr, checkInDateStr].join('-')

    case 'min':
      curDateArr.reverse();
      return curDateArr.join('-');

    case 'max':
      let nextMonth = currentMonthNum + ONE_MONTH;
      let nextMonthStr = nextMonth < 10 ? "0" + String(nextMonth) : String(nextMonth)
      let lastDayOfNextMonth = getLastDayOfMonth(currentYearNum, currentMonthNum + ONE_MONTH)
      return [currentYear, nextMonthStr, lastDayOfNextMonth].join('-');


    case 'checkOut':
      let checkOutDate = currentDateNum + TWO_DAY + TWO_DAY;
      let checkOutMonth = currentMonthNum;
      //проверка на последнее число месяца
      if (checkOutDate > lastDay) {
        checkOutDate = checkOutDate - lastDay;
        checkOutMonth += ONE_MONTH;
      }
      let checkOutMonthStr = checkOutMonth < 10 ? "0" + String(checkOutMonth) : String(checkOutMonth);
      let checkOutDateStr = checkOutDate < 10 ? "0" + String(checkOutDate) : String(checkOutDate);
      return [currentYear, checkOutMonthStr, checkOutDateStr].join('-');

  }
}

enum EFormData {
  city = 'city',
  checkIn = 'checkIn',
  checkOut = 'checkOut',
  price = 'price',
}

export let formData: ISearchFormData = {
  city: "Санкт-Петербург",
  checkIn: getDate('checkIn'),
  checkOut: getDate('checkOut'),
  price: 0
}

interface ISearchFormData {
  city: string
  checkIn: string
  checkOut: string
  price: number
}



function searchFromAPI(data: ISearchFormData): void {
  console.log('search data: ', data);
}




export function renderSearchFormBlock(formData: ISearchFormData) {
  renderBlock(
    'search-form-block',
    `
   
    <form id="form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for=${EFormData.city}>Город</label>
            <input id=${EFormData.city} type="text" disabled value=${formData.city} />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${formData.checkIn} min=${getDate('min')} max=${getDate('max')} name=${EFormData.checkIn} }/>
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${getDate('checkOut')} min=${getDate('min')} max=${getDate('max')} name=${EFormData.checkOut} />
          </div>
          <div>
            <label for="max-price" >Макс. цена суток</label>
            <input id="max-price" type="text" value=${formData.price} name=${EFormData.price} class="max-price" />
          </div>
          <div>
            <div id="btn-search"><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  /** Брать элементы из DOM тогда когда они появились в нём, т.е. после всех ф-ций рендер*/
  const form = document.getElementById('form')
  const btnSearch = document.getElementById('btn-search')

  form.addEventListener('change', function (e: Event) {
    const valueControl = (e.target as HTMLFormElement).value
    const nameControl = (e.target as HTMLFormElement).name

    formData[nameControl] = valueControl
  })

  btnSearch.addEventListener('click', function (e: MouseEvent) {
    e.preventDefault()

    searchFromAPI(formData);
    fetchPlaces();
  })

  let placesArr = [];

  function fetchPlaces() {
    const coordinates = '59.9386,30.3141';
    const checkInDate = new Date(formData.checkIn).getTime();
    const checkOutDate = new Date(formData.checkOut).getTime();
    fetch(BASE_URL + `/places?coordinates=${coordinates}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&maxPrice=${formData.price}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error:${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        renderSearchResultsBlock(data);
        // placesArr = data;
        console.log('placesArr: ', data)
      })

    fetchFlats();
  }


  function fetchFlats() {
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const flats = new FlatRentSdk;
    const defaultParameters: IParameters = {
      city: formData.city,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      priceLimit: formData.price
    }
    let flatsArr = flats.search(defaultParameters);
    flatsArr.then(data => {
      console.log('flatsArr: ', data)
      renderSearchResultsBlock(data)
    })
  }
}



