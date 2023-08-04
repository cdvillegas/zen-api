const cors = require('cors');
const express = require('express');
const fs = require('fs');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.post('/generate', async (req, res) => {
  try {
    console.log('Received request:', req.body);

    // Read the current Open API spec
    const openApiSpec = req.body.openApiSpec;

    // Extract user request
    const userRequest = req.body.userRequest;

    // Read the prompt template
    let promptTemplate = fs.readFileSync('promptTemplate.txt', 'utf8');

    // Replace the placeholders with the actual values
    promptTemplate = promptTemplate.replace('OPEN_API_SPEC_HERE', openApiSpec);
    promptTemplate = promptTemplate.replace('USER_REQUEST', userRequest);

    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptTemplate }],
    });

    // Extract the response
    const apiSpecResponse = chat_completion.data.choices[0].message.content;
    console.log(apiSpecResponse);

    // Respond to the client
    res.json({ apiSpec: apiSpecResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the request.');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
