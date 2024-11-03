const express = require("express");
const Datastore = require('nedb');
const app = express();
const port = 3000;

//This is creating the name of the db file in the case that it will seperate out for each month
const date = new Date();
const month = date.getMonth()+"-"+date.getFullYear();

const db = new Datastore('datastore/db-'+month+'.db');
db.loadDatabase();

//Test Data entry
db.insert({ userid : 333, team: "Blue", Schedule:"123232213453"});
db.insert({ userid: 333, team: "Blue", Schedule: "123232213453" });
db.insert({ userid: 333, team: "Blue", Schedule: "123232213453" });
db.insert({ userid: 333, team: "Blue", Schedule: "123232213453" });

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server - May need to be modified if using on external site
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//Returns all schedules
app.get("/schedule", (req, res) => {
  db.find({}, function (err, docs) {
    console.log(docs);
    res.send(docs); 
  });
});

//Returning the schedule based on user
app.get("/schedule/member/:id", (req, res) => {
  const memberid = req.params.id;
  db.find({userid:parseInt(memberid)}, function(err,docs){
    console.log(docs);
    res.send(docs);// Full response/ May make this only be the user queried and the schdule
  });
});

//Returning the schedules for all people on specified team
app.get("/schedule/team/:id", (req, res) =>{
  const teamname = req.params.id;
  db.find({ team:teamname }, function (err, docs) {
    console.log(docs);
    res.send(docs); // Full response/ May make this only be the schdule but could also be parsed on the client side
  });
});


//Returning the schedules for specific user and team
app.get("/schedule/team/:team/:userid", (req, res) =>{
  const teamname = req.params.team;
  const userid = req.params.userid;
  db.find({ team: teamname, userid: parseInt(userid) }, function (err, docs) {
    res.send(docs); // Full response/ May make this only be the schdule but could also be parsed on the client side
  });
});

app.post('/schedule', (req,res) =>{
  db.insert(req.body);
  res.json({
    status: "200 Success",
    Data_Added: req.body
  })
});


//This will be used to override a members schedule if their team has a time there
app.put("/schedule/update/:id/:dayofweek", (req, res) => {})