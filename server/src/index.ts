
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import * as Utils from './utils';

const app: Express = express();

app.use(cors()); // allow CORS

app.use(express.json());

/* axios GET path for sports team data. Takes one parameter which is the teams name */
app.get("/team/:team", (req: Request, res: Response) => {

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
            //console.log(data); // This will log the parsed data as an array of objects
        })
        .catch((error) => {
            console.error(error); // This will log any errors that occurred during the parsing process
        });
});

/* listen on port 8080 */
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Proxy server running on ${PORT}`)
});