const db = require('./db_wrapper');
const format = require('string-format');
format.extend(String.prototype, {});
const out = require('./outgoing');
const model = require('../locks/models/locks.model')


function add_lock(lock) {
    let str = "INSERT INTO locks (id,ip,keycode,provider,state) VALUES ({ID},'{IP}','{Key}','{Provider}','{State}')"
        .format(lock);
    return db.run_command(str)
}

function remove_lock(id, callback) {
    let str = "DELETE FROM locks WHERE id = {}".format(id);
    return db.run_command(str).then(r => {
        callback(r.recordset)
    })
}

function get_locks(callback) {
    let str = "SELECT * FROM locks"
    db.run_command(str).then(r => {
        callback(r.recordset)
    })
}

function get_lock(id, callback) {
    let str = "SELECT * FROM locks WHERE id = '{}'".format(id)
    db.run_command(str).then(r => {
        let l = r.recordset[0]
        l["id"] = '' + l["id"]

        callback(l)
    })
}

function count_locks(callback) {
    let str = "SELECT COUNT(id) FROM locks"
    db.run_command(str).then(r => {
        callback(r.recordset[0][""])
    })
}

function get_providers(callback) {
    let str = "SELECT DISTINCT provider FROM locks"
    db.run_command(str).then(r => {
        callback(r.recordset)
    })
}

function unlock(id, callback) {
    let str = "UPDATE locks SET state = 'unlocked' WHERE id = {}".format(id);
    db.run_command(str).then(r => {
        get_lock(id, l => {
            out.unlock_lock(l, callback)
        })
    })
}

function get_key(id, callback) {
    let str = "SELECT keycode FROM locks WHERE id = {}".format(id)
    db.run_command(str).then(r => {
        callback(r.recordset)
    })
}

function set_key(id, key, callback) {
    let str = "UPDATE locks SET keycode = {} WHERE id = {}".format(key, id)
    db.run_command(str).then(function (r) {
        get_lock(id, l => {

            out.set_key(l, key, callback)
        })
    })
}

module.exports = {
    add_lock: add_lock,
    remove_lock: remove_lock,
    get_locks: get_locks,
    get_lock: get_lock,
    count_locks: count_locks,
    get_providers: get_providers,
    get_key: get_key,
    set_key: set_key,
    unlock: unlock
};
