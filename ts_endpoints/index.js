const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('../sherpa.db', (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("Connected to sherpa db in sqlite")
    }

})

app.get('/api/:cp/findAll', (req, res) => {
  let result = [];
  let sql = `SELECT user FROM Localizacion WHERE cp = ${req.params.cp}`
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
      result.append(row.user)
    });
    
  });
  return result
})

app.listen(5001, () => { console.log(`Listening on port 5001`) })

/*let sql = `SELECT * FROM Localizacion`;

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
}); */