// models/index.js
import { sequelize } from "../config/db.js";
import User from "./User.js";
import Monitor from "./Monitor.js";
import Check from "./Check.js";

// 1 → N: User → Monitor, cascade deletes
User.hasMany(Monitor, {
  foreignKey: "user_Id",
  as: "monitors",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Monitor.belongsTo(User, {
  foreignKey: "user_Id",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// 1 → N: Monitor → Check, cascade deletes
Monitor.hasMany(Check, {
  foreignKey: "monitorId",
  as: "checks",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Check.belongsTo(Monitor, {
  foreignKey: "monitorId",
  as: "monitor",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { sequelize, User, Monitor, Check };
