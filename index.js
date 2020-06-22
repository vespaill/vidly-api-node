const mongoose = require('mongoose');
const apiRouter = require('./routes/index');
const express = require('express');
const cors = require('cors');
const app = express();
const dbURI = 'mongodb://localhost/vidly';

mongoose
.connect(dbURI)
.then(() => console.log(`Connected to ${dbURI}...`))
.catch(err => console.log('Could not connect to MongoDB...', err));

app.set('json spaces', 4);
app.use(express.json());

app.use(cors());
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
