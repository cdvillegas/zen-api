import React, { useState, useEffect } from 'react';
import './InterestsSelector.css';

const allInterests = [
  'Sightseeing', 'Outdoor Activities', 'Nightlife', 'Food Exploration',
  'Shopping', 'Events & Festivals', 'Beaches', 'Museums', 'Hiking',
  'Biking', 'Fishing', 'Camping', 'Theatre',
  'Historical Sites', 'Zoos', 'Aquariums', 'Botanical Gardens',
  'Amusement Parks', 'Arcades', 'Photography',
  'Climbing', 'Skydiving', 'Paragliding', 'Yoga', 'Meditation Retreats',
  'Cooking Classes', 'Wine Tasting', 'Craft Beer Sampling',
  'Farmers Markets', 'Skiing', 'Skating', 'Surfing', 'Whale Watching',
  'Sailing', 'Canoeing', 'Kayaking', 'Scuba Diving', 'Snorkeling',
  'Horseback Riding', 'Rock Collecting', 'Fossil Hunting', 'Stargazing',
  'Hot Air Ballooning', 'Mountain Biking',
  'Educational Workshops', 'Spa Retreats','Wildlife',
];

function InterestsSelector({ interests, setInterests }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const results = allInterests.filter(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
      setSearchTerm(''); // Clear the search term after adding the interest
    }
  };

  return (
    <div className="interests-selector">
      <label>Interests:</label>
      <div className="selected-interests">
        {interests.length > 0 ? (
          interests.map((interest, index) => (
            <div key={index} className="interest" onClick={() => { toggleInterest(interest); }}>
              {interest}
            </div>
          ))
        ) : (
          <div className="no-interests">No Interests Added Yet</div>
        )}
      </div>
      <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search interests..." />
      {searchTerm && (
        <ul className="search-results">
          {searchResults.map((result, index) => (
            <li key={index} onClick={() => { toggleInterest(result); }}>
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InterestsSelector;
