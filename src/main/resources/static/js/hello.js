angular
		.module('hello', [ 'ngRoute', 'home',  'form1','userProfile','AdminAccess'])
		.config(

				function($routeProvider, $httpProvider, $locationProvider) {

					//$locationProvider.html5Mode(true);

					$routeProvider.when('/', {
						templateUrl : 'js/home/home.html',
						controller : 'home',
						controllerAs : 'controller'
					}).when('/form1', {
						templateUrl : 'js/form1/form1.html',
						controller : 'form1',
						controllerAs : 'controller'
					}).when('/userProfile', {
						templateUrl : 'js/userProfile/userProfile.html',
						controller : 'userProfile',
						controllerAs : 'controller'
					}).when('/AdminAccess', {
						templateUrl : 'js/AdminAccess/AdminAccess.html',
						controller : 'AdminAccess',
						controllerAs : 'controller'
					}).otherwise('/');

					$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

				})	
.controller('home',

function($http) {
	
	var self = this;
	
	console.log('Loading');

	$http.get('user').then(function(response) {
		var data = response.data;
		if (data.name) {
			self.authenticated = true;
			self.user = data.name
			$http.get('/resource/').then(function(response) {
				self.greeting = response.data;
			})
		} else {
			self.authenticated = false;
		}
	}, function() {
		self.authenticated = false;
	});

});