import cloudinary from '../config/cloudinary.js';

// Next.js compatible file upload utility
export async function uploadToCloudinary(file, folder = 'uploads') {
  try {
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only JPG, PNG, WebP, and PDF files are allowed');
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (buffer.length > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: file.type.startsWith('image/') ? 'image' : 'auto',
          public_id: `${Date.now()}-${Math.floor(Math.random() * 1e9)}`,
          format: file.type.split('/')[1] || 'jpg',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    throw error;
  }
}

// Helper function to extract file from FormData
export function extractFileFromFormData(formData, fieldName = 'file') {
  const file = formData.get(fieldName);
  if (!file) {
    throw new Error('No file provided');
  }
  return file;
}

// Helper function to validate file before upload
export function validateFile(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only JPG, PNG, WebP, and PDF files are allowed');
  }

  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB');
  }

  return true;
}
