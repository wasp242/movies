import React, { Component, useEffect } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import { state } from '../../store/store';

export default function Movies (){
    const [movies,setMovies] = React.useState([])
    useEffect(()=>{
        state.subscribe(()=>{
            // console.log('state', state.getState())
            const fetchedMovies = state.getState().movies
            setMovies(fetchedMovies)
        })
    },[])
    return ( 
        <ul className="movies">
            {movies.map((movie) => (
                <li className="movies__item" key={movie.imdbID}>
                    <MovieItem {...movie} />
                </li>
            ))}
        </ul>
    );

}
