import process from 'node:process';
import mongoose from 'mongoose';
import { tableSchema, userSchema, counterSchema } from './schema.js';

export async function connectDB(){
    try {
        mongoose.connection.on('connecting', () => console.log('Connecting to MongoDB...'));
        mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
        mongoose.connection.on('disconnected', () => console.log('Disconnected from the MongoDB'));
        mongoose.connection.on('disconnecting', () => console.log('Disconnecting from MongoDB...'));
        await mongoose.connect(process.env.MONGO_URI || '');
        let handler = async () => {
            await mongoose.disconnect();
            process.exit(0);
        }
        process.on('exit', handler);
        process.on('SIGINT', handler);
        process.on('SIGTERM', handler);
    } catch(err) {
        console.log(err);   
    }
}

export const table = mongoose.model('table0', tableSchema);
export const user = mongoose.model('user0', userSchema);
export const counter = mongoose.model('counter0', counterSchema);
