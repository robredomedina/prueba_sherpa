const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('../sherpa.db', (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("Connected to sherpa db in sqlite")
    }

})

let sql = `SELECT * FROM Localizacion`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});