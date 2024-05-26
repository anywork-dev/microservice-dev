const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth.router');
const sequelize = require('./database/connection');

const app = express();

authRouter

app.use(bodyParser.json());

// Use the auth router
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
