const mongoose = require('mongoose');
const apiRouter = require('./routes');
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('config');

const dbURI = config.get('dbURI');

mongoose
  .set('useCreateIndex', true)
  .set('useFindAndModify', false)
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${dbURI}...`))
  .catch(err => console.log('Could not connect to MongoDB...', err));

app.set('json spaces', 4);
app.use(express.json());

app.use(cors());
app.use('/api', apiRouter);

const port = process.env.PORT || config.get('port');
app.listen(port, () => console.log(`Listening on port ${port}...`));
