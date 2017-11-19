angular.module('MainApp')
    .controller('outController',outController);


function outController($location, $timeout, tokenService) {

    tokenService.deleteToken();
    
    $timeout(function() {
        $location.path('/');
    },500);
}