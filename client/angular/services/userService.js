angular.module('MainApp')
    .service('userService', userService);

function userService($http, tokenService) {
    
    this._login = function (userCredentials) {
                
        return $http.post('/login',{empID: userCredentials.logEmpID,
                                    password: userCredentials.logPass});
  
    };
    
    
    this._register = function (userDetails) {

        return $http.post('/register',{empID: userDetails.userEmpId,
                                       email:userDetails.userEmail,
                                       password:userDetails.userPass,
                                       name:userDetails.userName,
                                       tech:userDetails.techSelect,
                                       location:userDetails.locSelect
                                        });
    };
    
    this._getAllRDP = function() {

        return $http.get('/keyRDP',{
                                        headers: {Authorization: 'Bearer '+ tokenService.getToken()}
            });        
    };
    
    this._getOneRDP = function(empId) {

        return $http.get('/keyOneRDP/'+empId,{
                                        headers: {Authorization: 'Bearer '+ tokenService.getToken()}
            });        
    };
    
    this._getRDP = function() {
        return $http.get('/userRDP',{
                                        headers: {Authorization: 'Bearer '+ tokenService.getToken()}
            });
    };
    
    this._addRDP = function(rdpName) {

        return $http.post('/addRDP',{
                                        RDP: {rdpName: rdpName}
                                    },{
                                        headers: {Authorization: 'Bearer '+ tokenService.getToken()}
            });
    };
    
    this._deleteRDP = function(id) {
        return $http.delete('/removeRDP/'+id,{
                                        headers: {Authorization: 'Bearer '+ tokenService.getToken()}
            });
    }
    
    this._updateStatus = function(id,status) {
        return $http.put('/updateRDP/'+id,{
                            rdpStatus: status
        },{
                                        headers: {Authorization: 'Bearer '+ tokenService.getToken()}
            });
    }
    
    
    this._rearrangeAllData = function(AllData) {
        
        let finalEmpData = {};
        let keyArray = [];
        
        AllData.forEach(function(val, ind) {

            let empId = val.empID;
            let email = val.email;
            let name = val.name;
            let mandCount = val.RDP.length;
            let location = val.location;
            let tech = val.tech;
            let compCount = 0,resCount = 0,enCount = 0,TBDCount = 0;
            val.RDP.forEach(function(v, i) {
                if (v.rdpStatus == 'Complete')
                    compCount += 1;
                if (v.rdpStatus == 'Result Pending')
                    resCount += 1;
                if (v.rdpStatus == 'Enrolled')
                    enCount += 1;
                if (v.rdpStatus == 'TBD')
                    TBDCount += 1;
                    
            });
            
            let Stat;
            
            if((compCount/mandCount) == 1){
                Stat = 'DONE';
            }
            else if((compCount/mandCount) >= 0.5){
                Stat = 'M50';
            }
            else{
                Stat = 'L50';
            }
            
            finalEmpData = {
                empId, email, name, mandCount, compCount, resCount, enCount, TBDCount, Stat, location, tech
            };
            
            keyArray.push(finalEmpData);
            
        });
        
        return keyArray;
    };
}










