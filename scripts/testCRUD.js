import { 
  createCustomer, 
  getAllCustomers, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer,
  createMultipleCustomers,
  getActiveCustomers
} from '../config/crudOpereations.js';

async function testCRUDOperations() {
  console.log('🧪 Starting CRUD Operations Test...\n');

  try {
    // Test 1: CREATE
    console.log('📝 Test 1: Creating a customer...');
    const newCustomer = await createCustomer({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      isActive: true,
    });
    console.log('✅ Created customer:', newCustomer.toJSON());

    // Test 2: CREATE Multiple
    console.log('\n📝 Test 2: Creating multiple customers...');
    const multipleCustomers = await createMultipleCustomers([
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 25,
        isActive: true,
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        age: 35,
        isActive: false,
      },
    ]);
    console.log('✅ Created multiple customers');

    // Test 3: READ All
    console.log('\n👁️ Test 3: Reading all customers...');
    const allCustomers = await getAllCustomers();
    console.log(`✅ Found ${allCustomers.length} customers:`);
    allCustomers.forEach(customer => {
      console.log(`  - ${customer.name} (${customer.email})`);
    });

    // Test 4: READ Single
    console.log('\n👁️ Test 4: Reading single customer...');
    const singleCustomer = await getCustomerById(newCustomer.id);
    console.log('✅ Found customer:', singleCustomer.toJSON());

    // Test 5: UPDATE
    console.log('\n✏️ Test 5: Updating customer...');
    const updatedCustomer = await updateCustomer(newCustomer.id, {
      name: 'John Updated',
      age: 31,
    });
    console.log('✅ Updated customer:', updatedCustomer.toJSON());

    // Test 6: Query with filters
    console.log('\n🔍 Test 6: Getting active customers...');
    const activeCustomers = await getActiveCustomers();
    console.log(`✅ Found ${activeCustomers.length} active customers`);

    // Test 7: DELETE
    console.log('\n🗑️ Test 7: Deleting customer...');
    const isDeleted = await deleteCustomer(newCustomer.id);
    console.log(isDeleted ? '✅ Customer deleted successfully' : '❌ Customer not found');

    // Final READ to confirm deletion
    console.log('\n👁️ Final: Reading all customers after deletion...');
    const finalCustomers = await getAllCustomers();
    console.log(`✅ Total customers remaining: ${finalCustomers.length}`);

  } catch (error) {
    console.error('\n❌ Error during CRUD tests:', error);
  }
}

// Run the test
testCRUDOperations();