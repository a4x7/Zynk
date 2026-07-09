import { Schema, model } from 'mongoose';

interface userType {
    username: string,
    email?: string,
    password: string,
}

const userSchema = new Schema<userType>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    password: {
        type: String,
        required: true,
    },
});

const user = model('user0', userSchema);

export type { userType };
export default user;
