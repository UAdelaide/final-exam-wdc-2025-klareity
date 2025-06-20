var express = require('express');
var router = express.Router();
const mysql = require('mysql12/promise');

const poolDog = mysql.creatPool({
  host
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', async (req, res, next) => {

});

module.exports = router;
