import express from 'express';

const app = express();

import db from './db_connection';

app.get('/api/:cp/findAll', (req, res) => {
  db.findAll(req.params.cp, (result) => {
    res.json({"users": result})

  })
});


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