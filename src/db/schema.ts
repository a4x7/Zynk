import { Schema } from 'mongoose';

interface tableType {
    _id: number,
    URL: string,
    user: any,
}

interface userType {
    username: string,
    email?: string,
    password: string,
}

const tableSchema = new Schema<tableType>({
    _id: Number,
    URL: {
        type: String,
        required: true,
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps: true,
    strict: 'throw'
});
tableSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
tableSchema.index({ URL: 1, user: 1}, { unique: true });

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

export type { tableType, userType };
export { tableSchema, userSchema };
