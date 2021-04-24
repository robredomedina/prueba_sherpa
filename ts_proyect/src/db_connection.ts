const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('../../sherpa.db', (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("Connected to sherpa db in sqlite")
    }

})


export = { 
    findAll : (cp:string, cb:any) => {
        
        let sql = `SELECT user FROM Localizacion WHERE cp = ${cp}`
        db.all(sql, (err, rows) => {
            if (err) {
                console.log("erroooooooooorrrrrrrrrrrrr")
              throw err;
            }
            let result = [];
            rows.forEach((row) => {
              result.push(row)
            });
            cb(result)
        })
    }
};