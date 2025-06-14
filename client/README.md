# AI Powered Blog Applicaton 

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

Home page contains navbar which contains logo and login button, header for displaying the into for blogging and a form for searching the  blogs.
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


## Git Setup

`git init` is used to initialize a new git repository inside the current working repository.
This creates a `.git` folder which keep tracks the files and changes made.

To add the files in the staging area use `git add .` this will add every files to the staging area else if you want to add only a single file then do `git add filename`

Now save the changes to the local git repository by doing `git commit -m "Your message for this chnages"`. This will move the file from `Staging Area -> Local Git Repository` along with initial message. The commit is stored in local `.git` repository which is a hidden folder. This commit data includes files and content as `blobs`, a tree structure which represents the file hierarchy and a commit object with the commit message, `SHA-1` hash id, author info and `a pointer to the previous commit`. TO see the commit use command `git log` it will show the commit id, author info, date, message etc.