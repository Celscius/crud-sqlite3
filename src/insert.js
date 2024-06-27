const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

async function app() {
    const data = [
        "test data",
        "2024-06-27"
    ]
    const filename = "./mydb.db";
    const db = {
        table:"mytable",
        insert:data
    }

    const connect = await connectToDatabase(filename)
    console.log("connected. . .");

    const insert = await insertToDb(connect,db)
    console.log(insert)
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

function insertToDb(connect, database) {
    //default config if no set up was made
    const db = connect

    const table = database?.table ? database.table : "mytable"
    const column = database?.column ? database.column : ['name', 'date', 'file', 'encoding', 'mimetype', 'description']
    const insertValue = database?.insert? database.insert : ['test', '2024-06-25', 'blob', 'text', 'text', 'text']
    //const co = type.map(String).join(','); console.log(commaSeparated); 
    
    let placeholders = column.map((value) => value).join(',');
    let columnsql = column.map((value) => '(?)').join(',');

    const query = database?.query ? database.query : `INSERT 
    INTO ${table} 
    (${placeholders}) 
    VALUES(${columnsql})`


    return new Promise((resolve, reject) => {
       const success = `row was added to the table : ${table}`
       const fail = ""

        db.run(query, insertValue, (err) => {
            if (err) {
                 //reject(err.message)
                return console.log(err.message);
            }
             resolve(success)
            //console.log(`Row was added to the table: ${table}`);
        })
       
    })

}


module.exports = {
    insert: insertToDb
};