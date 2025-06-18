# AI Powered Blog Applicaton

## Deployment

Deploy backend and frontend on the vercel:
#### Backend:
https://ai-blog-application-server.vercel.app
#### Frontend:
https://ai-blog-application.vercel.app/

## Client / Frontend

### Routing

Used React Router library for navigation in single-page-application (SPA)

#### BrowserRouter

BrowserRouter uses HTML5 History API to keep the UI sync with URL.

Wrapping entire application within it.

```
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

```

#### Routes & Route

Routes tells which component to render for a given URL.

```
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/blog' element={<Blog/>}/>
</Routes>
```

#### Nagivation

In the navbar when user clicks the logo they should be redirect to the home page and when click on login they should be redirect to the admin page.

We can either use `<Link>` or `useNavigate()`. When we want to directly naviagte to a page wuth out performing any logic (static navigation) then use `Link`, if we want to navigate programmatically such as navigate after login or after form submission the use the `useNavigation()`.

```
<img
    onClick={() => navigate("/")}
    src={assets.logo}
    alt={"logo"}
/>
```

### Home Page

Home page contains navbar which contains logo and login button, header for displaying the into for blogging and a form for searching the blogs.
Then a filter for searching the blog from the blog list.

#### Header

Normally the element are positioned in the flow of the document, and by default the position of each element in the document is static: `position: static`.

Using `relative` the position of the element stays in the normal flow of the docment like `static` but we can move it using `top`, `left`, etc.

Using `absolute` the position of the element is removed from normal flow and it position itself with respect to nearest ancestor whose position is `relative`, `fixed` or `absolute`. If there are no such ancestor then it uses `<html>` document for reference.

`fixed` is like `absolute` but it is always relative to the viewport (screen). It will not move on scroll.

`sticky` acts like relative until a fixed point then it behaves like `fixed`.

In the `header` component the baground image position is set to `relative`.

```
<img
    src={assets.gradientBackground}
    alt=""
    className="absolute -top-50 -z-1 opacity-50"
/>
```

#### Blog List

Blog list is divided into 2 segments one for filetring the blog based on `All`, `Technology`, `Startup`, `Lifestyle` and `Finance`, and other the blog list content.

For filtering the blog we render the blog category and return a button element, for making only one selection possible we use a state (`menu`) for keeping track of the active filter.

Now we set the active state as `All` and when we click a filter we chnage the state and if current selected filter is same as the state we set the `absolute` background color showing which filter is currently active.

When user clicks in the blog item they are redirected to blog page with URL as `/blog/${id of the blog}`.

So the route changes accordingly to handle dynamic id.

<img
  src="https://github.com/user-attachments/assets/aa80c1f2-22cc-4060-a2a7-8d470109aa3a"
  alt="My screenshot"
  width="500"
/>


```
<Route path='/blog/:id' element={<Blog/>}/>
```

For filtering the content we use the `.filter` javascript method, if the selected state is `All` then we return all the elements else we only return those blog items where the category is same as the current state.

```
  blog_data.filter((blog)=>menu==="All"?true:blog.category===menu).map((blog)=><BlogCard blog={blog}/>)
```

Since the `description` contains html in string so we use `dangerouslySetInnerHTML` as the html is hardcoded and it is not given by user.

```
<p dangerouslySetInnerHTML={{ __html: description.slice(0,80) }}/>
```

#### News Letter

User can subscribe to get the latest blog using their emaid id.

#### Footer

Footer contains copyright and 4 `div` for presenting the links and the website logo.

### Blog Page

For displaying the content of the blog, the data is stored in `blog_data` which is array of objects. And when we click on any blog items we are navigated to the `Blog` page where the URL is use to diaply the blog as URL is same as `_id`. Fetching the id from URL `const {id}=useParams();` and using a state `data` to store the content of the particular blog `const [data,setData]=useState(null);`

Now looping the entire blog to find the blog item whose id matches the URL using `async` and `useEffect` to fetch the content.

Used moment package for formatting the date `<p>Published on {Moment(data.createdAt).format('MMMM Do YYYY')} </p>`. For comment create new state `comment`: `const [comment,setComment]=useState([]);` and a state is used for a controlled input.

### Admin

Admin has access to 4 pages `Dashboard`, `Add blogs`, `Blog list`, `Comments` with additional login component. Each 4 pages share the same navbar thus create a centralized layout for the same.

Now a nested routing is implemented for all admin pages.

```
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/blog/:id' element={<Blog/>}/>
  <Route path='/admin' element={<Layout/>}>
    <Route index element={<Dashboard/>}></Route>
    <Route path='addBlog' element={<AddBlog></AddBlog>}></Route>
    <Route path='comment' element={<Comment/>}></Route>
    <Route path='listblog' element={<ListBlog/>}></Route>
  </Route>
</Routes>
```

If we visit the `/admin` then `Layout` is rendered and inside layout `Dashboard` is rendered due to the `index` property., when `index` is used the URL will not chnage to any thing. To use nested routing `<Outlet/>` is required inside the `Layout` component as it will render the inner pages.

Layout page conatins navbar, and side bar which denotes the pages and Outlet to render them as place holder. The login page is created using controlled input. And the table for comments is used as component due to their repetetive need. `quill` module is used for rich text in the `Blog description` where we use AI to generate the content.

Used the state `category` to save the blog category from the dropdown.

```
<select
  onChange={(e) => setCategory(e.target.value)}
  name="category"
>
  <option value="" selected>
    Select Category
  </option>
  {blogCategories.map((item, index) => {
    return (
      <option key={index} value={`item`}>
        {item}
      </option>
    );
  })}
</select>
```

##### Dashboard

<img
  src="https://github.com/user-attachments/assets/8c8ea639-0c53-444d-b58a-95267c6a23c5"
  alt="My screenshot"
  width="500"
/>

##### Add Blog

<img
  src="https://github.com/user-attachments/assets/ff7730cd-9fce-4bae-8597-28943492f8a1"
  alt="My screenshot"
  width="500"
/>

##### Blog List

<img
  src="https://github.com/user-attachments/assets/ec95b18c-f85a-43b6-884f-32c7fbc0fea5"
  alt="My screenshot"
  width="500"
/>

##### Comment

<img
  src="https://github.com/user-attachments/assets/3082b8dd-794f-461d-b683-21782f81965c"
  alt="My screenshot"
  width="500"
/>

#### Routing

`Route` will render a component based on the URL.

```
<Route path='/about' element={<Anout/>}/>
```

`Link` use for nagivation without refreshing the page.

```
<Link to='/about'>Go to About</Link>
```

`NavLink` is similar to link but it adds styling to the active link (current page). End will match the exact URL else `/about/data` will be same for `/about`

```
<NavLink to='/about' end={true} className={({isActive})=>(isActive?"active-class":"")}>Go to About</NavLink>
```

`useNavigate()` is used for navigation to another route and is useful when we perform some logic before navigation. Navigation is triggered by logic.

### Connect to Backend

After writing all routes for backedn application now we need to send data from frontend to a specefic backend URL so we set the environmental variable in the frontend
`VITE_BASE_URL=http://localhost:3000`.

### Setting Context File

If we want to pass data from parent to child we use props, but if we pass props from toplevel component to bottom level then props are passed through those components which they dont use. So we create a global state for storing the data and using them without passing props manullay in each level.

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

## Git Setup

`git init` is used to initialize a new git repository inside the current working repository.
This creates a `.git` folder which keep tracks the files and changes made.

To add the files in the staging area use `git add .` this will add every files to the staging area else if you want to add only a single file then do `git add filename`

Now save the changes to the local git repository by doing `git commit -m "Your message for this chnages"`. This will move the file from `Staging Area -> Local Git Repository` along with initial message. The commit is stored in local `.git` repository which is a hidden folder. This commit data includes files and content as `blobs`, a tree structure which represents the file hierarchy and a commit object with the commit message, `SHA-1` hash id, author info and `a pointer to the previous commit`. TO see the commit use command `git log` it will show the commit id, author info, date, message etc.

`Upstream` refers to the remote branch to which the local branch is tracking this allow us to upload our chnages or download the existing ones. So when we push the chnages via `git push`, then the information about the remote repository and ranch is used to puch the changes.

`origin` is the alias for the upstream which git gives to the remote URL when we clone or add a remote. `origin` points to `https://github.com/user/repo.git`

```
git remote add orgin https://github.com/user/repo.git
```

To link local repo to remote use this once per repo.

```
git remote add orgin https://github.com/user/repo.git
```

Now every time when we do changes and want to push it to the remote we do following to keep the track of the current remote and push the changes.

```
git push origin main
```

`git push origin main` takes the commit from local branch `main` and push them to the remote repo named origin, to its `main` branch.

If we have different name for local and remote branch than `git push origin local_branch:remote_branch`.

Now if we want to set the upstream and just use simple `git push`, then we set the upstream using `-u` flag. It means first time upload my changes and then keep track of the current repository for all future scenarios.

To check the upstream is set or not use. `git branch -vv`.

### Git Command to Upload Files

```
git init -> For initialization
git add . -> To add all changes to staging area
git commit -m "Initial Commit" -> To move the data from staging area to local git repo
git branch -M main -> Forcefully remane the current branch to main (current branch is master)
git remote add origin https://github.com/user/repo.git -> Once per repo to link origin (Only point origin to URL)
git push -u origin main -> For tracking the remote repo, setting upstream and pushing changes (specific branch)
```



## Project Setup

### Step 1. Clone the repo
`git clone https://github.com/sanjay-1458/AI-Blog-Application.git`

### Step 2. Move inside the root
`cd AI-Blog-Application`

### Step 3. Setup frontend
Setup the `.env` file here we set port 3000 where backedn runs, if another process is running at that port than change the port.
```
VITE_BASE_URL=http://localhost:3000
```
```
cd client
npm install
npm run dev
```

### Step 4. Setup backend
Setup the `.env` file in the server repo
```
PORT=3000
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
MONGODB_URI=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
GEMINI_API_KEY=
```
```
cd server
npm install
node server.js
```

