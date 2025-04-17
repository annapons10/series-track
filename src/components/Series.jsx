import { useState } from 'react'; 

//Para el react.lazy y usarlo en el modal:
import { Suspense, lazy } from 'react';
//Dice: es un componente perezoso, el archivo se guarda en la constante y se descarga cuando sea necesario: 
const  ModalSeries = lazy(() => import('./ModalSeries')); 

export function Series ({ seriesEncontradas, handleButtonInfo, serieSelected }) {
   //Estados para controlar el modal:
   const [isModalOpen, setIsModalOpen] = useState(false);
 
   
    return(
        <> 
            <ul className='movies'>
                { seriesEncontradas?.map((serie) => (
                    <button key={ serie.id } type="button"  className='button-serie' data-bs-toggle="modal" data-bs-target="#modalSerie1" onClick={ () => {  
                        handleButtonInfo(serie.id) 
                        setIsModalOpen(true) } } >
                        <li  className='movie'>
                            <h3>{ serie.name }</h3>
                            <p>{ serie.date }</p>
                            <img 
                            src={`https://image.tmdb.org/t/p/w200${serie.poster}`} 
                            alt={`Poster de ${serie.name}`} 
                            />
                        </li>
                    </button>
                
                ))}

            </ul>
            {/* Recibo la key de la serie clickada: */}
            { isModalOpen && serieSelected && 
                <Suspense fallback={(<div className='loader'>Cargando modal...</div>)}>
                    <ModalSeries setIsModalOpen={setIsModalOpen} 
                    serieSelected={serieSelected} / >
                </Suspense>
            }
        </> 
    )
} 