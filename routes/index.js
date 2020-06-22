const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const ctrlGenres = require('../controllers/genres');
const ctrlCustomers = require('../controllers/customers');
const ctrlMovies = require('../controllers/movies');
const ctrlUsers = require('../controllers/users');
const ctrlAuthenticate = require('../controllers/auth');

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

/**
 * User routes
 */
router.route('/users/me').get(auth, ctrlUsers.getOneUser);
router.route('/users/').post(ctrlUsers.createNewUser);

router.route('/auth').post(ctrlAuthenticate);

module.exports = router;
