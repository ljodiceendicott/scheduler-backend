const express = require("express");
const Datastore = require('nedb');
const app = express();
const port = 3000;

const database = new Datastore('database.db');
database.loadDatabase();

database.insert({"name":"Mike"})

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


app.post('/schedule', (req,res) =>{
  const data = req.body;
  console.log(data)
  database.insert(data);
  res.json({
    status: "200 Success"
  })

})