import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// TODO: add a foreignkey to School model, so that each role belong
// to a school

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

roleSchema.methods.getPermissions = function(){
    return this.permissions
}

roleSchema.methods.hasPermission = async function(permission) {
    if (!permission || permission === 'undefined') {
        return false;
    }
 
    const permissions = await this.getPermissions();
    
    return permissions.includes(permission._id)
}

roleSchema.methods.addPermissions = async function(permissions) {
    if (!permissions || permissions === 'undefined') {
        return false;
    }
    permissions.map(perm => {
        this.hasPermission(perm).then(hasPerm => {
            if(!hasPerm){
                this.permissions.push(perm)
            }
        })
    })
    this.save()
}

roleSchema.methods.removePermissions = async function(permissions) {
    if(!permissions || permissions === 'undefined') {
        return false;
    }
    
    permissions.map(perm => {
        this.hasPermission(perm).then(hasPerm => {
            if(hasPerm){
                this.permissions = this.permissions.filter(p => p._id !== perm._id)
            }
        })
    })
    this.save()
}

export default mongoose.model('Role', roleSchema);    