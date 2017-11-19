angular.module('MainApp')
    .filter('fromLocation',fromLocation)
    .controller('keyController',keyController);


function fromLocation() {
    return function(emp, loc) {

        if(loc=='All'){
            return emp;
        }
        let filtered = [];
        for(let i=0; i<emp.length; i++){
            if(emp[i].location == loc)
                filtered.push(emp[i]);            
        }
        return filtered;

    }
}


function keyController(userService, $rootScope,tokenService,$timeout) {
    const kc = this;
    
    kc.adminLogged = tokenService.getPayload(tokenService.getToken());
    $rootScope.userHeader = kc.adminLogged.name;
    
    kc.keyRDP = [];
    kc.allEmpRDP = [];
    kc.showfilter = false;
    kc.filterbtnText= 'SHOW FILTERS';
    kc.srchLoc = 'All';
    kc.keyAllError = false;
    
    kc.toggleFilter = function() {
        kc.showfilter = !kc.showfilter;
        if(kc.filterbtnText == 'SHOW FILTERS')
            kc.filterbtnText= 'HIDE FILTERS'
        else
            kc.filterbtnText= 'SHOW FILTERS'

    }
    
    userService._getAllRDP()
        .then(function(data){
            kc.keyRDP = data.data.data;
            kc.allEmpRDP = userService._rearrangeAllData(kc.keyRDP);
        
    })
        .catch(function(err){
            console.log('Error ',err);
//            kc.keyAllError = true;
//        
//            $timeout(function(){
//                $location.href('/logout')
//            },2000);
    });
}