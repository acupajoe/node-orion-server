import * as express from 'express'
import * as bodyParser from 'body-parser'

import orionRoutes from './routes/orion'
import owntracksRoutes from './routes/orion'

const port = process.env.PORT || 8081
const app = express()

// For security purposes
app.disable('x-powered-by')
app.use(bodyParser.json())

// Routes
app.use('/api', orionRoutes)
app.use('/api', owntracksRoutes)

app.get('*', (req, res, next) => {
  res.sendStatus(404).json({ status: 'error', message: `Not Found: ${req.url}` })
})

app.listen(port, () => console.log(`Listening on ::${port}`))