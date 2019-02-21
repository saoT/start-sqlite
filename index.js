// je vais chercher le driver sqlite3 dans node_modules
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = 'test.db';
const db = new sqlite3.Database(dbFile);
 
// sans db.serialize.
// les operations sont lancées en même temps.
// le INSERT risque d'etre executé.
// avant que la creation de la table soit finie.
db.serialize( () => {

  if ( !fs.existsSync(dbFile) ) {
    db.run('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)'); 
  }

  db.run('INSERT INTO products (name) VALUES (?)', 'sac');

  db.all('SELECT name FROM products', function (error, data) {
    if (!error) console.log(data);
    else console.log(error);
  });


});
  













