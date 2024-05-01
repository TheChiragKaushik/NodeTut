const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// get all the data from table "users" and send it as a response to the client's request

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');


app.get('/', function (req, res) {
  res.send(`Chirag's site`);
})

app.use('/person', personRoutes);

app.use('/menu', menuRoutes);



app.get('/home', function (req, res) {
  res.send(`this is the home page.`);
})


app.listen(3000, () => {
  console.log(`server is running.`);
});

