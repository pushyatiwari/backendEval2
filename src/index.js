const express = require('express');
const dotenv = require('dotenv');

const routes = require('./routes');

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use('/category', routes.categoryRouter);
app.listen(port, () => {
  console.log(`Server is up at port http://localhost:${port}`);
});
