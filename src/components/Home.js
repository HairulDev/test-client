import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Home = () => {
  const [dataMovies, setDataMovies] = useState([]);
  const [counter, setCounter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const initialState = {
    search: "",
  };
  const [form, setForm] = useState(initialState);


  useEffect(() => {
    loadMovies();
  }, [counter, searchQuery]);

  const handleSearch = () => {
    setSearchQuery(form.search);
    setCounter(1);
    loadMovies();
  }

  const loadMovies = () => {
    Axios.get(`https://www.omdbapi.com/?apikey=494c2e87&s=${searchQuery ? searchQuery : 'avengers'}&page=${counter}`)
      .then(res => {
        const dataAPI = res.data.Search;
        setDataMovies(dataAPI);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const next = () => {
    setCounter(counter + 1);
  }
  const prev = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className="col-md-6">
          <div className="input-group mb-3 mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search for movies..."
              onChange={onChange}
              value={form.search}
              name='search'
            />
            <div className="input-group-append ">
              <button className="btn btn-danger" type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {dataMovies.map(e => (
          <div className='col-md-2 my-2' key={e.imdbID} >
            <div className='card'>
              <div className='card-body' style={{ height: 210 }}>
                <img src={e.Poster} className='img-fluid' />
              </div>
              <div className='card-title' style={{ height: 60 }}>
                <p className='text-center'>{e.Title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='row'>
        <div className="col-md-6 text-center">
          <button onClick={prev} className='btn btn-sm btn-danger mt-2'>
            Prev
          </button>
        </div>
        <div className="col-md-6 text-center">
          <button onClick={next} className='btn btn-sm btn-danger mt-2'>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
