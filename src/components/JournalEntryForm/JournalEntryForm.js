import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './JournalEntryForm.css'

function MoodOptionsComponent({ onCloseClick, setMood }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodClick = (mood) => {
    setMood(mood);
    setSelectedMood(mood); // Update the selected mood state
  };

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
      <div className={`mood-button ${selectedMood === 'happy' && 'selected'}`} onClick={() => handleMoodClick('happy')}>😀</div>
      <div className={`mood-button ${selectedMood === 'sad' && 'selected'}`} onClick={() => handleMoodClick('sad')}>🥲</div>
      <div className={`mood-button ${selectedMood === 'angry' && 'selected'}`} onClick={() => handleMoodClick('angry')}>😡</div>
      <div className={`mood-button ${selectedMood === 'tired' && 'selected'}`} onClick={() => handleMoodClick('tired')}>😩</div>
      <div className={`mood-button ${selectedMood === 'loved' && 'selected'}`} onClick={() => handleMoodClick('loved')}>🥰</div>

    </div>
  );
}

export const JournalEntryForm = ({ selectedDate, onSave, entry }) => {
  const [mood, setMood] = useState('');
  const [journalEntry, setJournalEntry] = useState('');

  useEffect(() => {
    setJournalEntry(entry || ''); // Set the initial value of the textarea
  }, [entry]);

  const handleSave = () => {
    onSave(selectedDate, mood, journalEntry); // Pass mood to onSave function
    setJournalEntry(entry);
    setMood(mood);
  };


  return (
    <div className='journal-container'>
      <div className='heading-container'>
        <h2>{selectedDate.getFullYear()}</h2>
        <h1>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate).toUpperCase()}</h1> 
      </div>
      <MoodOptionsComponent setMood={setMood} />
      <textarea className='journal-textarea' type="text"
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
      />
      <button className='save-button' onClick={handleSave}>Save</button>
    </div>
  );
};

JournalEntryForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onSave: PropTypes.func.isRequired,
  entry: PropTypes.string,
};