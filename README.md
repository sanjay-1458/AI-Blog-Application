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


## Server / Backend


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

Now if we want to set the upstream and just use simple `git push`, then we set the upstream using `-u` flag. It means first time upload my changes  and then keep track of the current repository for all future scenarios.

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

