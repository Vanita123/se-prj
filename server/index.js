/*const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const { generateFromEmail, generateUsername } = require("unique-username-generator");
//const { UNSAFE_NavigationContext } = require("react-router-dom");


app.use(express.json());
console.log('working');
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })

);
console.log('working');
//app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

console.log('working');
app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "projectse",
    database: "paw",
});
db.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});
  

app.post("/signin", (req, res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const username = generateFromEmail(
      email,
      4
    );
    const phone = req.body.phone;
    const role = req.body.role;
    const sec_ques1 = "What would you name your pet?";
    const sec_ques2 = "What would you name your pet home?";
    const sq1 =  req.body.sq1;
    const sq2 =  req.body.sq2;
    const address = req.body.address;

    const roleid = 1
    const password = req.body.password;
    console.log(username);
    // console.log(password);
    // console.log(fname);

    db.query(

        "INSERT INTO Users (username, fname, lname, email, phno, password, address, role, roleid) VALUES (?,?,?,?,?,?,?,?,?)",
        [username, fname, lname, email, phone, password, address, role, roleid],

        (err, result) => {
            console.log(err,result);
        }
    );

    db.query(

      "INSERT INTO Security (username, sq1, sq2, sq1_ans, sq2_ans) VALUES (?,?,?,?,?)",
        [username, sec_ques1, sec_ques2, sq1, sq2],

      (err, result) => {
          console.log(err,result);
      }
  );

   
});

app.post("/signin", (req, res) => {
    
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username,password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.listen(3000, () => {
    console.log("running server");
});*/

const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const { generateFromEmail, generateUsername } = require("unique-username-generator");
const { UNSAFE_NavigationContext } = require("react-router-dom");
const bcrypt = require('bcrypt');

app.use(express.json());
console.log('working');
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })

);
console.log('working');
//app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

console.log('working');
app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "projectse",
    database: "paw",
});
db.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});
  

app.post("/signin", (req, res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const username = generateFromEmail(
      email,
      4
    );
    const phone = req.body.phone;
    const role = req.body.role;
    const sec_ques1 = "What would you name your pet?";
    const sec_ques2 = "What would you name your pet home?";
    const sq1 =  req.body.sq1;
    const sq2 =  req.body.sq2;
    const address = req.body.address;
    const country = req.body.country;
    const state = req.body.state;
    const county = req.body.county;
    const roleid = 1
    console.log(country);
    console.log(state);
    console.log(county);
    password = req.body.password;

    bcrypt.hash(req.body.password, 10, function(err, hash) {
     password = hash;
     console.log("hashed password -> ", password);
     db.query(

          "INSERT INTO Users (username, fname, lname, email, phno, password, address, role, roleid) VALUES (?,?,?,?,?,?,?,?,?)",
          [username, fname, lname, email, phone, password, address, role, roleid],

          (err, result) => {
              console.log(err,result);
              //res.send(result);
          }
      );

      db.query(

        "INSERT INTO Security (username, sq1, sq2, sq1_ans, sq2_ans) VALUES (?,?,?,?,?)",
          [username, sec_ques1, sec_ques2, sq1, sq2],

        (err, result) => {
            console.log(err,result);
            //res.send(result);
        }
    );
    });  


});

app.post("/signin", (req, res) => {
    
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM Users WHERE username = ?;",
    [username],
    (err, result) => {
      console.log(result);
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log(result[0].password);

        bcrypt.compare(password, result[0].password, (error, response) => {
          console.log(response);
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.post("/search", (req, res) => {

    /*const output = rows;
    const pet = req.body.pet;
    
    const size = req.body.size;
    const temp = req.body.temp;
    const breed = req.body.breed;
    const color = req.body.color;
    const age = req.body.age;
    const other = req.body.other;
    const searchQuery = req.body.searchQuery;
    console.log('other requirements are', other);
    console.log('search query is', searchQuery);

    let query =
     "SELECT * FROM pets WHERE " +
     "name IN (" + pet.map(name => `'${name}'`).join() + ") " +
     "AND species IN (" + breed.map(species => `'${species}'`).join() + ") " +
     "AND age IN (" + age.map(age => `'${age}'`).join() + ")" +
     "AND breed IN (" + breed.map(breed => `'${bree.d}'`).join() + ")" +
     "AND size IN (" + size.map(size => `'${size}'`).join() + ")" +
     "AND temperment IN (" + temp.map(temperment => `'${temperment}'`).join() + ")" +
     "AND color IN (" + color.map(color => `'${color}'`).join() + ")";

     db.query(query, (err, rows) => {
      if (err) {
          console.log("internal error", err);
          return;
      }*/
      //setOutput(rows);
  

    /*console.log('pet is',pet);
    console.log('size is',size);
    console.log('temparment is',temp);
    console.log('breed is', breed);
    console.log('color is',color);
    console.log('age of the pet is', age);
    console.log('other criterias are', other);
    console.log('search Query is', searchQuery);*/
    
     const filter=req.body.filter;
     console.log(filter);

//  Newly added filter code.

     let query = "SELECT * FROM pets WHERE " ;
     if (filter.pet.length > 0) {
        query += "pet IN (" + filter.pet.map(pet => `'${pet}'`).join() + ") " 
     }
     if (filter.size.length > 0){
      query+= "AND size IN (" + filter.size.map(size => `'${size}'`).join() + ") " 
     }
     if (filter.temp.length > 0){
      query+= "AND temp IN (" + filter.temp.map(temp => `'${temp}'`).join() + ") " 
     }
     if (filter.breed.length > 0){
      query+= "AND breed IN (" + filter.breed.map(breed => `'${breed}'`).join() + ") " 
     }
     if (filter.color.length > 0){
      query+= "AND color IN (" + filter.color.map(color => `'${color}'`).join() + ") " 
     }
     if (filter.age.length > 0){
      query+= "AND age IN (" + filter.age.map(age => `'${age}'`).join() + ") " 
     }
     if (filter.other.length > 0){
      query+= "AND other IN (" + filter.other.map(other => `'${other}'`).join() + ") " 
     }
    
    
//      let query =
//      "SELECT * FROM pets WHERE " +
//      "pet IN (" + filter.pet.map(name => `'${name}'`).join() + ") " +
//      "AND age IN (" + filter.age.map(age => `'${age}'`).join() + ")" +
//      "AND breed IN (" + filter.breed.map(breed => `'${breed}'`).join() + ")" +
//      "AND size IN (" + filter.size.map(size => `'${size}'`).join() + ")" +
//      "AND temperment IN (" + filter.temp.map(temperment => `'${temperment}'`).join() + ")"+
//      "AND color IN (" + filter.color.map(color => `'${color}'`).join() + ")";
//      "AND other IN (" + filter.other.map(species => `'${species}'`).join() + ") ";


     console.log(query);
     db.query(query, (err, rows) => {
      if (err) {
          console.log("internal error", err);
          return;
      }
      console.log(rows);
      //setOutput(rows);
      res.send(rows);
    });

});


app.listen(3000, () => {
    console.log("running server");
});
