const initialState = {
    movies: [],
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