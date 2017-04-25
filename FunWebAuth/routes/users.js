var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<p>Go away!No users are here.</p>');
});

module.exports = router;
