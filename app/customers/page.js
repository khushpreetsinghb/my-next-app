'use client';

import { useState, useEffect, useRef } from 'react';
import ImageModal from '@/components/ui/ImageModal';
import { toast } from 'react-toastify';

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
  const fileInputRef = useRef(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
  // BACKEND_INTEGRATION_NOTE: This fetch will be replaced with Express backend API call
  // const response = await fetch('/api/customers');
  // TODO: Replace with: const response = await fetch('http://localhost:3001/api/customers');
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
        // BACKEND_INTEGRATION_NOTE: This upload will be replaced with Express backend API call
        // const uploadRes = await fetch('/api/upload', {
        // TODO: Replace with: const uploadRes = await fetch('http://localhost:3001/api/upload', {
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

      // Determine if it's create or update
      const isUpdate = editingCustomer !== null;
      // BACKEND_INTEGRATION_NOTE: This API call will be replaced with Express backend
      // const url = isUpdate ? `http://localhost:3001/api/customers` : 'http://localhost:3001/api/customers';
      const url = isUpdate ? `/api/customers` : '/api/customers';
      const method = isUpdate ? 'PUT' : 'POST';

      if (isUpdate) {
        payload.id = editingCustomer;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(isUpdate ? 'Customer updated successfully!' : 'Customer created successfully!');
        setFormData({ name: '', email: '', age: '', isActive: true, profileImage: '' });
        setFileDataUrl(null);
        setFileName(null);
        setFileError('');
        setEditingCustomer(null);
        // Clear file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        fetchCustomers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error creating/updating customer:', error);
      toast.error('Failed to save customer');
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

  const handleRemoveImage = () => {
    setFileDataUrl(null);
    setFileName(null);
    setFileError('');
    // Clear the file input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    try {
    // BACKEND_INTEGRATION_NOTE: This delete will be replaced with Express backend API call
    // const response = await fetch(`http://localhost:3001/api/customers?id=${id}`, {
    const response = await fetch(`/api/customers?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Customer deleted successfully!');
        fetchCustomers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer');
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      age: customer.age || '',
      isActive: customer.isActive,
      profileImage: customer.profileImage || '',
    });
    setEditingCustomer(customer.id);
    // Set existing image for display if it exists
    if (customer.profileImage) {
      setFileDataUrl(customer.profileImage);
      setFileName('existing-image.jpg'); // Set a placeholder filename
    } else {
      setFileDataUrl(null);
      setFileName(null);
    }
    setFileError('');
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setFormData({ name: '', email: '', age: '', isActive: true, profileImage: '' });
    setEditingCustomer(null);
    setFileDataUrl(null);
    setFileName(null);
    setFileError('');
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Database CRUD Test</h1>

      {/* Create User Form */}
      <div className="mb-8 p-6 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingCustomer ? 'Edit Customer' : 'Create New Customer'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <span>Active</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Profile Image</label>

            <div className="flex items-center gap-2">
              <input
                type="file"
                id="profileImage"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
                tabIndex="0"
              />
              <label
                htmlFor="profileImage"
                className={`inline-flex items-center px-2 py-1 bg-gray-400 text-white rounded-md cursor-pointer hover:bg-gray-500 transition-colors duration-200 ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
                tabIndex="0"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Choose File
              </label>

              <div className="text-sm text-gray-600">
                {!fileName ? (
                  <span>No file chosen</span>
                ) : (
                  <span>{fileName}</span>
                )}
              </div>
            </div>

            {fileError && <p className="text-sm text-red-500 mt-2">{fileError}</p>}

            {fileDataUrl && (
              <div className="mt-3 relative inline-block group">
                <ImageModal
                  imageUrl={fileDataUrl}
                  altText={fileName || 'preview'}
                  triggerElement={
                    <img src={fileDataUrl} alt="preview" className="w-20 h-20 object-cover rounded-md border" />
                  }
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md text-gray-600 hover:text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Remove image"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
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
            {uploading ? 'Uploading…' : (editingCustomer ? 'Update Customer' : 'Create Customer')}
          </button>
          {editingCustomer && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
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
                    <ImageModal
                      imageUrl={customer.profileImage}
                      altText={`${customer.name} avatar`}
                      triggerElement={
                        <img src={customer.profileImage} alt={`${customer.name} avatar`} className="w-16 h-16 object-cover rounded-md border" />
                      }
                    />
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
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}