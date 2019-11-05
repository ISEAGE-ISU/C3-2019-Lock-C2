const sql = require('mssql');

const config = app_settings.database;

get_db = async () => {
    try {
        // return await sql.connect(config);
        let pool = new sql.ConnectionPool(config)
        pool.connect(err =>{
            if (err) throw err;
        })
    } catch (e) {
        console.error(e);
        process.abort()
    }
};
db = get_db();
console.log(db); //TODO make DATABASE shits happen. #BLOCKED by @jsmoody's passwords not being cdc