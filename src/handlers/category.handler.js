const services = require('../services');

const putCategory = async (req, res) => {
  //  await services.destroyAll();
  console.log(req);
  const insertCategory = await services.insertProductDetails(req.query);
  console.log(insertCategory);
  res.status(200).send(insertCategory);
};

const getCategory = async (req, res) => {
  const allCategories = await services.getAllCategories();
  res.status(200).send(allCategories);
};

const getItems = async (req, res) => {
  const allItems = await services.getAllItems();
  res.status(200).send(allItems);
};
const getFeatures = async (req, res) => {
  console.log(req.params);
  //   { categoryName: 'shoe' }
  const features = await services.getDistinctFeatures(req.params);
  res.json(features);
};
const destroyAllCategories = async (req, res) => {
  const destroyAll = await services.destroyAll();
  res.status(200).send(destroyAll);
};

module.exports = {
  putCategory,
  getCategory,
  getItems,
  getFeatures,
  destroyAllCategories,
};
