var visualizeapp = angular.module('visualizeApp', ['ngRoute']);


visualizeapp.controller('VisualizeController', function ($timeout, $scope, $http) {
    this.name = 'sujith';
    this.statusMessage = 'Blockchain visualizer!';
    this.status = 'info';
    var self = this;
    $timeout(function () {
        $('[data-toggle="popover"]').popover();
    });

    var req = {
            method: 'GET',
            url: 'api/getnodes',
            params: {               
                client_id: "f838d02a-5465-427d-8ac2-8fef89599e4c",
                client_secret: "mDra5JTSFFE8Sm0bU6kf6TmxXQcke9Irz627ABK3lsI=",
                grant_type: "password",
                password: "i1@123",
                scope: "openid",
                username: "icici"
               
            }
        }

        $http(req).then(function (data) {
            console.log(data);
                     
        }, function (error) {
            console.log(error);
        });

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
    function getNodes() {
        self.blockChain.nodeDictionary[0] = new Node('suntrust');
        self.blockChain.nodeDictionary[1] = new Node('bankofamerica');
        self.blockChain.nodeDictionary[2] = new Node('wellsfargo');
    }


    function initiateBlockChainSystem(){
        self.blockChain = new BlockChainCore();
        getNodes();
        getBlocks();
    }

    function getBlocks() {
        self.blockChain.nodeDictionary[0].blocks.push(new Block());
        self.blockChain.nodeDictionary[0].blocks.push(new Block());
        self.blockChain.nodeDictionary[0].blocks.push(new Block());
        self.blockChain.nodeDictionary[0].blocks.push(new Block());
        self.blockChain.nodeDictionary[0].blocks.push(new Block());
        self.blockChain.nodeDictionary[0].blocks.push(new Block());
  
        
    }    

    function addNewBlock(node) {
        if (node.name == 'suntrust') {
            var block = new Block();
            block.isNew = true;
            self.blockChain.nodeDictionary[0].blocks.push(block);
        }
        $timeout(function () {
            $('[data-toggle="popover"]').popover();
        });
    }

    this.makeTransfer = function() {
        addNewBlock(self.blockChain.nodeDictionary[0]);
        this.status = 'success';
        this.statusMessage = 'Transfer Complette';
    }
    this.closealert = function () {
        this.status = 'info';
    }
    initiateBlockChainSystem();


})