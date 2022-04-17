import mongoose from 'mongoose'

const Schema = mongoose.Schema

const parentSchema = new Schema({
    religion: {
        type: 'String',
        enum: ['christianity', 'islam', 'hindu', 'buddism', 'others'],
        required: false
    },
    occupation: {
        type: 'String',
        required: false
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    },
    detail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model('Parent', parentSchema);