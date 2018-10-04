import { Router } from 'express'
import * as moment from 'moment'

import db from '../db/models/index'
import { Op } from 'sequelize'

const router = Router()

router.get('/users', async (req, res, next) => {
  try {
    const users = await db.Location.findAll({ group: 'user' })
    const devices = await db.Location.findAll({ group: 'device' })
    console.log(users, devices)
    return res.json({ status: 'success', data: [users, devices] })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ status: 'error', data: [], message: e })
  }
})

router.post('/publish', async (req, res, next) => {
  const type = req.body._type
  const action = req.body.action
  const topic = req.body.topic
  const user = topic ? topic.split[1] : req.header['X-Limit-U']
  const device = topic ? topic.split[2] : req.header['X-Limit-D']
  const latitude = parseFloat(req.body.lat)
  const longitude = parseFloat(req.body.lng)
  const accuracy = parseInt(req.body.acc)
  const battery = parseInt(req.body.batt)
  const trigger = parseInt(req.body.t)
  const connection = parseInt(req.body.conn)
  const tracker_id = parseInt(req.body.tid)

  if (type === 'cmd' && action === 'reportLocation')
    return res.send(200)

  if (type !== 'location')
    return res.send(400).json({ status: 'error', message: 'Not a location publish.' })

  await db.Location.create({ user, device, latitude, longitude, accuracy, battery, trigger, connection, tracker_id })
  return res.status(201)
})

// Handle Querying Locations
router.post('/locations', async (req, res, next) => {
  const user: string = req.body.user
  const device: string = req.body.device
  const offset: number = req.body.offset ? parseInt(req.body.offset) : 0
  const limit: number = req.body.limit ? parseInt(req.body.limit) : 10
  const timestampStart: moment.Moment = req.body.timestamp_start ? moment(req.body.timestamp_start) : moment().subtract(1, 'month')
  const timestampEnd: moment.Moment = req.body.timestamp_end ? moment(req.body.timestamp_end) : moment()
  const fields: string[] = req.body.fields || []

  if (!user || !device)
    return res.status(401).json({ status: 'error', message: `Invalid parameters: user [${user}, device [${device}]` })

  const locations = await db.Location.findAll({
    where: {
      user: user,
      device: device,
      timestamp: {
        [Op.lte]: timestampEnd.toDate(),
        [Op.gte]: timestampStart.toDate()
      }
    },
    offset: offset,
    limit: limit
  })

  return res.json({ status: 'success', data: locations })
})

export default router