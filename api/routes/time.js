var express = require('express')
var router = express.Router()
const { DateTime } = require('luxon')

const dt = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)

router.get('/', function (req, res, next) {
  res.send(`This is the current server time: ${dt}`)
})

module.exports = router
