const apiKey = "97f579a9f9520202e1b08d3eee914655";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const statusText = document.getElementById("status");

async function getWeather(city){

    try{

        statusText.textContent = "Loading...";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = data.main.temp;
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;

        statusText.textContent = "";

    }

    catch(error){

        cityName.textContent = "No Data";
        temperature.textContent = "--";
        humidity.textContent = "--";
        wind.textContent = "--";

        statusText.textContent = error.message;

    }

}

searchBtn.addEventListener("click",()=>{

    const city = cityInput.value.trim();

    if(city!==""){
        getWeather(city);
    }

});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){
        searchBtn.click();
    }

});