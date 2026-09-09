
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



module.exports = CATTLE_DATABASE;