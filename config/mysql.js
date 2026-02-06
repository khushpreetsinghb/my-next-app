import dotenv from 'dotenv';
import fs from 'fs';
import mysql from 'mysql2/promise';

// Load .env based on NODE_ENV like other config files
const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
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
    poolOptions.ssl = { ca: fs.readFileSync(process.env.TIDB_CA_PATH) };
  } catch (err) {
    console.warn('Could not read TIDB_CA_PATH for mysql ssl:', err.message || err);
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
    profileImage VARCHAR(512) NULL,
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

// Run initialization (best-effort)
initDB();

export default pool;
