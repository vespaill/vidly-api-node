const express = require('express');
const router = express.Router();
const ctrlGenres = require('./controllers/genres');
const ctrlCustomers = require('./controllers/customers');
const ctrlMovies = require('./controllers/movies');
const ctrlUsers = require('./controllers/users');
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');
const ctrlAuthenticate = require('./controllers/auth');

/* ---------------------------------- Genre --------------------------------- */
router
  .route('/genres')
  .get(ctrlGenres.getAllgenres)
  .post(auth, ctrlGenres.createNewGenre);
router
  .route('/genres/:id')
  .get(ctrlGenres.getOneGenre)
  .put(auth, ctrlGenres.updateOneGenre)
  .delete(auth, ctrlGenres.deleteOneGenre);

/* ---------------------------------- Movie --------------------------------- */
router
  .route('/movies')
  .get(ctrlMovies.getAllMovies)
  .post(auth, ctrlMovies.createNewMovie);
router
  .route('/movies/:id')
  .get(ctrlMovies.getOneMovie)
  .put(auth, ctrlMovies.updateOneMovie)
  .delete([auth, admin], ctrlMovies.deleteOneMovie);

/* -------------------------------- Customer -------------------------------- */
router
  .route('/customers')
  .get(auth, ctrlCustomers.getAllCustomers)
  .post(auth, ctrlCustomers.createNewCustomer);

/* ---------------------------------- User ---------------------------------- */
router.route('/users/me').get(auth, ctrlUsers.getOneUser);
router.route('/users').post(ctrlUsers.createNewUser);
router.route('/auth').post(ctrlAuthenticate);

module.exports = router;
