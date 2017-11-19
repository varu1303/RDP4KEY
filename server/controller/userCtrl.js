const mongoose = require('mongoose');
const User = require('./../db/userSchema');

mongoose.Promise = global.Promise;

const userMethods = {
    
    registerUser: userDetails => {

        let {email} = userDetails,
        {empID} = userDetails,
        {password} = userDetails, 
        {name} = userDetails,
        {tech} = userDetails, 
        {location} = userDetails;
        
        let user = new User({
            empID,
            email,
            password,
            name,
            tech,
            location          
        });
        
        return user.save();

    },
    
    loginUser: userCredential => {
//        let {email} = userCredential;
//        
//        return User.findOne({email: email});
        let {empID} = userCredential;
        
        return User.findOne({empID: empID});
    },
    
    getUserRDP: email => {
        return User.findOne({email: email},'RDP');
    },
    
    getKeyRDP: () => {
        return User.find({},'empID email name RDP location tech');
    },
    
    getOneKeyRDP: empid => {
        return User.findOne({empID: empid},'empID email name RDP location tech');
    },
    
    addRDP: (email,rdp) => {
        return User.findOneAndUpdate({"email": email},
                                     { $push : {RDP : rdp}},
                                     {new: true});
 
    },
    
    removeRDP: (email,rdpID) => {
        return User.findOneAndUpdate({"email": email},
                                     { $pull: { "RDP" : { _id: rdpID } }},
                                     {new: true});
    },
    
    updateRDPStatus: (email,rdpID,rdpStatus) => {
        return User.findOneAndUpdate({"email": email, "RDP._id": rdpID},
                                     {
                                        $set: {
                                                "RDP.$.rdpStatus" : rdpStatus
                                              }
                                     },
                                     {new: true});
    },
    
    
    getClientToken: authorization => {
        return authorization.split('Bearer ')[1];
    }
}

module.exports = userMethods;