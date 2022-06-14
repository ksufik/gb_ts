import { renderBlock } from './lib.js'

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
      let checkInDate = currentDateNum + 1;
      let checkInMonth = currentMonthNum;
      if (checkInDate > lastDay) {
        checkInDate = checkInDate - lastDay;
        checkInMonth += 1;
      }
      let checkInDateStr = checkInDate < 10 ? "0" + String(checkInDate) : String(checkInDate);
      let checkInMonthStr = checkInMonth < 10 ? "0" + String(checkInMonth) : String(checkInMonth);

      return [currentYear, checkInMonthStr, checkInDateStr].join('-')

    case 'min':
      curDateArr.reverse();
      return curDateArr.join('-');

    case 'max':
      let nextMonth = currentMonthNum + 1;
      let nextMonthStr = nextMonth < 10 ? "0" + String(nextMonth) : String(nextMonth)
      let lastDayOfNextMonth = getLastDayOfMonth(currentYearNum, currentMonthNum + 1)
      return [currentYear, nextMonthStr, lastDayOfNextMonth].join('-');


    case 'checkOut':
      let checkOutDate = currentDateNum + 3;
      let checkOutMonth = currentMonthNum;
      //проверка на последнее число месяца
      if (checkOutDate > lastDay) {
        checkOutDate = checkOutDate - lastDay;
        checkOutMonth += 1;
      }
      let checkOutMonthStr = checkOutMonth < 10 ? "0" + String(checkOutMonth) : String(checkOutMonth);
      let checkOutDateStr = checkOutDate < 10 ? "0" + String(checkOutDate) : String(checkOutDate);
      return [currentYear, checkOutMonthStr, checkOutDateStr].join('-');

  }
}

export function renderSearchFormBlock(checkIn = getDate('checkIn'), checkOut = getDate('checkOut')) {
  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${checkIn} min=${getDate('min')} max=${getDate('max')} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${checkOut} min=${getDate('min')} max=${getDate('max')} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
