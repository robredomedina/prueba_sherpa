const express = require('express');
const app = express();

const db = require('./db_connection')

app.get('/api/:cp/findAll', (req, res) => {
  let cp = req.params.cp
  let sql = `SELECT user FROM Localizacion WHERE cp = ${cp}`
  db.all(sql, [], (err, rows, cp) => {
    if (err) {
      throw err;
    }
    let result = [];
    rows.forEach((row) => {
      result.push(row.user)
    });
    res.json({ users : result })
    
  });
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