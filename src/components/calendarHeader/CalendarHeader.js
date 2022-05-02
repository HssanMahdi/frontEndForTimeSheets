import React from 'react';

export const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {
  return(
    <div id="header">
      
        <button className="buttonCal" onClick={onBack} id="backButton">Back</button>
        <div id="monthDisplay">{dateDisplay}</div>
        <button className="buttonCal" onClick={onNext} id="nextButton">Next</button>
      
    </div>
  );
};