var express = require('express');
const lm = require("../src/lock_manager");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    lm.count_locks(c => {
      lm.get_providers(p => {
        res.render('index', {count: c, providers: p});
      })
    })
});

module.exports = router;
