var createError = require('http-errors')
// var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
// var cors = require('cors')

const express = require('express')
const promMid = require('express-prometheus-middleware')
// const app = express()
const cors = require('cors')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var testAPIRouter = require('./routes/testAPI')
var timeAPIRouter = require('./routes/time')
// var metricsRouter = require('./routes/metrics')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/testAPI', testAPIRouter)
app.use('/time', timeAPIRouter)
// app.use('/metrics', metricsRouter)

const PORT = 9000
app.use(cors())
app.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
    /**
     * Uncomenting the `authenticate` callback will make the `metricsPath` route
     * require authentication. This authentication callback can make a simple
     * basic auth test, or even query a remote server to validate access.
     * To access /metrics you could do:
     * curl -X GET user:password@localhost:9091/metrics
     */
    // authenticate: req => req.headers.authorization === 'Basic dXNlcjpwYXNzd29yZA==',
    /**
     * Uncommenting the `extraMasks` config will use the list of regexes to
     * reformat URL path names and replace the values found with a placeholder value
     */
    // extraMasks: [/..:..:..:..:..:../],
    /**
     * The prefix option will cause all metrics to have the given prefix.
     * E.g.: `app_prefix_http_requests_total`
     */
    // prefix: 'app_prefix_',
    /**
     * Can add custom labels with customLabels and transformLabels options
     */
    // customLabels: ['contentType'],
    // transformLabels(labels, req) {
    //   // eslint-disable-next-line no-param-reassign
    //   labels.contentType = req.headers['content-type'];
    // },
  })
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// module.exports = app

// const express = require('express')
// const promMid = require('express-prometheus-middleware')
// const app = express()
// const cors = require('cors')

// curl -X GET localhost:9091/hello?name=Chuck%20Norris
// app.get('/hello', (req, res) => {
//   console.log('GET /hello')
//   const { name = 'Anon' } = req.query
//   res.json({ message: `Hello, ${name}!` })
// })

// app.listen(PORT, () => {
//   console.log(`Example api is listening on http://localhost:${PORT}`)
// })

module.exports = app
