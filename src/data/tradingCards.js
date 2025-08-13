// Data for the trading cards category. In a real application these
// would likely come from an API. For now we hard‑code a few sample
// items extracted from the original SuperTrade HTML. Each item has
// an id (used in URL paths), a title, price, and metadata such as
// game, rarity, condition and a list of attributes.

const tradingCards = [
  {
    id: 'tc-0',
    title: 'Charizard #4/102',
    price: 349.99,
    game: 'pokemon',
    rarity: 'rare-holo',
    condition: 'lp',
    attrs: ['holo', 'first'],
  },
  {
    id: 'tc-1',
    title: 'Black Lotus (Alpha)',
    price: 99999.99,
    game: 'mtg',
    rarity: 'rare',
    condition: 'graded',
    attrs: ['foil'],
  },
  {
    id: 'tc-2',
    title: 'Blue-Eyes White Dragon (LOB-001)',
    price: 1299.0,
    game: 'ygo',
    rarity: 'ultra-rare',
    condition: 'nm',
    attrs: ['first'],
  },
];

export default tradingCards;