import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: { type: 'String', required: true },
    address: { type: 'String', required: true },
    motto: { type: 'String', required: true },
    logo: {
        data: Buffer,
        contentType: String
    },
    branches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch'
        }
    ]
})

export default mongoose.model('School', schoolSchema)