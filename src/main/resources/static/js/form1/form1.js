angular.module('form1', [])

.controller('form1', function($scope,$http) {
	var self = this;
	$scope.showform=true;
	
$scope.showMessage=false;
	$http.get('resource/').then(function(response) {
		self.greeting = response.data;
	});

    $scope.enterdata = function() {
  
    	$scope.xyz=true;
    	var formData = {
				"username" : $scope.username,
				"mobile" : $scope.mobile,
				"email":$scope.email,
				"password":$scope.password
				
		};
    		$scope.success=false,
    		$scope.errorMessage=false;
    		var response = $http.post('/resource/people/', formData)
    		response.success(function(data, status, headers, config) {
    			$scope.userData=data;
    		  	$scope.showform=false;
    			$scope.showMessage=true;
    			$scope.success="Your Registration Successful.. Below is your entered data";
    		});
    		response.error(function(data, status, headers, config) {
    			$scope.showMessage=false;
    		  	$scope.showform=true;
    			$scope.errorMessage=data.error +"<br>"+data.message;
    		});	
    	}
	 $scope.clicked = function(){
		       window.location = "/";
		       
		 }	
});


