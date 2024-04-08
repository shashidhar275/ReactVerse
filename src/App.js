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
import api from './api/posts';
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
    const [posts,setPosts] = useState([]);

    const [search,setSearch]=useState('');
    const [searchResults,setSearchResults] = useState([]);
    const [postTitle,setPostTitle] = useState('');
    const [postBody,setPostBody] = useState('');
    const [editTitle,setEditTitle] = useState('');
    const [editBody,setEditBody] = useState('');
    const history = useHistory();
    const { width } = useWindowSize();

    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
    
    useEffect(()=>{
      setPosts(data);
    },[data]);


    useEffect(()=>{
      const filteredResults = posts.filter(post =>//This one is little awkward that, we cannot put {} it will not get you the output
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
    },[posts, search])

    const handleSubmit = async(e)=>{
      e.preventDefault();
      const id = posts.length ? String(Number(posts[posts.length - 1].id) + 1): "1";
      const datetime = format(new Date(), 'MMMM dd, yyyy pp')//Look for the library in the npmjs website 
      const newPost = { id, title: postTitle, datetime, body: postBody };
      try{
        const response = await api.post('/posts', newPost);
        const allPosts = [...posts,response.data];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        history.push('/');
      }catch(err){
        console.log(`Error: ${err.message}`);//We can further extend this as mentioned above in useEffect of fetching the data(error part)
      }
    }

    const handleEdit = async(id)=>{
      const datetime = format(new Date(), 'MMMM dd, yyyy pp')
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
      try{
        const response = await api.put(`/posts/${id}`,updatedPost);//Now we use put.. we could use patch if we are updating specific fields ..Here we are essentially be replacing the entire post
        setPosts(posts.map(post => (post.id).toString() === id ? response.data: post));
        setEditTitle('');
        setEditBody('');
        history.push('/');
      }catch(err){
        console.log(`Error: ${err.message}`);//We can further extend this as mentioned above in useEffect of fetching the data(error part)
      }

    }

    const handleDelete = async(id)=>{
      try{
        await api.delete(`/posts/${id}`);
        const postsList = posts.filter(post => post.id!==id);
        setPosts(postsList);
        history.push('/');//User in the page that is been called for deletion hence to move from that page we use the hook useHistroy from react
      }catch(err){
        console.log(`Error: ${err.message}`);
      }
    }

  return (
    <div className="App">
     <Header title="React JS Blog" width={width}/>
     <Nav serach={search} setSearch={setSearch}/>
     {/* Inside of a switch is like a waterfall as soon as it matches with the path that's what it delivers*/}
     <Switch>
      <Route exact path="/">
        <Home posts={searchResults} fetchError={fetchError} isLoading={isLoading}/>
      </Route>
      <Route exact path="/post">
        <NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody}/>
      </Route>
      <Route exact path="/edit/:id">
        <EditPost posts={posts} handleEdit={handleEdit} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody}/>
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
