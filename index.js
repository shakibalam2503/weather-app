const weatherForm = document.getElementById("weather-input");
const cityInput=document.getElementById("input-text");
const card =document.getElementById("card");
const apiKey="24d9bf4e5dc750effeb7d18f13d6ebdf";
weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const city=cityInput.value;
    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData)
        }
        catch(error){
            console.error(error);
            errorDisplay(error);
        }
    }
    else{
        errorDisplay("Please enter valid city name ");
    }
});
async function getWeatherData(city) {
    const  apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiurl);
    if(!response.ok){
        throw new Error("couldn't fetch data");
    }
    else{
        return await response.json();
    }
}
function displayWeatherInfo(data){
    console.log(data);
    const {name:city,
        main:{humidity,temp},
        weather:[{id,description}]}=data;
        card.textContent="";
        card.style.display="flex";
        const cityDisplay=document.createElement("h1");
        const tempDisplay=document.createElement("p");
        const humidityDisplay=document.createElement("p");
        const descriptionDisplay=document.createElement("p");
        const emojiDisplay=document.createElement("p");
        cityDisplay.textContent=city;
        cityDisplay.classList.add("city-name")
        card.appendChild(cityDisplay);
        tempDisplay.textContent=`${(temp-273).toFixed(2)}°C`;
        tempDisplay.classList.add("temparature")
        card.appendChild(tempDisplay);
        humidityDisplay.textContent=`Humidity : ${humidity}%`;
        humidityDisplay.classList.add("humidity")
        card.appendChild(humidityDisplay);
        descriptionDisplay.textContent=description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
        descriptionDisplay.classList.add("description")
        card.appendChild(descriptionDisplay);
        emojiDisplay.textContent=getWeatherEmoji(id);
        emojiDisplay.classList.add("weather-emoji")
        card.appendChild(emojiDisplay); 
}
function getWeatherEmoji(id){
    if(id>=200 && id<300 ){
        return "⚡";
    }
    else if(id>=300 && id<400){
        return  "🌦️";
    }
    else if(id>=500 && id<600){
        return "🌧️";
    }
    else if(id>=600 && id<700){
        return "❄️";
    }
    else if(id>=700 && id<800){
        return "🌫";
    }
    else if(id==800){
        return "☀️";
    }
    else if(id>800){
        return "☁️"
    }
}
function errorDisplay(message){
    const errorMessage=document.createElement("p");
    errorMessage.textContent=message;
    errorMessage.classList.add("error-display");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorMessage);
}