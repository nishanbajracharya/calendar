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
}
