const mongoose  = require('mongoose');
const genres    = require('./routes/genres');
const customers = require('./routes/customers')
const express   = require('express');
const app       = express();

const dbURI = 'mongodb://localhost/vidly';

mongoose
    .connect(dbURI)
    .then(() => console.log(`Connected to ${dbURI}...`))
    .catch(err => console.log('Could not connecto to MongoDB...', err));

app.set('json spaces', 4);
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
