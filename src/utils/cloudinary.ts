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
        use_filename: true,
        unique_filename: true,
        resource_type: 'image',
        invalidate: true,
        overwrite: false,
    }).catch((err) => {
        fs.rmSync(localFilePath);
        throw err;
    });

    console.log(uploadResult);

    return uploadResult;
};

async function deleteOnCloudinary(cloudinaryFilePath: string) {
    const fileName = cloudinaryFilePath.split('/').at(-1);
    if(!fileName)
        throw new Error('Invalid cloudinary URL');
    const public_id: string = fileName.slice(0, fileName.lastIndexOf('.'));
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '', 
        api_secret: process.env.CLOUDINARY_SECRET || '', // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    const destroyResult = await cloudinary.uploader.destroy(public_id, {
        resource_type: 'image',
        invalidate: true,
    });

    console.log(destroyResult);

    return destroyResult;
}

export { uploadOnCloudinary, deleteOnCloudinary };
