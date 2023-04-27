
<h1 align="center">Personal Dashboard</h1>

---
<h1>To be updated!</h1>

## Table of Contents
- [Instructions](#instructions)
- [About](#about)
- [Libraries and tools](#built_using)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Other](#other)   
- [Author](#author)

---
## About<a name = "about"></a>
The public URL for this website is [https://personal-dashboard-x8hx.onrender.com/](https://personal-dashboard-x8hx.onrender.com/).

Overall, all of the functionality is complete as well as the styling. There are a few things that I would have liked to add but unfortunately run out of time:
- bcrypt password hashing - This was implemented but stopped working and there was not enough time to fix it before submission
- Logout functionality
- Blocking access to dashboard if not signed in
- CSS animations

---
## Libraries and tools<a name = "built_using"></a>
- [TypeScript](https://www.typescriptlang.org/): Main language for this project, used for strong-typing and better code maintainability
- [npm](https://www.npmjs.com/): Installed and managed required packages for this project
- [Render](https://render.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Frontend<a name = "fronted"></a>
- [React](https://reactjs.org/): Front-end library for creating a single page webapp built with React components
- [React Router](https://reactrouter.com/en/main)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch): 
- [chartjs](https://www.chartjs.org/): Used for drawing a pie chart on the dashboard

### Backend<a name = "backend"></a>
- [Express](https://expressjs.com/): 
- [axios](https://axios-http.com/docs/intro): 
- [nodemon](https://www.npmjs.com/package/nodemon): Automatically restarted server if there were any changes to server code (dev tool)
- [cors](https://www.npmjs.com/package/cors): Enabled CORS for axios requests to the Starling API
- [imgbox-js](https://www.npmjs.com/package/imgbox-js/v/1.0.35): Uploaded images to a public URL
- [pg](https://www.postgresql.org/): Node Postgres library
- [rss-parser](https://www.npmjs.com/package/rss-parser): RSS parser for getting a news feed
- [csv-parser](https://www.npmjs.com/package/csv-parser): CSV parser for retrieving data about football teams
- [bcrypt](https://www.npmjs.com/package/bcrypt): Hashing and salting functionality
- [fs](https://nodejs.org/api/fs.html)

### Other<a name = "other"></a>
- [concurrently](https://www.npmjs.com/package/concurrently): Ran commands to set up both the proxy server and the React frontend with one command, in one terminal
- [Huffington Post RSS](https://www.huffingtonpost.co.uk/feeds/index.xml): After looking through many news RSS feeds and not finding any that provided the full article and image, I found Huffington Post. This RSS has a 'content' field, which essentially contains the HTML file for the article, and this is used with 'dangerouslySetInnerHTML' to display the article on the website.

---
## Author <a name = "author"></a>
- [@samcdonovan](https://github.com/samcdonovan)