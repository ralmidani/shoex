const { database, Shoe } = require('./server/db');

const shoes = [
  {
    brand: 'adidas',
    style: 'Yeezy Boost 350 V2 Butter',
    size: '12',
    upc: 'F36980'
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  },
  {
    brand: '',
    style: '',
    size: '',
    upc: ''
  }
];

const seedShoes = () => (
  Promise.all(shoes.map(shoe => Shoe.create(shoe)))
);

const run = async () => {
  try {
    await database.sync({ force: true });
    await seedShoes();
    database.close();
  } catch (error) {
    console.log(error);
  } 
}

run();