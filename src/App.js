import _get from 'lodash.get';
import { getCalendar } from 'calendar-cli';
import React, { useState, useEffect } from 'react';

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
      <div>
        <button onClick={() => setDate(calendar.previousMonth)}>Prev</button>
        <div>
          {`${MONTHS[_get(calendar, 'current.month', 0)]} ${_get(
            calendar,
            'current.year'
          )}`}
        </div>
        <button onClick={() => setDate(calendar.nextMonth)}>Next</button>
      </div>
      <Calendar data={calendar} />
    </div>
  );
}

export default App;
