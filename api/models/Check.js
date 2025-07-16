// models/Check.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Check = sequelize.define("check", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  monitorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "monitors",  // table name for your Monitor model
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("up", "down"),
    allowNull: false,
  },
  latency: {
    type: DataTypes.INTEGER,    // milliseconds
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: "checks",
  timestamps: true,   
  updatedAt: false             // adds createdAt
});

export default Check;
