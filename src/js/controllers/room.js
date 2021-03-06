app.controller("RoomController", ["$scope", "$routeParams", "$location","$timeout", "SocketService", function($scope, $routeParams, $location,  $timeout,  SocketService) {
	$scope.roomName = $routeParams.roomName;
	$scope.roomNameInput = "";
	$scope.currentMessage = "";
	$scope.currentPrivateMess = "";
	$scope.roomList = [];
	$scope.roomNames = [];
	$scope.currentRoom = {};
	$scope.roomMessages = [];
	$scope.privateMesages = [];
	$scope.selectedUser = "";

	$scope.glued = true;

	$scope.username = SocketService.getUsername();
	var socket = SocketService.getSocket();
	if(!socket){ $location.path("/"); }

	if(socket){
        socket.on("recv_privatemsg", function(username, message){
          $scope.privateMesages.push({nick: username, mess: message});
          $scope.$apply();
        });

		socket.emit("joinroom", { room: $scope.roomName }, function(success, errorMessage) {
			if(success){
				$location.path("/room/"+$scope.roomName);
				$scope.$apply();
			}
			else{
				console.log("Error msg Join Room: "+errorMessage);
			}
		});

			socket.emit("rooms");

			socket.on("roomlist", function(rooms){

			$scope.roomNames = [];
			//$scope.roomList = rooms;
				for(var key in rooms){
					$scope.roomNames.push(key);
				}

				$scope.currentRoom = rooms[$scope.roomName];
				$scope.$apply();
			});

		$scope.create = function() {
				if(socket) {
					socket.emit("joinroom", { room: $scope.roomNameInput }, function(success, errorMessage) {
						if(success){
							$location.path("/room/"+$scope.roomNameInput);
							$scope.$apply();
						}
						else{
							console.log("Error msg Join Room: "+errorMessage);
						}
					});
				}
			};

		socket.on("updatechat", function(roomname, messageHistory) {
			//console.log(messageHistory);
			$scope.roomMessages = messageHistory;
			//$scope.filtertime();
			$scope.$apply();
		});

		socket.on("updateusers", function(room, users) {
			if(room === $scope.roomName) {
	
				$scope.users = users;
				$scope.$apply();
			}
		});

		$scope.filtertime = function(){
			for(var message in $scope.roomMessages)
			{
				$scope.roomMessages[message].timestamp = $scope.roomMessages[message].timestamp.slice(11,19);
				$scope.$apply();
			}
		};

		/*$scope.setRooms = function(rooms){
			$scope.roomList = rooms;
		};*/

		$scope.setuser = function(username){
			$scope.selectedUser = username;
		};
	
		$scope.send = function() {
			if(socket) {
				console.log("I sent a message to " + $scope.roomName + ": " + $scope.currentMessage);
				socket.emit("sendmsg", { roomName: $scope.roomName, msg: $scope.currentMessage });
				$scope.currentMessage = "";

			}
		};

		$scope.keyPress = function($event) {
			if($event.keyCode === 13) {
				$scope.send();
			}
		};

		$scope.disconnect = function(){
			if(socket) 
			{
					socket.emit("disconnect");
					
					$location.path("/");
			}
		};

		$scope.updateRooms = function(){
			socket.emit("rooms");

			socket.on("roomlist", function(rooms){

			$scope.roomNames = [];
				for(var key in rooms){
					$scope.roomNames.push(key);
				}

				$scope.currentRoom = rooms[$scope.roomName];
				$scope.$apply();
			});
		};



		$scope.privatesend = function(){
		if(socket) {
			if($scope.selectedUser == $scope.username){
				socket.emit("privatemsg", { nick: $scope.username, message: "Why am I sending myself a message?" }, function(accepted){
				$scope.$apply();

				if(accepted){
				}

				});
			}
			else if($scope.selectedUser === ""){
				alert("you must select a user");
				$scope.$apply();
			}
			else{
				socket.emit("privatemsg", { nick: $scope.selectedUser, message: $scope.currentPrivateMess }, function(accepted){
				$scope.privateMesages.push({nick: ("me->" + $scope.selectedUser), mess: $scope.currentPrivateMess});
				$scope.currentPrivateMess = "";
				$scope.$apply();
					if(accepted){

					}

				});
			}
	
			$scope.currentPrivateMess = "";
			$scope.$apply();
		}
		};
	}
}]);