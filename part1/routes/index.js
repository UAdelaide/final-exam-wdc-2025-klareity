var express = require('express');
var router = express.Router();
const mysql = require('m')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', function(req, res, next) {

});

module.exports = router;
