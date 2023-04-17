const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY

const app = express()

app.get('/messages/:question', cors(), async (req, res) => {
  const prompt = `Peux-tu me faire un teaser en environ 200 mots du livre : ${req.params.question}`;

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const answer = response.data.choices[0].message.content;

    res.json({
      question: req.params.question,
      answer,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`))
