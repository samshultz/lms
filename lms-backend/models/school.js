import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: { type: 'String', required: true },
    address: { type: 'String', required: false },
    motto: { type: 'String', required: false },
    logo: {
        data: Buffer,
        contentType: String
    },
    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        }
    ],
    'classArms': [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'classArms'
        }
    ],
    branches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch'
        }
    ]
})

export default mongoose.model('School', schoolSchema)