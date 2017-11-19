const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 13;

const Schema = mongoose.Schema;


const userSchema = new Schema({
    empID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tech: String,
    location: String,
    admin: {
        type: Boolean,
        default: true
    },
    RDP: [{
        rdpName: String,
        rdpStatus: { 
                    type: String,
                    default: 'TBD'
                }
    }]
});

userSchema.pre('save', function(next) { 
    var u = this;
    // only hash the password if it has been modified (or is new)
    if (!u.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
        bcrypt.hash(u.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            u.password = hash;
            next();
        })
    })
});


userSchema.methods.getPublicFields = function () {
    let returnObject = {
        name: this.name,
        email: this.email
    };
    return returnObject;
};

userSchema.methods.getRDPFields = function () {

    let returnObject = {
        empID: this.empID,
        name: this.name,
        email: this.email,
        RDP: this.RDP
    };
    return returnObject;
};

userSchema.methods.getPayload = function () {
    let returnObject = {
        name: this.name,
        email: this.email,
        admin: this.admin,
        location: this.location,
        tech: this.tech
    };
    return returnObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;