const db = require('./db_wrapper');
const format = require('string-format');
format.extend(String.prototype, {});


function add_lock(lock) {
    let str = "INSERT INTO locks (id,ip,keycode,provider,state) VALUES ({ID},'{IP}','{Key}','{Provider}','{State}')"
        .format(lock);
    return db.run_command(str)
}

function remove_lock(id) {
    let str = "DELETE FROM locks WHERE id = {}".format(id);
    return db.run_command(str)
}

function get_locks(callback){
    let str = "SELECT * FROM locks"
    let promise = db.run_command(str).then(r => {
        callback(r.recordset)
    })
}

function get_lock(id, callback){
    let str = "SELECT * FROM locks WHERE id = '{}'".format(id)
    db.run_command(str).then(r => {
        callback(r.recordset)
    })
}

function count_locks(callback){
    let str = "SELECT COUNT(id) FROM locks"
    db.run_command(str).then(r=>{
        callback(r.recordset[0][""])
    })
}

function get_providers(callback){
    let str = "SELECT DISTINCT provider FROM locks"
    db.run_command(str).then(r=>{
        callback(r.recordset)
    })
}

module.exports = {
    add_lock: add_lock,
    remove_lock: remove_lock,
    get_locks, get_locks,
    get_lock: get_lock,
    count_locks: count_locks,
    get_providers, get_providers
};
