import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

const NewPost = () => {
  const history = useHistory();

  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

  const handleSubmit = (e)=>{
    e.preventDefault();
    const id = posts.length ? String(Number(posts[posts.length - 1].id) + 1): "1";
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')//Look for the library in the npmjs website 
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    history.push('/');
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