import React from 'react';
import './GroupSizeSelector.css';

function GroupSizeSelector({ groupSize, setGroupSize }) {
  return (
    <div>
      <h4>Group Size:</h4>
      <div className="group-size-grid">
      <label className={`group-size-option ${groupSize === 'solo' ? 'selected' : ''}`} onClick={() => setGroupSize('solo')}>
        Solo
      </label>
      <label className={`group-size-option ${groupSize === 'small-group' ? 'selected' : ''}`} onClick={() => setGroupSize('small-group')}>
        Small Group (3-5)
      </label>
      <label className={`group-size-option ${groupSize === 'couple' ? 'selected' : ''}`} onClick={() => setGroupSize('couple')}>
        Couple
      </label>
      <label className={`group-size-option ${groupSize === 'big-group' ? 'selected' : ''}`} onClick={() => setGroupSize('big-group')}>
        Big Group (5+)
      </label>
    </div>
    </div>
  );
}



export default GroupSizeSelector;
