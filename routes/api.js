var express = require('express');
let router = express.Router();
let lm = require('../src/lock_manager');

router.use(express.json());

var locks = [
    {ID: "test0", Key: "testkey0", State: "teststate0", Provider: "testprovider0"},
    {ID: "test1", Key: "testkey1", State: "teststate1", Provider: "testprovider1"},
];

router.get('/', function (req, res, next) {
    res.send('invalid usage');
});

router.get('/test', function (req, res, next) {
    res.send('test');
});

router.get('/register', function (req, res, next) {
    lm.get_locks(l => {
        res.json(l);
    })
});

router.post('/register', function (req, res, next) {
    const lock = {
        ID: req.body.ID,
        Key: req.body.Key,
        State: req.body.State,
        Provider: req.body.Provider,
        IP: req.body.IP
    };
    locks.push(lock);
    lm.add_lock(lock).then(value => {
        res.json(value)
    })
});

module.exports = router;