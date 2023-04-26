
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


export function getNews(setNews: Function) {
    fetch(host + "/news")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setNews(data);
        });
}


function storePath(path: string) {
    if (localStorage.getItem('gallery') === null) {
        localStorage.setItem('gallery', JSON.stringify({ 0: path }))
    }
    else {
        let images = JSON.parse(localStorage.getItem('gallery') || "");
        images[Object.keys(images).length] = path;
        console.log(images);
        localStorage.setItem('gallery', JSON.stringify(images));
    }

    fetch(host + '/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            image: path,
            username: JSON.parse(localStorage.getItem('username') || '{}').username
        })
    })
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => {
            console.error(error)
        })
}

export function handleImageBlob(event: any, callback: Function) {
    const files = event.target.files;
    console.log(files)
    const formData = new FormData();
    const photoBlob = new Blob([files[0]], {
        type: files[0].type
    })

    formData.append('uploadedPhoto', photoBlob);
    formData.append("user", "Sam");
    callback(photoBlob);
    /*
        fetch(host + '/uploadImage', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //storePath(data.path, callback);
                callback(data);
            })
            .catch(error => {
                console.error(error)
            })
            */
}
export function handleImageUpload(event: any, calledFrom: string, callback: Function) {
    const files = event.target.files;
    const formData = new FormData();
    formData.append('uploadedPhoto', files[0]);
    formData.append("user", JSON.parse(localStorage.getItem('username') || '{}').username);

    fetch(host + '/uploadImage', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            callback(data.path);
            if (calledFrom === "gallery") storePath(data.path);
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
    fetch(host + "/team/" + team)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            console.log(data);
        })
}

export function login(username: string, password: string, setLoginData: Function) {
    console.log(username + password)

    fetch(host + "/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(response => response.json())
        .then(data => {
            setLoginData(data.result);
        })
        .catch(error => {
            console.error(error)
        })
}

export function register(username: string, email: string,
    password: string, imgPath: string, setRegisterStatus: Function) {
    const formData = new FormData();
    /*
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('uploadedPhoto', imageBlob);
    */

    //console.log(formData)
    fetch(host + "/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body:
            JSON.stringify({
                username: username, email: email,
                password: password, imgPath: imgPath
            })
    })
        .then(response => response.json())
        .then(data => {
            setRegisterStatus(data.data);
        })
        .catch(error => {
            console.error(error)
        })
}