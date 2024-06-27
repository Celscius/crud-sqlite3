const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

async function app() {
    const filename = "./mydb.db";
    const db = {
        table:"mytable",
        
    }

    const connect = await connectToDatabase(filename)
    console.log("connected. . .");

    const read = await dbRead(connect,db)
    console.log(read)
    connect.close()
}

app()

function connectToDatabase(file) {
   const filepath = file ? file : "./mydb.db";

    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(filepath, (err) => {
            if (err) {
                reject(err.message)
                console.error(err.message);
            }
        });
     
      resolve(db)
    });
}

function dbRead(connect,database) {
    const db = connect
    const table = database?.table ? database.table : "mytable"

    //data that gonna be read from sql
    const data = []

    //query variable for sql
    const column = database ?.column ? database.column : "*"
    const limit = database ?.limit ? database.limit : "10"
    const query = `SELECT ${column}
                   FROM ${table}
                   ORDER BY id DESC LIMIT ${limit}
                  `
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.each(query,
                (err, row) => {
                if (err) {
                    console.error(err.message);
                     reject(err.message);
                }        
                //loop for row here
               data.push(row)
               resolve(data)
            });
             
        });
    });
}


module.exports = {
    read: dbRead
};