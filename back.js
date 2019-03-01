// je vais chercher le driver sqlite3 dans node_modules
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dbFile = 'test.db';
const db = new sqlite3.Database(dbFile);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// ---------------------------------------------------------------------------------//
// CONSTRUCTION DE LA BASE DE DONNEE
// ---------------------------------------------------------------------------------//
/*
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




  db.run('CREATE TABLE IF NOT EXISTS animals (animal_id INTEGER PRIMARY KEY AUTOINCREMENT, animal_name TEXT UNIQUE, animal_type TEXT, student_id INTEGER, FOREIGN KEY(student_id) REFERENCES students(id) )');

  db.run('INSERT INTO animals (animal_name, animal_type, student_id) VALUES (?, ?, ?)', 'Hedwige', 'chouette', 1);

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
*/
// ---------------------------------------------------------------------------------//
// CONTROLLERS -> defini des routes avec express
// ---------------------------------------------------------------------------------//

// Je cree mes URLS SELON UNE ARCHITECTURE REST
// URL/OBJETS_que_je_cherche_en_bdd -> URL/users -> me renvoyer tout les users
// URL/OBJET/id -> un user

// l'URL - > http://localhost:3000 + '/'
// http://localhost:3000/
app.get('/', function (request, response) {
  db.all('SELECT * FROM products', function (error, data) {
    response.send(data);
  });
});

// 4 verbes HTTP : GET / POST / UPDATE / DELETE
// GET : pour recuperer du serveur, POST : pour envoyer vers le serveur

// Souvent quand j'ai besoin de creer dans ma base de données
// via un INSERT : je vais utiliser une route type POST

// A l'inverse quand j'ai besoin de recuperer via un select
// Je passe par une methode type GET


// l'URL - > http://localhost:3000 + '/users'
// http://localhost:3000/users


// app.get c'est le telephone portable de notre back
// Ici on defini le numero de portable du back
// on dit que c'est '/students' 
// On sait que c'est un portable donc qd on le defini
// on defini juste la fin pas le 06
app.get('/students', function (request, response) {
  db.all('SELECT * FROM students', function (error, data) {
     response.send(data);
  });
  //response.send(data);
});

app.post('/students', function (request, response) {
  // INSERE DES DONNES DANS MA BDD
  console.log(request.body.student_name);
  db.run('INSERT INTO students (student_name) VALUES (?)', request.body.student_name);
  response.redirect('http://www.google.com');
});

app.listen(3000, function (error) {
  if (!error) console.log('app listening port 3000');
});




































































