import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import './autocomplete-officer.css';

function AutoCompleteOfficer(props) {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  async function handleInput(event) {
    // Since we're controlling the input value, we always need to set it to what the user typed.
    setSelectedValue(event.target.value);
    // If the query is blank, do not show suggestions.
    if (!event.target.value) {
      setSuggestions([]);
      return;
    }
    // Go get data from the backend, and wrap it in display markup.
    const response = await fetch(`http://localhost:3001/api/v1/police/${event.target.value}`);
    const data = await response.json();
    const markup = DOMPurify.sanitize(data.reduce((accumulator, currentValue) => accumulator + `<li tabindex="0">${currentValue}</li>`, ''));
    setSuggestions(markup);
  }

  function handleSelect(event) {
    // Since we use this event for both keyboard and click events, bail out if enter isn't pressed.
    if (event.type === 'keyup' && event.key !== 'Enter') return;
    // Only respond if an inner <li> element is selected.
    const element = event.target.closest('li');
    if (!element) return;
    // Set the input suggested value to selected and blank out the suggestions.
    setSelectedValue(element.textContent);
    setSuggestions([]);
  }

  return (
    <div className="autocomplete-officer" onClick={handleSelect} onKeyUp={handleSelect}>
      <label className="autocomplete-officer__label" htmlFor="autocomplete-officer-input">Search for a NYPD officer</label>
      <input className="autocomplete-officer__input" name="autocomplete-officer-input" onChange={handleInput} value={selectedValue} placeholder="Enter officer name…" type="search" />
      <ul className="autocomplete-officer__results" dangerouslySetInnerHTML={{__html: suggestions}}></ul>
    </div>
  );
}

export default AutoCompleteOfficer;
