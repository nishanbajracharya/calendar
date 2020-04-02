import _get from 'lodash.get';
import { getCalendar } from 'calendar-cli';
import React, { useState, useEffect } from 'react';

import './styles/button.css';
import Calendar from './Calendar';
import { MONTHS } from './constants';

const initialDate = new Date();

function App() {
  const [date, setDate] = useState(initialDate);
  const [calendar, setCalendar] = useState({});

  useEffect(() => {
    setCalendar(getCalendar(date));
  }, [date]);

  return (
    <div>
      <div className="header">
        <span>Calendar</span>
        <ion-icon name="calendar-outline" />
      </div>
      <div className="calendar-container">
        <div className="calendar-controls">
          <button
            className="btn-icon"
            onClick={() => setDate(calendar.previousMonth)}
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
            className="btn-icon"
            onClick={() => setDate(calendar.nextMonth)}
          >
            <ion-icon name="chevron-forward-outline" />
          </button>
        </div>
        <Calendar data={calendar} />
      </div>
    </div>
  );
}

export default App;
