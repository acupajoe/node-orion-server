import { Router } from 'express'
import * as moment from 'moment'

import db from '../db/models'

const router = Router()

// Route: /api/publish
// Receives a HTTP POST from the Owntracks app
router.post('/publish', async (req, res, next) => {
  const type = req.body._type
  const action = req.body.action
  const topic = req.body.topic
  const user = topic ? topic.split('/')[1] : req.header['X-Limit-U']
  const device = topic ? topic.split('/')[2] : req.header['X-Limit-D']
  const timestamp = new Date(parseInt(req.body.tst) * 1000)
  const latitude = parseFloat(req.body.lat)
  const longitude = parseFloat(req.body.lon)
  const altitude = parseInt(req.body.alt) || -1
  const velocity = parseInt(req.body.vel) || -1
  const courseOverGround = parseInt(req.body.cog) || -1
  const verticalAccuracy = parseInt(req.body.vac) || -1
  const accuracy = parseInt(req.body.acc)
  const battery = parseInt(req.body.batt)
  const trigger = req.body.t
  const connection = req.body.conn
  const tracker_id = req.body.tid
  const regions = req.body.regions ? req.body.regions.join(',') : null

  if (type === 'cmd' && action === 'reportLocation')
    return res.send(200)

  if (type !== 'location')
    return res.json({ status: 'error', message: 'Not a location publish.' })
  try {
    await db.Location.create({
      user,
      device,
      timestamp,
      latitude,
      longitude,
      verticalAccuracy,
      courseOverGround,
      altitude,
      velocity,
      accuracy,
      battery,
      trigger,
      connection,
      tracker_id,
      regions
    })
    return res.json({ status: 'success' })
  } catch (e) {
    console.error(e.message)
    return res.status(500).json({ status: 'error', message: 'Unable to insert record' })
  }
})

export default router