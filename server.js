// Hot restaurant is a helpful activity

// Download fs, express, path, 
const fs = require('fs');
const express = require('express');
const path = require('path')
const app = express();
// establish a port for 8080 process.env.PORT || 8080
const PORT = process.env.PORT || 8080;

// use express to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extend: true}));
app.use(express.static('Develop/public'));

// You will need use your routes to connect each html ex "require('../../api')" "require('../../html')"
//keeping routes in same file will be easier 
//GET how to get api data from notes.html - app.get(.../api.route/api.route), (req, res) => res.json(data))
// POST saving notes app.post(api/api.route, req, res) => { if statements}
// PUT When new notes are entered they will replace the current note
//Delete Deleting any saved notes.

//HTML ROUTE - Path = app.Get('../htmlpath', (req,res) => { res.sendfile(path.join(__dirname, '../htmlpath'));});
//Default route app.get('*', (req,res) => { res.sendfile(path.join(__dirname, '../htmlpath'));});



//add the listener to to make sure you are connected to the port

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})