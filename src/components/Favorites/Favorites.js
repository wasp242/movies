import React, {  useEffect, useState } from 'react';
import './Favorites.css';
import { state } from '../../store/store';
import { Link } from 'react-router-dom';


export default function Favorites() {
    const [value, setValue] = useState('')
    const [favMovies, setFavMovies] = useState([])
    const [isSaved, setIsSaved] = useState(false)
    const [favsNotEmpty, setFavsNotEmpty] = useState(false)
    const [id, setId] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    
    useEffect(()=>{
        state.subscribe(()=>{
            const newFavMovies = state.getState().favourites
            setFavMovies(newFavMovies)
            if (newFavMovies.length > 0) {
                setFavsNotEmpty(true);
            } else {
                setFavsNotEmpty(false);
            }
        })
    },[])
    const removeFromFav = (imdbID) =>{
        state.dispatch({
        type: 'REMOVE_FROM_FAVS',
        payload: {
            imdbID
        }
    })
    }

    
    const saveList = () => {
        setIsSaved(true)
        setIsLoaded(true)
        //console.log(isLoaded)
        const obj = {
            title: `${value}`,
            movies: [favMovies]
        }
        fetch('https://acb-api.algoritmika.org/api/movies/list',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(obj)
        }).then(response => response.json())
            .then(data => {
                setId(data.id)
                setIsLoaded(true)
                //console.log(isLoaded)
            })
    }  
    return (
        <div className="favorites">
            <input onChange={(e)=>(setValue(e.target.value))} className="favorites__name" />
            <ul className="favorites__list">
                {favMovies.map((item,index) => {
                    return (
                        <div key={item.imdbID}>
                            <li className='favorites__list-item' >
                                {item.title} ({item.year})
                            <button onClick={()=>removeFromFav(item.imdbID)} className='btn_favs'>x</button> 
                            </li>
                        </div>
                    )       
                })}
            </ul>
            {isSaved && id ?  
                !isLoaded ?
                    <p>Loading...</p> : 
                    <p className='favourites__open-list'>
                        <Link to={`/list/${id}`} >Open list</Link>
                    </p> : 
            <button disabled={!value || !favsNotEmpty} type="button" onClick={saveList} className="favorites__save">Сохранить список</button>}
            
        </div>
    );

}
 
