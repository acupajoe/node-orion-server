import * as express from 'express'
import * as bodyParser from 'body-parser'

import orionRoutes from './routes/orion'
import owntracksRoutes from './routes/owntracks'

const port = process.env.PORT || 8081
const app = express()

// For security purposes
app.disable('x-powered-by')
app.use(bodyParser.json())

// Routes
app.use('/api', orionRoutes)
app.use('/api', owntracksRoutes)

app.use((req, res, next) => {
  res.sendStatus(404)
})

app.listen(port, () => console.log(`Listening on ::${port}`))