angular.module('MainApp')
    .controller('userController',userController);



function userController ($timeout, $location, tokenService, userService) {

    var vm = this;
    
    vm.l = {
        logEmpID: '',
        logPass: ''
    };
    vm.u = {
        userEmpId: '',
        userName: '',
        userEmail: '',
        userPass: '',
        userConPass: '',
        techSelect: 'Java',
        locSelect: 'Pune'
    };
    vm.logError = false;
    vm.logSuccess = false;
    vm.registerError = false;
    vm.registerSuccess = false;
    
    vm.log = function() {
        
        userService._login(vm.l)
          .then(function(d){
//                console.log('THIS IS RETURNED AFTER LOGIN ', d.data.data);
                tokenService.saveToken(d.data.data);
                vm.logSuccess=true;
                vm.logError=false;
                $timeout(function(){
                    vm.logSuccess=false;
                    $location.path('/profile');
                }, 500);
        })
            .catch(function(e){
                vm.logError=true;
        });

    };
    
    vm.reset = function() {
        vm.logError=false;
        vm.registerError = false;
        vm.u = {
            userEmpId: '',
            userName: '',
            userEmail: '',
            userPass: '',
            userConPass: '',
            techSelect: 'Java',
            locSelect: 'Pune'
        };
        vm.l = {
            logEmpID: '',
            logPass: ''
        };
    };
    
    vm.register = function() {
        
        userService._register(vm.u)
            .then(function(d){
                vm.u = {
                    userEmpId: '',
                    userName: '',
                    userEmail: '',
                    userPass: '',
                    userConPass: '',
                    techSelect: 'Java',
                    locSelect:'Pune'
                    };
            vm.registerSuccess = true;
            vm.registerError = false;
            
            $timeout(function(){
                vm.registerSuccess = false;
                angular.element('#login-form-link').trigger('click');
            }, 500);
        })
            .catch(function(e){
            console.log(e);
            vm.registerError = true;
            vm.registerSuccess = false;
        });
        
    };
}