import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Define Customer model
const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Sync model with database (creates table if it doesn't exist)
Customer.sync({ alter: true }) // Use { force: true } to drop and recreate table
  .then(() => console.log('Customer table created/synced'))
  .catch(error => console.error('Error syncing Customer table:', error));

export default Customer;