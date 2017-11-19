angular.module('MainApp')
    .controller('keyOneController',keyOneController);


function keyOneController($routeParams,userService,tokenService,$rootScope,$window) {

    const koc = this;
    
    koc.keyoneError = false;
    
    koc.adLogged = tokenService.getPayload(tokenService.getToken());
    $rootScope.userHeader = koc.adLogged.name;   
    
    userService._getOneRDP($routeParams.empID)
        .then(function(data) {
            koc.oneDetail = data.data.data;
    })
        .catch(function(err) {
            console.log(err);
//            koc.keyoneError = true;
//            $timeout(function(){
//                $location.href('/logout')
//            },2000);
    });
    
    koc.sendEmail = function(email) {
        var link = "mailto:"+ email; 

        $window.open(link);
    };
 
}