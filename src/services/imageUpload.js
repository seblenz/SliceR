// Image Upload Service using Cloudinary
import imageCompression from 'browser-image-compression';

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

// Compression options for client-side image processing
const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1200,
  useWebWorker: true,
  fileType: 'image/jpeg'
};

// Compress image before upload
export const compressImage = async (imageFile) => {
  try {
    console.log(`Original file size: ${(imageFile.size / 1024 / 1024).toFixed(2)} MB`);

    const compressedFile = await imageCompression(imageFile, compressionOptions);

    console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Failed to compress image');
  }
};

// Upload image to Cloudinary
export const uploadImage = async (imageFile) => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.warn('Cloudinary not configured. Image upload disabled.');
    return null;
  }

  try {
    // Compress image first
    const compressedImage = await compressImage(imageFile);

    // Create form data for upload
    const formData = new FormData();
    formData.append('file', compressedImage);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'slicer-reviews');

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

// Create a preview URL for local display before upload
export const createPreviewUrl = (imageFile) => {
  return URL.createObjectURL(imageFile);
};

// Revoke a preview URL to free memory
export const revokePreviewUrl = (previewUrl) => {
  URL.revokeObjectURL(previewUrl);
};

// Validate image file
export const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB before compression

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please select a valid image (JPEG, PNG, GIF, or WebP)' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be smaller than 10MB' };
  }

  return { valid: true };
};

export default {
  compressImage,
  uploadImage,
  createPreviewUrl,
  revokePreviewUrl,
  validateImage
};
