import User from "./User.js";
import Monitor from "./Monitor.js";

// Define associations: 1 User -> many Monitors
User.hasMany(Monitor, {
  foreignKey: "user_Id",
  as: "monitors",
});
Monitor.belongsTo(User, {
  foreignKey: "user_Id",
  as: "user",
});

export { User, Monitor };
