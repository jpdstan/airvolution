var express = require('express');
var router = express.Router();



/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Wrong url bitch' });
});


// router.post('/secret', function (req, res) {
//   var secret = req.body.secret;
//   res.end('Password: ' + secret);
// });



// Play http://localhost:3000/secret?key=1000
router.get('/secret*', function (req, res) {
  var key = req.query.key;

  // Do methods here

  res.json({ user: 'if youre seeing this kev, this may be the end...' });
  res.end('Password: ' + key);

});



module.exports = router;
