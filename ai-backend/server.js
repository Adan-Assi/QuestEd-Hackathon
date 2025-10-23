const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());





app.post('/api/ask', async (req, res) => {
  const { system, message } = req.body;

  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: system },  // system prompt: sjimulate the figure
          { role: 'user', content: message }
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        }
      }
    );

    const reply = openaiRes.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ reply: "Sorry, I couldn't connect to the AI server." });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ AI backend running on port ${PORT}`));
