# E-commerce app
You’re working with an e-commerce client to develop their new backend. You are required to fetch categories and items from a remote server/3rd party based on name and store it in your db. You have been assigned the following tasks -
1. Create an endpoint which accepts the following input and fetch the the data for EACH category from the remote server (Endpoint - <https://backend-evaluation-lgsvu.ondigitalocean.app/category?name={categoryName}>) and stores it in your db. Output of this API should have an appropriate status code and success/error message.
To get features of an item use <https://backend-evaluation-lgsvu.ondigitalocean.app/items/{itemName}>
   Input -
   {
       "names": ["category1", "category2"]
   }   
2. Create an endpoint which lists all the DISTINCT features for a given category and all the possible values of that feature that exist.  (DATA FOR THIS TASK SHOULD ONLY BE ACCESSED THROUGH YOUR DB, DO NOT CALL THE 3RD PARTY API)
   Sample expected output for category shoe
   {
       "features": {
           "color": ["Red", "Blue", "Cyan with"],
           "size": [7,8,9,10...],
           "brand": ["adidas","nike"]
       }
   }   
   Feel free to use your preferred output format.
3. Create an endpoint which helps the user query items within a category based on the feature/features. (DATA FOR THIS TASK SHOULD ONLY BE ACCESSED THROUGH YOUR DB, DO NOT CALL THE 3RD PARTY API)
It is expected that this endpoint accepts following -
   1. Category name
   2. A set of features
Bonus (only after completing all the features) - Create a postman collection for all your APIs.
The above tasks are listed based on their priority for the client.
Note -
1. Please refrain using any 3rd party (lodash etc.) npm module for data massaging.
2. Try to complete features with tests according to the priority.
3. You are allowed to use official docs/Google for syntax.
4. You will be evaluated based on the following -
   1. Working Code
   2. Test Cases
   3. Commit messages, checkpoints and linting
   4. Code modularity
   5. Folder and naming conventions
   6. API design best practices
5. Sample data for the 3rd party APIs -
   1. Few possible values of category - “phone”, “shoe”
   2. Few possible values of items inside a category - “shoe_1”, “phone_1"
6. The 3rd party APIs return HTTP status 404  in case a category/item doesn’t exist.