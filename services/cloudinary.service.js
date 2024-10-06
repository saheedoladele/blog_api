import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { cloudKey, cloudName, cloudSecrete } from '../config/index.js';
import fs from 'fs';
import path from 'path';
import { resolve } from 'path';


cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecrete,
//   secure: true,
});



const fileFilter = (req, file, cb) => {
    const validFileTypes = [ 
        'image/jpeg', 
        'image/png', 
        'image/jpg',  
    ];
    
    if (validFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, JPG files are allowed'));
    }
  };
  

  const deleteFiles = (file) => {
    fs.unlink(path.resolve(file.path), (err) => {
      if (err) {
        throw err;
      }
      console.log('Delete File successfully.');
    });
  };
  

export const upload = multer({ dest: './uploads', fileFilter });


export const cloudinaryService = async (file) => {
    const fileSize = 1024 * 1024 * 10; // Corrected to 10MB, as per the error message
  
    if (file.size > fileSize) {
      deleteFiles(file);
      throw new Error('file size should not be more than 10mb');
    }
  
    try {
      const uploadedFile = await cloudinary.uploader.upload(file.path);
    
      deleteFiles(file);
  
      return uploadedFile.secure_url;
    } catch (error) {
      deleteFiles(file);
      throw error; // Rethrow the error to handle it appropriately elsewhere
    }
  };
  

  export const uploadImageToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath);
      // After uploading, remove the file from local storage
      fs.unlinkSync(resolve(filePath));
      return result.secure_url; // Return the uploaded image URL
    } catch (error) {
        console.log('Error', error)
      throw new Error('Error uploading to Cloudinary', error);
    }
  };