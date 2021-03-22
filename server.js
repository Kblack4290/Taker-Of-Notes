// Hot restaurant is a helpful activity

// Download fs, express, path, 
const fs = require('fs');
const express = require('express');
const path = require('path')
const app = express();

// gets saved notes from db.json
let getNotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json')))


// establish a port for 8080 process.env.PORT || 8080
// connects to server
const PORT = process.env.PORT || 8080;

// use express to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('Develop/public'));

// You will need use your routes to connect each html ex "require('../../api')" "require('../../html')"
//keeping routes in same file will be easier 
//GET how to get api data from notes.html - app.get(.../api.route/api.route), (req, res) => res.json(data))
// POST saving notes app.post(api/api.route, req, res) => { if statements}
//Delete Deleting any saved notes.

// gets notes saved in db.json
app.get('/api/notes', (req, res) => {

    if (getNotes) {
        return res.json(getNotes);
    }
});

// saves the note on the aside
app.post('/api/notes', (req, res) => {

    const {title, text} = req.body
    let newNote = {title:title, text:text, id:Math.floor(Math.random()*100)}
    //pushes notes to the aside
    getNotes.push(newNote);

    //telling the application to write the note on the dom in the aside
    fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(getNotes));
    res.json(newNote);
});

// deletes notes in any order using splice - source = https://www.codota.com/code/javascript/functions/express/Router/delete
app.delete('/api/notes/:id', (req, res) => {

    let deleteNotes = req.params.id;

    getNotes.splice(deleteNotes, 1)
    res.json(req.body)
});


//HTML ROUTE - Path = app.Get('../htmlpath', (req,res) => { res.sendfile(path.join(__dirname, '../htmlpath'));});
//Default route app.get('*', (req,res) => { res.sendfile(path.join(__dirname, '../htmlpath'));});

// getting the file path for the get started page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

// when selecting get started you are brought to the notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

// if there is not response then the user will be brought back to the get started page
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
// });



//add the listener to to make sure you are connected to the port

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})