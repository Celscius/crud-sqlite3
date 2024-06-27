const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

async function app() {
    const filename = "./mydb.db";
    const data =[
        "",
        "2024-06-28",
        ""
    ]
    const db = {
        id:11,
        table:"mytable",
        update:data
    }

    const connect = await connectToDatabase(filename)
    console.log("connected. . .");

    const update = await updateValue(connect,db)
    console.log(update)
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

function updateValue(connect,database) {
    //default config if no set up was made
    const db = connect
    const table = database?.table ? database.table : "mytable"
    const column = database?.column ? database.column : 
                                      ['name','updatedata', 'file','description']

    //value for "where" statement is on the last array of "updatevalue"
    const id = database?.id ? database.id : ""
    const updateValue = database ?.update ? database.update : 
                                     ['test', '2024-06-26','test data']
    updateValue.push(id)                                
    //const co = type.map(String).join(','); console.log(commaSeparated); 

    const query = database?.query ? database.query : `UPDATE 
    ${table}
    SET name = ?,
        updatedata = ?,
        description =?
    WHERE id = ?
    `
    return new Promise((resolve, reject) => {
         const success = `Update succesful with id : ${id}`
         const fail =`something goes wrong`
       
        db.run(query, updateValue, (err) => {
            if (err) {
                 reject("fail")
                return console.log(err.message);
            }
             resolve(success)
        })
       
    })

}


module.exports = {
    update: updateValue
};