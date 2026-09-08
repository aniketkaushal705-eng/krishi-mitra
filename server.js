const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express('path');
const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database for crops with visual imagery
const CROP_DATABASE = {
  'Maharashtra-Wheat-Rabi season': {
    title: 'Wheat (गेहूं / गहू)',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    window: 'Nov 5 – Nov 25',
    notes: 'Avg. rainfall 12mm · soil temp 18–22°C ideal for this district',
    schedule: [
      { step: 1, title: 'Basal fertilizer', desc: 'DAP + Urea at sowing' },
      { step: 2, title: 'First irrigation', desc: '20–25 days after sowing' },
      { step: 3, title: 'Top dressing', desc: 'Urea at crown root initiation' },
      { step: 4, title: 'Harvest', desc: '120–140 days, grain hardens' }
    ]
  },
  'Maharashtra-Cotton-Kharif season': {
    title: 'Cotton (कपास / कापूस)',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    window: 'Jun 15 – Jul 10',
    notes: 'Requires early monsoon arrival · deep black soil optimal',
    schedule: [
      { step: 1, title: 'Seed treatment', desc: 'Imidacloprid for sucking pests' },
      { step: 2, title: 'Vegetative check', desc: 'Monitor bollworm at 45 days' },
      { step: 3, title: 'Boll development', desc: 'Maintain regular soil moisture' },
      { step: 4, title: 'Harvesting', desc: 'Multi-stage picking as bolls open' }
    ]
  },
  'Maharashtra-Onion-Rabi season': {
    title: 'Onion (प्याज़ / कांदा)',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    window: 'Nov 1 – Dec 15',
    notes: 'Requires well-drained loam · frost sensitive in late stages',
    schedule: [
      { step: 1, title: 'Nursery prep', desc: 'Raised beds with fungicide drenching' },
      { step: 2, title: 'Transplanting', desc: '6-8 week seedlings in field' },
      { step: 3, title: 'Nutrient application', desc: 'Sulfur and potash supplement' },
      { step: 4, title: 'Harvesting', desc: 'When 50% tops fall down' }
    ]
  }
};

// Database for cattle with breed photographs
const CATTLE_DATABASE = {
  'Gir': {
    title: 'Gir Cow (गीर गाय)',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    diet: [
      { item: 'Green fodder', amt: '25–30 kg' },
      { item: 'Dry fodder', amt: '5–6 kg' },
      { item: 'Concentrate mix', amt: '1 kg per 2.5L milk' },
      { item: 'Mineral mixture', amt: '50 g' },
      { item: 'Clean water', amt: '60–80 L' }
    ],
    vaccine: { name: 'FMD vaccination', due: 'Due in 12 days · herd-wide' }
  },
  'Sahiwal': {
    title: 'Sahiwal Cow (साहीवाल)',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    diet: [
      { item: 'Green fodder', amt: '28–32 kg' },
      { item: 'Dry fodder', amt: '6–7 kg' },
      { item: 'Concentrate mix', amt: '1 kg per 2.0L milk' },
      { item: 'Mineral mixture', amt: '60 g' },
      { item: 'Clean water', amt: '70–90 L' }
    ],
    vaccine: { name: 'Brucellosis test', due: 'Due in 25 days · adult cows' }
  },
'Murrah': {
    title: 'Murrah Buffalo (मुर्रा भैंस)',
    image: '/Murrah_buffalo.jpg',
    diet: [
        { item: 'Green fodder', amt: '35-40 kg' },
        { item: 'Dry fodder', amt: '8-10 kg' },
        { item: 'Concentrate mix', amt: '1 kg per 2.0L milk' },
        { item: 'Mineral mixture', amt: '75 g' },
        { item: 'Clean water', amt: '90-110 L' }
    ],
    vaccine: {
        name: 'Theileriosis vaccination',
        due: 'Scheduled in 30 days'
    }
},
  'Jersey cross': {
    title: 'Jersey Crossbreed (जर्सी संकर)',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    diet: [
      { item: 'Green fodder', amt: '30–35 kg' },
      { item: 'Dry fodder', amt: '6–8 kg' },
      { item: 'Concentrate mix', amt: '1 kg per 2.2L milk' },
      { item: 'Mineral mixture', amt: '70 g' },
      { item: 'Clean water', amt: '80–100 L' }
    ],
    vaccine: { name: 'Theileriosis vaccination', due: 'Scheduled in 30 days' }
  }
};

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

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const systemInstruction = `You are Krishi Mitra, an AI farm advisor for Indian farmers. Provide practical, clear, concise advice in 3-4 sentences.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    res.json({ reply: response.text || "Sorry, I couldn't generate a response." });
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ error: 'Failed to process AI response with Gemini.' });
  }
});

app.listen(PORT, () => {
  console.log(`Krishi Mitra server running on http://localhost:${PORT}`);
});