import mongoose from 'mongoose'

const Schema = mongoose.Schema

const classSchema = new Schema({
    name: { type: 'String', required: true },
})

export default mongoose.model('Class', classSchema);