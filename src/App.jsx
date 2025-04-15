import { useCallback, useEffect, useState } from "react"
import { useSearch } from "./hooks/useSearch";
import { Series } from './components/Series'
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";
import './style/style.css'; 

export function App(){
    //Saber si ha hecho click y quiere las series ordenadas por año: 
    const [sort, setSort] = useState(false); 
    //La búsqueda:
    const [search, setSearch] = useState(''); 
    //Si la búsqueda es correcta o no:
    const [isValid, setIsValid] = useState(false);
    //Recojo el custom hook:
    const { errorSearch, verificarBusqueda } = useSearch();
    //Recojo el custom hook para las series: 
    const { seriesEncontradas, getMovies, handleButtonInfo, serieSelected, errorTitle } = useMovies({ sort });

    //Creo un debounce para que no haga tantas llamadas a la API, se espere un poco "el usuario pueda buscar": 
    const debounceGetMovies = useCallback (
        debounce(search => {
            console.log("entro a llamar");
            //Buscar series...
            getMovies({ search }); 
        }, 2000),
        //uso la dependencia de getMovies para siempre usar su versión actualizada, cuando cambia, se vuelve a crear la función (si tiene estados dentro): 
        []
    );

    //Puedo buscar la película mientras se escribe y al darle click a buscar / Puedo validar campos mientras y al finalizar: 
    //Método que maneja el envío del formulario, se podrían validar los campos: 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("me voy a validar y si es correcto, buscaré la película.");
        const data = new FormData(event.target);
        const query = data.get('query');
        console.log(`Esto es lo quiero ir a verificar... ${query} `); 
        const response = verificarBusqueda(query); 
        //Si la respuesta es true, se buscan las series:
        response && getMovies({ search }); 
    }

    //Confome se va escribiendo, el search va cambiando y se iría llamando al fetch cada vez para que se vaya buscando mientras se escriba (debounce).
    const hanldeChange = (event) => {
        const value = event.target.value;
        setSearch(value); 
        //Buscar series...
        debounceGetMovies(value);
    }

    //Para saber si ha hecho click y se quiere ordenar:
    const handleSort = () => {
        //Si se hace click, cambia de false a true y al revés: 
        setSort(!sort); 
    }


    return (
        <div className="page">
            <header>
                <h1 className="h1">Series Track</h1>
                <form onSubmit={ handleSubmit } className="form">
                    <input type="text" name="query" onChange={ hanldeChange } placeholder="Shameless, Breaking Bad..."/>
                    
                    <button>Buscar</button>
                    <label htmlFor="orderYear">Ordenar serie por año</label>
                    <input onClick={ handleSort } id="orderYear" type="checkbox" />
                </form>
                {/* Muestro los errores si existen:  */}
                { errorSearch && ( <p> { errorSearch } </p>)}
                { errorTitle && ( <p> { errorTitle } </p>)}
            </header>
            <main className="main">
                <Series seriesEncontradas = { seriesEncontradas } handleButtonInfo = { handleButtonInfo }
                serieSelected = { serieSelected }/>
            </main>

        </div>
    )
}