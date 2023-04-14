const APIkey = '6c3568ffa7584320e01db238b334dc87'
const userInput = document.querySelector("#default-search");
const searchBtn = document.querySelector("#sbtBtn");


function getApi(cityName){
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIkey}`
    fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow', 
    })
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data)
        if(data.cod === "404") {
            for(i=0; i < 5; i++) {
                let day = document.querySelector(`#day${i+1}`)
                day.textContent = "";
                
            }
            document.querySelector("#day1").textContent = "no results found"
        } else {
     
            let currentDay = 1;
            for(i=0; i < data.list.length; i+=8) {
                console.log(i)
                let day = document.querySelector(`#day${currentDay}`)
                day.textContent = ""
                day.textContent = `date:${data.list[i].dt_txt} temp: ${data.list[i].main.temp_max}`
                currentDay++

            }
        }
    })
}

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    //saves the user input to variable
    var cityName = userInput.value.trim();
    getApi(cityName);
});