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

module.exports = CROP_DATABASE;