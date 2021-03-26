const fetch = require('node-fetch');
const { Category, Item } = require('../models');

const insertIntoCategory = async (name, description) => {
  const isCategoryExist = await Category.findAll({
    where: {
      categoryName: name,
    },
  });
  if (isCategoryExist.length === 0) {
    const category = await Category.create({
      categoryName: name,
      description,
    });
    return category;
  }
  return -1;
};
// features: [
//     { name: 'Color ', value: 'Black' },
//     { name: 'Size', value: 8 },
//     { name: 'Brand', value: 'spunk' }
//   ]
const parseItemFeatures = (itemFeatures) => {
  // eslint-disable-next-line no-useless-concat
  const itemMetaDataWithArrayOfString = itemFeatures.map((item) => `${'name' + ':'}${item.name},` + 'value' + `:${item.value}`);
  return itemMetaDataWithArrayOfString;
};

const insertIntoItem = async (name, itemMetadataArray) => {
  const itemInsert = itemMetadataArray.map(async (metaData) => {
    const fetchedItem = await fetch(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${metaData.id}`);
    const fetchedItemJson = await fetchedItem.json();
    const parsedFeatures = parseItemFeatures(fetchedItemJson.features);
    await Item.create({
      categoryName: name,
      itemId: metaData.id,
      itemName: metaData.name,
      description: metaData.description,
      image: fetchedItemJson.imageUrl,
      features: parsedFeatures,
    });
  });
  const insertionStatus = Promise.all(itemInsert);
  return insertionStatus;
};

const insertProductDetails = async ({ name }) => {
  try {
    console.log(name);
    const fetchedCategory = await fetch(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${name}`);
    const fetchedCategoryJson = await fetchedCategory.json();
    const insertCategryStatus = await insertIntoCategory(
      fetchedCategoryJson.name,
      fetchedCategoryJson.description,
    );
    if (insertCategryStatus !== -1) {
      await insertIntoItem(
        fetchedCategoryJson.name,
        fetchedCategoryJson.itemMetadata,
      );
    }
    return fetchedCategoryJson;
  } catch (error) {
    console.log(`error: ${error.message}`);
    return 'category does not exist';
  }
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const getDistinctFeatures = async ({ categoryName }) => {
  const allItems = await Item.findAll({
    where: {
      categoryName,
    },
  });

  const allFeatures = allItems.map((item) => item.features);
  //   console.log('af, ', allFeatures);
  const featureObject = {};
  allFeatures.forEach((item) => {
    item.forEach((feature) => {
      const featureName = feature.split(',')[0].split(':')[1];
      const featureValue = feature.split(',')[1].split(':')[1];
      if (featureObject[featureName]) {
        featureObject[featureName].push(featureValue);
      } else {
        featureObject[featureName] = [featureValue];
      }
      // obj.hasOwnProperty("key")
    });
  });

  const distinctColorFeatures = featureObject.Color.filter(onlyUnique);
  const distinctSizeFeatures = featureObject.Size.filter(onlyUnique);
  const distinctBrandFeatures = featureObject.Brand.filter(onlyUnique);
  featureObject.Color = distinctColorFeatures;
  featureObject.Size = distinctSizeFeatures;
  featureObject.Brand = distinctBrandFeatures;
  console.log('featureObject, ', featureObject);

  return featureObject;
};

const getAllCategories = async () => {
  const category = await Category.findAll();
  // t all: [object SequelizeInstance:Quote],[object SequelizeInstance:Quote]
  console.log(category);
  return category;
};

const getAllItems = async () => {
  const item = await Item.findAll();
  // t all: [object SequelizeInstance:Quote],[object SequelizeInstance:Quote]
  console.log(item);
  return item;
};

const destroyAll = async () => {
  try {
    await Category.destroy({ truncate: true });
    await Item.destroy({ truncate: true });
  } catch (err) {
    return -1;
  }
};

module.exports = {
  insertProductDetails,
  getAllCategories,
  getAllItems,
  destroyAll,
  getDistinctFeatures,
  insertIntoCategory,
  insertIntoItem,
};
