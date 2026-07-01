import { Schema } from 'mongoose';
export const tableSchema = new Schema({
    _id: Number,
    URL: {
        type: String,
        required: true,
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
    strict: 'throw'
});
tableSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
tableSchema.index({ URL: 1, user: 1 }, { unique: true });
export const userSchema = new Schema({
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
export const counterSchema = new Schema({
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
//# sourceMappingURL=schema.js.map