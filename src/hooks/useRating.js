import { useState,  useEffect } from 'react'; 

export function useRating ({ serieSelected }) {
    //Estado para mostrar la puntuación de las series: 
    const [rating, setRating] = useState(0);

    //Quiero saber si existe una puntuación cuando ya tengo una serie seleccionada: 
    useEffect(() => {
        if (!serieSelected) return;
        console.log(serieSelected.id);
        //Si existe ya una puntuación la cojo: 
        const storedRating = localStorage.getItem(`${serieSelected.id}`)
        //La guardo en el estado:
        if(storedRating){
            setRating(Number(storedRating));
        }else{ //Si no, puntuación será, 0. 
            setRating(0);
        }
        
    }, [serieSelected]); 

    //Método para manejar el cambio de puntuación, guardar el localStorage: 
    const handleRatingChange = (newRating) => {
        if(serieSelected){
            // Lo almaceno en localStorage el nuevo valor: 
            localStorage.setItem(`${serieSelected.id}`, newRating); 
        }       
    }

    return { rating, handleRatingChange }

}
