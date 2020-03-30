import { getCalendar } from 'calendar-cli';

const calendarHeader = document.querySelector(
  '#app .calendar-container .header'
);
const calendarMain = document.querySelector('#app .calendar-container .main');

const HEADERS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const headerItems = [];
const calendarItems = [];

export function initializeCalendar() {
  calendarHeader.innerHTML = '';
  calendarMain.innerHTML = '';

  HEADERS.forEach(header => {
    const el = document.createElement('div');
    el.classList.add('header-item');
    el.innerHTML = header;

    calendarHeader.appendChild(el);

    headerItems.push(el);
  });

  [...Array(42)]
    .map((_, i) => i)
    .forEach(() => {
      const el = document.createElement('div');
      el.classList.add('day-item');

      calendarMain.appendChild(el);

      calendarItems.push(el);
    });

  resetDays();
  renderCalendar(new Date('2020-03-02'));
}

function resetDays() {
  calendarItems.forEach(el => {
    el.innerHTML = '';
    el.setAttribute('class', 'day-item');
  });
}

function renderCalendar(date) {
  const calendar = getCalendar(date);

  calendar.daysWithPadding.forEach((date, i) => {
    console.log(date);

    date.isToday && calendarItems[i].classList.add('today');
    date.isWeekend && calendarItems[i].classList.add('weekend');
    !date.isSameMonth && calendarItems[i].classList.add('other-month');

    calendarItems[i].innerHTML = date.date;
  });
}
