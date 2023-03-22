const initialState = {
    movies: [
    {
        imdbID: 'tt3896198',
        title: "Guardians of the Galaxy Vol. 2",
        year: 2017,
        poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

    },
    {
        imdbID: 'tt0068646',
        title: "The Godfather",
        year: 1972,
        poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"

    }],
    favourites: []
}
export function reducer (state = initialState, action){
    switch (action.type){
        case 'FETCH_DATA_MOVIES':
            const newMovies = []
            const dataList = action.payload.data
            dataList.map(element => {
                newMovies.push(element)
            });
        return {
            ...state,
            movies: newMovies
        }
        case 'ADD_TO_FAVS':
            const newFavs = [...state.favourites]
            const findRepeated = newFavs.find(elem => elem.imdbID === action.payload.imdbID)
            if (findRepeated){
                return state;
            } 
            newFavs.push({
                imdbID: action.payload.imdbID,
                title: action.payload.Title,
                year: action.payload.Year,
                poster: action.payload.Poster
            })
            return{
            ...state,
            favourites: newFavs
            }

        case 'REMOVE_FROM_FAVS':
            const rmFavs = [...state.favourites]
            const findRm = rmFavs.find((elem,index)=> elem.imdbID === action.payload.imdbID)
            const rmIndex = rmFavs.indexOf(findRm)
            if (findRm){
                rmFavs.splice(rmIndex, 1) 
                return {
                    ...state,
                    favourites: rmFavs
                }
            } return state;        
            

        default:
            return state
    }
    
}