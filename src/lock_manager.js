const db = require('./db_wrapper');
const format = require('string-format');
format.extend(String.prototype, {});


function add_lock(lock) {
    let str = "INSERT INTO locks (id,ip,keycode,provider,state) VALUES ({ID},{IP},{Key},{Provider},{State})"
        .format(lock);
    return db.run_command(str)
}

function remove_lock(id) {
    let str = "DELETE FROM locks WHERE id = {}".format(id);
    return db.run_command(str)
}

module.exports = {
    add_lock: add_lock,
    remove_lock: remove_lock
};
