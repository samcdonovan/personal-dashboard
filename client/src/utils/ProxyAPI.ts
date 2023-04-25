
const host = window.location.hostname == "localhost" ? "http://localhost:8080" : "https://personal-dashboard-proxy.onrender.com";


export function getWeather(setWeather: Function) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            /* fetch weather data from localhost rseource using Geolocation coordinates */
            fetch(host + "/weather/" + position.coords.latitude
                + "&" + position.coords.longitude)
                .then((res) => res.json())
                .then((data) => {
                    setWeather(data);
                })
        });
    } else {
        console.log("Geolocation is not supported by this browser")
    }
}

export function getClothesData(setClothesData: Function) {
    fetch(host + "/clothes")
        .then((res) => res.json())
        .then((data) => {
            setClothesData(data);
        });
}