// In-memory database for demonstration
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

let nextId = 4;

// GET /api/users - Fetch all users
export async function GET() {
  return Response.json({
    success: true,
    data: users,
    message: 'Users retrieved successfully'
  });
}

// POST /api/users - Create a new user
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.name || !body.email) {
      return Response.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check for duplicate email
    if (users.some(user => user.email === body.email)) {
      return Response.json(
        { success: false, message: 'Email already exists' },
        { status: 409 }
      );
    }

    const newUser = {
      id: nextId++,
      name: body.name,
      email: body.email,
      role: body.role || 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    return Response.json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    }, { status: 201 });

  } catch (error) {
    return Response.json(
      { success: false, message: 'Invalid JSON data' },
      { status: 400 }
    );
  }
}

// PUT /api/users - Update a user
export async function PUT(request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return Response.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const userIndex = users.findIndex(user => user.id === body.id);
    
    if (userIndex === -1) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Update user fields
    users[userIndex] = {
      ...users[userIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    return Response.json({
      success: true,
      data: users[userIndex],
      message: 'User updated successfully'
    });

  } catch (error) {
    return Response.json(
      { success: false, message: 'Invalid JSON data' },
      { status: 400 }
    );
  }
}

// DELETE /api/users - Delete a user
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id'));
    
    if (!id) {
      return Response.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    return Response.json({
      success: true,
      data: deletedUser,
      message: 'User deleted successfully'
    });

  } catch (error) {
    return Response.json(
      { success: false, message: 'Error processing request' },
      { status: 500 }
    );
  }
}
