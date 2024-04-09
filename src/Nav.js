import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Nav = () => {
  const { search,setSearch } = useContext(DataContext);
  /*htmlFor attribute of label element should be same as id of the specified input element*/
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e)=> e.preventDefault()}>
          <label htmlFor="search">Search Posts</label>
          <input
            id='search'
            type='text'
            placeholder='Search Posts'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </form>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav