import React, { useState, useEffect } from "react";
import calendarr from "../../assets/calendar.svg";
import "./Calendar.css";
import { Day } from '../day/Day';
import { NewEventModal } from "../newEventModel/NewEventModel";
import { DeleteEventModal } from '../deleteEventModel/DeleteEventModel';
import { CalendarHeader } from '../calendarHeader/CalendarHeader';
import { useDate } from '../hooks/useDate';

function Calendar() {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events') ? 
      JSON.parse(localStorage.getItem('events')) : 
      []
  );

  const eventForDate = date => events.find(e => e.date === date);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const {days, dateDisplay} = useDate(events, nav);


  return (
    <main>
      <div className="container-fluid">
        <div className="main__title">
          <img src={calendarr} alt="calendar" />
          <div className="main__greeting">
            <h1>Calendar</h1>
            <p>Please check your tasks for the day ! </p>
          </div>
        </div>
        <>
        <div className="calendar-container">
        <div id="container">
        <CalendarHeader 
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== 'padding') {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>
      </div>
      {
        clicked && !eventForDate(clicked) &&
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={title => {
            setEvents([ ...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      }
        {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);
          }}
        />
      }
      </>

      </div>
    </main>
  );
}

export default Calendar;
