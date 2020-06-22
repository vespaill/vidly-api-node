const { Genre, validate } = require('../models/Genre');
const debug = require('debug')('api:genres');

/**
 * GET /api/genres
 */
const getAllgenres = async (req, res) => {
  debug('Getting all genres...');
  const genre = await Genre.find().sort('name').select('-__v');
  res.send(genre);
};

/**
 * POST /api/genres
 */
const createNewGenre = async ({ body }, res) => {
  debug('Creating a new genre...');
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: body.name });
  genre = await genre.save();
  res.send(genre);
};

/**
 * GET /api/genres/:id
 */
const getOneGenre = async ({ params: { id: genreId } }, res) => {
  debug(`Getting genre with id of ${genreId}...`);
  const genre = await Genre.findById(genreId).select('-__v');

  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  res.send(genre);
};

/**
 * PUT /api/genres/:id
 */
const updateOneGenre = async ({ params: { id: genreId }, body }, res) => {
  debug(`Updating genre with id of ${genreId}...`);
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findOneAndUpdate(
    { _id: genreId },
    { name: body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  res.send(genre);
};

/**
 * DELETE /api/genres/:id
 */
const deleteOneGenre = async ({ params: { id: genreId } }, res) => {
  debug(`Deleting genre with id of ${genreId}...`);
  const genre = await Genre.findByIdAndRemove(genreId);

  if (!genre)
    return res.status(404).send('The genre with the given id was not found');

  res.send(genre);
};

module.exports = {
  getAllgenres,
  createNewGenre,
  updateOneGenre,
  deleteOneGenre,
  getOneGenre
};
