import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  // all form input must be component level state

  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

   const [text, setText ] = useState('')

  const onChange = (e) => {
      setText(e.target.value)
    }

  const onSubmit = e => {
      e.preventDefault()
      if(text === '') {
        alertContext.setAlert('Please enter something', 'light')
      } else {
        githubContext.searchUsers(text) // this will call the searchUsers method with the text when the form is submitted
        setText('')
      }
      
  }  
  
  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};


export default Search