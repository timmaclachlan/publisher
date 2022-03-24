import React, { useEffect, useState} from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { readById, updateById, deleteById, create } from "../fetcher";

const AuthorDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState({id: 0, name: '', address: ''});

  useEffect(() => {
    const retrieveAuthor = async () => {
      try {
        const authorRecord = await readById('author', id);
        setAuthor(authorRecord.data.author);
      }
      catch (error) {
        console.log(error);
        navigate('/notfound');
      }
    }
    if (id > 0) {
      retrieveAuthor();
    }
    else if (id !== undefined) {
      navigate('/notfound');
    }

  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAuthor((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    });
  }

  const callApi = (event, method) => {
    event.preventDefault();
    debugger;
    const callApi = async () => {    
       await method('author');
     }
    callApi();
  }


  return (
    <div>
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={author.name} onChange={handleChange} />
      <label htmlFor="address">Address</label>
      <input type="text" name="address" value={author.address} onChange={handleChange} />

      {author.id === 0 &&
        <button onClick={ev => callApi(ev, create.bind(null, author))}>Create</button>
      }
      {author.id > 0 &&
        <button onClick={ev => callApi(ev, updateById.bind(null, author, id))}>Update</button>
      }

      <button onClick={ev => callApi(ev, deleteById.bind(null, id))}>Delete</button>
      </form>    
      <div><button onClick={() => navigate('/authors')}>
        Authors
      </button></div>
    </div>      
  )
}

export default AuthorDetail