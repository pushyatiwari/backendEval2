const fetch = require('node-fetch');
const categoryServices = require('../category.services');
const { Category } = require('../../models');
const mockFetchCategory = require('./mockFetch');

describe('insert category', () => {
  const mockResolvedCategory = [
    {
      id: 4,
      categoryName: 'shoes',
      description: 'radiant shoes',
      createdAt: '2021-03-07T12:20:56.619Z',
      updatedAt: '2021-03-07T12:20:56.619Z',
    },
  ];
  const mockInsertIntoItem = [{
    id: 33,
    categoryName: 'shoes',
    itemId: 'shoe_2',
    itemName: 'adidas jumbo',
    description: 'Extremely comforrtable shoes for all seasons',
    image: 'random image',
    features: [
      'name:Color,value:Blue',
      'name:Size,value:8',
      'name:Brand,value:Adidas',
    ],
    createdAt: '2021-03-21T05:06:03.172Z',
    updatedAt: '2021-03-21T05:06:03.172Z',
  }];
  it('should insert category', async () => {
    jest.spyOn(Category, 'findAll').mockResolvedValue(mockResolvedCategory);
    const insertCategoryService = await categoryServices.insertIntoCategory('abc', 'description');
    expect(insertCategoryService).toBe(-1);
  });
  it('should insert product', async () => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchCategory);
    jest.spyOn(categoryServices, 'insertIntoCategory').mockResolvedValue(mockResolvedCategory);
    jest.spyOn(categoryServices, 'insertIntoItem').mockResolvedValue(mockInsertIntoItem);
    const fetchedCategoryJson = await categoryServices.insertProductDetails('abc');
    expect(fetchedCategoryJson).toBe('category does not exist');
  });
});
