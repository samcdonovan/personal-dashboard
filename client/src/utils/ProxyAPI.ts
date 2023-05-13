import { parseLocalStorage, updateLocalStorage } from "../utils/LocalStorage";

const host = window.location.hostname == "localhost" ? "http://localhost:8080" : "https://personal-dashboard-proxy.onrender.com";

/**
 * Retrieves data about the weather at the user's location using Geolocation 
 * 
 * @param setWeather Callback function for the 'weather' state
 */
export function getWeather(setWeather: Function) {
    if (navigator.geolocation) {

        if (sessionStorage.getItem("coords") === null) {
            navigator.geolocation.getCurrentPosition((position) => {

                /* store coords in sessionStorage */
                sessionStorage.setItem("coords",
                    JSON.stringify({ lat: position.coords.latitude, lon: position.coords.longitude }));

                /* fetch weather data from localhost rseource using Geolocation coordinates */
                fetch(host + "/weather/" + position.coords.latitude
                    + "&" + position.coords.longitude)
                    .then((res) => res.json())
                    .then((data) => {
                        setWeather(data);
                    })
            });
        } else {

            /* if sessionStorage already contains coords, use them instead of geolocation */
            let coords = JSON.parse(sessionStorage.getItem("coords") || "{}");
            fetch(host + "/weather/" + coords.lat
                + "&" + coords.lon)
                .then((res) => res.json())
                .then((data) => {
                    setWeather(data);
                })
        }
    } else {
        console.log("Geolocation is not supported by this browser")
    }
}

/**
 * Gets clothes data from proxy /clothes endpoint
 * @param setClothesData Callback function for setting clothes data
 */
export function getClothesData(setClothesData: Function) {
    fetch(host + "/clothes")
        .then((res) => res.json())
        .then((data) => {
            setClothesData(data);
        });
}

/**
 * Gets news data from proxy /news endpoint
 * @param setNews Callback function for setting news data
 */
export function getNews(setNews: Function) {
    fetch(host + "/news")
        .then((res) => res.json())
        .then((data) => {

            // store article in session storage
            sessionStorage.setItem('currentArticle', JSON.stringify(data));
            setNews(data);
        });
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

/**
 * Send login data to proxy /login POST endpoint
 * @param username User's username
 * @param password Usaer's password
 * @param setLoginData Callback functionn for setting users login data
 */
export function login(username: string, password: string, setLoginData: Function) {

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

/**
 * Send register data to proxy /register POST endpoint
 * @param username User's username
 * @param email User's email
 * @param password User's password
 * @param imgPath User's profile picture
 * @param setRegisterStatus Callback to set register status code
 */
export function register(username: string, email: string,
    password: string, imgPath: string, setRegisterStatus: Function) {

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

/**
 * Handles uploading an image through the proxy API
 * @param event The event that called the image upload
 * @param calledFrom Where the function was called from
 * @param callback Callback function to set the path of the image
 */
export function handleImageUpload(event: any, calledFrom: string, callback: Function, setIsLoading: Function) {

    setIsLoading(true);
    const files = event.target.files;
    const formData = new FormData();

    /* create form data for sending to POST endpoint */
    formData.append('uploadedPhoto', files[0]);
    formData.append("user", parseLocalStorage('username').username);

    fetch(host + '/uploadImage', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            callback(data.path); // set the path through callback

            /* if this was called from the gallery page, store the path in the DB */
            if (calledFrom === "gallery") storePath(data.path);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error)
        })
}

/**
 * Stores image url in localStorage
 * @param path URL of the image
 */
function storePath(path: string) {
    if (localStorage.getItem('gallery') === null) {
        /* set gallery in localStorage */
        localStorage.setItem('gallery', JSON.stringify({ 0: path }))
    }
    else {

        updateLocalStorage("gallery", path)
        /* let images = parseLocalStorage('gallery');
 
         images[Object.keys(images).length] = path;
         localStorage.setItem('gallery', JSON.stringify(images));
         */
    }

    /* update the users gallery in the database */
    fetch(host + '/updateGallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            image: path,
            username: parseLocalStorage('username').username
        })
    })
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => {
            console.error(error)
        })
}