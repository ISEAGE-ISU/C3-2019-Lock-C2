var express = require('express');
var router = express.Router();

router.use(express.json());

var locks = [
    {id: "test0", key: "testkey0", state: "teststate0", provider: "testprovider0"},
    {id: "test1", key: "testkey1", state: "teststate1", provider: "testprovider1"},
]

router.get('/', function(req, res, next) {
    res.send('invalid usage');
});

router.get('/test', function(req, res, next) {
    res.send('test');
});

router.get('/register', function(req, res, next) {
    res.send(locks);
});

router.post('/register', function(req, res, next) {
    const lock = {
        id: req.body.id,
        key: req.body.key,
        state: req.body.state,
        provider: req.body.provider,
        ip: req.body.ip
    };
    locks.push(lock);
    res.send(JSON.stringify(lock));
});

module.exports = router;