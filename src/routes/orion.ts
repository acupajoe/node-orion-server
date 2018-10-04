import { Router } from 'express'
import * as cors from 'cors'
import * as moment from 'moment'
import * as path from 'path'
import * as dotenv from 'dotenv'

import db from '../db/models'
import { Op } from 'sequelize'

const router = Router()

// MARK: CORS Functionality (Required by Orion)
const whitelist = []

if (!process.env.ORION_CLIENT_URL) {
  const envPath = path.resolve(__dirname, '..', '..', '.env')
  dotenv.config(envPath)
}

console.log(`Whitelisting: ${process.env.ORION_CLIENT_URL}`)
whitelist.push(process.env.ORION_CLIENT_URL)

const corsOptions = {
  origin: (origin, cb) => {
    if (whitelist.indexOf(origin) !== -1) cb(null, true)
    else cb(new Error('Not allowed by CORS'))
  },
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}
// END

router.options('/users', cors(corsOptions))
router.get('/users', cors(corsOptions), async (req, res, next) => {
  try {
    const devices = await db.Location.findAll({ attributes: ['user', 'device'], group: ['device'] })

    // Coerce this into [{user: $ID, devices: [$D1, $D2, ...]}]
    const map = {}
    for (const device of devices) {
      if (!map[device.user])
        map[device.user] = { user: device.user, devices: [] }
      map[device.user].devices.push(device.device)
    }

    return res.json({ status: 'success', data: Object.values(map) })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ status: 'error', data: [], message: e })
  }
})


// Handle Querying Locations
router.options('/locations', cors(corsOptions))
router.post('/locations', cors(corsOptions), async (req, res, next) => {
  const user: string = req.body.user
  const device: string = req.body.device
  const offset: number = req.body.offset ? parseInt(req.body.offset) : 0
  const limit: number = req.body.limit ? parseInt(req.body.limit) : 2500
  const timestampStart: any = req.body.timestamp_start ? new Date(req.body.timestamp_start * 1000) : moment().subtract(1, 'month').toDate()
  const timestampEnd: any = req.body.timestamp_end ? new Date(req.body.timestamp_end * 1000) : moment().toDate()

  if (!user || !device)
    return res.status(401).json({ status: 'error', message: `Invalid parameters: user [${user}, device [${device}]` })

  try {
    const locations = await db.Location.findAll({
      where: {
        user: user,
        device: device,
        timestamp: {
          [Op.lte]: timestampEnd,
          [Op.gte]: timestampStart
        }
      },
      offset: offset,
      limit: limit,
      raw: true
    })

    const data = locations.map(l => ({ ...l, timestamp: Math.round((l.timestamp).getTime() / 1000) }))
    return res.status(200).json({ status: 'success', data })
  } catch (e) {
    console.error(e)
    return res.status(500).json(e)
  }
})

export default router