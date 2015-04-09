var app = angular.module("ChatApp", ["ng", "ngRoute", 'luegg.directives']);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "templates/home.html",
		controller: "LoginController",
	}).when("/room/:roomName", {
		templateUrl: "templates/room.html",
		controller: "RoomController",
	}).otherwise({ redirectTo: "/" });
}]);