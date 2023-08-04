import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [showSpec, setShowSpec] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your endpoint to interact with the AI language model
      const response = await fetch('http://localhost:3001/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('There was an error submitting the query:', error);
    }
  };

  const toggleSpec = () => {
    setShowSpec(!showSpec);
  };

  return (
    <div className="landing-page">
      <h1>Welcome to AI Interaction and OpenAPI Spec Viewer</h1>

      <div className="ai-interaction">
        <h2>Interact with AI Language Model:</h2>
        <form onSubmit={handleQuerySubmit}>
          <label htmlFor="query">Enter your query:</label>
          <input type="text" name="query" value={query} onChange={handleInputChange} />
          <button type="submit">Ask</button>
        </form>
        {response && <div className="response"><h3>Response:</h3><p>{response.answer}</p></div>}
      </div>

      <div className="api-spec">
        <h2>OpenAPI Specification:</h2>
        <button onClick={toggleSpec}>Show/Hide Spec</button>
        {showSpec && 
          // Replace with the actual component that displays your OpenAPI spec document
          <div className="spec-document">OpenAPI Specification Document Goes Here</div>
        }
      </div>
    </div>
  );
}

export default LandingPage;
