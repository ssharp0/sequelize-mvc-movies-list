// require express router
const router = require('express').Router()

// prefix api for routes
router.use('/api', require('./movieRoutes.js'))

// export router
module.exports = router
