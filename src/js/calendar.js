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

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const headerItems = [];
const calendarItems = [];

let prevDate;
let nextDate;

const currentDate = document.querySelector('.current-date');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

btnPrev.onclick = function() {
  resetDays();
  renderCalendar(prevDate);
};

btnNext.onclick = function() {
  resetDays();
  renderCalendar(nextDate);
};

export function initializeCalendar() {
  calendarHeader.innerHTML = '';
  calendarMain.innerHTML = '';

  HEADERS.forEach(header => {
    const el = document.createElement('div');
    el.classList.add('header-item');
    el.innerHTML = header[0];

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
  renderCalendar(new Date());
}

function resetDays() {
  calendarItems.forEach(el => {
    el.innerHTML = '';
    el.setAttribute('class', 'day-item');
  });
}

function renderCalendar(date) {
  const calendar = getCalendar(date);

  currentDate.innerHTML = `${MONTHS[calendar.current.month]} ${calendar.current.year}`;

  prevDate = calendar.previousMonth;
  nextDate = calendar.nextMonth;

  calendar.daysWithPadding.forEach((date, i) => {
    date.isToday && calendarItems[i].classList.add('today');
    date.isWeekend && calendarItems[i].classList.add('weekend');
    !date.isSameMonth && calendarItems[i].classList.add('other-month');

    calendarItems[i].innerHTML = date.date;
  });
}
