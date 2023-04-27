import dotenv from 'dotenv';
import pg from 'pg';
import path, { parse } from 'path';
import bcrypt from 'bcrypt';

const __dirname = path.resolve();
const envPath = __dirname.includes('C:\\Users\\') ? '/server' : '';

dotenv.config({ path: __dirname + envPath + '/.env' }); // load environment variables

console.log(__dirname + envPath + '/.env')

let connectionUrl: string = "postgres://" + process.env.PG_USER + ":"
    + process.env.PG_PASSWORD + "@" + process.env.PG_HOST;

/* if this is being ran locally, the connection URL 
must include the external URL for the Render PG database */
connectionUrl += __dirname.includes('C:\\Users\\') ? process.env.PG_EXTERNAL_URL : "";

connectionUrl += "/" + process.env.PG_DATABASE;
connectionUrl += __dirname.includes('C:\\Users\\') ? "?ssl=true" : "";

console.log(connectionUrl)

async function createTable() {
    const client = new pg.Client(connectionUrl);

    client.connect((error) => {
        if (error) console.log(error);
    });

    const res = await client.query("CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, "
        + "username text UNIQUE NOT NULL, email text UNIQUE NOT NULL, " +
        "password VARCHAR(72) NOT NULL, profile_picture text, " +
        "gallery text [], tasks text [])");

    await client.end();
}

export async function createNewUser(username: string, email: string,
    password: string, pictureLink: string) {

    const client = new pg.Client(connectionUrl);

    client.connect((error) => {
        if (error) console.log(error);
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {

        const res = await client.query("INSERT INTO public.users (username, email, password, profile_picture) " +
            "VALUES('" + username + "', '" + email + "', '" + hashedPassword + "', '" + pictureLink + "')");

        await client.end();

        return 201;
    } catch (error) {
        console.log("Database error: " + error);
        return 409;
    } finally {
        await client.end();
    }
}

export async function appendToArray(newGalleryImg: string, username: string) {

    const client = new pg.Client(connectionUrl);
    client.connect((error) => {
        if (error) console.log(error);
    });

    try {
        const res = await client.query("UPDATE public.users SET gallery=ARRAY_APPEND(gallery, '" + newGalleryImg + "'" +
            "WHERE username='" + username + "')");

        return 201;
    } catch (error) {
        console.log("Database error: " + error);
        return 400;
    } finally {
        await client.end();
    }
}

export async function checkPassword(username: string, password: string) {
    const client = new pg.Client(connectionUrl);
    client.connect((error) => {
        if (error) console.log(error);
    });

    try {
        const res = await client.query("SELECT password FROM public.users " +
            "WHERE(username='" + username + "')");

        bcrypt.compare(password, res.rows[0].password)
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.log("Database error: " + error);
    } finally {
        await client.end();
    }
}

export async function checkLogin(username: string, password: string) {

    const client = new pg.Client(connectionUrl);
    client.connect((error) => {
        if (error) console.log(error);
    });

    try {
        const res = await client.query("SELECT user_id, username, profile_picture, gallery, tasks FROM public.users " +
            "WHERE(username='" + username + "' AND password='" + password + "')");

        return res.rows;
    } catch (error) {
        console.log("Database error: " + error);
    } finally {
        await client.end();
    }
}

async function test() {
    await createTable();
}

test();