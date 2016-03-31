var adminapp = angular.module('adminApp', ['ngRoute']);

adminapp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/nodemanagement', {
            templateUrl: 'templates/NodeManagementPartial.html',
            controller: 'NodeManagementController'
        }).      
        otherwise({
            redirectTo: '/nodemanagement'
        });
  }]);

adminapp.controller('MainController', function ($scope) {
    
    $scope.global = {};
   
    
    $scope.closealert = function () {
        $scope.global.status = '';
    } 
      

})


adminapp.controller('NodeManagementController', function ($scope, $http) {
     function BlockChainCore(){
        this.nodeDictionary = [];
    }
    function Node(name) {
        this.name = name;
        this.blocks = [];
        this.isSynced = false;
    }

    function Block() {
        this.transactions = [];
    }
    
    function Transaction() {

    }
    

    $scope.mode = 'nodelist';
    $scope.newnodeobj = {};
    $scope.getAllNodes = function(){
    var req = {
            method: 'GET',
            url: 'api/getAllNodes',            
        }

        $http(req).then(function (data) {
            console.log(data);
            $scope.blockChain.nodeDictionary = data.data;
        }, function (error) {
            console.log(error);
        });

   }
 function initiateBlockChainSystem(){
        $scope.blockChain = new BlockChainCore();
        $scope.getAllNodes();
        //getBlocks();
    }

    initiateBlockChainSystem();
   $scope.addNewNode = function(){
    var req = {
            method: 'POST',
            url: 'api/addnode',
            data: {               
                name:$scope.newnodeobj.name,
                ip:$scope.newnodeobj.ip               
            }
        }

        $http(req).then(function (data) {
            console.log(data);
            $scope.getAllNodes();
            $scope.mode='nodelist';
                     
        }, function (error) {
            console.log(error);
        });

   }

   $scope.deleteNode = function(node){
    var req = {
            method: 'POST',
            url: 'api/deletenode',
            data: {               
                name:node.name,
                              
            }
        }

        $http(req).then(function (data) {
            console.log(data);
            $scope.getAllNodes();           
                     
        }, function (error) {
            console.log(error);
        });

   }

   $scope.editNode = function(node){
      $scope.mode='editnode';
      $scope.editnodeobj = node;

      

   }

   $scope.updatenodechages = function(){
    var req = {
            method: 'POST',
            url: 'api/updatenode',
            data: {               
                name:$scope.editnodeobj.name,
                ip:$scope.editnodeobj.ip
                              
            }
        }

        $http(req).then(function (data) {
            console.log(data);
            $scope.getAllNodes();  
            $scope.mode='nodelist';         
                     
        }, function (error) {
            console.log(error);
        });
   }
})