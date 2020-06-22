const { Movie, validate } = require('../models/Movie');
const { Genre } = require('../models/Genre');
const debug = require('debug')('api:movies');

/**
 * GET /api/movies
 */
const getAllMovies = async (req, res) => {
  debug('Getting all movies...');
  const movies = await Movie.find().sort('name').select('-__v');
  res.send(movies);
};

/**
 * POST /api/movies
 */
const createNewMovie = async ({ body }, res) => {
  debug('Creating a new movie...');
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(body.genreId);
  if (!genre) return status(400).send('Invalid genre.');

  let movie = new Movie({
    title: body.title,
    genre: { _id: genre._id, name: genre.name },
    numberInStock: body.numberInStock,
    dailyRentalRate: body.dailyRentalRate,
    liked: body.liked || false
  });

  movie = await movie.save();
  res.json(movie);
};

/**
 * GET /api/movies/:id
 */
const getOneMovie = async ({ params: { id: movieId } }, res) => {
  debug(`Fetching movie with id of ${movieId}...`);
  try {
    const movie = await Movie.findById(movieId).select('-__v');
    debug('Movie:', movie);
    res.send(movie);
  } catch (error) {
    return res.status(404).send('The movie with the given ID was not found.');
  }
};

/**
 * PUT /api/movies/:id
 */
const updateOneMovie = async ({ params: { id: movieId }, body }, res) => {
  debug(`Updating movie with id of ${movieId}...`);

  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const filter = { _id: movieId };
  const update = {
    title: body.title,
    genre: { _id: genre._id, name: genre.name },
    numberInStock: body.numberInStock,
    dailyRentalRate: body.dailyRentalRate,
    liked: body.liked
  };
  const movie = await Movie.findOneAndUpdate(filter, update, { new: true });

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
};

/**
 * DELETE /api/movies/:id
 */
const deleteOneMovie = async ({ params: { id: movieId } }, res) => {
  debug(`Deleting movie with id of ${movieId}...`);
  const movie = await Movie.findByIdAndRemove(movieId);

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
};

module.exports = {
  getAllMovies,
  createNewMovie,
  getOneMovie,
  updateOneMovie,
  deleteOneMovie
};
