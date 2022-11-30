const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const { generateFromEmail, generateUsername } = require("unique-username-generator");
// const { UNSAFE_NavigationContext } = require("react-router-dom");
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
var nodemailer = require("nodemailer");
//  const multer = require('multer');

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb'}));
// app.use(bodyParser.json({limit: '5mb'}));
// app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
//const { memoryStorage } = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/src/assets/pet-images');
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
//   }
// });


// const upload = multer({storage:multer.memoryStorage()});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })

);
app.use(bodyParser.urlencoded({ extended: false }));

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
    database: "pawsome",
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
    const city=req.body.city;
    const zipcode=req.body.zipcode;
   
    const roleid=req.body.roleid;

    password = req.body.password;


    db.query(

      "INSERT INTO Users (username, fname, lname, email, phno, password, role, roleid) VALUES (?,?,?,?,?,?,?,?)",
      [username, fname, lname, email, phone, password, role, roleid],

      () => {
      }
  );
  db.query(
    "INSERT INTO address (Address, City, State, Country, Zipcode, username) VALUES (?,?,?,?,?,?)",
    [address,city,state,country,zipcode,username],
    () => {});

  db.query(

    "INSERT INTO Security (username, sq1, sq2, sq1_ans, sq2_ans) VALUES (?,?,?,?,?)",
      [username, sec_ques1, sec_ques2, sq1, sq2],
      () => {
      }
);

res.send({username,fname,roleid})
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

        if (result[0].password==password){

          req.session.user = result;
          console.log(req.session.user);
          
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }

      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});


const key = 'AIzaSyA0d2IhHBfzj0PmYr3yguvOylcmJ4r4VWM';
app.post("/search", async(req, res) => {
  
    
     const filter=req.body.filter;
     //console.log(filter);

  let query = "SELECT * FROM pets as a inner join address as b on a.owner=b.username WHERE " ;

     if (filter.searchQuery.length > 0){
      query+="( "
      query+= "pet like '%"+ filter.searchQuery + "%' "+
      "OR age like '%"+ filter.searchQuery + "%' "+
      "OR breed like '%"+ filter.searchQuery + "%' "+
      "OR size like '%"+ filter.searchQuery + "%' "+
      "OR temp like '%"+ filter.searchQuery + "%' "+
      "OR no_shedding like '%"+ filter.searchQuery + "%' "+
      "OR no_biting like '%"+ filter.searchQuery + "%' "+
      "OR vaccinated like '%"+ filter.searchQuery + "%' "+
      "OR non_allergic like '%"+ filter.searchQuery + "%' "+
      "OR name like '%"+ filter.searchQuery + "%' "+
      "OR owner like '%"+ filter.searchQuery + "%' "+
      "OR color like '%"+ filter.searchQuery + "%' ";
      query+=" ) "
     }

     if (filter.pet.length > 0 && filter.searchQuery==0) {
        query += "a.pet IN (" + filter.pet.map(pet => `'${pet}'`).join() + ") " 
     }
     if (filter.pet.length > 0  && filter.searchQuery>0) {
      query += " AND a.pet IN (" + filter.pet.map(pet => `'${pet}'`).join() + ") " 
   }
     if (filter.size.length > 0){
      query+= "AND a.size IN (" + filter.size.map(size => `'${size}'`).join() + ") " 
     }
     if (filter.temp.length > 0){
      query+= "AND a.temperment='"+ filter.temp + "' " 
     }
     if (filter.breed.length > 0){
      query+= "AND a.breed IN (" + filter.breed.map(breed => `'${breed}'`).join() + ") " 
     }
     if (filter.color.length > 0){
      query+= "AND a.color IN (" + filter.color.map(color => `'${color}'`).join() + ") " 
     }
     if (filter.age.length > 0){
      query+= "AND a.age='"+ filter.age + "' " 
     }
     if (filter.no_shedding.length > 0){
      query+= "AND a.no_shedding='"+ filter.no_shedding + "' " 
     }
     if (filter.no_biting.length > 0){
      query+= "AND a.no_biting='"+ filter.no_biting + "' " 
     }
     if (filter.non_allergic.length > 0){
      query+= "AND a.non_allergic='"+ filter.non_allergic + "' " 
     }
     if (filter.vaccinated.length > 0){
      query+= "AND a.vaccinated='"+ filter.vaccinated + "' " 
     }
  
     console.log(query);
     db.query(query, async (err, rows) => {
      if (err) {
          console.log("internal error", err);
          return;
      }

      console.log('row data is',rows);  
    
  
list_global=[];
     
      for(i=0;i<rows.length;i++){
        address = rows[i].Address;
        console.log("RESPONSE", rows[i].Address);
        city = rows[i].City;
        console.log("Response ", rows[i].City);
        state = rows[i].State;
        console.log("Response ", rows[i].State);
        country = rows[i].Country;
        console.log("Response ", rows[i].Country);
        const api_url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}+${city}+${state}+${country}&type=restaurant&key=${key}`;
        const fetch_response = await fetch(api_url);
        const data = await fetch_response.json();
        api_data = data.results[0]["geometry"].location
        console.log('api data is ',data.results[0]["geometry"].location);
console.log("api data",api_data);
if(rows[i].image){
  rows[i].image.data = rows[i].image.toString('base64');
}
 merged = Object.assign({},rows[i],api_data);
 
console.log('merged array is',merged);
list_global.push(merged);
        }
console.log("LIST GLOBAL ++++++++++++++++++++++++++++++++++++++++++++",list_global);
res.send(list_global);

    });
});

app.get("/search", (req, res) => {

  const id = 1;
  const sqlInsert = "SELECT + FROM images WHERE id = ?;"
  
  connection.query(sqlInsert, [id] , (err, result) => {
  
  if (err) {
  console. log(err)
  res.send({
  msg: err
  })
}
  
  if(result){
    res.send({
      image: result [0]. image,
    });
  }
});

})

app.post("/petRegistration",(req, res) =>{
 //upload.single('image'), (req, res, err) => {
    
    const name =req.body.name;
    const breed = req.body.breed;
    const fname = req.body.fname;
    const size = req.body.size;
    const temperament = req.body.temperament;
    const no_shedding = req.body.no_shedding;
    const no_biting = req.body.no_biting;
    const non_allergic = req.body.non_allergic;
    const type = req.body.type;
    const vaccinated = req.body.vaccinated;
    const color = req.body.color;
    const age =req.body.age;
    const image =req.body.image;
   const amount=req.body.pet_price;
    console.log(image);

    console.log('pet breed is',breed);
    console.log('pet name is',fname);
    console.log('pet size is',size);
    console.log('pet temperment is',temperament);
    console.log('the pet sheds or not',no_shedding);
    console.log('the pet bits or not',no_biting);
    console.log('the pet is non allergic',non_allergic);
    console.log('the type of the pet is',type);
    console.log('the pet is vaccinates',vaccinated);
    console.log('the color of the pet is',color);
  
    console.log('the age of the pet is',age);
    

    console.log('vaccinated is',vaccinated);
    db.query(
      
      "INSERT INTO pets (name,owner,pet,age,breed,size,temp,color,no_shedding,no_biting,non_allergic,vaccinated,image,amount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [ name,fname,type,age,breed,size,temperament,color,no_shedding,no_biting,non_allergic,vaccinated,image,amount],
        (err, result) => {
          console.log(err,result);
      
          if(err){
            res.send(err);
          }
          res.send(result);
      }
  );

    //const image = req.file.filename; 

    if (!image) {
      console.log("No file upload");
  }
  //  else {
  //     //console.log(req.file.filename)
  //     var imgsrc = 'http://127.0.0.1:3000/images/' + image
  //     var insertData = "INSERT INTO images(imagesrc,fname,image)VALUES(?,?,?)"
  //     db.query(insertData, [imgsrc], (err, result) => {
  //         if (err) throw err
  //         console.log("file uploaded")
  //     })
  // }
});

app.post("/payment", (req, res) => {

  const date =req.body.date;
  const username = req.body.username;
  const orderId = req.body.orderId;
  const cname = req.body.cname;
  var ccnum = req.body.ccnum;
  const expmonth = req.body.expmonth;
  const expyear = req.body.expyear;
  const cvv = req.body.cvv;
  const orderComplete = 'booked';
  const amount=req.body.amount;
  const hours=req.body.hours;

  console.log(date);
  console.log(hours);
  console.log(username);
  console.log(orderId);
  console.log(cname);
  console.log(ccnum);
  console.log(expmonth);
  console.log(expyear);
  console.log(cvv);
  console.log(orderComplete);   
  console.log(amount);   

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

    }
});

db.query(
      
  "INSERT INTO payments (orderid,amount,booking_hours,date,owner,status) VALUES (?,?,?,?,?,?)",
    [ orderId,amount,hours,date,username,orderComplete],
    (err, result) => {
      console.log(err,result);
  
      if(err){
        res.send(err);
      }
    
      console.log(result);
      res.send(result);
  }
);
var from = req.body.from;
var to = req.body.to;
var subject = req.body.subject;
var message = req.body.message;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seproject101@gmail.com',
      pass: 'wfrnwjjzgcbbgbst'
    }
})
//  console.log("+++++++++++++++++++++++++++++hi hi",email);

var mailOptions = {
    from: 'seproject101@gmail.com',
    to:'seproject101@gmail.com',
    subject:"Pet payment confirmation.",
    text:"Your payment for pet is successful."
}

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log("Email Sent: " + info.response);
    }
    response.redirect("/");
})
});


app.post("/approval", async(req, res) => {
let query = "SELECT * FROM approval" ; //only if when approved is false
  console.log(query);
  db.query(query, async (err, rows) => {
   if (err) {
       console.log("internal error", err);
       return;
   }
   console.log('row data is',rows);  
 
res.send(rows);

 });
});

app.post("/complaints", async(req, res) => {
  let query = "SELECT * FROM complaints" ;
    console.log(query);
    db.query(query, async (err, rows) => {
     if (err) {
         console.log("internal error", err);
         return;
     }
     console.log('row data is',rows);  
   
  res.send(rows);
  
   });
  });

  app.post("/ratings", async(req, res) => {
    let query = "SELECT * FROM ratings" ;
      console.log(query);
      db.query(query, async (err, rows) => {
       if (err) {
           console.log("internal error", err);
           return;
       }
       console.log('row data is',rows);  
     
    res.send(rows);
    
     });
    });

    app.post("/refund", async(req, res) => {
      let query = "SELECT * FROM refunds" ;
        console.log(query);
        db.query(query, async (err, rows) => {
         if (err) {
             console.log("internal error", err);
             return;
         }
         console.log('row data is',rows);  
       
      res.send(rows);
      
       });
      });

      app.post("/reservation", async(req, res) => {
        let query = "SELECT * FROM bookings" ;
          console.log(query);
          db.query(query, async (err, rows) => {
           if (err) {
               console.log("internal error", err);
               return;
           }
           console.log('row data is',rows);  
         
        res.send(rows);
        
         });
        });
  




  



app.listen(3000, () => {
    console.log("running server on port 3000" );
});


