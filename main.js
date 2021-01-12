window.addEventListener('load', () => {
    
    // API key
    const key = '8d523de3bb97c670d9c003756634841f';

    // HTML DOM elements o be updated on getting weather conditions
    let timezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.icon');
    let temp = document.querySelector('.temp-degree');
    let summary = document.querySelector('.temp-desc');

    // Based on current location
    let long; 
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

            fetch(geoApi)
                .then(response => response.json())
                .then(data => {

                    // Set DOM elements
                    timezone.textContent = data.name + "/" + data.sys.country;
                    let { icon } = data.weather[0];
                    var iconurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
                    locationIcon.setAttribute("src", iconurl);
                    temp.textContent = data.main.temp;
                    summary.textContent = data.weather[0].description;
                })

        });
    } else {
        alert("What's Your Weather: I was not able to locate your location maybe because you have not allowed me to access it or your browser does not support it.");
    }


    // Based on city searched
    const button = document.querySelector(".search");
    let msg = document.querySelector(".msg");

    button.addEventListener("click", () => {
        city = document.querySelector('#city-name').value;
        const cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
        console.log(city);
    
        fetch(cityApi)
            .then(response => response.json())
            .then(data => {
                console.log(data);
    
                // Set DOM elements
                timezone.textContent = data.name + "/" + data.sys.country;
                let { icon } = data.weather[0];
                var iconurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
                locationIcon.setAttribute("src", iconurl);
                temp.textContent = data.main.temp;
                summary.textContent = data.weather[0].description;
            })
            .catch(() => {
                msg.textContent = 'Please search for a valid city'
            });

        msg.textContent = "";
    });
});