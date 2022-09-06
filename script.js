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
                let div = document.createElement('div');
                div.classList.add('hour');

                df.appendChild(div);
            })
            container.appendChild(df);
        })
        .catch(error => {
            console.log(error.message);
        })
}