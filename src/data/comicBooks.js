// Sample comic book inventory extracted from the legacy SuperTrade
// markup. Each book has an id, title, price and metadata such as
// publisher, era, grade, condition and any special attributes.

const comicBooks = [
  {
    id: 'cb-0',
    title: 'Amazing Spider-Man #300',
    price: 899.0,
    publisher: 'marvel',
    era: 'modern',
    grade: 'raw',
    condition: 'vf',
    attrs: ['variant'],
  },
  {
    id: 'cb-1',
    title: 'Batman Adventures #12',
    price: 3999.0,
    publisher: 'dc',
    era: 'modern',
    grade: 'cgc-98',
    condition: '',
    attrs: ['slabbed', 'signed'],
  },
  {
    id: 'cb-2',
    title: 'X‑Men #1 (1963)',
    price: 19999.0,
    publisher: 'marvel',
    era: 'silver',
    grade: 'cgc-60',
    condition: '',
    attrs: ['slabbed'],
  },
];

export default comicBooks;