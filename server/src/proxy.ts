
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import Parser from 'rss-parser';
import fileUpload from 'express-fileupload';
import path from 'path'; // global install?
import fs from 'fs';
import { imgbox } from 'imgbox-js';
import * as Utils from './utils.js';
import * as Database from './database/connection.js'

const __dirname = path.resolve();
dotenv.config({ path: __dirname + '/server/.env' }); // load environment variables

const app: Express = express();

app.use(cors()); // allow CORS
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload());

/* express GET path for weather data. Takes two paramaters: latitude and longitude */
app.get("/weather/:lat&:lon", (req: Request, res: Response) => {

    /* build URL for OpenWeather GET request using query paramaters */
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="
        + req.params.lat + "&lon=" + req.params.lon + "&appid=" + process.env.WEATHER_SECRET_KEY
        + "&units=metric";

    axios.get(url)
        .then((data: any) => {

            /* send relevant data through response */
            res.send({
                status: data.data.cod,
                type: data.data.weather[0].main,
                temp: data.data.main.temp,
                location: data.data.name,
                icon: "https://openweathermap.org/img/wn/" + data.data.weather[0].icon + "@2x.png"
            });
        })
        /* catch and log error */
        .catch((error) => {
            console.error("Weather GET request error: " + error);
        });
});

/* express GET path for sports team data. Takes one parameter which is the teams name */
app.get("/team/:team", (req: Request, res: Response) => {

    /* use function from Utils.ts to parse the CSV file */
    let dataPath = (req.headers.host.includes("localhost") ? "/server" : "") + "/assets/data/I1.csv";

    Utils.parseCSVFile(__dirname + dataPath)
        .then((result) => {
            let team: string = req.params.team;
            let matches: Array<Team> = result.filter(function (item: Team) {
                /* only return data where the winning team is the input team */
                return (item.HomeTeam == team && item.FTR == "H")
                    || (item.AwayTeam == team && item.FTR == "A");
            }).map(function (item: Team) {

                return {
                    HomeTeam: item.HomeTeam,
                    AwayTeam: item.AwayTeam,
                    FTR: item.FTR
                }
            })

            res.send(matches);
        })
        /* catch and log error */
        .catch((error) => {
            console.error("Sports team GET request error: " + error);
        });
});

/* express GET path for BBC news data */
app.get("/news", (req: Request, res: Response) => {

    const parser: Parser = new Parser();
    const newsUrl = "https://www.huffingtonpost.co.uk/feeds/index.xml";
    parser.parseURL(newsUrl)
        .then((data) => {

            let result = data.items[0];
            let article: string;

            /* format article text */
            if (result.content.search("<!-- start relEntries -->") !== -1) {
                article = (result.content).substring(0, (result.content).search("<!-- start relEntries -->"))
            } else {
                article = result.content;
            }

            /* format snippet text */
            let snippet: string;
            if (result.contentSnippet.includes("function(")) {
                snippet = result.contentSnippet.substring(result.contentSnippet.indexOf('");});'), result.contentSnippet.length);
                snippet = snippet.substring(snippet.match('[a-zA-Z]').index, snippet.indexOf('.'));
            } else {
                snippet = result.contentSnippet.substring(0, (result.contentSnippet.indexOf('.')));
            }

            res.send({ title: result.title, snippet: snippet, article: article });
        });
});

/* express GET path for clothes data */
app.get("/clothes", (req: Request, res: Response) => {

    /* use axios to run a GET request on the clothing data */
    axios.get("https://therapy-box.co.uk/hackathon/clothing-api.php?username=" + process.env.CLOTHES_USERNAME)

        /* return response from axios request */
        .then((data: any) => {
            let responseData = data.data.payload; // get data from payload
            let sums: ClothingSums = {};

            /* map each item of clothing into the sums object and calculate their sums */
            responseData.map(function (item: ClothingItem) {
                /* if the item already exist in 'sums', retrieve its value and add 1, otherwise return 0 and add 1 */
                sums[item.clothe] = (sums[item.clothe] != null ? sums[item.clothe] : 0) + 1;
            })

            let clothingData: Array<ClothingItem> = []; // an array for the sums so that the data is easier to use in the frontend

            for (let idx = 0; idx < Object.keys(sums).length; idx++) {
                let clothingItem: string = Object.keys(sums)[idx]; // get keys from the 'sums' object

                /* add clothing item and sum to array */
                clothingData[idx] = {
                    clothe: clothingItem,
                    sum: sums[clothingItem]
                }
            }

            return res.send(clothingData); // send data through response
        })
        /* catch errors with API request */
        .catch((error: any) => {
            console.log("Clothes GET request error: " + error);
        })
});

/* express POST endpoint for uploading an image */
app.post('/uploadImage', (req: Request, res: Response) => {
    let file: fileUpload.UploadedFile;
    let uploadPath: string;

    file = req.files.uploadedPhoto as fileUpload.UploadedFile;

    /* create temp location for file */
    let publicPath: string = '/images/tmp/' + req.body.user;

    let relativePath: string = __dirname.includes('C:\\Users\\') ? '/client/public' : '';
    relativePath += publicPath;

    if (!__dirname.includes('C:\\Users\\')) {
        fs.mkdirSync(__dirname + '/images');
        fs.mkdirSync(__dirname + '/images/tmp/');
    }
    if (!fs.existsSync(__dirname + relativePath)) {
        fs.mkdirSync(__dirname + relativePath)
    }

    fs.readdirSync(__dirname).forEach(file => {
        console.log(file);
    });
    fs.readdirSync(__dirname + relativePath).forEach(file => {
        console.log(file);
    });

    uploadPath = __dirname + relativePath + "/" + file.name;

    file.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    /* upload file to imgbox remote hosting */
    imgbox(uploadPath)
        .then((result) => {
            res.send({ path: result.data[0].original_url })

            /* delete temp file from filesystem once uploaded to imgbox */
            fs.unlink(uploadPath, (err) => {
                if (err) throw err;
                console.log(uploadPath + ' was deleted');
            });
        });
});

/* express POST endpoint for login */
app.post("/login", (req: Request, res: Response) => {
    const credentials = req.body;

    /* retrieve login data from DB */
    Database.login(credentials.username, credentials.password)
        .then((data: any) => {
            let result = data.length > 0 ? {
                status: 200,
                userId: data[0].user_id,
                username: data[0].username,
                profilePicture: data[0].profile_picture,
                gallery: data[0].gallery,
                tasks: data[0].tasks
            } : {
                status: 401
            }
            res.send({ result });
        })
        .catch((error: any) => {
            console.log("Login POST request error: " + error);
        });
});

/* express POST endpoint for register */
app.post("/register", (req: Request, res: Response) => {
    const credentials = req.body;

    /* pass credentials into database function */
    Database.createNewUser(credentials.username, credentials.email,
        credentials.password, credentials.imgPath)
        .then((data: any) => {
            res.send({ data }); // send back response
        })
        .catch((error: any) => {
            console.log("Register POST request error: " + error);
        });
});

/* express PUT endpoint for general uploads */
app.put("/updateGallery", (req: Request, res: Response) => {

    /* call database function to add to users gallery */
    Database.addToGallery(req.body.image, req.body.username)
        .then((data: any) => {

            res.send({ data });
        })
        .catch((error: any) => {
            console.log("Upload PUT request error: " + error);
        });
});

/* listen on port 8080 */
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Proxy server running on ${PORT}`)
});