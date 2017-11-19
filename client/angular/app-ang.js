angular.module('MainApp',['ngRoute','ngAnimate'])
    .controller('MainController', MainController);




function MainController ($location) {
    var vm = this;
    
    vm.atHome = function() {
        return '/' == $location.path();
    };
    
    vm.atLoc = function (loc) {
        return loc == $location.path();
    }
    
}





