const { Customer, validate } = require('../models/Customer');
const debug = require('debug')('api:genres');

const getAllCustomers = async (req, res) => {
  debug('Getting all customers...');
  const customer = await Customer.find().sort('name').select('-__v');
  res.send(customer);
};

const createNewCustomer = async ({ body }, res) => {
  debug('Creating a new customer...');
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ ...body });

  customer = await customer.save();
  res.send(customer);
};

module.exports = {
  getAllCustomers,
  createNewCustomer
};
