const categoryServices = require('../category.services');
const { Category, Item } = require('../../models');

describe('insert category', () => {
  it('should insert category', async () => {
    const mockResolvedCategory = [
      {
        id: 4,
        categoryName: 'shoes',
        description: 'radiant shoes',
        createdAt: '2021-03-07T12:20:56.619Z',
        updatedAt: '2021-03-07T12:20:56.619Z',
      },
    ];
    jest.spyOn(Category, 'findAll').mockResolvedValue(mockResolvedCategory);
    const insertCategoryService = await categoryServices.insertIntoCategory('abc', 'description');
    expect(insertCategoryService).toBe(-1);
  });
});
