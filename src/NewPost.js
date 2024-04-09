import React from 'react'
import { useContext,useState } from 'react';
import DataContext from './context/DataContext';
import { useHistory } from 'react-router-dom';
import api from './api/posts';
import { format } from 'date-fns';

const NewPost = () => {
  const { posts,setPosts } = useContext(DataContext);
  const [postTitle,setPostTitle] = useState('');
  const [postBody,setPostBody] = useState('');
  const history = useHistory();

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

  {/*The thing about the onSubmit is that handleSubmit still receives the event object => ie there is no need of creating a anonymous function and specifying the event e in that*/}
  return (
    <main className='NewPost'>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Title:</label>
          <input
            id="postTitle"
            type='text'
            required
            value={postTitle}
            onChange={(e)=> setPostTitle(e.target.value)}
          />
          <label htmlFor="postBody">Post:</label>
          <textarea
            id='postBody'
            required
            value={postBody}
            onChange={(e)=> setPostBody(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default NewPost