// Require Express to run server, routes and dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app and port
const app = express();

/**Assign a port to the server */
const port = 3000;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
// This line points the server code to the folder that has the index.html and 
// any additional pages.
app.use(express.static('website'));

// Setup Server
const server = app.listen(port, listening);
function listening() {
    console.log(`Server running on port: ${port}`);
}

// GET method route that returns projectData
app.get('/all', (req, res) => {
    console.log('GET request received');
    res.send(projectData);
})

// POST method route
app.post('/addWeather', addWeatherData);

function addWeatherData(req, res) {
    console.log(req.body);
    newEntry = {
        name: req.body.name,
        icon: req.body.icon,
        temp_min: req.body.temp_min,
        description: req.body.description
    }
    projectData = newEntry;
    res.send(projectData);
    console.log({message: 'POST Recieved'})
}