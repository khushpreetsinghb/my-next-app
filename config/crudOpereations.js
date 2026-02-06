import pool from './mysql.js';

// Helper to map result rows (mysql2 returns plain objects already)

// CREATE operations
export const createCustomer = async (userData) => {
  try {
    const { name, email, age = null, isActive = true, profileImage = null } = userData;
    const [result] = await pool.execute(
      'INSERT INTO Customer (name, email, age, isActive, profileImage) VALUES (?, ?, ?, ?, ?)',
      [name, email, age, isActive ? 1 : 0, profileImage]
    );

    const insertId = result.insertId;
    const [rows] = await pool.execute('SELECT * FROM Customer WHERE id = ? LIMIT 1', [insertId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// READ operations
export const getAllCustomers = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Customer ORDER BY createdAt DESC');
    return rows;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Customer WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const getCustomerByEmail = async (email) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Customer WHERE email = ? LIMIT 1', [email]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching customer by email:', error);
    throw error;
  }
};

// UPDATE operations
export const updateCustomer = async (id, updateData) => {
  try {
    const allowedKeys = ['name', 'email', 'age', 'isActive', 'profileImage'];
    const keys = Object.keys(updateData).filter((k) => allowedKeys.includes(k));
    if (keys.length === 0) return await getCustomerById(id);

    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const values = keys.map((k) => (k === 'isActive' ? (updateData[k] ? 1 : 0) : updateData[k]));
    values.push(id);

    const [result] = await pool.execute(`UPDATE Customer SET ${setClause} WHERE id = ?`, values);

    if (result.affectedRows > 0) {
      return await getCustomerById(id);
    }
    return null;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

// DELETE operations
export const deleteCustomer = async (id) => {
  try {
    const [result] = await pool.execute('DELETE FROM Customer WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      console.log(`Customer with id ${id} deleted`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

// Bulk operations
export const createMultipleCustomers = async (customersArray) => {
  try {
    if (!Array.isArray(customersArray) || customersArray.length === 0) return [];
    const values = [];
    const placeholders = customersArray.map((c) => {
      values.push(c.name, c.email, c.age ?? null, c.isActive ? 1 : 0, c.profileImage ?? null);
      return '(?, ?, ?, ?, ?)';
    }).join(', ');

    await pool.execute(`INSERT INTO Customer (name, email, age, isActive, profileImage) VALUES ${placeholders}`, values);
    // Return all inserted rows by matching emails (best-effort)
    const emails = customersArray.map(c => c.email);
    const [rows] = await pool.query(`SELECT * FROM Customer WHERE email IN (${emails.map(()=>'?').join(',')})`, emails);
    return rows;
  } catch (error) {
    console.error('Error creating multiple customers:', error);
    throw error;
  }
};

// Query operations with filters
export const getCustomersWithFilters = async (filters = {}) => {
  try {
    const whereParts = [];
    const values = [];
    Object.entries(filters).forEach(([k, v]) => {
      if (k === 'isActive') {
        whereParts.push(`${k} = ?`);
        values.push(v ? 1 : 0);
      } else {
        whereParts.push(`${k} = ?`);
        values.push(v);
      }
    });

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';
    const [rows] = await pool.execute(`SELECT * FROM Customer ${whereClause} ORDER BY createdAt DESC`, values);
    return rows;
  } catch (error) {
    console.error('Error fetching customers with filters:', error);
    throw error;
  }
};

// Example: Get active customers
export const getActiveCustomers = async () => {
  return await getCustomersWithFilters({ isActive: true });
};