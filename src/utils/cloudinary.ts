import process from 'node:process';
import fs from 'node:fs';
import { v2 as cloudinary } from 'cloudinary';

async function uploadOnCloudinary(localFilePath: string) {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '', 
        api_secret: process.env.CLOUDINARY_SECRET || '', // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader.upload(localFilePath, {
             public_id: 'pfp',
             format: "auto",
     }).catch(() => {
         fs.unlinkSync(localFilePath);
     });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('pfp', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('pfp', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    

    return uploadResult;
};

export default uploadOnCloudinary;
