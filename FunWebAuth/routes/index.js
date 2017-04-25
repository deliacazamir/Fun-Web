var express = require('express');
var router = express.Router();

/* GET Home Page. */
router.get('/', function(req, res, next) {
	
  res.render('index', { title: 'Fun@Web' });
  
});

/* GET Login Page */
router.get('/login', function(req, res) {
    res.render('login', { title: 'Login' });
});

/* GET Game Page */
router.get('/game', function(req, res) {
    res.render('game', { title: 'Let the game begin!' });
});


router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
                               "userlist" : docs
                               });
    });
});

router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});


module.exports = router;
