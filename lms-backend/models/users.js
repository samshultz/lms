import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { 
      type: 'String', 
      lowercase: true, 
      required: true, 
      unique: true, 
      index: true
  },
  password: {
    type: 'String',
    required: true,
    minlength: 8
  },
  
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  gender: {
    type: 'String',
    enum: ['male', 'female'],
    required : true 
  },
  email: { type: 'String', required: false, unique: true, index: true },
  phone: { type: 'String', required: false },
  address: { type: 'String', required: false },
  img: {
        data: Buffer,
        contentType: String
  },
  userType: {
    type: 'String',
    enum: ['admin', 'student', 'teacher', 'staff'],
    required: false
  },
  active: {
    type: Boolean,
    default: true
  },
  isSuperuser: {
    type: Boolean,
    default: false
  },
  roles: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Role'
    }
  ],
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
  },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});


userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.model('User', userSchema);