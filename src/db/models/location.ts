import * as Sequelize from 'sequelize'

interface LocationAttributes {
  location_id: number
  // Client-reported Unix timestamp of the location.
  timestamp: Date
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
  // Meters above sea-level
  altitude?: number
  // Accuracy of altitude
  verticalAccuracy?: number
  // Velocity (kmh)
  velocity?: number
  // Course over ground (degrees)
  courseOverGround?: number
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
  // In Regions
  regions?: string
}

type LocationInstance = Sequelize.Instance<LocationAttributes> & LocationAttributes

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<LocationAttributes> = {
    location_id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
    timestamp: Sequelize.DATE,
    user: { type: Sequelize.STRING(256), allowNull: false },
    device: { type: Sequelize.STRING(256), allowNull: false },
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    accuracy: Sequelize.INTEGER,
    verticalAccuracy: Sequelize.INTEGER,
    altitude: Sequelize.INTEGER,
    courseOverGround: Sequelize.INTEGER,
    battery: Sequelize.INTEGER,
    trigger: Sequelize.STRING(1),
    connection: Sequelize.STRING(1),
    tracker_id: Sequelize.STRING(2),
    address: Sequelize.STRING(256),
    regions: Sequelize.STRING,
  }
  return sequelize.define<LocationInstance, LocationAttributes>("Location", attributes, { timestamps: false })
}