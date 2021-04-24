const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('../../sherpa.db', (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("Connected to sherpa db in sqlite")
    }

})

export { db };