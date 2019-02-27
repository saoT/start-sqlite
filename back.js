// je vais chercher le driver sqlite3 dans node_modules
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const dbFile = 'test.db';
const db = new sqlite3.Database(dbFile);

const app = express();
app.use(cors());

// sans db.serialize.
// les operations sont lancées en même temps.
// le INSERT risque d'etre executé.
// avant que la creation de la table soit finie.
db.serialize( () => {

  db.run('CREATE TABLE IF NOT EXISTS students (student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name TEXT)');

  db.run('INSERT INTO students (student_name) VALUES (?)', 'Harry');
  // POUR CREER UNE FOREIGN KEY
  // 1 - Créer une colonne pour la réceptionner -> student_id INTEGER,
  // 2 - Définir cette colonne comme Foreign Key -> FOREIGN KEY(student_id)
  // 3 - Indiquer à quelle table et quelle colonne fait référence cette Foreign Key
  // -> REFERENCES students(id)




  db.run('CREATE TABLE IF NOT EXISTS animals (animal_id INTEGER PRIMARY KEY AUTOINCREMENT, animal_name TEXT UNIQUE, type TEXT UNIQUE, student_id INTEGER, FOREIGN KEY(student_id) REFERENCES students(id) )');

  db.run('INSERT INTO animals (animal_name, type, student_id) VALUES (?, ?, ?)', 'Hedwige', 'chouette', 1);



  // db.all('SELECT * FROM animals NATURAL JOIN students', function (error, data) {
  //   if (!error) console.log(data);
  //   else console.log(error);
  // });

  db.run('CREATE TABLE IF NOT EXISTS teachers (teacher_id INTEGER PRIMARY KEY AUTOINCREMENT, teacher_name TEXT)');

  db.run('INSERT INTO teachers (teacher_name) VALUES (?)', 'Dumbledore');

  db.run('CREATE TABLE IF NOT EXISTS students_to_teachers (students_to_teachers_id INTEGER PRIMARY KEY AUTOINCREMENT, teacher_id INTEGER, student_id INTEGER, FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id), FOREIGN KEY (student_id) REFERENCES students(student_id))');

  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 1, 1);


  db.all('SELECT * FROM teachers NATURAL JOIN students_to_teachers NATURAL JOIN students NATURAL JOIN animals', function (error, data) {
    if (!error) console.log(data);
    else console.log(error);
  });










});

app.get('/', function (request, response) {
  db.all('SELECT * FROM products', function (error, data) {
    response.send(data);
  });
});

app.listen(3000, function (error) {
  if (!error) console.log('app listening port 3000');
});


product.tshirt_name
product[category + '_name']














