import process from 'node:process';
import fs from 'node:fs';
import { v2 as cloudinary } from 'cloudinary';

async function uploadOnCloudinary(localFilePath: string) {
    if(!localFilePath)
        throw new Error('No path specified');

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '', 
        api_secret: process.env.CLOUDINARY_SECRET || '', // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
        public_id: 'avatar',
        unique_filename: true,
        resource_type: 'image',
        invalidate: false,
        overwrite: false,
    }).catch((err) => {
        fs.rmSync(localFilePath);
        throw err;
    });

    console.log(uploadResult);

    return uploadResult;
};

export default uploadOnCloudinary;
