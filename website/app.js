/* Global Variables */
// US is default country. Parameter is zip code,country code
//const url = "api.openweathermap.org/data/2.5/weather?q={city name}&appid=";
//const apiKey = "67d6201737fc6936ed33e5a5588b5dfa";
// The URL root if user searches by zip code
const apiZip = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// The URL root if user searches by city
const apiCity = 'http://api.openweathermap.org/data/2.5/weather?q=';
// The URL for units parameter
const apiUnits = '&units=';
const apiKey = '&appid=67d6201737fc6936ed33e5a5588b5dfa';


// Select input
const zipInput = document.querySelector('#zip');
const button = document.querySelector('#generate');
const feelings = document.querySelector('#feeling').value;

// Event listener to add function
document.querySelector('#generate').addEventListener('click', performAction);
// button.addEventListener('click', performAction)


// Function called by EventListener
function performAction(e) {
    e.preventDefault();
    // get user input values
    let url;
 
    if(zip) {
        url = apiZip + zipInput.value + apiKey;
    } else {
        console.log({ message: 'Bad URL' })
    }
    getWeatherData(url)
    .then(function (projectData) {
        return projectData;
    })
    
}

// Async GET from OpenWeather, converts response to JSON
// returns weatherData JSON object
const getWeatherData = async (url='') => {
    const response = await fetch(url);
    try {
        //Transform into JSON
        //const allData = await response.json()
        const data = await response.json();
        console.log(data)
        //Add data to post request
        postData('/addWeather', {
            name: data['name'], icon: data['weather'][0]['icon'], temp_min: data['main']['temp_min'].toFixed(),
            description: data['weather'][0]['description']
        }), feelings.then(updateUI())
        return data;
                        
    } catch(error) {
        //appropriately handle the error
        console.log('error', error);
    }
}

// Async POST
const postData = async (url="", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
         method: 'POST',
         credentials: 'same-origin',
         headers: {
                    //  'Accept': 'application/json'
                   'Content-Type': 'application/json',
         },
         body: JSON.stringify(data) //Body data-type matches the 'Content-Type' header   
    })
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
              console.log({message: 'Bad response recieved!'});
              
    }
};

// Update UI
const updateUI = async () => {
    document.getElementById('journal').classList.remove('hide');
    const feelings = document.querySelector('#feeling').value;
    const response = await fetch('/all');
    try {
              const allData = await response.json();
              const name = document.querySelector('#name');
              const date = document.querySelector('#date');
              const temp = document.querySelector('#temp');
              const description = document.querySelector('#content');
              const mood = document.querySelector('#mood')
               
              
              name.textContent = allData.name;
              temp.textContent = allData.temp_min;
              description.textContent = allData.description;
              date.textContent = allData.date = new Date().toDateString();
            mood.innerHTML = feelings;
              console.log(feelings)
             
    } catch (error) {
              console.log({message: 'Invalid zipcode input!'}); 
    }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();




// // Async POST
// const postData = async (url = '', data = {}) => {
//     const response = await fetch(url, {
//         method: 'POST',
//         mode: 'cors',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//           // Body data type must match "Content-Type" header
//         body: JSON.stringify(data)
//         });
// };

// // Update UI
// const updateUI = async () => {
//     const projectData = await getTheData('/data');
//     document.getElementById('date').innerHTML = `${projectData.date}`;
//     document.getElementById('temp').innerHTML = `${projectData.temperature} &#8457`;
//     document.getElementById('content').innerHTML = projectData.feelings;
// };

// // Calculate the user's date and time
// // returns date and time in string
// function dateTime() {
//     const d = new Date();
//     let minutes = d.getMinutes();
//     if (d.getMinutes() <= 9) {
//         minutes = `0${minutes}`;
//     }
//     const date = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} at time ${d.getHours()}:${minutes}`;
//     return date;
// }