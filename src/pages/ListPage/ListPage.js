import React, { Component, useEffect, useState } from 'react';
import './ListPage.css';
import { useParams } from 'react-router';

export default function ListPage (props) {
    const params = useParams()
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        const { id } = params
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then(response =>response.json())
        .then(data => {
            const newMovies = []
            data.movies.map(item =>{
                setMovies(item)
            })
        })
    },[])

 
    return (
        <div className="list-page">
            <h1 className="list-page__title">Мой список</h1>
            <ul>
                {!movies.length ? <p style={{fontSize: '25px'}}>Loading...</p> : movies.map((item) => {
                    return ( 
                        <li key={item.imdbID} style={{marginBottom: '10px', fontSize: '22px'}}>
                            <a href= {'https://www.imdb.com/title/' + item.imdbID}  target="_blank">{item.title} ({item.year})</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

}
 
