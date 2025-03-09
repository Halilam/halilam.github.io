// External modules
const express = require('express');
const exphbs = require('express-handlebars');

// Built-in modules
const path = require("path");
const fs = require('fs')

const app = express()
const port = 3000;

// Set up Handlebars as the view engine
app.engine('.hbs', exphbs.engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the folder
app.use(express.static('public'));
app.use('/data', express.static('data')); 

const navLinks = [
    {title: 'About me', url: '/'},
    {title: 'Projects', url: '/project'},
    {title: 'Arts', url: '/art'},
    {title: 'Adventures', url: '/adventure'}
];


app.get('/', (req, res) => {
    res.render('index', { title: 'Home', navLinks });
});

app.get('/project', (req, res) => {
    const projectsPath = path.join(__dirname, 'data', 'projects.json');
    
    fs.readFile(projectsPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading projects file:", err);
            return res.status(500).send("Error loading projects.");
        }

        const projects = JSON.parse(data);
        res.render('project', { title: 'Projects', navLinks, projects });
    });
});


app.get('/art', (req, res) => {
    const artworksPath = path.join(__dirname, 'data', 'artworks.json');
    
    fs.readFile(artworksPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading artworks file:", err);
            return res.status(500).send("Error loading artworks.");
        }

        const artworks = JSON.parse(data);
        res.render('art', { title: 'Arts', navLinks, artworks });
    });
});

const adventuresPath = path.join(__dirname, 'data', 'adventures.json');

app.get('/api/adventures', (req, res) => {
    fs.readFile(adventuresPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading adventure data:", err);
            return res.status(500).json({ error: "Error loading adventures." });
        }

        res.json(JSON.parse(data));
    });
});

app.get('/adventure', (req, res) => {
    res.render('adventure', { title: "My Adventures", navLinks });
});




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});