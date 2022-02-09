import mongoose from 'mongoose'

const Schema = mongoose.Schema

const classSchema = new Schema({
    name: { type: 'String', required: true },
    code_name: { type: 'String', required: false },

})

export default mongoose.model('Class', classSchema);