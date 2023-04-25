
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

function storePath(path: string, callback: Function) {
    if (localStorage.getItem('images') === null) {
        localStorage.setItem('images', JSON.stringify({ 0: path }))
    }
    else {
        let images = JSON.parse(localStorage.getItem('images') || "");
        images[Object.keys(images).length] = path;
        console.log(images);
        localStorage.setItem('images', JSON.stringify(images));
    }

    callback(path);
}

export function handleImageUpload(event: any, setImgSrc: Function) {
    const files = event.target.files;
    const formData = new FormData();
    formData.append('uploadedPhoto', files[0]);
    formData.append("user", "Sam");

    fetch(host + '/uploadImage', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            storePath(data.path, setImgSrc);
        })
        .catch(error => {
            console.error(error)
        })
}

/**
   * Fetches team data from the localhost proxy server. Uses the
   * 'team' state (which is set using the input field) to retrieve all
   * of the winning games for the inputt team.
   */
export function searchForTeam(team: string, setData: Function) {
    fetch("http://localhost:8080/team/" + team)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            console.log(data);
        })
}