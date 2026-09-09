const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
async function testGemini() {
  try {
    console.log("Testing Gemini API...");

    const models = await ai.models.list();

    for await (const model of models) {
      console.log("AVAILABLE MODEL:", model.name);
    }

  } catch (error) {
    console.error("GEMINI MODEL TEST ERROR:");
    console.error(error);
  }
}

testGemini();


const ejsMate = require("ejs-mate");
// const MONGO_URL = "mongodb://127.0.0.1:27017/AI_FARM";

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const CROP_DATABASE = require('./init_data/cropData');
const CATTLE_DATABASE = require('./init_data/cattle_data');
 


app.get('/api/crops/advisory', (req, res) => {
  const { state, crop, season } = req.query;
  const key = `${state}-${crop}-${season}`;
  const data = CROP_DATABASE[key];

  if (data) {
    res.json({ success: true, data });
  } else {
    res.json({
      success: true,
      data: {
        title: `${crop} Field`,
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
        window: 'Custom window: 15–30 days from onset',
        notes: `Advisory estimated for ${crop} during ${season} in ${state}`,
        schedule: [
          { step: 1, title: 'Land Preparation', desc: 'Deep plowing and weed cleanup' },
          { step: 2, title: 'Sowing/Planting', desc: 'Optimum spacing and moisture' },
          { step: 3, title: 'Weed Control', desc: 'Within 20–35 days' },
          { step: 4, title: 'Maturity Check', desc: 'Standard cycle monitoring' }
        ]
      }
    });
  }
});

app.get('/api/cattle/diet', (req, res) => {
  const breed = req.query.breed;
  const data = CATTLE_DATABASE[breed];

  if (data) {
    res.json({ success: true, data });
  } else {
    res.status(404).json({ success: false, error: 'Breed advisory not found' });
  }
});



app.post('/api/chat', async(req, res)=>{
  try {
    const {message} = req.body;
    if(!message){
      return res.status(400).json({
        error: 'Message required'
      });
    }
    console.log("User message: ", message);
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction:
        'You are Krishi mitra, an Ai farm Advisor for Indian farmers, Provide practical, clear, concise advice in 3-4 sentence.'
      }
    });
    console.log("Gemini response :", response);
    const reply = response.text;
    console.log("Gemini text: ", reply);
    res.json({
      reply: reply || "Sorry , I couldn't generate a response."
    });

  }
  catch(err){
    console.error('Gemini API Error: ', err);
    res.status(500).json({
      error: err.message || 'Gemini API failed'
    });
  }
});




app.listen(PORT, () => {
  console.log(`Krishi Mitra server running on http://localhost:${PORT}`);
});


