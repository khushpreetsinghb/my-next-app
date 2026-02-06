'use client';

import { useState, useEffect } from 'react';

export default function TestDBPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    isActive: true,
    profileImage: '', // store the uploaded URL
  });
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [fileError, setFileError] = useState('');

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If a file was selected, upload it first
      let profileUrl = formData.profileImage;
      if (fileDataUrl) {
        setUploading(true);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: fileDataUrl, filename: formData.email || 'profile' }),
        });
        const uploadJson = await uploadRes.json();
        if (uploadRes.ok && uploadJson.url) profileUrl = uploadJson.url;
        setUploading(false);
      }

      const payload = { ...formData, profileImage: profileUrl };
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        alert('Customer created successfully!');
        setFormData({ name: '', email: '', age: '', isActive: true, profileImage: '' });
        setFileDataUrl(null);
        fetchCustomers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileDataUrl(null);
      setFileName(null);
      setFileError('');
      return;
    }

    // Client-side validation: type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(file.type)) {
      setFileError('Only JPG, PNG, and WebP images are allowed');
      setFileDataUrl(null);
      setFileName(null);
      return;
    }
    if (file.size > maxSize) {
      setFileError('File is too large. Max size is 5MB');
      setFileDataUrl(null);
      setFileName(null);
      return;
    }
    setFileError('');
    const reader = new FileReader();
    reader.onload = () => setFileDataUrl(reader.result);
    reader.readAsDataURL(file);
    setFileName(file.name);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    
    try {
      const response = await fetch(`/api/customers?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Customer deleted successfully!');
        fetchCustomers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Database CRUD Test</h1>
      
      {/* Create User Form */}
      <div className="mb-8 p-6 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              />
              <span>Active</span>
            </label>
          </div>

          <div>
            <label className="block text-sm mb-1">Profile Image</label>

            <div className="flex items-center gap-3">
              <label className={`inline-flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-50 ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                Choose file
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
              </label>

              <div className="text-sm text-gray-600">
                {fileName ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="font-medium text-gray-800">{fileName}</span>
                    <button type="button" onClick={() => { setFileDataUrl(null); setFileName(null); setFileError(''); }} className="text-xs text-red-500 hover:underline">Remove</button>
                  </span>
                ) : (
                  <span>No file chosen</span>
                )}
              </div>
            </div>

            {fileError && <p className="text-sm text-red-500 mt-2">{fileError}</p>}

            {fileDataUrl && (
              <div className="mt-3">
                <a href={fileDataUrl} target="_blank" rel="noopener noreferrer">
                  <img src={fileDataUrl} alt="preview" className="w-28 h-28 object-cover rounded-md border" />
                </a>
              </div>
            )}

            {uploading && <p className="text-sm text-gray-600 mt-2">Uploading image...</p>}
            <p className="mt-2 text-xs text-gray-500">Supported: JPG, PNG, WebP | Max size: 5MB | Max images: 1</p>
          </div>
          <button
            type="submit"
            disabled={uploading || !!fileError}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${uploading || fileError ? 'opacity-60 cursor-not-allowed hover:bg-blue-500' : ''}`}
          >
            {uploading ? 'Uploading…' : 'Create Customer'}
          </button>
        </form>
      </div>

      {/* Customers List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Users ({customers.length})</h2>
        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.id} className="p-4 border rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  {customer.profileImage ? (
                    <a href={customer.profileImage} target="_blank" rel="noopener noreferrer">
                      <img src={customer.profileImage} alt={`${customer.name} avatar`} className="w-16 h-16 object-cover rounded-md border" />
                    </a>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-md border flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-gray-600">{customer.email}</p>
                    <p className="text-sm text-gray-500">Age: {customer.age}</p>
                    <p className="text-sm text-gray-500">Active: {customer.isActive ? 'Yes' : 'No'}</p>
                    <p className="text-xs text-gray-400">Created: {new Date(customer.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}