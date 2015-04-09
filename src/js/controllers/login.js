app.controller("LoginController",
["$scope", "$location", "SocketService",
function($scope, $location, SocketService) {
	$scope.username = "";
	$scope.message = "";
	var socket = io.connect('http://localhost:8080');
	
	$scope.connect = function() {

		console.log("connect clicked!");

		if(socket) {

			socket.emit("adduser", $scope.username, function(available) {
				console.log("adduser: " + available);
				if(available) {
					console.log($scope.username + " is available");
					SocketService.setConnected(socket);
					SocketService.setUsername($scope.username);
					$location.path("/room/lobby");
				}
				else {
					console.log($scope.username + " is NOT available");
					$("#id_signup_message_div").show();
					$scope.message = "Your name is taken, please choose another";
					$scope.username = "";
				}
				$scope.$apply();
			});
		}
	};
}]);