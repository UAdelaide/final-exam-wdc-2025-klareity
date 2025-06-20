var express = require('express');
var router = express.Router();
const mysql = require('mysql12/promise');

const poolDog = mysql.creatPool({
  host: 'localHost',
  user: 'sqlUser',
  password: 'yeet',
  database: 'WDCP1'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', async (req, res, next) => {
  const sql =`
      SELECT Dogs.name, Dogs.size, Users.username AS owner_username
      FROM Dogs
      JOIN Users ON Dogs.owner_id = Users.user_id`;
});

router.get('api/walkrequests/open', async)

module.exports = router;
