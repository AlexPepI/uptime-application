import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define("user",{
    user_Id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    clerk_Id: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps:false
})

export default User