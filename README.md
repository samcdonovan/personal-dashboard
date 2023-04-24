
<h1 align="center">Personal Dashboard</h1>

---

## Table of Contents
- [Instructions](#instructions)
- [About](#about)
- [Libraries and tools](#built_using)
    - [Main](#main)
    - [Other](#other)   
- [Author](#author)

---
## Instructions<a name = "instructions"></a>
Any instructions prefixed with '>' are to be run in the command line.
### Installation
The below commands will clone the repository in your current working directory and then cd (change directory) into root directory of the project.

```
> git clone https://github.com/samcdonovan/personal-dashboard
> cd round-up-ts
```
Then the node_modules for the root directory and the client directory need to be installed. To do so, run the following command (while in the root directory):

```
> npm install
```
In the root package.json, I have included a "postinstall" script which will run the npm install command for the client directory after the root directory has finished installing its packages. After all node modules are installed, the project is ready to run!

### Running the WebApp
Once the npm installation has finished, you can start the WebApp with the following command:
```
> npm run dev
```
Using [concurrently](https://www.npmjs.com/package/concurrently), this command will start both the proxy backend server and the React frontend app simultaneously, and will automatically open the page in localhost:3000.

---
## About<a name = "about"></a>

---
## Libraries and tools<a name = "built_using"></a>
### Main<a name = "main"></a>
- [React](https://reactjs.org/): Front-end library for creating a single page webapp built with React components
- [TypeScript](https://www.typescriptlang.org/): Main language for this project, used for strong-typing and better code maintainability
- [npm](https://www.npmjs.com/): Installed and managed required packages for this project
- [Express](https://expressjs.com/): 
- [axios](https://axios-http.com/docs/intro): 
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch): 

### Other<a name = "other"></a>
- [Webpack](https://webpack.js.org/): Bundles front-end files for browser usage
- [concurrently](https://www.npmjs.com/package/concurrently): Ran commands to set up both the proxy server and the React frontend with one command, in one terminal
- [nodemon](https://www.npmjs.com/package/nodemon): Automatically restarted server if there were any changes to server code (dev tool)
- [cors](https://www.npmjs.com/package/cors): Enabled CORS for axios requests to the Starling API

---
## Author <a name = "author"></a>
- [@samcdonovan](https://github.com/samcdonovan)