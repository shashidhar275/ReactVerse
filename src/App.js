import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
    const [posts,setPosts] = useState([
      {
        id: 1,
        title: "My First Post",
        datetime: "July 01, 2021 11:17:36 AM",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
      },
      {
        id: 2,
        title: "My 2nd Post",
        datetime: "July 01, 2021 11:17:36 AM",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
      },
      {
        id: 3,
        title: "My 3rd Post",
        datetime: "July 01, 2021 11:17:36 AM",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
      },
      {
        id: 4,
        title: "My Fourth Post",
        datetime: "July 01, 2021 11:17:36 AM",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
      }
    ]);

    const [search,setSearch]=useState('');
    const [searchResults,setSearchResults] = useState([]);
    const [postTitle,setPostTitle] = useState('');
    const [postBody,setPostBody] = useState('');
    const history = useHistory();

    useEffect(()=>{
      const filteredResults = posts.filter(post =>//This one is little awkward that, we cannot put {} it will not get you the output
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
    },[posts, search])

    const handleSubmit = (e)=>{
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1: 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy pp')//Look for the library in the npmjs website 
      const newPost = { id, title: postTitle, datetime, body: postBody };
      const allPosts = [...posts,newPost];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      history.push('/');
    }

    const handleDelete = (id)=>{
      const postsList = posts.filter(post => post.id!==id);
      setPosts(postsList);
      history.push('/');//User in the page that is been called for deletion hence to move from that page we use the hook useHistroy from react
    }

  return (
    <div className="App">
     <Header title="React JS Blog"/>
     <Nav serach={search} setSearch={setSearch}/>
     {/* Inside of a switch is like a waterfall as soon as it matches with the path that's what it delivers*/}
     <Switch>
      <Route exact path="/">
        <Home posts={searchResults}/>
      </Route>
      <Route exact path="/post">
        <NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody}/>
      </Route>
      <Route path="/post/:id">
        <PostPage posts={posts} handleDelete={handleDelete}/>
      </Route>
      <Route path="/about" component={About}/>{/*This one syntax used different then above both do perform same operation since about and missing functional components do not use any props hence we are using this simple syntax*/}
      <Route path="*" component={Missing}/>
     </Switch>
     <Footer />
    </div>
  );
}

export default App;
