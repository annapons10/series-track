//CUSTOM HOOK PARA VALIDAR LA BÚSQUEDA Y MANDAR ERRORES SI LOS HAY. SE PUEDE REUTILIZAR EN OTRAS BÚSQUEDAS:

import { useState } from "react";

export function useSearch () {
    const [errorSearch, setErrorSearch] = useState(null);

    //Validar la búsqueda y mandar error si lo hay:
    const verificarBusqueda = (value) => {
        if(value.length < 3) {
           setErrorSearch('No se puede buscar una serie con menos de 3 carácteres');
           return false;
        }

        if(/^\d+$/.test(value)){
            setErrorSearch('La búsqueda no puede contener solamente números'); 
            return false; 
        }

        //Si ha pasado, reinicio el error:
        setErrorSearch(null);
        return true;
    }

    return { errorSearch, verificarBusqueda }

}