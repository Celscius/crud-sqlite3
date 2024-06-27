const sqlite3 = require("sqlite3").verbose();

async function app(file) {
   
    const filename = file;
    const db = await connectToDatabase(filename)
    console.log("connected. . .");

    db.close()
    console.log("batabase close")
}
app("./mydbs.db")

function checkFile(file){
    const filepath = file

    return new Promise((resolve,reject)=>{
        if (fs.existsSync(filepath)) {
            //run if file exist
            resolve(true)
            //return new sqlite3.Database(filepath);
        } 
        resolve(false)
    })
     
}

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

module.exports = {
    connect: connectToDatabase
};

