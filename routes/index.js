var express = require('express');
const lm = require("../src/lock_manager");
var router = express.Router();
var f = require('faker')


/**
 *
 */
router.get('/', function (req, res, next) {
    lm.count_locks(c => {
        lm.get_providers(p => {
            res.render('index', {count: c, providers: p, email: f.internet.email(), slogan: f.company.catchPhrase()});
        })
    })
});

module.exports = router;
