

export const authors = [
  {
    id: 1,
    realName: 'Enid Blyton',
    penName: 'Enid Blyton',
    address: '1 Test Street, Test Town',
    active: true
  },
  {
    id: 2,
    realName: 'Edgar Poe',
    penName: 'Edgar Poe',
    address: '2 Test Street, Test Town',
    active: true
  },
  {
    id: 3,
    realName: 'William Shakespeare',
    penName: 'William Shakespeare',
    address: '3 Test Street, Test Town',
    active: false
  }
]

export const books = [
  {
    id: 1,
    authorId: 1,
    title: 'Magic Faraway Tree',
    categoryId: 1,
    format: 1,
    price: 4,
  },
  {
    id: 2,
    authorId: 1,    
    title: 'Enchanted Wood',
    categoryId: 1,
    format: 1,
    price: 5
  },
  {
    id: 3,
    authorId: 1,    
    title: 'Folk of Faraway Tree',
    categoryId: 1,
    format: 1,
    price: 6
  }
]