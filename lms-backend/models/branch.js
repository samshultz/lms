import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const branchSchema = new Schema({
    name: { type: 'String', required: false },
    address: { type: 'String', required: false },
    principal: { type: 'String', required: false },
})

export default mongoose.model('Branch', branchSchema)