import React, { useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './LandingPage.css';

function LandingPage() {
  const [openApiSpec, setOpenApiSpec] = useState(''); // Store the current Open API spec
  const [userRequest, setUserRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeType, setCodeType] = useState(''); // client or server
  const [language, setLanguage] = useState(''); // Selected language or framework
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [serverDropdownOpen, setServerDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userRequest') setUserRequest(value);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ openApiSpec, userRequest }),
      });
      const data = await response.json();
      setOpenApiSpec(data.apiSpec);
      setUserRequest(''); // Clear the user request input
    } catch (error) {
      console.error('There was an error submitting the query:', error);
    }

    setLoading(false);
  };

  return (
    <div className="landing-page">
      <h1>Welcome to API Cloud</h1>

      <div className="ai-interaction">
        <h2>Interact with AI Language Model:</h2>
        <form onSubmit={handleQuerySubmit}>
          <label htmlFor="userRequest">Enter your request:</label>
          <textarea name="userRequest" value={userRequest} onChange={handleInputChange} />

          <button type="submit" className="submit-button">
            {loading ? <div className="spinner"></div> : 'Submit Request'}
          </button>
        </form>
      </div>

      <div className="api-spec">
        <div class="header">
          <h2>OpenAPI Specification:</h2>
          <div className="dropdowns">
          <div className={`dropdown ${clientDropdownOpen ? 'open' : ''}`}>
            <button onClick={() => setClientDropdownOpen(!clientDropdownOpen)}>Generate Client</button>
            <div className="dropdown-content">
              <a href="#" onClick={() => { setCodeType('client'); setLanguage('javascript'); }}>JavaScript</a>
              <a href="#" onClick={() => { setCodeType('client'); setLanguage('java'); }}>Java</a>
              <a href="#" onClick={() => { setCodeType('client'); setLanguage('python'); }}>Python</a>
            </div>
          </div>

          <div className={`dropdown ${serverDropdownOpen ? 'open' : ''}`}>
            <button onClick={() => setServerDropdownOpen(!serverDropdownOpen)}>Generate Server</button>
            <div className="dropdown-content">
              <a href="#" onClick={() => { setCodeType('server'); setLanguage('spring'); }}>Spring</a>
              <a href="#" onClick={() => { setCodeType('server'); setLanguage('nodejs-express-server'); }}>Node.js Express</a>
            </div>
          </div>
        </div>
      </div>
       <SwaggerUI spec={JSON.parse(openApiSpec ? openApiSpec : "{}")} />
      </div>
    </div>
  );
}

export default LandingPage;
