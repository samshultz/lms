import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: 'String',
        required: true,
        unique: true
    },
    description: {
        type: 'String'
    },
    permissions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Permission',
        },
    ],
});


export default mongoose.model('Role', roleSchema);    