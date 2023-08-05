import React, { useState, useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './LandingPage.css';
import YAML from 'yaml'; // you will need to install this package

function LandingPage() {
  const [openApiSpec, setOpenApiSpec] = useState(''); // Store the current Open API spec
  const [userRequest, setUserRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // new state for editing
  const [tempSpec, setTempSpec] = useState(''); // Temporary spec for editing

  useEffect(() => {
    if (isEditing) {
      setTempSpec(openApiSpec);
    }
  }, [isEditing, openApiSpec]);

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
  

  const handleOpenSwaggerEditor = () => {
    window.open(`https://editor.swagger.io/?url=${encodeURIComponent(openApiSpec)}`, '_blank');
  };

  const editSpec = () => {
    setIsEditing(true);
  };

  const saveSpec = () => {
    setOpenApiSpec(tempSpec);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTempSpec('');
    setIsEditing(false);
  };

  const handleTempSpecChange = (e) => {
    setTempSpec(e.target.value);
  };

  const handleDownload = (format) => {
    let text = openApiSpec;
    let filename = 'api-spec';
    let mimetype = 'application/json';
    if (format === 'yaml') {
      text = YAML.stringify(JSON.parse(openApiSpec));
      mimetype = 'application/x-yaml';
      filename += '.yaml';
    } else {
      filename += '.json';
    }
    const blob = new Blob([text], { type: mimetype });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
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
        <div className="header">
          <h2>OpenAPI Specification:</h2>
          <div className="button-group">
            {isEditing ? (
              <>
                <button onClick={saveSpec}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={editSpec}>Edit Spec</button>
                <div className="dropdown">
                  <button className="dropbtn">Download</button>
                  <div className="dropdown-content">
                    <a onClick={() => handleDownload('json')}>JSON</a>
                    <a onClick={() => handleDownload('yaml')}>YAML</a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {isEditing ? (
          <textarea
            value={tempSpec}
            onChange={handleTempSpecChange}
            className="spec-edit"
          />
        ) : (
          <SwaggerUI spec={JSON.parse(openApiSpec ? openApiSpec : "{}")} />
        )}
      </div>
    </div>
  );
}

export default LandingPage;