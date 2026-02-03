import { uploadToCloudinary, extractFileFromFormData, validateFile } from '../../../utils/fileUpload.js';
import cloudinary from '../../../config/cloudinary.js';

// POST /api/upload - Upload file to Cloudinary
export async function POST(request) {
  try {
    // Parse FormData
    const formData = await request.formData();
    
    // Extract folder name (optional, defaults to 'uploads')
    const folder = formData.get('folder') || 'uploads';
    
    // Extract and validate file
    const file = extractFileFromFormData(formData);
    validateFile(file);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(file, folder);

    // Return success response
    return Response.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        width: result.width,
        height: result.height,
        folder: result.folder
      },
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    return Response.json({
      success: false,
      message: error.message || 'Upload failed'
    }, { 
      status: error.message.includes('allowed') || error.message.includes('size') ? 400 : 500 
    });
  }
}

// DELETE /api/upload - Delete file from Cloudinary
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');
    
    if (!publicId) {
      return Response.json({
        success: false,
        message: 'Public ID is required'
      }, { status: 400 });
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      return Response.json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      return Response.json({
        success: false,
        message: 'Failed to delete file'
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Delete error:', error);
    
    return Response.json({
      success: false,
      message: 'Delete operation failed'
    }, { status: 500 });
  }
}
