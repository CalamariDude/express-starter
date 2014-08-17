var express = require('express')
  , router = express.Router()
  , conf = require('../conf/conf');
  ;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {'conf': conf});
});

module.exports = router;
