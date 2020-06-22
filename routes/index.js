const express = require('express');
const router = express.Router();

const ctrlGenres = require('../controllers/genres');
const ctrlCustomers = require('../controllers/customers');
const ctrlMovies = require('../controllers/movies');

/**
 * Genre routes
 */
router
  .route('/genres')
  .get(ctrlGenres.getAllgenres)
  .post(ctrlGenres.createNewGenre);

router
  .route('/genres/:id')
  .get(ctrlGenres.getOneGenre)
  .put(ctrlGenres.updateOneGenre)
  .delete(ctrlGenres.deleteOneGenre);

/**
 * Movie routes
 */
router
  .route('/movies')
  .get(ctrlMovies.getAllMovies)
  .post(ctrlMovies.createNewMovie);

router
  .route('/movies/:id')
  .get(ctrlMovies.getOneMovie)
  .put(ctrlMovies.updateOneMovie)
  .delete(ctrlMovies.deleteOneMovie);

/**
 * Customer routes
 */
router
  .route('/customers')
  .get(ctrlCustomers.getAllCustomers)
  .post(ctrlCustomers.createNewCustomer);

module.exports = router;
