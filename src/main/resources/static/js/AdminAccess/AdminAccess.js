angular.module('AdminAccess', [])

.controller('AdminAccess', function($scope,$http) {
var self = this;
	$scope.show=false;
	$scope.showform=true;
	$scope.message;
$scope.showMessage=false;
	$http.get('resource/').then(function(response) {
		self.greeting = response.data;
	});
    $scope.enterdata = function() {
    	
		$scope.errorMessage=false;
    	$scope.showform=false;
    	$scope.xyz=true;
    	var formData = {
				"username" : $scope.username,
				"mobile" : $scope.mobile,
				"email":$scope.email,
				"password":$scope.password,
		};
    	var response = $http.put('/resource/people/'+$scope.id, formData)
		response.success(function(data, status, headers, config) {
			$scope.userData=data;
			$scope.showMessage=true;
			$scope.getAll();
			$scope.endEdit();
			
		});
		response.error(function(data, status, headers, config) {
			//alert( "Exception details: " + JSON.stringify({data: data}));
			
			$scope.error=data;
			$scope.showMessage=false;
			console.log(data);
			$scope.errorMessage=data.error +"<br>"+data.message;
		});	
	};

	$scope.delete= function(id) {
		
		var response = $http.delete('/resource/people/'+id);
		response.success(function(data, status, headers, config) {
			$scope.getAll();
		});
		response.error(function(data, status, headers, config) {
			$scope.error="user is not having access for deleting";
		});
	};
	$scope.getAll= function() {
		$scope.xyz=false;
		var response = $http.get('/resource/people/');
		response.success(function(data, status, headers, config) {
			$scope.data=data;
		});
		response.error(function(data, status, headers, config) {
			//alert( "Exception details: " + JSON.stringify({data: data}));
			$scope.message=data.message;
			
		});};

	$scope.startEdit= function(data) {
		$scope.show=true;
		$scope.username = data.username;
		$scope.mobile = data.mobile;
		$scope.email = data.email;
		$scope.id = data.id;
		$scope.password = data.password;
		console.log('hi11');
	
	};
	$scope.endEdit= function(data) {
		$scope.isEdit = true;
		$scope.show=false;
	};

	$scope.getShow= function() {
		$scope.show=!$scope.show;
		$scope.getAll();
	};
	 $scope.clicked = function(){
		       window.location = "/";
		       
		 }
	 $scope.getAll();
});
	