import dotenv from 'dotenv';
import fs from 'fs';
import mysql2 from 'mysql2';
import { Sequelize } from 'sequelize';

// Load the appropriate .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
dotenv.config({ path: envFile });

// Create a Sequelize instance
export const sequelize = new Sequelize(process.env.TIDB_DB_NAME, process.env.TIDB_USER, process.env.TIDB_PASSWORD, {
  host: process.env.TIDB_HOST,
  port: process.env.TIDB_PORT,
  dialect: 'mysql',
  dialectModule: mysql2,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(process.env.TIDB_CA_PATH),
    },
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  // prevent sequelize from loading PostGreSQL modules
  define: {
    freezeTableName: true,
  },
  // Add pool configuration for better performance
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test the connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to the database via Sequelize!');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Call connectDB to test connection on startup
connectDB();

// Environment-based loading: Uses .env.development for development, .env for production
// Sequelize setup: Configured for TiDB MySQL with SSL support
// Connection testing: Automatically tests database connection on startup
// Development logging: Enables SQL logging in development mode

// Quick summary: I searched the repo — db.js is imported in Customer.js (used to define the Sequelize Customer model). It's also the file that creates/initializes the sequelize instance.

// Options

// Keep db.js: no action required (Sequelize remains for Customer model).
// Remove db.js: I must convert Customer.js to use mysql.js (plain mysql2 queries) and update any code that expects a Sequelize model. I can do this and then remove db.js and the sequelize dependency.
// Recommendation

// If you want to remove Sequelize entirely, I can convert Customer.js into a small data-access module (using mysql.js) and then delete db.js. I recommend this for consistency since CRUD now uses mysql2 directly.
// Which would you like me to do?

// Keep db.js (do nothing), or
// Convert Customer.js to mysql2 and remove db.js + Sequelize?
// GPT-5 mini • 1x
// Claude Haiku 4.5 • 1x