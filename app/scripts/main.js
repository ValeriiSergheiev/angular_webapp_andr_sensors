'use strict';

angular.module('myApp', ['ngRoute'])

//Root scope
.run(function($rootScope) {
	//<html ng-app="myApp" ng-init="newObjectSensorBoard=[]">
	//$rootScope.newObjectSensorBoard = [];
	//$rootScope.restoreLocalDataCashe = [];
})

//Controllers
.controller('sensorBoardCtrl', function ($scope, $compile, $q){
	//console.log(localStorage.browserStorageData);
	var currentFieldIndex;

	var restoreLocalDataCashe = JSON.parse(localStorage.getItem('browserStorageData'));
	console.log(restoreLocalDataCashe);
	if (localStorage.browserStorageData != undefined) {
		$scope.newObjectSensorBoard = restoreLocalDataCashe;
	} else {
		$scope.newObjectSensorBoard = [];
	};

	$scope.tempObjectSensorBoard = {
		id: '',
		title: '',
		desc: ''
	};
	
	//Add --> Ok button
	$scope.addNewObject = function() {
		if ($scope.tempObjectSensorBoard.title != '' || $scope.tempObjectSensorBoard.desc != '') {
			//Promise
			function asyncPreloader(name) {
				return $q(function(resolve, reject) {
					setTimeout(function() {
						if (true) {
							resolve('test');
						} else {
							reject(name + ' is not allowed.');
						}
					}, 2000);
				});
			}

			var promise = asyncPreloader('Test preloader');
			promise.then(function(resolve) {
				$scope.newObjectSensorBoard.push($scope.tempObjectSensorBoard);
				let index = $scope.newObjectSensorBoard.findIndex(element => element.id === $scope.tempObjectSensorBoard.id);
				let indexPrev = index - 1;
				if (index != 0 && index <= $scope.newObjectSensorBoard[indexPrev].id) {
					$scope.newObjectSensorBoard[index].id = $scope.newObjectSensorBoard[indexPrev].id + 1;
				} else {
					$scope.newObjectSensorBoard[index].id = index +1;
				}
				$scope.tempObjectSensorBoard = {
					id: '',
					title: '',
					desc: ''
				};
				localStorage.setItem('browserStorageData', JSON.stringify($scope.newObjectSensorBoard));
				$('.preloader').fadeOut('fast');
			}, function(reject) {
				alert('Failed: ' + reject);
				$('.preloader').fadeOut('fast');
			});
			//End Promise
			$('.modal').modal('hide');
			$('.preloader').fadeIn('fast');
		} else {
			alert('Fill in the fields!');
		}
	};

	//Edit button
	$scope.showEditModalDialog = function(fields) {
		$scope.header = 'Edit Sensor board';
		$scope.editField = angular.copy(fields);
		currentFieldIndex = $scope.newObjectSensorBoard.indexOf(fields);
		$('#myUniversalModal').modal();
	};

	//Delete button
	$scope.showDeleteModalDialog = function (fields) {
		currentFieldIndex = $scope.newObjectSensorBoard.indexOf(fields);
		$scope.newObjectSensorBoard.splice(currentFieldIndex, 1);
		localStorage.setItem('browserStorageData', JSON.stringify($scope.newObjectSensorBoard));
	};

	//Edit--->Ok button
	$scope.editModalDialog = () => {
		//var index = $scope.newObjectSensorBoard.findIndex(item => item.id === $scope.editField.id)
		//$scope.newObjectSensorBoard[index].title = $scope.editField.title
		$scope.newObjectSensorBoard[currentFieldIndex].title = $scope.editField.title;
		$scope.newObjectSensorBoard[currentFieldIndex].desc = $scope.editField.desc;
		$('#myUniversalModal').modal('hide');
	}

	//Clear local storage button
	$scope.restoreLocalStorage = () => {
		localStorage.removeItem('browserStorageData');
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

//Directives
.directive('editTitle', function() {
	return {
		template : '<input type="text" ng-model="editField.title"/>'
	};
})

.directive('editDesc', function() {
	return {
		template : '<input type="text" ng-model="editField.desc"/>'
	};
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

