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
const fetch = require('node-fetch');

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
//app.use(cookieParser());
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
    const city=req.body.city;
    const zipcode=req.body.zipcode;
   
    const roleid=1;
  

    console.log(country);
    console.log(state);

    password = req.body.password;


    db.query(

      "INSERT INTO Users (username, fname, lname, email, phno, password, role, roleid) VALUES (?,?,?,?,?,?,?,?)",
      [username, fname, lname, email, phone, password, role, roleid],

      (err, result) => {
          if(err){
            res.send(err);
          }
      }
  );
  db.query(
    "INSERT INTO address (Address, City, State, Country, Zipcode, username) VALUES (?,?,?,?,?,?)",
    [address,city,state,country,zipcode,username],

   

    (err, result) => {
      if(err){
        res.send(err);
      }
  });

  db.query(

    "INSERT INTO Security (username, sq1, sq2, sq1_ans, sq2_ans) VALUES (?,?,?,?,?)",
      [username, sec_ques1, sec_ques2, sq1, sq2],

      (err, result) => {
        if(err){
          res.send(err);
        }
        else res.send(result)
    }
);

    // bcrypt.hash(req.body.password, 10, function(err, hash) {
    //  password = hash;
    //  console.log("hashed password -> ", password);
    //  db.query(

    //       "INSERT INTO Users (username, fname, lname, email, phno, password, role, roleid) VALUES (?,?,?,?,?,?,?,?)",
    //       [username, fname, lname, email, phone, password, role, roleid],

    //       (err, result) => {
    //           if(err){
    //             res.send(err);
    //           }
    //       }
    //   );
    //   db.query(
    //     "INSERT INTO address (Address, City, State, Country, Zipcode, username) VALUES (?,?,?,?,?,?)",
    //     [address,city,state,country,zipcode,username],

       

    //     (err, result) => {
    //       if(err){
    //         res.send(err);
    //       }
    //   });

    //   db.query(

    //     "INSERT INTO Security (username, sq1, sq2, sq1_ans, sq2_ans) VALUES (?,?,?,?,?)",
    //       [username, sec_ques1, sec_ques2, sq1, sq2],

    //       (err, result) => {
    //         if(err){
    //           res.send(err);
    //         }
    //         else res.send(result)
    //     }
    // );
    // });  


});

//let location = await getAddress('Via San Michele 162, Vasto');





/*app.get('/', async (req, res, next) => {
 try {
  /*const address = req.body.address;
  const country = req.body.country;
  const state = req.body.state;
  const county = req.body.county;
   const neighborhood = 'chelsea'
   const borough = 'manhattan'
   const city = 'new+york+city'
   const category = 'burgers'*/
  
  /*const api_url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=chelsea+burgers+manhattan+new+york+city&type=restaurant&key=${key}`;
  const fetch_response = await fetch(api_url);
  const data = await fetch_response.json();
   console.log('api data is',data);
   res.json(data);
   res.send(data);
   } 
 catch (err) {
  next(err);
}
})*/


// const key = 'AIzaSyA0d2IhHBfzj0PmYr3yguvOylcmJ4r4VWM';
// app.post('/signin', async (req, res, next) => {
//  try {
//   const address = req.body.address;
//   const country = req.body.country;
//   const state = req.body.state;
//   const county = req.body.county;
//    /*const neighborhood = 'chelsea'
//    const borough = 'manhattan'
//    const city = 'new+york+city'
//    const category = 'burgers'*/
//    const {data} = await app.get(
   
// `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}+${county}+${state}+${country}&type=restaurant&key=${key}`
//    );
//    console.log('api data is',data);
//    res.json(data);
//    res.send(data);
//    } 
//  catch (err) {
//   next(err);
// }
// })


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

        // bcrypt.compare(password, result[0].password, (error, response) => {
        //   console.log(response);
        //   if (response) {
        //     req.session.user = result;
        //     console.log(req.session.user);
            
        //     res.send(result);
        //   } else {
        //     res.send({ message: "Wrong username/password combination!" });
        //   }
        // });
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

 merged = Object.assign({},rows[i],api_data);
 
console.log('merged array is',merged);
list_global.push(merged);
        }
console.log("LIST GLOBAL ++++++++++++++++++++++++++++++++++++++++++++",list_global);
res.send(list_global);

   
    });

   

});


app.listen(3000, () => {
    console.log("running server");
});


