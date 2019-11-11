let lm = require('./lock_manager')

/**
 * Takes a lock object, and sends a request to that lock to unlock
 * @param lock A lock, as described by lock_model
 * @param callback
 */
function unlock_lock(lock, callback){
    //TODO @njtucker, pls do
}

/**
 * Takes a lock object, and sends a request to that lock to lock
 * @param lock A lock, as described by lock_model
 * @param callback
 */
function lock_lock(lock, callback){
    //TODO @njtucker, pls do
}

/**
 * Change the key in the lock
 * @param lock
 * @param callback
 */
function set_key(lock, key, callback){
    // TODO
}

module.exports = {
    unlock_lock: unlock_lock,
    lock_lock: lock_lock,
    set_key: set_key
}