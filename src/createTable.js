const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

async function app() {
    const filename = "./mydb.db";
    const db = await connectToDatabase(filename)
    console.log("connected. . .");
    const table = await createTable(db)
    console.log(table)
    db.close()
}

app()

function connectToDatabase(file) {
    //create file name 'mydb.db' if no name were given
    const filepath = file? file : "./mydb.db";

    return new Promise((resolve, reject) => {
        if (fs.existsSync(filepath)) {
            //run if file exist
            resolve(false)
            return new sqlite3.Database(filepath);

        } else {
            //create file db with filepath name 
            const db = new sqlite3.Database(filepath, (error) => {
                if (error) {

                    reject(error.mesqsage)
                    return console.error(error.message);
                }
                //createTable(db)
            });
            resolve(db);
            //return db;
        }
    });
}

function createTable(database) {

    //default config if no set up was made
    const dbname = database?.name ? database.name : "mydb"
    const table = database?.table ? database.table : "mytable"
    const query = database?.query ? database.query : `CREATE 
    TABLE ${table}
    (
    id  INTEGER primary key AUTOINCREMENT,
    name VARCHAR(10) not null,
    date   DATETIME ,
    updatedata DATETIME ,
    file  mediumblob   ,
    encoding VARCHAR(20),
    mimetype VARCHAR(20),
    description   VARCHAR(100)
    )`
  
    return new Promise((resolve, reject) => {
        if (!database) {
            //reject()
            // console.log(database)
        } else {
            db = database
            //query to create table
            db.exec(query);
            const success = `database "${dbname}" with table name "${table}" created successfuly`
            resolve(success)
        }
    })
}

module.exports = {
    createTable:createTable
};