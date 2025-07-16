import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Monitor = sequelize.define("monitor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isUrl: true },
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  user_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",     // table name for your User model
      key: "user_Id",     // primaryKey field on User
    }
  }
}, {
  tableName: "monitors",
  timestamps: true,
});

export default Monitor;
