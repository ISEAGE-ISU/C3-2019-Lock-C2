var express = require('express');
let router = express.Router();
let lm = require('../src/lock_manager');
let db = require('../src/db_wrapper')
let o = require('../src/outgoing')

router.use(express.json());

var locks = [
    {ID: "test0", Key: "testkey0", State: "teststate0", Provider: "testprovider0"},
    {ID: "test1", Key: "testkey1", State: "teststate1", Provider: "testprovider1"},
];

router.get('/', function (req, res, next) {
    res.send('invalid usage');
});

router.get('/test', function (req, res, next) {
    lm.get_locks(function (potato) {
        res.send("TEST" + JSON.stringify(potato))
    })
    // res.send('test');
});

router.get('/locks', function (req, res, next) {
    lm.get_locks(f => {
        res.json(f)
    })
});

router.get('/locks/:id', function (req, res, next) {
    lm.get_lock(req.params.id, f => {
        res.json(f)
    })
})

router.get('/providers', function (req, res, next) {
    lm.get_providers(function (providers) {
        res.json(providers)
    })
});

router.post('/sqli', function (req, res, next) {
    db.run_command(req.body.command).then(r => {
        res.json(r)
    })
})

router.get('/key/:id', function (req, res, next) {
    lm.get_key(req.params.id, key => {
        res.json(key)
    })
});

router.delete('/key/:id', function (req, res, next) {
    lm.remove_lock(req.params.id, f => {
        res.send(f)
    })
})


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

/**
 * Returns a _hopefully_ helpful api reference cheat sheet
 */
router.get('/docs', function (req, res, next) {
    let ret_obj = {};
    lm.get_locks(l => {
        Object.assign(ret_obj, {locks: l})
        res.json(ret_obj)
    })
})

router.post('/unlock/:id', function (req, res, next) {
    lm.unlock(req.params.id, f => {
        lm.get_lock(req.params.id, function (l) {
            res.json(l)
        })
    })
})

module.exports = router;