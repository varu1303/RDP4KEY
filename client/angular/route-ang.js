angular.module('MainApp')
    .config(function($routeProvider,$locationProvider){

    $routeProvider
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'userController',
            controllerAs: 'user'
		})
		.when('/profile', {
			templateUrl: 'templates/profile.html',
			controller: 'profileController',
            controllerAs: 'pro'
		})
        .when('/keystat', {
			templateUrl: 'templates/keystat.html',
			controller: 'keyController',
            controllerAs: 'key'
		})
        .when('/keyOne/:empID', {
			templateUrl: 'templates/keyone.html',
			controller: 'keyOneController',
            controllerAs: 'keyOne'
		})
        .when('/logout', {
			templateUrl: 'templates/logout.html',
			controller: 'outController',
            controllerAs: 'out'
		})
		.otherwise({
			redirectTo: '/'
		});

//To make the URLs pretty (getting rid of #)
    $locationProvider.html5Mode(true);
})

    .run(function($rootScope, $location, tokenService) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
          
        if ($location.path() !== '/' && !tokenService.isLoggedIn()) {
            $location.path('/');
        }
        
        if ($location.path() == '/keystat' && tokenService.isLoggedIn() && !tokenService.isAdmin()) {
            $location.path('/profile');
        }
            
        if($location.path() == '/' && tokenService.isLoggedIn() ){
            $location.path('/profile');
        }
        });
});

















