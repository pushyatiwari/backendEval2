const categoryHandler = require('../category.handler');
const categoryServices = require('../../services');

describe('category handler: put category', () => {
  it('should set status code 200 with category', async () => {
    const mockRequest = {
      query: {
        name: 'shoe',
      },
    };
    const category = [{
      id: 7,
      categoryName: 'phones',
      description: 'phone shoes',
      itemMetaData: [
        'id:phone_1,name:iPhone 12,descriptionApple manufactured with amazing camera.',
        'id:phone_2,name:Oneplus 8,descriptionGreat performance at good prices',
        'id:phone_3,name:Samsung S10,descriptionPremium phone',
        'id:phone_4,name:OnePlus 5,descriptionCheaper alternative phone',
      ],
      updatedAt: '2021-02-26T08:57:12.929Z',
      createdAt: '2021-02-26T08:57:12.929Z',
    }];
    jest.spyOn(categoryServices, 'insertProductDetails').mockResolvedValue(category);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await categoryHandler.putCategory(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(category);
  });

  it('should return all the categories', async () => {
    const mockGetCategory = [{
      id: 4,
      categoryName: 'shoes',
      description: 'radiant shoes',
      createdAt: '2021-03-07T12:20:56.619Z',
      updatedAt: '2021-03-07T12:20:56.619Z',
    }];
    jest.spyOn(categoryServices, 'getAllCategories').mockResolvedValue(mockGetCategory);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await categoryHandler.getCategory('', mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockGetCategory);
  });

  it('should return all items', async () => {
    const mockGetAllItems = [{
      id: 25,
      categoryName: 'shoes',
      itemId: 'shoe_1',
      itemName: 'nike air',
      description: 'jordan made these famous!',
      image: 'random image',
      features: [
        'name:Color,value:Red',
        'name:Size,value:7',
        'name:Brand,value:Nike',
      ],
      createdAt: '2021-03-07T12:20:57.174Z',
      updatedAt: '2021-03-07T12:20:57.174Z',
    }];
    jest.spyOn(categoryServices, 'getAllItems').mockResolvedValue(mockGetAllItems);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await categoryHandler.getItems('', mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockGetAllItems);
  });
});
