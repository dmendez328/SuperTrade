// Example video game listings. Each object contains an id, title,
// price, platform, genre, region, condition, format and any
// additional attributes. These were taken from the sample HTML and
// illustrate how different fields might vary by game.

const videoGames = [
  {
    id: 'vg-0',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    price: 59.99,
    platform: 'switch',
    genre: 'adventure',
    region: 'ntsc-u',
    condition: 'new',
    format: 'physical',
    attrs: ['sealed', 'cib'],
  },
  {
    id: 'vg-1',
    title: 'God of War Ragnarök',
    price: 34.99,
    platform: 'ps5',
    genre: 'action',
    region: 'ntsc-u',
    condition: 'used',
    format: 'physical',
    attrs: ['cib'],
  },
  {
    id: 'vg-2',
    title: 'Super Mario 64',
    price: 39.99,
    platform: 'n64',
    genre: 'platformer',
    region: 'ntsc-u',
    condition: 'cart-only',
    format: 'physical',
    attrs: [],
  },
];

export default videoGames;