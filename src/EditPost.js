import React from 'react'
import {useState, useEffect, useContext} from 'react';
import {useParams,Link,useHistory} from 'react-router-dom';
import DataContext from './context/DataContext';
import api from './api/posts';
import { format } from 'date-fns';

const EditPost = () => {
    const { posts, setPosts } = useContext(DataContext);
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() ===id);
    const [editTitle,setEditTitle] = useState('');
    const [editBody,setEditBody] = useState('');
    const history= useHistory();

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post,setEditTitle,setEditBody]);

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

  return (
    <main className='NewPost'>
            {editTitle && 
                <> {/*JSX needs to have the parent element hence we used the html fragment(h2 and form were sibling elements hence)*/}
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        id="postTitle"
                        type='text'
                        required
                        value={editTitle}
                        onChange={(e)=> setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea
                        id='postBody'
                        required
                        value={editBody}
                        onChange={(e)=> setEditBody(e.target.value)}
                    />
                    <button type='submit' onClick={()=> handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle && 
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                    <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
  )
}

export default EditPost