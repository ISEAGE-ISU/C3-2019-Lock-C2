const sql = require('mssql');

let config = app_settings.database;

const pool = new sql.ConnectionPool(config);
const con = pool.connect();

pool.on('error', err => {
    // ... error handler
    console.error(err);
    process.abort()
});

async function test_db() {
    try {
        await con;
        const tab_query = "SELECT COLUMN_NAME FROM " + config.options.database + ".INFORMATION_SCHEMA.COLUMNS"
        const request = pool.request();
        const result = await request.query(tab_query);
        console.dir(result)
    } catch (e) {
        console.error(e);
        process.abort()
    }
}

async function run_command(arg) {
    await con;
    const request = pool.request();
    let re = await request.query(arg); // Bully into synchronicity
    return re;
}


module.exports = {
    test_bd: test_db,
    run_command: run_command
};