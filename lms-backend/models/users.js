import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../config.js'
let SALT_WORK_FACTOR = parseInt(config.bcrypt_salt);
import Role from "./roles.js"

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
  email: { type: 'String', required: false },
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
  UserRoles: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Role'
    }
  ],
  UserPermissions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Permission'
    }
  ],
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
  },
  token: { type: String },
  refreshToken: { type: String },
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

userSchema.methods.getRoles = async function() {
  let roles = this.UserRoles

  roles = await Role.find({"_id": {$in: roles}}, function(err, docs){
    if(err){
      return []
    } else if(docs) {
      return docs
    }
    
  }).clone()
  return roles
}

userSchema.methods.hasRole = async function(role) {
  if(!role || role === 'undefined') {
    return false
  }

  const roles = await this.getRoles()
  
  // console.log(rl)
  return !!roles.map(({ name }) => name).includes(role.name)
}

userSchema.methods.addRoles = async function(roles) {
  if(!roles || roles === undefined) {
    return false
  }
  
  roles.map(role => {
    this.hasRole(role).then(hasRl => {
      if(!hasRl){
        this.UserRoles.push(role)
      }
    })
  })
  this.save()
}

userSchema.methods.getPermissions = async function() {
  return this.UserPermissions
}

userSchema.methods.hasPermission = async function(permission) {
  if (!permission || permission === 'undefined') {
      return false;
  }

  const permissions = await this.getPermissions();
  
  return permissions.includes(permission._id)
}

userSchema.methods.hasPermissionThroughRole = async function (permission) {
  if (!permission || permission === 'undefined') {
    return false;
  }
  let roles = await this.getRoles();
  let hasPTR = false

  for (var i = 0; i < roles.length; i++){
    if(roles[i].getPermissions().includes(permission._id)){
      hasPTR = true
      break
    }
  }
  return hasPTR
  
};

userSchema.methods.hasPermissionTo = async function (permission) {
  if (!permission || permission === 'undefined') {
    return false;
  }
  console.log("I am jugging")
  return await this.hasPermissionThroughRole(permission) || this.hasPermission(permission);
};
export default mongoose.model('User', userSchema);