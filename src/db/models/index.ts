import * as Sequelize from "sequelize"
import locationFactory from "./location"

const env = process.env.NODE_ENV || "development"
const config = require('../config')[env]

const sequelize = new Sequelize(config)

const db = {
  sequelize,
  Sequelize,
  Location: locationFactory(sequelize),
}

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db)
  }
})

export default db