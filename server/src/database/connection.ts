import dotenv from 'dotenv';
import pg from 'pg';
import path, { parse } from 'path';

const __dirname = path.resolve();
const envPath = __dirname.includes('C:\\Users\\') ? '/server' : '';
dotenv.config({ path: __dirname + envPath + '.env' }); // load environment variables

console.log(__dirname + '/.env')

let connectionUrl: string = "postgres://" + process.env.PG_USER + ":"
    + process.env.PG_PASSWORD + "@" + process.env.PG_HOST;

/* if this is being ran locally, the connection URL 
must include the external URL for the Render PG database */
connectionUrl += __dirname.includes('C:\\Users\\') ? process.env.PG_EXTERNAL_URL : "";

connectionUrl += "/" + process.env.PG_DATABASE + "?ssl=true";

console.log(connectionUrl)

async function createTable() {
    const client = new pg.Client(connectionUrl);

    client.connect((error) => {
        if (error) console.log(error);
    });

    const res = await client.query("CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, "
        + "username text UNIQUE NOT NULL, email text UNIQUE NOT NULL, " +
        "password VARCHAR(72) NOT NULL, profile_picture BYTEA)");

    await client.end();
}

export async function createNewUser(username: string, email: string, password: string) {
    const client = new pg.Client(connectionUrl);

    client.connect((error) => {
        if (error) console.log(error);
    });

    const res = await client.query("INSERT INTO public.users (username, email, password, profile_picture) " +
        "VALUES('" + username + "', '" + email + "', '" + password + "', null)");

    await client.end();
}

export async function checkLogin(username: string, password: string) {

    const client = new pg.Client(connectionUrl);
    client.connect((error) => {
        if (error) console.log(error);
    });

    const res = await client.query("SELECT user_id, username, profile_picture FROM public.users " +
        "WHERE(username='" + username + "' AND password='" + password + "')");

    console.log(res.rows)

    await client.end();

    return res.rows;

}

async function test() {
    await createTable();

    //await createNewUser("test", "test3", "test3");

    await checkLogin("test", "test3");
}

test();