
## Server / Backend

Npm is used for installing packages, manage dependencies, run scripts and publish package. By using `npm init` we create a new `package.json` file and by using `npm install` we download the packages required for a project.

We install modules such as Express, Mongoose, dotenv, CORS, JWT and Multer as Express is a `web framework` for Node.js, Mongoose is an `Object Data Modeling (ODM)` library for MongoDB and Node.js, it connects Node.js application to MongoDB database, helps in defining schemas and add structure and validation, CORS stands for `Cross Origin Resource Sharing` which is a security feature built into browser to control how resources are shared between different domain, if the frontend and backend runs on different domain the and the frontedn tries to access the resources then we will get the CORS error unless backend allow the domain, dotenv module loads the environmental variable from `.env` file to `process.env` object in Node.js at runtime, it is required because by default Node.js doesn't know how to read `.env` files, JWT stands for `JSON Web Token` it is used to securly transfer information as `JSON` object and it is commonly used for authentication, and authorization a JWT is made up of 3 part `Header`, `Payload` and `Signature` separated by '.' and Multer is a middleware for Express.js used for uploading files.

Installing Nodemon as it will automatically restarts the Node.js application when chnages are made to the code as if we do normally then we have to do chnages and restart the server manually and since nodemon is only needed in development so we install nodemon only as dev dependency (packages which are only required during development phase), to specify it as dev dependency we use `--save-dev`: `npm i nodemon --save-dev`.

### Server.js

#### Module

In Node.js their are two types of module system:
1. Common JS -> Traditional module
2. ES Module -> Moder module part of ES6

`CommonJs` is the default module system in Node.js, it uses `require()` to import modules and `module.exports={}` to export them. When we use `require()` Node.js loads the module synchronously, and CommonJS module are cached.

```
// expFile.js
module.exports={function1, function2};

// mainFile.js
const exp=require('./expFile')
log(exp.function1());
```


`ES Module` in ESM weuse `import` and `export` and it is similar to how modules are handled in client-side and it is asynchrounous in nature allowing for optimization by JS engine

```
// expFile.js
export function1(){};
export default function2(){};

// maineFile.js
import funstion2, {function1} from './expFile.js';
```

Inside `package.json` we do `"type":"commonjs"` to `"type":"module"`, now adding `nodemon` in script so the command will be `npm run server`.
```
"scripts": {
    "server":"nodemon server.js",
  },
```

#### Overview

Import Express for building server and `import 'dotenv/config';` loads the environmental variable directly from `.env` filt to `process.env` object without manually calling any function like `config()`, `import express from 'express';` here express is just a function and no instance of application is generated so to get the instance of the application we need to invoke express using `const app=express();`.

#### Express Middleware

Middleware is a function which lies between request response cycle and it can process the request, end request-response cycle or pass it to next middleware.
In Express.js `app.use()` is a middleware function which apply middlware to application, `app.use([path],callback(s))` those callback(s) will execute on every request that matches the path if there is no path the middleware will be applied to every request.

To enable CORS we use `app.use(cors())`, it is needed because by default browser block request made from one domain to another unless server explictly mention it, by using `app.use(cors())` we automaticlly enable CORS for all domain and all routes in the applocation thus any domain can make request to server, to customize CORS we can do.
```
app.use(cors({
  origin:'domain', -> only allow request from this domain
  method:['GET','POST'] -> only allow this methods
}))
```
