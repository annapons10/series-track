import { useEffect, useState } from "react"
import { useSearch } from "./hooks/useSearch";
import { Series } from './components/Series'
import { useMovies } from "./hooks/useMovies";

export function App(){
    //La búsqueda:
    const [search, setSearch] = useState('');
    //Si la búsqueda es correcta o no:
    const [isValid, setIsValid] = useState(false);
    //Recojo el custom hook:
    const { errorSearch, verificarBusqueda } = useSearch();
    //Recojo el custom hook para las series: 
    const { seriesEncontradas, getMovies } = useMovies();
    


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
        console.log(value);
        //Buscar series...
    }


    return (
        <div>
            <header>
                <h1>Series Track</h1>
                <form onSubmit={ handleSubmit }>
                    <input type="text" name="query" onChange={ hanldeChange } placeholder="Shameless, Breaking Bad..."/>
                    <button>Buscar</button>
                </form>
                { errorSearch && ( <p> { errorSearch } </p>)}
            </header>
            <main>
                <Series seriesEncontradas = { seriesEncontradas } />
            </main>

        </div>
    )
}