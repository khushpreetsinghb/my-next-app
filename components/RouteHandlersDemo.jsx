'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function RouteHandlersDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingUser ? '/api/users' : '/api/users';
      const method = editingUser ? 'PUT' : 'POST';
      const payload = editingUser 
        ? { ...formData, id: editingUser.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({ name: '', email: '', role: 'user' });
        setEditingUser(null);
        fetchUsers(); // Refresh the list
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchUsers(); // Refresh the list
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Delete operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'user' });
  };

  return (
    <div className="border-2 border-blue-500 p-4 rounded-lg max-w-2xl">
      <h3 className="text-lg font-bold mb-4">🚀 Route Handlers Demo</h3>
      
      <div className="bg-blue-50 p-3 rounded mb-4">
        <h4 className="font-semibold mb-2">📡 API Endpoints:</h4>
        <div className="text-xs space-y-1 font-mono">
          <div><span className="text-green-600">GET</span> /api/users - Fetch all users</div>
          <div><span className="text-blue-600">POST</span> /api/users - Create new user</div>
          <div><span className="text-yellow-600">PUT</span> /api/users - Update user</div>
          <div><span className="text-red-600">DELETE</span> /api/users?id=X - Delete user</div>
        </div>
      </div>

      {/* Form Section */}
      <div className="mb-4 p-3 border rounded bg-gray-50">
        <h4 className="font-semibold mb-3 text-sm">
          {editingUser ? '✏️ Edit User' : '➕ Add New User'}
        </h4>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1">Role:</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (editingUser ? 'Update' : 'Add')}
            </button>
            
            {editingUser && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="mb-4">
        <h4 className="font-semibold mb-3 text-sm">👥 Users List</h4>
        
        {loading && !users.length ? (
          <div className="text-center py-4 text-sm">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-4 text-xs text-gray-500">No users found</div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {users.map((user) => (
              <div key={user.id} className="p-2 border rounded hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{user.name}</div>
                    <div className="text-xs text-gray-600">{user.email}</div>
                    <span className={`inline-block px-1 py-0.5 text-xs rounded-full mt-1 ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-yellow-50 p-3 rounded text-sm">
        <p className="font-semibold text-yellow-800 mb-2">💡 Key Points:</p>
        <ul className="text-xs space-y-1">
          <li>• Route handlers run <strong>only on the server</strong></li>
          <li>• No browser access - safe for API keys and secrets</li>
          <li>• Supports REST methods: GET, POST, PUT, DELETE</li>
          <li>• Built-in error handling and validation</li>
          <li>• No need for separate Express server</li>
        </ul>
      </div>

      <p className="mt-3 text-xs text-gray-600">
        This demonstrates: route handlers, CRUD operations, API integration
      </p>
    </div>
  );
}
