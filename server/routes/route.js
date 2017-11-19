const userCtrl = require('./../controller/userCtrl');
const createResponse = require('./../configuration/response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRETKEY = require('./../configuration/jwtsecret');
const authenticatedUser = require('./../controller/authenticator');

const Auth = (req,res,next) => {

        let decoded = authenticatedUser(userCtrl.getClientToken(req.get('authorization')));
        if(decoded) {
//            console.log('decoded ',decoded);
            req.EMAIL = decoded.email;
            req.ADMIN = decoded.admin;
            next();
        }else {
            res.status(401).json(createResponse(true,'Not an authorised user to get RDP',401,null));
        }
};

const isAdmin = (req,res,next) => {
    
        if (!req.ADMIN) {
            res.status(401).json(createResponse(true,'Not an authorised user to get KEYRDP',401,null)); 
        } else {
            next();
        }
};

module.exports = app => {

//register-route
    app.post('/register', function(req,res) {
        userCtrl.registerUser(req.body)
            .then(function(data){
                res.json(createResponse(false,'User registered',200,data.getPublicFields()));
        })
            .catch(function(error){
                res.status(400).json(createResponse(true,'User not registered',400,error.errmsg));
        });
    });

//login-route
    app.post('/login', function(req, res) {
        let enteredPassword = req.body.password;
        
        userCtrl.loginUser(req.body)
            .then(function(user) {
                if(!user) {
                    res.status(404).json(createResponse(true,'Log in unsuccessful | User not found',404,null));
                } else {
//COMPARING THE PASSWORD ENTERED
                    bcrypt.compare(enteredPassword, user.password, function(err, response) {
                        if(err){
                            res.status(500).json(createResponse(true,'Password compare failed',500,err));
                        } else{
                            if(response){
                                let token = jwt.sign(user.getPayload(), SECRETKEY);
                                res.json(createResponse(false,'Log in successful',200,token));
                            }else{
                                res.status(401).json(createResponse(true,'Log in unsuccessful',401,null));
                            }
                        }
                    });
                }
                
        })
            .catch(function(error) {
                res.status(500).json(createResponse(true,'Database unavailable',500,error));            
        });
        
    });
    
    
    app.get('/userRDP',Auth,function(req, res) {
//Authenticate user and from decoded token get email id so RDP can be pulled
        
        userCtrl.getUserRDP(req.EMAIL)
            .then(function(data) {
                if(!data)
                    res.status(404).json(createResponse(true,'User not present',404,null)); 
                else
                    res.json(createResponse(false,'User RDP fetched',200,data.RDP));
        })
            .catch(function(err) {
                res.status(500).json(createResponse(true,'Database unavailable',500,err));                  
        });
     
    });
    

//Everyone's stats available for only Admins
    app.get('/keyRDP',Auth,isAdmin,function(req,res) {
        userCtrl.getKeyRDP()
            .then(function(data) {
                if(!data)
                    res.status(404).json(createResponse(true,'No Data present',404,null));
                else
                    res.json(createResponse(false,'Key RDP fetched',200,data));
        })
            .catch(function(err) {
                res.status(500).json(createResponse(true,'Database unavailable',500,err));             
        });
    });
    
//One's stats available for only Admins
    app.get('/keyOneRDP/:id',Auth,isAdmin,function(req,res) {
        userCtrl.getOneKeyRDP(req.params.id)
            .then(function(data) {
                if(!data)
                    res.status(404).json(createResponse(true,'No Data present',404,null));
                else
                    res.json(createResponse(false,'Key RDP of one fetched',200,data));
        })
            .catch(function(err) {
                res.status(500).json(createResponse(true,'Database unavailable',500,err));             
        });
    });
    
    
    app.post('/addRDP',Auth,function(req,res) {

        userCtrl.addRDP(req.EMAIL,req.body.RDP)
            .then(function(data){                
                if(!data){
                    return res.status(404).json(createResponse(true,'User not present',404,null)); 
                }
                res.json(createResponse(false,'RDP added to user',200,data.getRDPFields()));    
        })
            .catch(function(err){
                res.status(500).json(createResponse(true,'RDP could not be added',500,err)); 
        });

    });
    
    app.delete('/removeRDP/:id',Auth,function(req,res) {
        userCtrl.removeRDP(req.EMAIL,req.params.id)
            .then(function(data){
                if(!data){
                    return res.status(404).json(createResponse(true,'User not present',404,null)); 
                }
                res.json(createResponse(false,'RDP removed for user',200,data.getRDPFields()));                  
        })
            .catch(function(err){
                res.status(500).json(createResponse(true,'RDP could not be removed',500,err)); 
        });
    
    });
    
    app.put('/updateRDP/:id',Auth,function(req,res) {
        userCtrl.updateRDPStatus(req.EMAIL, req.params.id, req.body.rdpStatus)
            .then(function(data){
                if(!data){
                    return res.status(404).json(createResponse(true,'User not present',404,null)); 
                }
                res.json(createResponse(false,'RDP updated for user',200,data.getRDPFields()));                  
        })
            .catch(function(err){
                res.status(500).json(createResponse(true,'RDP could not be updated',500,err)); 
        });
    
    });
    
}



























