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

#### Database Connection

Generate `MONGODB_URI` from MongoDB Atlas and set network access to allow every domain, using mongoose to connect with MongoDB database and the database name is `/blogapp`

```
import mongoose from 'mongoose'

const connectDB=async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/blogapp`)
    }
    catch(error){
        console.log(error.message);
    }
}
```

#### Models

Defines how your data looks and behave in MongoDB using Mongoose, that is define schema and structure.
Created an `adminController.js` which recieves the {email & password} from `req.body` and generate a jwt using `jwt.sign({payload},JWT_SECRET)`, which will then become as `HEADER.PAYLOAD.SIGNATURE` where header has information about the signing algorithm, payload is the data and signature is the encrytion using jwt secret.

##### Example of Blog Model

```
// Schema -> Model -> Create -> Save

// Creating a new schema (structure of the document) for post
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})


// Model is the actual object we use to interact with database
// Creating the model from the schema
const Post=mongoose.model('Post',postSchema);


// In controller file for performing operation on data
// Operations Post.find(), Post.create(),...
const newPost=new Post({title,content});
newPost.save();

or

await Post.create({title,content})
```

#### Controllers

Functions that get data from models and return it in a response, by handling request logic. After creating the Schema and Model of the Blog we use the `blogController` for performing actions on the blog data, it will recieve blog data from `req.body.blog` and image from `req.image`, now we use ImageKit.io for storing the image as it provides CDN delivery and image optimization

#### Routes

Connect URLs to the correct controller functions, by mapping URLs to controller function.
Every request comming with `/admin` is routed to `adminRoutes.js` using `app.use('/admin',adminRoute)`, then the `adminRoute` is responsible for routing the request to their controller.

#### Middleware

Run code before request goes to controller, we have used multer middleware to parse the image and add it into `req.file` and another middleware to protect this route so only admin can post the image.

`auth.js` file is user for authorization where we check that the current request is send by admin or not. The request header contains the authorization in format of `Authorization: Bearer <token>`, so we will fetch the token form `req.headers.authorization` and use `jwt.verify(token, SECRET)` to verify the user.

#### Seeding

After the frontend integrates with backend, the data from assets will not be displayed so we need to update those data in mongdb atlas so a `seed.js` file is created for updating blogs and comments in the database.

#### Manuall Testing

We can create a new file `test.http` at the root level along with REST client extension to test the endpoints.

```
### Ping test

# Send Request
GET http://localhost:3000/


### Admin Login

# Send Request
POST http://localhost:3000/api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminpassword"
}

```

Thus getting `res.status(200).json({success:true,token})` the status code along with the json web token is VS Code itself
