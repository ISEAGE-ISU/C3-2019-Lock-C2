let lm = require('./lock_manager')
let raw = require('raw-socket')
let f = require('faker')
let net = require('net')
const cp = require('child_process')


function send_command(lock, command) {
    // let raw_dog = new net.Socket()
    // raw_dog.connect(8081, lock['ip'], function () {
    //     raw_dog.write(command)
    // })
    // raw_dog.on('data', function (data) {
    //     let m = data.toString()
    //     console.log("received " + data.length + " bytes from " + lock["ip"]
    //         + ": " + m);
    //     if (m.includes("USAGE:")) {
    //         raw_dog.write(Buffer.from(command, 'utf8'))
    //         console.log("wrote " + command)
    //     }
    // })
    // raw_dog.on("close", function () {
    //     console.log("did a die")
    // })
    // let cmd = cp.spawn('echo', [command, '|', 'nc', lock["ip"], 8081])

    let cmd = cp.spawn('nc', [lock["ip"], 8081])

    cmd.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        if (data.includes("USAGE")) {
            cmd.stdin.write(command + '\n')
        } else {
            cmd.stdin.end()
        }
    });

    cmd.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    cmd.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

}

/**
 * Takes a lock object, and sends a request to that lock to unlock
 * @param lock A lock, as described by lock_model
 * @param callback
 */
function unlock_lock(lock, callback) {
    let str = JSON.stringify({
        Action: "TOGGLE"
    })
    send_command(lock, str)
    callback(f.hacker.verb())
}

/**
 * Takes a lock object, and sends a request to that lock to lock
 * @param lock A lock, as described by lock_model
 * @param callback
 */
function lock_lock(lock, callback) {
    unlock_lock(lock, callback)
}

/**
 * Change the key in the lock
 * @param lock
 * @param callback
 */
function set_key(lock, key, callback) {
    let str = JSON.stringify({
        Action: "SET",
        Attribute: "KEY",
        Value: key
    })
    send_command(lock, str)
    callback(f.hacker.ingverb())
}

function get_state(lock, callback){
    let str = JSON.stringify({
        Action: "GET",
        Attribute: "STATE"
    })
    send_command(lock, str)
    callback(f.hacker.abbreviation())
}

module.exports = {
    unlock_lock: unlock_lock,
    lock_lock: lock_lock,
    set_key: set_key,
    get_state: get_state,
    send_command: send_command
}