//CUSTOM HOOK PARA BUSCAR LAS PELÍCULAS Y MAPEARLAS: 
import { useMemo, useRef, useState } from "react";
import { buscarSeries } from "../services/movies";
import { use } from "react";

export function useMovies ({ sort }) {
    //Las series que se encuentran me las guardo en el estado: 
    const [seriesEncontradas, setSeriesEncontradas] = useState([]); 
    //Uso referencia para no llamar a buscar la misma película dos veces: 
    const previousSearch = useRef('');
    //Estado para saber que película es la que requiere el modal para abrir + info y poder puntuarla:
    const [serieSelected, setSerieSelected] = useState(); 
    //Errores si no hay películas con ese título:
    const [errorTitle, setErrorTitle] = useState('');

    //Cuando cambia el search, hago el fetch:
    const getMovies = async ( { search }) => {
        if(search === previousSearch.current) return; 
     

        try {
            const series = await buscarSeries({ search });
            //Series puede contener las series o null, si series es null, guarda un vacío: 
            setSeriesEncontradas(series ?? []);
            //Si series encontradas es vacío(null), mando un error y return:
           if(!series){ 
                setErrorTitle('No se han encontrado películas con este título');
                return;
            }
            //Si hay películas, limpio el error para que no se vuelva a ver el mensaje: 
            setErrorTitle('');
            //Si hay series, las guardo para que no la vuelva a buscar: 
            previousSearch.current = search;
        } catch (error) {
            throw new Error('Error al buscar películas'); 
        }
       
    }

    //Si se ha hecho click, quiero que las series se ordenen por año, no es una función, es un valor: 
    //Uso useMemo (memoriza el resultado del sort y solo lo cambia cuando cambian sus dependencias) para que no tenga que volver a ordenar cuando no haga falta: 
    const valueSeries = useMemo(() => {
        return sort ?
            [...seriesEncontradas].sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })  : seriesEncontradas; 
    }, [sort, seriesEncontradas]); 

    //Función para el click del button de la serie y mostrar modal con más info :
    const handleButtonInfo = (id) => {
        //Guardo el id de la película click en el estado y la retorno:
       const serieSeleccionada = seriesEncontradas.find((serie) => serie.id === id );
        setSerieSelected(serieSeleccionada);
    }

    
    return { seriesEncontradas: valueSeries, getMovies, handleButtonInfo, serieSelected, errorTitle }

}
