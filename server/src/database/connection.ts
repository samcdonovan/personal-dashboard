import dotenv from 'dotenv';
import pg from 'pg';
import path, { parse } from 'path';
import bcrypt from 'bcrypt';

const __dirname = path.resolve();
const envPath = __dirname.includes('C:\\Users\\') ? '/server' : '';

dotenv.config({ path: __dirname + envPath + '/.env' }); // load environment variables

/* create Postgres connection URL based on whether the 
app is being run locally or through the public website */
let connectionUrl: string = "postgres://" + process.env.PG_USER + ":"
    + process.env.PG_PASSWORD + "@" + process.env.PG_HOST;

/* if this is being ran locally, the connection URL 
must include the external URL for the Render PG database */
connectionUrl += __dirname.includes('C:\\Users\\') ? process.env.PG_EXTERNAL_URL : "";

connectionUrl += "/" + process.env.PG_DATABASE;
connectionUrl += __dirname.includes('C:\\Users\\') ? "?ssl=true" : "";

/**
 * Creates a users table on the Postgres database
 */
async function createTable() {
    const client = new pg.Client(connectionUrl);

    client.connect((error) => {
        if (error) console.log(error);
    });

    /* run create table query */
    const res = await client.query("CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, "
        + "username text UNIQUE NOT NULL, email text UNIQUE NOT NULL, " +
        "password VARCHAR(73) NOT NULL, profile_picture text, " +
        "gallery text [], tasks text [])");

    await client.end();
}

/**
 * Creates a new user in the users database
 * @param username Username of the user (unique)
 * @param email Email of the user (unique)
 * @param password The user's password
 * @param pictureLink Optional profile picture link
 * @returns Query status code
 */
export async function createNewUser(username: string, email: string,
    password: string, pictureLink: string) {

    const client = new pg.Client(connectionUrl);

    client.connect((error) => {
        if (error) console.log(error);
    });

    //const hashedPassword = await bcrypt.hash(password, 10);

    try {

        /* run insert query */
        const res = await client.query("INSERT INTO public.users (username, email, password, profile_picture) " +
            "VALUES('" + username + "', '" + email + "', '" + password + "', '" + pictureLink + "')");

        await client.end();

        return 201; // query success
    } catch (error) {
        console.log("Database error: " + error);
        return 409; // query failur
    } finally {
        await client.end();
    }
}

/**
 * Adds a new image to the users gallery
 * @param newGalleryImg The new image to be added
 * @param username The username of the user
 * @returns Query status code
 */
export async function addToGallery(newGalleryImg: string, username: string) {

    const client = new pg.Client(connectionUrl);
    client.connect((error) => {
        if (error) console.log(error);
    });

    try {
        /* run update query on users table */
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

/**
 * Compare hash password using bcrypt
 * @param password The input password
 * @param storedPassword Password store in DB
 */
function comparePassword(password: string, storedPassword: string) {
    bcrypt.compare(password, storedPassword)
        .then(result => {
            console.log(result)
            return result;
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * Checks that the input password matches the one found in the DB
 * @param username 
 * @param password 
 * @returns 
 */
export async function checkPassword(username: string, password: string) {
    const client = new pg.Client(connectionUrl);
    client.connect((error) => {
        if (error) console.log(error);
    });

    try {
        /* run select query on users table */
        const res = await client.query("SELECT password FROM public.users " +
            "WHERE(username='" + username + "')");

        return comparePassword(password, res.rows[0].password);

    } catch (error) {
        console.log("Database error: " + error);
    } finally {
        await client.end();
    }
    /*
        let valid = await comparePassword(password, res.rows[0].password);
        return valid;
    } catch (error) {
        console.log("Database error: " + error);
    } finally {
        await client.end();
    }*/
}

/**
 * Uses users credentials to log them in
 * 
 * @param username Username of the user
 * @param password Users password
 * @returns Rows of data returned from query
 */
export async function login(username: string, password: string) {

    const client = new pg.Client(connectionUrl);
    client.connect((error) => {
        if (error) console.log(error);
    });

    try {

        /* run select query on users table */
        const res = await client.query("SELECT user_id, username, profile_picture, gallery, tasks FROM public.users " +
            "WHERE(username='" + username + "' AND password='" + password + "')");

        return res.rows;
    } catch (error) {
        console.log("Database error: " + error);
    } finally {
        await client.end();
    }
}

/**
 * Creates the users table if it does not exist
 */
async function initialRun() {
    await createTable();
}

initialRun();