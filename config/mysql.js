import dotenv from 'dotenv';
import fs from 'fs';
import mysql from 'mysql2/promise';

// Load .env based on NODE_ENV like other config files
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.development';
dotenv.config({ path: envFile });

const poolOptions = {
  host: process.env.TIDB_HOST || 'localhost',
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DB_NAME,
  port: process.env.TIDB_PORT ? Number(process.env.TIDB_PORT) : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Attach SSL CA if path provided
if (process.env.TIDB_CA_PATH) {
  try {
    const caCert = fs.readFileSync(process.env.TIDB_CA_PATH);
    poolOptions.ssl = { 
      ca: caCert,
      rejectUnauthorized: true
    };
  } catch (err) {
    console.warn('❌ Could not read TIDB_CA_PATH for mysql ssl:', err.message || err);
  }
}

const pool = mysql.createPool(poolOptions);

// Initialize database schema (create Customer table if missing)
const initDB = async () => {
  const createTableSQL = `CREATE TABLE IF NOT EXISTS Customer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INT NULL,
    isActive TINYINT(1) DEFAULT 1,
    profileImage VARCHAR(255) NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;`;

  try {
    await pool.execute(createTableSQL);
    console.log('✅ Ensured Customer table exists');
  } catch (err) {
    console.error('❌ Error ensuring Customer table exists:', err);
  }
};

// Run initialization
initDB();

export default pool;

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