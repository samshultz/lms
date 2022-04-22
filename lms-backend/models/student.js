import mongoose from 'mongoose';

const Schema = mongoose.Schema

const studentSchema = new Schema({
    dateOfBirth: { type: Date, required: true },
    bio: {type: "String", required: false},
    bloodGroup: {
        type: 'String',
        enum: ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'],
        required: false
    },
    religion: {
        type: 'String',
        enum: ['christianity', 'islam', 'hindu', 'buddhism', 'others'],
        required: false
    },
    classRole: { type: "String" },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    },
    admissionID: {
        type: 'String',
        required: false
    },
    nextOfKin: {
        firstName: { type: 'String' },
        lastName: { type: 'String' },
        phone: { type: 'String' },
        relationship: { type: 'String' },
        address: { type: 'String' }
    },
    maritalStatus: {
        type: 'String',
        enum: ['single', 'married', 'separated', 'divorced', 'other'],
        required: false
    },
    detail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model('Student', studentSchema);