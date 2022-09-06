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

                df.appendChild(div);                     //append div to the document fragment
            })
            container.appendChild(df);                   //append document fragment to the container
        })
        .catch(error => {
            console.log(error.message);
        })
}