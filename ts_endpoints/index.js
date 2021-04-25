const express = require('express');
const app = express();

const db = require('./db_connection')

app.get('/api/:cp/findAll', (req, res) => {
  let cp = req.params.cp
  let sql = `SELECT username from user where user.id in (SELECT user FROM Localizacion WHERE cp = ${cp})`
  db.all(sql, [], (err, rows, cp) => {
    if (err) {
      throw err;
    }
    let result = [];
    rows.forEach((row) => {
      result.push(row.username)
    });
    res.json({ users : result })
    
  });
})

app.delete('/api/:cp/deleteAll', (req, res) => {
  let cp = req.params.cp
  let sql = `DELETE FROM user WHERE user.id in (SELECT user FROM localizacion WHERE cp= ${cp})`
  db.all(sql, [], (err, rows, cp) => {
    if (err) {
      throw err;
    }
  });
  let sql2 = `DELETE FROM Localizacion WHERE cp = ${cp}`
  db.all(sql2, [], (err, rows, cp) => {
    if (err) {
      throw err;
    }
  });
  
  res.json({ message : "Users deleted" })
    
})

app.listen(5001, () => { console.log(`Listening on port 5001`) })

