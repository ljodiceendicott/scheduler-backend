const express = require("express");
const Datastore = require('nedb');
const app = express();
const port = 3000;

const database = new Datastore('database.db');
database.loadDatabase();

database.insert({"Testing_run":true})

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.get("/schedule/member/:id", (req, res) => {});
app.get("/schedule/team/:id", (req, res) =>{});

app.post('/schedule', (req,res) =>{
  database.insert(req.body);
  res.json({
    status: "200 Success",
    Data_Added: req.body
  })
});

app.put("/schedule/update/:id", (req, res) => {})