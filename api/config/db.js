import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log('✅ Connected to the database!');
} catch (error) {
  console.error('❌ Unable to connect to the database:', error);
}