import { v4 as uuid4 } from 'uuid';

const idOne = uuid4();
const idTwo = uuid4();
const idThree = uuid4();

let authors = {
  [idOne]: {
    id: 1,
    name: 'Enid Blyton',
    address: '1 Test Street, Test Town'
  },
  [idTwo]: {
    id: 2,
    name: 'Edgar Poe',
    address: '2 Test Street, Test Town'
  }
}

export const books = [
  {
    id: 1,
    title: 'Magic Faraway Tree',
    categoryId: 1,
    format: 1,
    price: 4
  },
  {
    id: 2,
    title: 'Enchanted Wood',
    categoryId: 1,
    format: 1,
    price: 5
  },
  {
    id: 2,
    title: 'Folk of Faraway Tree',
    categoryId: 1,
    format: 1,
    price: 6
  }
]