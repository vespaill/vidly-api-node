const {Genre, validate} = require('../models/genres');
const express  = require('express');
const router   = express.Router();

router.get('/', async (req, res) => {
    const genre = await Genre.find().sort('name');
    res.json(genre);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res
            .status(400)
            .send(error.details[0].message);
    }

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.json(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res
            .status(400)
            .send(error.details[0].message);
    }
    console.log('params.id :', req.params.id);
    console.log('body.name:', req.body.name)
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    });

    if (!genre) {
        return res
            .status(404)
            .send('The genre with the given id was not found');
    }

    res.json(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
        return res
            .status(404)
            .send('The genre with the given id was not found');
    }

    res.json(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        return res
            .status(404)
            .send('The genre with the given id was not found');
    }

    res.json(genre);
});

module.exports = router;
