let uri = './sample-weather.json'; //JSON sample(simulation of an API)
let req = new Request(uri, {method: 'GET'}); //Request instance
let container, df; //Initializing variables of container and the document fragment

document.addEventListener('DOMContentLoaded', init); //Wait to the page load then trigger the callback function init

function init(){
    container = document.getElementById('container'); //take the div with the container id
    df = new DocumentFragment(); //DocumentFragment instance

    fetch(req)
        .then(response => {
            if(response.ok) {
                return response.json();
            }else{
                throw new Error('Bad HTTP!');
            }
        })
        .then(jsondata => {
            //create the weather grid
            jsondata.hourly.data.forEach(hour =>{
                //to show the temperature
                let div = document.createElement('div'); //create the divs
                div.classList.add('hour');               //add the class hour to the divs
                let timestamp = hour.time;               //capture the timestamp of the object
                div.id = 'ts_'+ timestamp.toString();    //create an id to the divs, be sure it is a string
                let temp = parseInt(hour.temperature);   //capture the int part of the temperature property
                div.textContent = temp.toString().concat('\u00B0'); //show the text of temperature and concat with the unicode simbol
                div.title = hour.summary;               //add a title with the summary of the hour

                //to show the time
                let span = document.createElement('span'); //create the span to show the time
                let dateObj = new Date(timestamp * 1000);  //date instance, convertion of the timestamp
                span.textContent = dateObj.getHours().toString().concat(":00"); //show the hour

                div.appendChild(span);                   //append span to the div
                df.appendChild(div);                     //append div to the document fragment
            })
            container.appendChild(df);                   //append document fragment to the container

            //highlight the times when will be raining
            jsondata.hourly.data.filter(hour => {        
                if(hour.precipProbability > 0.5){       //filtering the objects that have more than 50% chance of rain in that hour
                    return true;
                }
                return false;
            }).map(hour => {
                return hour.time;                      //taking the timestamp of the rain hours
            }).forEach(timestamp => {
                let id = 'ts_'.concat(timestamp);                   //taking the ids of the divs filtrated                            
                document.getElementById(id).classList.add('precip'); //changing the style of the matching divs to blue
            })
        })
        .catch(error => {
            console.log(error.message);
        })
}