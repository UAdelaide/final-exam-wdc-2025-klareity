var express = require('express');
var router = express.Router();
const mysql = require('mysql12/promise');

const poolDog = mysql.createPool({
  host: 'localHost',
  user: 'sqlUser',
  password: 'yeet',
  database: 'DogWalkingDB'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// add data to database (MYSQL stuff)

router.get('/api/dogs', async (req, res, next) => {
  const sql =`
      SELECT Dogs.name, Dogs.size, Users.username AS owner_username
      FROM Dogs
      JOIN Users ON Dogs.owner_id = Users.user_id
      `;

      try{
        const [rows] = await poolDog.query(sql);
        res.json(rows);
      } catch (err){
        next(err);
      }
});

router.get('/api/walkrequests/open', async(req,res, next) => {
  const sql = `
    SELECT WalkRequests.*, Users.username AS owner_username
    FROM WalkRequests
    JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
    JOIN Users ON Dogs.owner_id = Users.user_id
    WHERE WalkRequests.status = 'open'
    `;
    try{
      const [rows] = await poolDog.query(sql);
      res.json(rows);
    } catch (err){
      next(err);
    }
});

router.get('/api/walkers/summary', async(req, res, next) => {
  const sql = `
    SELECT
      u.user_id, u.username,
      COUNT(DISTINCT wr.rating_id) AS total_ratings,
      AVG(wr.rating) AS average_rating,
      COUNT(DISTINCT wq.request_id) AS completed_walks
    FROM Users u
    LEFT JOIN WalkRatings wr ON u.user_id = wr.walker_id
    LEFT JOIN WalkRequests wq ON u.user_id = wq.dog_id AND wq.status = 'completed'
    WHERE u.role = 'walker'
    GROUP BY u.user_id, u.username
    `;
    try{
      const [rows] = await poolDog.query(sql);
      res.json(rows);
    } catch (err){
      next(err);
    }
});


module.exports = router;
