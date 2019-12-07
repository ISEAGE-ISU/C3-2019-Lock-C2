var express = require('express');
var router = express.Router();
const lm = require("../src/lock_manager");


router.get('/', function (req, res, next) {
    lm.get_locks(locks =>{
        res.render('manage', {locks: locks});
    })
});

router.post('/raw', function (reg, res, next){
    res.redirect('/api/command/')
});

module.exports = router;
