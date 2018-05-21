var myApp = angular.module('myApp', []);
myApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.showhideInput = true;

    let refresh = function () {
        $http.get('/contactlist').success(function(res){
            console.log('Data Received');
            $scope.contactList = res;
            $scope.contact = "";
        }); 
    };
    
    refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post('/contactlist',$scope.contact).success(function(res){
            console.log('post successful',res);
            $scope.deselect();
            refresh();
        });
    };

    $scope.remove = function (id) {
        console.log('Remove this user id:',id);
        $http.delete('/contactlist/' +id).success(function(res){
            refresh();
        });
    };

    $scope.edit = function (id) {
        console.log('This record will be edited',id);
        $http.get('/contactlist/' + id).success(function(res){
            console.log('Data recived for edit',res);
            $scope.contact = res;
            $scope.showhideInput = false;
        });
    };

    $scope.update = function () {
        console.log('This is from update',$scope.contact._id);
        $http.put('/contactlist/'+ $scope.contact._id,$scope.contact).success(function(res){
            console.log('Successfully updated the record');
            $scope.deselect();
            refresh();
        });
    };

    $scope.deselect = function () {
        $scope.contact = "";
        $scope.showhideInput = true;
    };

    validateInput = function () {
        if($scope.contact === ''){
            alert('Please enter contact details');
        } else if ($scope.contact.name === '') {
            alert('Please enter Name');
        } else if ($scope.contact.email === ''){
            alert('Please enter Email Address');
        } else if($scope.contact.number === '') {
            alert('Please enter Contact Number');
        } else {
            return true;
        }
    }
    
}]);