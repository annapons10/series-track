//Esto solo es la API a parte por si se quiere llamar desde otro hook o si se quiere cambiar la URL, solo es desde aquí: 

export function buscarSeries ({ search }){

    console.log("Entro a buscar las series..... ");

    return fetch(`https://api.themoviedb.org/3/search/tv?api_key=58a55524372506878833e839bc8881f0&query=${search}`)
    .then(res => res.json())
    .then(data => {
        //Me aseguro de que hay datos: 
        if(data.total_results === 0){
            return null;
        }

        const series = data.results;
        console.log(series);

        //Mapeo las series para darles los nombres que yo quiera y no depender tanto de la API:
        return series?.map(serie => ({
            id: serie.id,
            name: serie.name,
            poster: serie.poster_path, 
            date: serie.first_air_date
        }));
    })
    .catch(error => {
        console.error(error); // para debug
        throw new Error('Error fetching movies');
    });
}