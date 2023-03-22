import React, { Component, useState } from 'react';
import { state } from '../../store/store';
import './MovieItem.css';

export default function MovieItem({ Title, Year, Poster,imdbID }) {
    const [rmFavs, setRmFavs] = useState()

    const AddToFavs = () => {
        state.dispatch({
            type: 'ADD_TO_FAVS',
            payload: {
                Title, Year, Poster, imdbID
            }
        })
    }

    return (
        <article className="movie-item">
            <img className="movie-item__poster" src={Poster} alt={Title} />
            <div className="movie-item__info">
                <h3 className="movie-item__title">{Title}({Year})</h3>
                <button type="button" className="movie-item__add-button" onClick={AddToFavs}>Добавить в список</button>
            </div>
        </article>
    );

}
