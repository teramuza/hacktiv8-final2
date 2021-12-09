const express = require('express');
const app = express();
const router = require('./routes');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
// NOTE: if you want to add a new router, please add it in the 'routes' directory, and list the router in 'routes/index.js'

app.listen(process.env.APP_PORT, () => {
    console.log(`listening on port ${process.env.APP_PORT}`);
});
