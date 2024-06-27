const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

async function app(file,database) {    
    const connect = await connectToDatabase(file)
    console.log("connected. . .");

    const deleteRows = await deleteRow(connect,database)
    console.log(deleteRows)
    connect.close()
}

const filename = "./mydb.db";
const db = {
        table: "mytable",
        id: 11
    }

app(filename,db)

function connectToDatabase(file) {
    const filepath = file ? file : "./mydb.db";

    return new Promise((resolve, reject) => {
        //create file if not exist
        let db = new sqlite3.Database(filepath, (err) => {
            if (err) {
                reject(err.message)
                //console.error(err.message);
            }
        });

        resolve(db)
    });
}

/*
    paramter
    db fr

    ** table
    ** id
*/
function deleteRow(connect,database) {
    //default config if no set up was made
    const db = connect
    const table = database?.table ? database.table : "mytable"
    const deleteId = database?.id? database.id : ""
    //const co = type.map(String).join(','); console.log(commaSeparated); 

    const query = database?.query ? database.query : `DELETE 
    FROM ${table}
    WHERE id=?
    `

    return new Promise((resolve, reject) => {
        const success = `Delete succesful with : ${deleteId}`
        const fail = `something goes wrong`

        db.run(query, deleteId, function(err) {
            if (err) {
                reject()
                return console.error(err.message);
            }
 
            ////console.log("success");
        });
         resolve(success)

    })

}


module.exports = {
    delete: deleteRow
};