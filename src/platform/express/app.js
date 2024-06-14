const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./router")

const app = express();

app.use(bodyParser.json());

// Use the auth router
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
