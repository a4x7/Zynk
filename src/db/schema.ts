import { Schema } from 'mongoose';

export interface tableType{
    _id: number,
    URL: string,
    user: userType,
}

export interface userType{
    username: string,
    email?: string,
    password: string,
}

export interface counterType{
    id: number,
    count: number
}

export const tableSchema = new Schema<tableType>({
    _id: Number,
    URL: {
        type: String,
        required: true,
    },
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
    timestamps: true,
    strict: 'throw'
});
tableSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
tableSchema.index({ URL: 1, user: 1}, { unique: true });

export const userSchema = new Schema<userType>({
    username: {
        type: String,
        required: true,
    },
    email: String,
    password: {
        type: String,
        required: true,
    },
});

export const counterSchema = new Schema<counterType>({
    id: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
        default: 0,
    },
});

