import cx from 'classnames';
import _get from 'lodash.get';
import { getCalendar } from 'calendar-cli';
import React, { useState, useEffect } from 'react';

import './styles/button.css';
import Calendar from './Calendar';
import { MONTHS } from './constants';

const initialDate = new Date();

function App() {
  const [calendar, setCalendar] = useState({});
  const [date, setDate] = useState(initialDate);
  const [direction, setDirection] = useState('');
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setCalendar(getCalendar(date));
  }, [date]);

  function startTransition(fn) {
    setAnimating(true);

    setTimeout(() => {
      fn();
      setAnimating(false);
    }, 500);
  }

  return (
    <div>
      <div className="header">
        <span>Calendar</span>
        <ion-icon name="calendar-outline" />
      </div>
      <div className="calendar-container">
        <div className="calendar-controls">
          <button
            disabled={animating}
            className="btn-icon"
            onClick={() => {
              setDirection('left');
              startTransition(() => {
                setDate(calendar.previousMonth);
              });
            }}
          >
            <ion-icon name="chevron-back-outline" />
          </button>
          <div>
            {calendar.current &&
              `${MONTHS[_get(calendar, 'current.month', 0)]} ${_get(
                calendar,
                'current.year'
              )}`}
          </div>
          <button
            disabled={animating}
            className="btn-icon"
            onClick={() => {
              setDirection('right');
              startTransition(() => {
                setDate(calendar.nextMonth);
              });
            }}
          >
            <ion-icon name="chevron-forward-outline" />
          </button>
        </div>
        <div className="calendar-main">
          <Calendar data={calendar} />
          {calendar.current && animating && (
            <div
              className={cx('transition-body', {
                left: direction === 'left',
                right: direction === 'right',
              })}
            >
              <div className="transition-content">
                <Calendar
                  data={
                    direction === 'left'
                      ? getCalendar(calendar.previousMonth)
                      : calendar
                  }
                />
              </div>
              <div className="transition-content">
                <Calendar
                  data={
                    direction === 'left'
                      ? calendar
                      : getCalendar(calendar.nextMonth)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
