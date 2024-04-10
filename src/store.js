import { createStore, action, thunk, computed} from 'easy-peasy';
import api from './api/posts';

export default createStore({
    posts: [],
    setPosts: action((state,payload)=>{
        state.posts = payload;
    }),
    postTitle: '',
    setPostTitle: action((state,payload)=>{
        state.postTitle = payload;
    }),
    postBody: '',
    setPostBody: action((state,payload)=>{
        state.postBody = payload;
    }), 
    editTitle: '',
    setEditTitle: action((state,payload)=>{
        state.editTitle = payload;
    }),
    editBody: '',
    setEditBody: action((state,payload)=>{
        state.editBody = payload;
    }),
    search: '',
    setSearch: action((state,payload)=>{
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state,payload)=>{
        state.searchResults = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state)=>{
        return (id)=> state.posts.find(post => (post.id).toString() === id);
    }),//Above two are states 
    savePost: thunk(async (actions, newPost, helpers)=>{
        const { posts } = helpers.getState();
        try{
            const response = await api.post('/posts', newPost);
            actions.setPosts([...posts,response.data]);
            actions.setPostTitle('');
            actions.setPostBody('');//We cannot call hook inside our store
          }catch(err){
            console.log(`Error: ${err.message}`);//We can further extend this as mentioned above in useEffect of fetching the data(error part)
          }
    }),
    deletePost: thunk(async (actions, id, helpers)=>{
        const { posts } = helpers.getState();
        try{
            await api.delete(`/posts/${id}`);
            actions.setPosts(posts.filter(post => post.id!==id));
          }catch(err){
            console.log(`Error: ${err.message}`);
          }
    }),
    editPost:  thunk(async(actions, updatedPost, helpers)=>{
        const { posts } = helpers.getState();
        const { id } = updatedPost;
        try{
            const response = await api.put(`/posts/${id}`,updatedPost);//Now we use put.. we could use patch if we are updating specific fields ..Here we are essentially be replacing the entire post
            actions.setPosts(posts.map(post => (post.id).toString() === id ? response.data: post));
            actions.setEditTitle('');
            actions.setEditBody('');
          }catch(err){
            console.log(`Error: ${err.message}`);//We can further extend this as mentioned above in useEffect of fetching the data(error part)
          }
    }) 
})