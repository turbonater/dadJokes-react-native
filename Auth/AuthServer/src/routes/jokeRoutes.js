const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const User = mongoose.model('User')
const Joke = mongoose.model('Joke')

const router = express.Router()

router.use(requireAuth)

router.get('/jokes', async (req, res) => {
  const jokes = await Joke.find({ user: req.user._id })
  res.send(jokes)
})

router.post('/joke', async (req, res) => {
  const { text } = req.body

  if (!text) {
    return res.status(400).send({ error: 'Poorly Formatted request!' })
  }
  try {
    const joke = new Joke({ user: req.user._id, text })
    await joke.save()
    res.send(joke)
  } catch (error) {
    res.status(422).send(error.message)
  }
})

module.exports = router
