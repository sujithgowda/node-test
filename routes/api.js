var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost/blockchain';
var db;

MongoClient.connect(url, function(err, database) {
	db=database;
  assert.equal(null, err);
  console.log("Connected correctly to server.");

  }); 

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res, next) {
  res.send('No Api method specified');
});

router.route('/getallnodes')
.get(function(req, res, next) {
	db.collection('nodes').find().toArray(function(err, items){
		res.json(items);
		
	});
  
})

router.route('/getnode')
.get(function(req, res){
	db.collection('nodes').findOne({name:req.query.name}, function(err, item){
		res.json(item);
	})
})

router.route('/addnode')
.post(function(req, res){
	db.collection('nodes').insertOne({name:req.body.name, ip:req.body.ip}, function(err, result){
		res.json(result);
	})
})

router.route('/deletenode')
.post(function(req, res){
	db.collection('nodes').deleteOne({name:req.body.name}, function(err, result){
		res.json(result);
	})
})

router.route('/updatenode')
.post(function(req, res){
	db.collection('nodes').findOneAndUpdate({name:req.body.name},{$set: {ip:req.body.ip}} , function(err, result){
		res.json(result);
	})
})




module.exports = router;
