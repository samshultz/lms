import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    date_of_birth: { type: Date, required: true },
    id_no: { type: Number, required: false },
    blood_group: {
        type: 'String',
        enum: ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'],
        required: false
    },
    religion: {
        type: 'String',
        enum: ['christianity', 'islam', 'hindu', 'buddism', 'others'],
        required: false
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
    },
    next_of_kin: {
        name: { type: 'String' },
        phone: { type: 'String' },
        relationship: { type: 'String' },
        address: { type: 'String' }
    },
    marital_status: {
        type: 'String',
        enum: ['single', 'married', 'separated', 'divorced', 'other'],
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

export default mongoose.model('Teacher', teacherSchema);
