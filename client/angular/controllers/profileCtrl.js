angular.module('MainApp')
    .controller('profileController',profileController);



function profileController($rootScope,userService, tokenService, $timeout) {
    
    const pc= this;
    pc.RDPname ='';
    pc.statusChanged = false;
    pc.statusUpdated = false;
    pc.allRDP = [];
    pc.errCatch = false;
    
    pc.loadRDP = function() {
        userService._getRDP()
            .then(function(data) {
                pc.allRDP = data.data.data;
        })
            .catch(function(err) {
                console.log('FAILED');
//                pc.errCatch = false;
//                $timeout(function(){
//                    $location.href('/logout')
//                },2000);
        });
    }
    
    function _init() {
        pc.userLogged = tokenService.getPayload(tokenService.getToken());
        $rootScope.userHeader = pc.userLogged.name;
        $rootScope.isNotAdmin = !pc.userLogged.admin;
        
        pc.loadRDP();
    }
    
    _init();
    
    pc.newRDP = function() {
        userService._addRDP(pc.RDPname)
            .then(function(data) {
                pc.allRDP = data.data.data.RDP;
                pc.RDPname = '';
        })
            .catch(function(err) {
                console.log('FAILED');
//                pc.errCatch = false;
//                $timeout(function(){
//                    $location.href('/logout')
//                },2000);
        });
    };
    
    pc.delRDP = function () {
        userService._deleteRDP(pc.deleteRDPID)
            .then(function(data){
                pc.allRDP = data.data.data.RDP;
        })
            .catch(function(err){
                console.log('Error in deleting');
//                pc.errCatch = false;
//                $timeout(function(){
//                    $location.href('/logout')
//                },2000);
        })
    }
    
    pc.toDelete = function(id) {
        pc.deleteRDPID = id;
    }
    
    pc.rdpNotEntered = function() {
        if(pc.RDPname.length > 0)
            return false;
        else
            return true;
    }
    
    pc.saveChange = function (id,status) {
        pc.statusChanged = true;
        userService._updateStatus(id, status)
            .then(function(data){
                pc.statusUpdated = true;
                $timeout(function(){
                        pc.statusChanged = false;
                        pc.statusUpdated = false;
                },1000);
        })
            .catch(function(err){
                pc.statusChanged = false;
//                pc.errCatch = false;
//                $timeout(function(){
//                    $location.href('/logout')
//                },2000);
        })
    }
    
    
}


























