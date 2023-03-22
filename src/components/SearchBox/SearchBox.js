import React, { Component, useState } from 'react';
import { state } from '../../store/store';
import './SearchBox.css';

export default function SearchBox () {
    const api = 'c796c0c6' 
    const [searchLine, setSearchLine] = useState('')
    const [movieData, setMovieData] = useState()
    const searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        searchMovie(searchLine)
    }
    const searchMovie = async (searchLine) => {
        const url = `http://www.omdbapi.com/?s=${searchLine}&apikey=${api}`;
        const response = await fetch(url);
        const data = await response.json();
        fetching(data.Search)
    }
    const fetching = (data)=>{
        state.dispatch({
            type: 'FETCH_DATA_MOVIES',
            payload: {
                data
            }
        })
    }

    return (
        <div className="search-box">
            <form className="search-box__form" onSubmit={searchBoxSubmitHandler}>
                <label className="search-box__form-label">
                    Искать фильм по названию:
                    <input
                        value={searchLine}
                        type="text"
                        className="search-box__form-input"
                        placeholder="Например, Shawshank Redemption"
                        onChange={(e)=>{setSearchLine(e.target.value)}}
                    />
                </label>
                <button
                    type="submit"
                    onClick={searchBoxSubmitHandler}
                    className="search-box__form-submit"
                    disabled={!searchLine}
                >
                    Искать
                </button>
            </form>
        </div>
    );
    
}
 