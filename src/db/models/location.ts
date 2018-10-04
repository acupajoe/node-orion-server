import * as Sequelize from 'sequelize'

interface LocationAttributes {
  location_id: number
  // Client-reported Unix timestamp of the location.
  timestamp: number
  // Associated username.
  user: string
  // User's device name.
  device: string
  // Latitude, as a float
  latitude: number
  // Longitude, as a float.
  longitude: number
  // Accuracy in meters.
  accuracy: number
  // Device's battery percentage at the time of reporting.
  battery: number
  // Single-character code representing the trigger mechanism.
  trigger: string
  // Single-character code representing the network connection type when the report was created.
  connection: string
  // Client-specified tracker ID.
  tracker_id: string
  // Reverse-geocoded address of this coordinate.
  address?: string
}

type LocationInstance = Sequelize.Instance<LocationAttributes> & LocationAttributes

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<LocationAttributes> = {
    location_id: Sequelize.INTEGER,
    timestamp: Sequelize.INTEGER,
    user: Sequelize.STRING(256),
    device: Sequelize.STRING(256),
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    accuracy: Sequelize.INTEGER,
    battery: Sequelize.INTEGER,
    trigger: Sequelize.STRING(1),
    connection: Sequelize.STRING(1),
    tracker_id: Sequelize.STRING(2),
    address: Sequelize.STRING(256)
  }
  return sequelize.define<LocationInstance, LocationAttributes>("Location", attributes)
}