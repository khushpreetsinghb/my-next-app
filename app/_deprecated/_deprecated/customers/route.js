// BACKEND_MIGRATION_NOTE: This Next.js API route will be replaced by Express backend
// TODO: Move this logic to Express server at http://localhost:3001/api/customers

// This is the API route that handles HTTP requests from the UI
// import { NextResponse } from 'next/server';
// import {
//   createCustomer,
//   getAllCustomers,
//   getCustomerById,
//   updateCustomer,
//   deleteCustomer
// } from '../../../config/crudOpereations.js';

// GET all customers
// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (id) {
//       // Get single customer by ID
//       const customer = await getCustomerById(parseInt(id));
//       if (!customer) {
//         return NextResponse.json(
//           { error: 'Customer not found' },
//           { status: 404 }
//         );
//       }
//       return NextResponse.json(customer);
//     }

//     // Get all customers
//     const customers = await getAllCustomers();
//     return NextResponse.json(customers);
//   } catch (error) {
//     console.error('GET error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch customers' },
//       { status: 500 }
//     );
//   }
// }

// // POST create new customer
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const customer = await createCustomer(body);
//     return NextResponse.json(customer, { status: 201 });
//   } catch (error) {
//     console.error('POST error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create customer' },
//       { status: 500 }
//     );
//   }
// }

// // PUT update customer
// export async function PUT(request) {
//   try {
//     const body = await request.json();
//     const { id, ...updateData } = body;

//     if (!id) {
//       return NextResponse.json(
//         { error: 'Customer ID is required' },
//         { status: 400 }
//       );
//     }

//     const updatedCustomer = await updateCustomer(id, updateData);
//     if (!updatedCustomer) {
//       return NextResponse.json(
//         { error: 'Customer not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedCustomer);
//   } catch (error) {
//     console.error('PUT error:', error);
//     return NextResponse.json(
//       { error: 'Failed to update customer' },
//       { status: 500 }
//     );
//   }
// }

// // DELETE customer
// export async function DELETE(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json(
//         { error: 'Customer ID is required' },
//         { status: 400 }
//       );
//     }

//     const isDeleted = await deleteCustomer(parseInt(id));
//     if (!isDeleted) {
//       return NextResponse.json(
//         { error: 'Customer not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('DELETE error:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete customer' },
//       { status: 500 }
//     );
//   }
// }

// TEMPORARY: Return empty response to prevent errors during migration
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'API migrated to Express backend' });
}

export async function POST() {
  return NextResponse.json({ message: 'API migrated to Express backend' });
}

export async function PUT() {
  return NextResponse.json({ message: 'API migrated to Express backend' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'API migrated to Express backend' });
}