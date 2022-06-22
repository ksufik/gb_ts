import { renderBlock } from './lib.js'
import { ONE_MONTH, ONE_DAY, TWO_DAY } from './constants.js'
import { BASE_URL } from './API/index.js'

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

function handleSubmit() {

  return null
}
//как создавать обработчики в ts? в запросах только ts + react
function test(e) {
  // return console.log(e);
  e.preventDefault();
  console.log('test');
}



interface ISearchFormData {
  city: string
  ckeckIn: string
  ckeckOut: string
  maxPrice: number
}

const reguest: ISearchFormData = {
  city: "Санкт-Петербург",
  ckeckIn: "2022-11-26",
  ckeckOut: "2022-11-29",
  maxPrice: 800
}

// onclick="test()"

export function renderSearchFormBlock(checkIn = getDate('checkIn'), checkOut = reguest.ckeckOut) {
  renderBlock(
    'search-form-block',
    `
   
    <form id="form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value=${reguest.city} />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${checkIn} min=${getDate('min')} max=${getDate('max')} name="checkin" }/>
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${checkOut} min=${getDate('min')} max=${getDate('max')} name="checkout" />
          </div>
          <div>
            <label for="max-price" >Макс. цена суток</label>
            <input id="max-price" type="text" value=${reguest.maxPrice} name="price" class="max-price" />
          </div>
          <div>
            <div id="btn-search"><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}


// form.addEventListener('change', function (e) {
//   // тут можно будет работать с полями формы
//   console.log(e);
// })


// const btnSearch = document.getElementById("btn-search");
// btnSearch.addEventListener<"click">("click", (event: MouseEvent) => {
//   event.preventDefault();
//   fetchPlaces();
// })

function fetchPlaces() {
  fetch(BASE_URL + '/places/1')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error:${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
}
