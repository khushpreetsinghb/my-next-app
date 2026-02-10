import { 
  createCustomer, 
  getAllCustomers, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer,
  getActiveCustomers
} from '../config/crudOpereations.js';

async function testCRUDOperations() {
  console.log('🧪 Starting CRUD Operations Test...\n');

  try {
    // Test 1: CREATE
    console.log('Test 1: Creating a customer...');
    const newCustomer = await createCustomer({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      isActive: true,
    });
    console.log('✅ Created customer:', newCustomer);

    // Test 2: CREATE Multiple
    // console.log('\nTest 2: Creating multiple customers...');
    // const multipleCustomers = await createMultipleCustomers([
    //   {
    //     name: 'Jane Smith',
    //     email: 'jane@example.com',
    //     age: 25,
    //     isActive: true,
    //   },
    //   {
    //     name: 'Bob Johnson',
    //     email: 'bob@example.com',
    //     age: 35,
    //     isActive: false,
    //   },
    // ]);
    // console.log('✅ Created multiple customers');

    // This code is removed from the crudOperations.js file because it was not used
    // Bulk operations
    // export const createMultipleCustomers = async (customersArray) => {
    //   try {
    //     if (!Array.isArray(customersArray) || customersArray.length === 0) return [];
    //     const values = [];
    //     const placeholders = customersArray.map((c) => {
    //       values.push(c.name, c.email, c.age ?? null, c.isActive ? 1 : 0, c.profileImage ?? null);
    //       return '(?, ?, ?, ?, ?)';
    //     }).join(', ');

    //     await pool.execute(`INSERT INTO Customer (name, email, age, isActive, profileImage) VALUES ${placeholders}`, values);
    //     // Return all inserted rows by matching emails (best-effort)
    //     const emails = customersArray.map(c => c.email);
    //     const [rows] = await pool.query(`SELECT * FROM Customer WHERE email IN (${emails.map(()=>'?').join(',')})`, emails);
    //     return rows;
    //   } catch (error) {
    //     console.error('Error creating multiple customers:', error);
    //     throw error;
    //   }
    // };

    // Test 3: READ All
    console.log('\nTest 3: Reading all customers...');
    const allCustomers = await getAllCustomers();
    console.log(`✅ Found ${allCustomers.length} customers:`);
    allCustomers.forEach(customer => {
      console.log(`  - ${customer.name} (${customer.email})`);
    });

    // Test 4: READ Single
    console.log('\nTest 4: Reading single customer...');
    const singleCustomer = await getCustomerById(newCustomer.id);
    console.log('✅ Found customer:', singleCustomer);

    // Test 5: UPDATE
    console.log('\nTest 5: Updating customer...');
    const updatedCustomer = await updateCustomer(newCustomer.id, {
      name: 'John Updated',
      age: 31,
    });
    console.log('✅ Updated customer:', updatedCustomer);

    // Test 6: Query with filters
    console.log('\nTest 6: Getting active customers...');
    const activeCustomers = await getActiveCustomers();
    console.log(`✅ Found ${activeCustomers.length} active customers`);

    // Test 7: DELETE
    console.log('\nTest 7: Deleting customer...');
    const isDeleted = await deleteCustomer(newCustomer.id);
    console.log(isDeleted ? '✅ Customer deleted successfully' : '❌ Customer not found');

    // Final READ to confirm deletion
    console.log('\nFinal: Reading all customers after deletion...');
    const finalCustomers = await getAllCustomers();
    console.log(`✅ Total customers remaining: ${finalCustomers.length}`);

  } catch (error) {
    console.error('\nError during CRUD tests:', error);
  }
}

// Run the test
testCRUDOperations();

// 🧪 Starting CRUD Operations Test...

// Test 1: Creating a customer...
// ✅ Ensured Customer table exists
// ✅ Created customer: {
//   id: 120004,
//   name: 'John Doe',
//   email: 'john@example.com',
//   age: 30,
//   isActive: 1,
//   profileImage: null,
//   createdAt: 2026-02-10T04:08:49.000Z,
//   updatedAt: 2026-02-10T04:08:49.000Z
// }

// Test 2: Creating multiple customers...
// ✅ Created multiple customers

// Test 3: Reading all customers...
// ✅ Found 6 customers:
//   - John Doe (john@example.com)
//   - Jane Smith (jane@example.com)
//   - Bob Johnson (bob@example.com)
//   - John Doe (johndoe@test.com)
//   - Test (test@test.com)
//   - admin (admin@test.com)

// Test 4: Reading single customer...
// ✅ Found customer: {
//   id: 120004,
//   name: 'John Doe',
//   email: 'john@example.com',
//   age: 30,
//   isActive: 1,
//   profileImage: null,
//   createdAt: 2026-02-10T04:08:49.000Z,
//   updatedAt: 2026-02-10T04:08:49.000Z
// }

// Test 5: Updating customer...
// ✅ Updated customer: {
//   id: 120004,
//   name: 'John Updated',
//   email: 'john@example.com',
//   age: 31,
//   isActive: 1,
//   profileImage: null,
//   createdAt: 2026-02-10T04:08:49.000Z,
//   updatedAt: 2026-02-10T04:08:50.000Z
// }

// Test 6: Getting active customers...
// ✅ Found 5 active customers

// Test 7: Deleting customer...
// Customer with id 120004 deleted
// ✅ Customer deleted successfully

// Final: Reading all customers after deletion...
// ✅ Total customers remaining: 5