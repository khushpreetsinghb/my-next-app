// BACKEND_MIGRATION_NOTE: This Next.js API route will be replaced by Express backend
// TODO: Move this logic to Express server at http://localhost:3001/api/upload

// import { NextResponse } from 'next/server';
// import cloudinary from '../../../config/cloudinary.js';
// import { uploadToCloudinary, extractFileFromFormData, validateFile } from '../../../utils/fileUpload.js';

// // POST supports either JSON { dataUrl, filename } or FormData (file)
// export async function POST(request) {
//   try {
//     const contentType = request.headers.get('content-type') || '';

//     // JSON dataUrl upload
//     if (contentType.includes('application/json')) {
//       const body = await request.json();
//       const { dataUrl, filename } = body;
//       if (!dataUrl) return NextResponse.json({ error: 'No file data provided' }, { status: 400 });

//       const result = await cloudinary.uploader.upload(dataUrl, {
//         folder: 'customers',
//         public_id: filename ? filename.replace(/\.[^/.]+$/, '') : undefined,
//         overwrite: true,
//       });

//       return NextResponse.json({ success: true, url: result.secure_url, publicId: result.public_id });
//     }

//     // FormData upload
//     const formData = await request.formData();
//     const file = extractFileFromFormData(formData);
//     validateFile(file);

//     const folder = formData.get('folder') || 'customers';
//     const result = await uploadToCloudinary(file, folder);

//     return NextResponse.json({ success: true, url: result.secure_url, publicId: result.public_id });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json({ success: false, message: error.message || 'Upload failed' }, { status: 500 });
//   }
// }

// // DELETE /api/upload?publicId=...
// export async function DELETE(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const publicId = searchParams.get('publicId');
//     if (!publicId) return NextResponse.json({ success: false, message: 'Public ID is required' }, { status: 400 });

//     const result = await cloudinary.uploader.destroy(publicId);
//     if (result.result === 'ok') return NextResponse.json({ success: true });
//     return NextResponse.json({ success: false, message: 'Failed to delete file' }, { status: 400 });
//   } catch (error) {
//     console.error('Delete error:', error);
//     return NextResponse.json({ success: false, message: 'Delete operation failed' }, { status: 500 });
//   }
// }

// TEMPORARY: Return empty response to prevent errors during migration
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'API migrated to Express backend' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'API migrated to Express backend' });
}
