import React from 'react';
import cx from 'classnames';
import _get from 'lodash.get';

import './styles/calendar.css';

import { WEEK_HEADERS } from './constants';

function Calendar(props) {
  return (
    <div className="calendar">
      <div className="calendar-header">
        {WEEK_HEADERS.map((header, i) => (
          <div className="calendar-cell calendar-header-cell" key={i}>
            <div className="cell-content">{header}</div>
          </div>
        ))}
      </div>
      <div className="calendar-content">
        {_get(props, 'data.daysWithPadding', []).map(day => (
          <div
            className={cx('calendar-cell', {
              'other-month': !day.isSameMonth,
              today: day.isToday,
              weekend: day.isWeekend,
            })}
            key={day.dateObj}
          >
            <div className="cell-content">{day.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Calendar;
