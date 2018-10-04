import * as express from 'express'
import * as bodyParser from 'body-parser'

import routes from './routes/index'

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(routes)

app.get('*', (req, res, next) => {
  res.status(404).json({ status: 'error', message: `Not Found: ${req.url}` })
})

app.listen(port, () => console.log(`Listening on ::${port}`))