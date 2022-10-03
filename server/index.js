const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const { generateFromEmail, generateUsername } = require("unique-username-generator");
const { UNSAFE_NavigationContext } = require("react-router-dom");


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
      3
    );
    const phno = req.body.phone;
    const role = req.body.role;
    const sec_ques1 = 'What would you name your pet?';
    const sec_ques2 = 'What would you name your pet home?';
    const sq1 =  req.body.sq1;
    const sq2 =  req.body.sq2;
    const address = '';
    const roleid = 1
    const password = '1234';
    console.log(username);
    console.log(password);
    console.log(fname);

    db.query(

        "INSERT INTO Users (username, fname, lname, email, phno, password, address, role, roleid) VALUES (?,?,?,?,?,?,?,?,?)",
        [username, fname, lname, email, phno, password, address, role, roleid],

        (err, result) => {
            console.log(err,result);
        }
    );

    db.query(

      "INSERT INTO Security (username, sq1,sq2, answer1, answer2) VALUES (?,?,?,?,?)",
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
}); 