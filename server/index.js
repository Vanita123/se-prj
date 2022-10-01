const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { generateFromEmail, generateUsername } = require("unique-username-generator");


app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

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
    password: "password",
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
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phno = req.body.phone;
    const role = req.body.role;
    const address = req.body.address;
    const roleid = req.body.roleid;
    const username = generateFromEmail(
      email,
      3
    );
    console.log(username);
    console.log(password);

    db.query(

        "INSERT INTO Users (username, fname, lname, email, phno, password, address, role, roleid) VALUES (?,?,?,?,?,?,?,?,?)",
        [username, fname, lname, email, phno, password, address, role, roleid],
        (err, result) => {
            console.log(err,result);
        }
    );
});

app.get("/signin", (req, res) => {
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

app.listen(3001, () => {
    console.log("running server");
}); 