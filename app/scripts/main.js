'use strict';

angular.module('myApp', ['ngRoute'])

//Root scope
.run(function($rootScope) {
	//$rootScope.newObjectSensorBoard = [];
})

//Controllers
.controller('sensorBoardCtrl', function ($scope, $compile){

	$scope.tempObjectSensorBoard = {
		id: '',
		title: '',
		desc: ''
	};
	
	$scope.addNewObject = function() {
		if ($scope.tempObjectSensorBoard.id != '' || $scope.tempObjectSensorBoard.title != '' || $scope.tempObjectSensorBoard.desc != '') {
			$scope.newObjectSensorBoard.push($scope.tempObjectSensorBoard);
			$scope.tempObjectSensorBoard = {
				id: '',
				title: '',
				desc: ''
			};
			$('.modal').modal('hide');
		} else {
			alert('Fill in the fields!');
		}
	};

	//Edit button
	$scope.showEditModalDialog = function(fields) {
		//console.log($scope);
		$scope.header = 'Edit Sensor board';
		$scope.editSB = fields;
		var template = $compile('<div><input type="text" ng-model="editSD.title"/></div>');
		var bodyRes = template($scope);
		$('#myUniversalModal .modal-body').append(bodyRes);
		$('#myUniversalModal').modal();
	};

	//Delete button
	$scope.showDeleteModalDialog = function (fields) {
		var currentFieldIndex = $scope.newObjectSensorBoard.indexOf(fields);
		$scope.newObjectSensorBoard.splice(currentFieldIndex, 1);
	};

})

.controller('protocolsCtrl', function ($scope){
	$scope.msg = 'Protocols!!!';
})

.controller('sensorsCtrl', function ($scope){
	$scope.msg = 'Sensors!!!';
})

.controller('devicesCtrl', function ($scope){
	$scope.msg = 'Devices!!!';
})

//Routing
.config(function($routeProvider) {
	$routeProvider
	.when('/sensor-board', {
		templateUrl : 'sensor-board.html',
		controller: 'sensorBoardCtrl'
	})
	.when('/protocols', {
		templateUrl : 'protocols.html',
		controller: 'protocolsCtrl'
	})
	.when('/sensors', {
		templateUrl : 'sensors.html',
		controller: 'sensorsCtrl'
	})
	.when('/devices', {
		templateUrl : 'devices.html',
		controller: 'devicesCtrl'
	})
	.otherwise({
		template : '<h1>Home</h1>'
	});
});

