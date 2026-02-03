'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-toastify';

export default function FileUploadDemo() {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (files) => {
    if (files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'nextjs-demo'); // Optional folder name

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          return {
            ...data.data,
            originalName: file.name,
            uploadTime: new Date().toISOString()
          };
        } else {
          throw new Error(data.message);
        }
      });

      const results = await Promise.all(uploadPromises);
      
      setUploadedFiles(prev => [...prev, ...results]);
      toast.success(`${results.length} file(s) uploaded successfully!`);

    } catch (error) {
      toast.error(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (publicId) => {
    try {
      const response = await fetch(`/api/upload?publicId=${publicId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setUploadedFiles(prev => prev.filter(file => file.publicId !== publicId));
        toast.success('File deleted successfully');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-2 border-green-500 p-4 rounded-lg max-w-2xl">
      <h3 className="text-lg font-bold mb-4">📁 File Upload Demo</h3>
      
      <div className="bg-green-50 p-3 rounded mb-4">
        <h4 className="font-semibold mb-2">📡 Upload Features:</h4>
        <div className="text-xs space-y-1 font-mono">
          <div><span className="text-green-600">POST</span> /api/upload - Upload files</div>
          <div><span className="text-red-600">DELETE</span> /api/upload?publicId=X - Delete file</div>
          <div><span className="text-blue-600">Supported:</span> JPG, PNG, WebP, PDF (max 5MB)</div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="mb-4">
        <div 
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="space-y-2">
            <div className="text-2xl">📤</div>
            <p className="text-sm font-medium">
              {uploading ? 'Uploading...' : 'Drag & drop files here or click to browse'}
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG, WebP, PDF (max 5MB each)
            </p>
          </div>
          
          <button
            type="button"
            onClick={onButtonClick}
            disabled={uploading}
            className="mt-4 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Choose Files'}
          </button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-3 text-sm">📋 Uploaded Files</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div key={file.publicId} className="p-2 border rounded hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-sm truncate">{file.originalName}</div>
                    <div className="text-xs text-gray-600">
                      {file.format.toUpperCase()} • {(file.size / 1024).toFixed(1)}KB
                    </div>
                    {file.url && (
                      <a 
                        href={file.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleDelete(file.publicId)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-yellow-50 p-3 rounded text-sm">
        <p className="font-semibold text-yellow-800 mb-2">💡 Next.js Upload Pattern:</p>
        <ul className="text-xs space-y-1">
          {/* <li>• No multer needed - uses native FormData</li> */}
          <li>• Server-side validation and processing</li>
          {/* <li>• Cloudinary integration for storage</li> */}
          <li>• Drag & drop support with progress feedback</li>
          <li>• Secure file handling with type/size limits</li>
        </ul>
      </div>

      <p className="mt-3 text-xs text-gray-600">
        This demonstrates: file uploads, drag & drop, validation
      </p>
    </div>
  );
}
