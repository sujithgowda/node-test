var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('hi');
  res.render('Admin.html');
});

module.exports = router;
