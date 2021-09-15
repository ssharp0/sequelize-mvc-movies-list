const router = require('express').Router()
// import Movie model
const { Movie } = require('../models')

// sequelize for below

// get all movies
router.get('/movies', (req, res) =>
  Movie.findAll()
    .then(movies => res.json(movies))
    .catch(err => console.log(err)))

// create movie(s)
router.post('/movies', (req, res) =>
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(err => console.log(err)))

// update movies for unique id (MySQL ID)
router.put('/movies/:id', (req, res) =>
  Movie.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err)))

// delete movies using unique ID (MySQL ID)
router.delete('/movies/:id', (req, res) =>
  Movie.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err)))

// export router
module.exports = router
