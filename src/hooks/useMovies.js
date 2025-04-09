//CUSTOM HOOK PARA BUSCAR LAS PELÍCULAS Y MAPEARLAS: 
import { useEffect, useState } from "react";
import { buscarSeries } from "../services/movies";

export function useMovies () {
    //Las series que se encuentran me las guardo en el estado: 
    const [seriesEncontradas, setSeriesEncontradas] = useState(); 
    //Cuando cambia el search, hago el fetch:
    const getMovies = async ( { search }) => {
        try {
            console.log("Entro a llamar a la función para buscar las series..... ");
            const series = await buscarSeries({ search });
            //Series puede contener las series o null, si series es null, guarda un vacío: 
            setSeriesEncontradas(series ?? []);
            console.log(`las series: ${series}`);
        } catch (error) {
            throw new movieError('Error al buscar películas'); 
        }
       
    }

    
    return { seriesEncontradas, getMovies }

}
