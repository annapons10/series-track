//CUSTOM HOOK PARA BUSCAR LAS PELÍCULAS Y MAPEARLAS: 
import { useMemo, useRef, useState } from "react";
import { buscarSeries } from "../services/movies";

export function useMovies ({ sort }) {
    //Las series que se encuentran me las guardo en el estado: 
    const [seriesEncontradas, setSeriesEncontradas] = useState([]); 
    //Uso referencia para no llamar a buscar la misma película dos veces: 
    const previousSearch = useRef('');
    //Cuando cambia el search, hago el fetch:
    const getMovies = async ( { search }) => {
        if(search === previousSearch.current) return; 
        try {
            console.log("Entro a llamar a la función para buscar las series..... ");
            const series = await buscarSeries({ search });
            //Series puede contener las series o null, si series es null, guarda un vacío: 
            console.log("tengo las series en useMoviessssss");
            setSeriesEncontradas(series ?? []);
            console.log(`las series: ${series}`);
            previousSearch.current = search;
            console.log(`este es el previus search: ${previousSearch}`);
        } catch (error) {
            throw new Error('Error al buscar películas'); 
        }
       
    }

    //Si se ha hecho click, quiero que las series se ordenen por año, no es una función, es un valor: 
    //Uso useMemo (memoriza el resultado del sort y solo lo cambia cuando cambian sus dependencias) para que no tenga que volver a ordenar cuando no haga falta: 
    const valueSeries = useMemo(() => {
       // if(seriesEncontradas.length === 0) return seriesEncontradas;
        return sort ?
            [...seriesEncontradas].sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })  : seriesEncontradas; 
    }, [sort, seriesEncontradas]); 


    
    return { seriesEncontradas: valueSeries, getMovies }

}
