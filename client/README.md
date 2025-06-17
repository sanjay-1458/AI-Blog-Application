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
