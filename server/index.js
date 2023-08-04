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
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3001;

app.post('/generate', async (req, res) => {
  try {
    console.log('Received request:', req.body);

    // Read the template
    const template = fs.readFileSync('promptTemplate.txt', 'utf8');

    // Extract user input and convert to JSON string
    const userInput = JSON.stringify(req.body);

    // Replace the placeholder with the actual user input
    const prompt = template.replace('USER_INPUT_PLACEHOLDER', userInput);

    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    
    // Extract the response
    const itinerary = JSON.parse(chat_completion.data.choices[0].message.content);
    console.log(chat_completion.data.choices[0].message.content);

    // Respond to the client
    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while generating the itinerary.');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

