
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
const app: Express = express();

app.use(cors()); // allow CORS

app.use(express.json());

/* listen on port 8080 */
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Proxy server running on ${PORT}`)
});