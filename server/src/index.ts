
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import * as Utils from './utils.js';

dotenv.config(); // configure environment variables

const app: Express = express();

app.use(cors()); // allow CORS
app.use(express.json());
app.get("/weather/:lat&:lon"), (req: Request, res: Response) => {

    /* build URL for OpenWeather GET request using query paramaters */
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="
        + req.params.lat + "&lon=" + req.params.longitude + "&appid=" + process.env.WEATHER_SECRET_KEY
        + "&units=metric";

    axios.get(url)
        .then((res: any) => {

            /* send relevant data through response */
            res.send({
                status: res.data.cod,
                type: res.data.weather[0].main,
                temp: res.data.main.temp,
                location: res.data.name
            });
        })
        /* catch and log error */
        .catch((error) => {
            console.error("Weather GET request error: " + error);
        });
}


/* express GET path for sports team data. Takes one parameter which is the teams name */
app.get("/team/:team", (req: Request, res: Response) => {

    /* use function from Utils.ts to parse the CSV file */
    Utils.parseCSVFile("./server/data/I1.csv")
        .then((data) => {
            let team: string = req.params.team;
            let matches: Array<Team> = data.filter(function (item: Team) {
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

/* express GET path for clothes data */
app.get("/clothes", (req: Request, res: Response) => {

    /* use axios to run a GET request on the clothing data */
    axios.get("https://therapy-box.co.uk/hackathon/clothing-api.php?username=" + process.env.CLOTHES_USERNAME)

        /* return response from axios request */
        .then(function (response: any) {
            let data = response.data.payload; // get data from payload
            let sums: ClothingSums = {};

            /* map each item of clothing into the sums object and calculate their sums */
            data.map(function (item: ClothingItem) {
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
        .catch(function (error: any) {
            console.log("Clothes GET request error: " + error);
        })
});

/* listen on port 8080 */
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Proxy server running on ${PORT}`)
});