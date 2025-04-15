//Esto solo es la API a parte por si se quiere llamar desde otro hook o si se quiere cambiar la URL, solo es desde aquí: 
//Cojo la variable de entorno :
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

export function buscarSeries ({ search }){ 

    return fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${search}`)
    .then(res => res.json())
    .then(data => {
        //Me aseguro de que hay datos: 
        if(data.total_results === 0){
            return null;
        }

        const series = data.results;

        //Mapeo las series para darles los nombres que yo quiera y no depender tanto de la API:
        return series?.map(serie => ({
            id: serie.id,
            name: serie.name,
            poster: serie.poster_path, 
            date: serie.first_air_date,
            average: serie.vote_average,
            count: serie.vote_count, 
            overview: serie.overview
        }));
    })
    .catch(error => { 
        throw new Error('Error fetching movies');
    });
}