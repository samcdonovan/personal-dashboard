
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import Parser from 'rss-parser';
import { parse } from 'parse5';
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
    console.log(process.env.WEATHER_SECRET_KEY);
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
    // console.log(req.socket.remoteAddress);
    // console.log(req.headers.host);
    // let host: string = req.socket.remoteAddress.replace(/^.*:/, '');
    // console.log(host);

    /* use function from Utils.ts to parse the CSV file */
    let dataPath = (req.headers.host.includes("localhost") ? "/server" : "") + "/assets/data/I1.csv";

    Utils.parseCSVFile(__dirname + dataPath)
        .then((result) => {
            let team: string = req.params.team;
            let matches: Array<Team> = result.filter(function (item: Team) {
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

            if (result.content.search("<!-- start relEntries -->") !== -1) {
                article = (result.content).substring(0, (result.content).search("<!-- start relEntries -->"))
            } else {
                article = result.content;
            }

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

function printPost(entry: any) {
    //let article = document.createElement("article");
    console.log(entry.link)
    console.log(entry.h4)
    console.log(entry.content)

    const p = new DOMParser();
    const value = p.parseFromString(entry.content, 'text/html');
    console.log(value)
    return value;
    /* link = document.createElement("a");
     link.setAttribute("href", entry.link);
     link.setAttribute("target", "_blank");
   
     h4 = document.createElement("h4");
     h4.innerText = entry.title;
   
     link.appendChild(h4);
     article.appendChild(link);
   
     blogs = document.getElementById('blog-posts');
     blogs.appendChild(article);*/
}

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

app.post('/uploadImage', (req: Request, res: Response) => {
    let file: fileUpload.UploadedFile;
    let uploadPath: string;

    file = req.files.uploadedPhoto as fileUpload.UploadedFile;
    let publicPath: string = '/images/tmp/' + req.body.username;
    let relativePath: string = '/client/public' + publicPath;

    if (!fs.existsSync(__dirname + relativePath)) {
        fs.mkdirSync(__dirname + relativePath)
    }

    uploadPath = __dirname + relativePath + "/" + file.name;

    file.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
    });

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

app.post("/login", (req: Request, res: Response) => {
    const credentials = req.body;

    Database.checkPassword(credentials.username, credentials.password)
        .then((data: any) => {
            console.log("test")
            console.log(data)
            let result = data.length > 0 ? {
                status: 200,
                userId: data[0].user_id,
                username: data[0].username,
                profile_picture: data[0].profile_picture,
                gallery: data[0].gallery,
                tasks: data[0].tasks
            } : {
                status: 401
            }
            res.send({ result });
        })
        .catch((error: any) => {
            console.log("Login POST request error: " + error);
        });;
    /*
        console.log(valid);
    
        if (valid) {
            Database.checkLogin(credentials.username, credentials.password)
                .then((data: any) => {
                    let result = data.length > 0 ? {
                        status: 200,
                        userId: data[0].user_id,
                        username: data[0].username,
                        profile_picture: data[0].profile_picture,
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
        } else {
            res.send({ status: 401 })
        }
        */
});

app.post("/register", (req: Request, res: Response) => {
    const credentials = req.body;
    console.log(req.body)

    Database.createNewUser(credentials.username, credentials.email,
        credentials.password, credentials.imgPath)
        .then((data: any) => {
            console.log(data);
            res.send({ data });
        })
        .catch((error: any) => {
            console.log("Register POST request error: " + error);
        });
});

app.put("/upload", (req: Request, res: Response) => {

    Database.appendToArray(req.body.image, req.body.username)
        .then((data: any) => {
            console.log(data);
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