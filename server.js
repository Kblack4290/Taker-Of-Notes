// Hot restaurant is a helpful activity

// Download fs, express, path, 
const fs = require('fs');
const express = require('express');
const path = require('path')
const app = express();

let getNotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json')))


// establish a port for 8080 process.env.PORT || 8080
const PORT = process.env.PORT || 8080;

// use express to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(express.static('Develop/public'));

// You will need use your routes to connect each html ex "require('../../api')" "require('../../html')"
//keeping routes in same file will be easier 
//GET how to get api data from notes.html - app.get(.../api.route/api.route), (req, res) => res.json(data))
// POST saving notes app.post(api/api.route, req, res) => { if statements}
//Delete Deleting any saved notes.

app.get('/api/notes', (req, res) => {

    if (getNotes) {
        return res.json(getNotes);
    }
});

app.post('/api/notes', (req, res) => {
    
    getNotes.push(req.body);

    fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(getNotes));
    res.json(req.body);
});



//HTML ROUTE - Path = app.Get('../htmlpath', (req,res) => { res.sendfile(path.join(__dirname, '../htmlpath'));});
//Default route app.get('*', (req,res) => { res.sendfile(path.join(__dirname, '../htmlpath'));});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});



//add the listener to to make sure you are connected to the port

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})