const express = require('express');
const categoryHandler = require('../handlers');

const categoryRouter = express.Router();
categoryRouter.put('/', categoryHandler.putCategory);
categoryRouter.get('/', categoryHandler.getCategory);
categoryRouter.get('/item', categoryHandler.getItems);
categoryRouter.get('/destroyall', categoryHandler.destroyAllCategories);

categoryRouter.get('/features/:categoryName', categoryHandler.getFeatures);

module.exports = {
  categoryRouter,
};
