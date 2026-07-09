import { Schema, model } from 'mongoose';

interface tableType {
    _id: number,
    URL: string,
    user: any,
    expireAt?: Date,
}

const tableSchema = new Schema<tableType>({
    _id: Number,
    URL: {
        type: String,
        required: true,
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    expireAt: {
        type: Date,
        default: () => new Date(Date.now()+1000*60*5)
    }
}, {
    strict: 'throw'
});
tableSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
tableSchema.index({ URL: 1, user: 1}, { unique: true });

const table = model('table0', tableSchema);

export type { tableType };
export default table;
